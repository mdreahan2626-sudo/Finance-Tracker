import { inngest } from "./client";
import { db } from "@/lib/prisma";
import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/emails/template";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: [{ event: "test/hello.world" }] },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const triggerRecurringTransactions = inngest.createFunction(
  { id: "trigger-recurring-transactions", triggers: [{ cron: "0 0 * * *" }] },
  async ({ step }) => {
    const recurringTransactions = await step.run("fetch-recurring-transactions", async () => {
      return await db.transaction.findMany({
        where: { isRecurring: true, status: "COMPLETED", nextRecurringDate: { lte: new Date() } },
      });
    });
    if (recurringTransactions.length > 0) {
      await inngest.send(recurringTransactions.map((t) => ({
        name: "transaction/recurring.process",
        data: { transactionId: t.id },
      })));
    }
    return { triggered: recurringTransactions.length };
  }
);

export const processRecurringTransaction = inngest.createFunction(
  { id: "process-recurring-transaction", triggers: [{ event: "transaction/recurring.process" }] },
  async ({ event, step }) => {
    const { transactionId } = event.data;
    const transaction = await step.run("fetch-transaction", async () => {
      return await db.transaction.findUnique({ where: { id: transactionId }, include: { account: true } });
    });
    if (!transaction || !transaction.isRecurring) return;
    await step.run("create-recurring-transaction", async () => {
      await db.transaction.create({
        data: {
          type: transaction.type, amount: transaction.amount,
          description: transaction.description + " (Recurring)",
          date: new Date(), category: transaction.category, status: "COMPLETED",
          isRecurring: false, userId: transaction.userId, accountId: transaction.accountId,
        },
      });
      await db.account.update({
        where: { id: transaction.accountId },
        data: { balance: { [transaction.type === "INCOME" ? "increment" : "decrement"]: transaction.amount } },
      });
    });
    await step.run("update-next-date", async () => {
      const nextDate = new Date(transaction.nextRecurringDate);
      if (transaction.recurringInterval === "DAILY") nextDate.setDate(nextDate.getDate() + 1);
      else if (transaction.recurringInterval === "WEEKLY") nextDate.setDate(nextDate.getDate() + 7);
      else if (transaction.recurringInterval === "MONTHLY") nextDate.setMonth(nextDate.getMonth() + 1);
      else if (transaction.recurringInterval === "YEARLY") nextDate.setFullYear(nextDate.getFullYear() + 1);
      await db.transaction.update({ where: { id: transactionId }, data: { lastProcessed: new Date(), nextRecurringDate: nextDate } });
    });
  }
);

const getAmount = (amount) => Number(amount || 0);

const getReportMonth = (date) =>
  date.toLocaleString("en-US", { month: "long", year: "numeric" });

const buildMonthlyStats = (transactions) => {
  return transactions.reduce(
    (stats, transaction) => {
      const amount = getAmount(transaction.amount);

      if (transaction.type === "INCOME") {
        stats.totalIncome += amount;
        return stats;
      }

      stats.totalExpenses += amount;
      stats.byCategory[transaction.category] =
        (stats.byCategory[transaction.category] || 0) + amount;

      return stats;
    },
    { totalIncome: 0, totalExpenses: 0, byCategory: {} }
  );
};

const sortCategoryBreakdown = (byCategory) =>
  Object.fromEntries(
    Object.entries(byCategory).sort(([, amountA], [, amountB]) => amountB - amountA)
  );

const buildFinancialTips = ({ totalIncome, totalExpenses, byCategory }) => {
  const tips = [];
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;
  const topCategory = Object.entries(byCategory)[0];

  if (topCategory) {
    const [category, amount] = topCategory;
    const share = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
    tips.push(
      `${category} was your top spending category at $${amount.toFixed(2)} (${share.toFixed(1)}% of expenses).`
    );
  }

  if (totalIncome === 0 && totalExpenses > 0) {
    tips.push("You recorded expenses but no income last month. Add income transactions to get a clearer savings picture.");
  } else if (netSavings < 0) {
    tips.push("Your expenses were higher than your income last month. Review recurring costs and pause non-essential spending first.");
  } else if (savingsRate >= 20) {
    tips.push(`Great job saving ${savingsRate.toFixed(1)}% of your income. Consider moving part of it into a dedicated savings goal.`);
  } else if (totalIncome > 0) {
    tips.push("Try setting aside savings as soon as income arrives so it is not absorbed by day-to-day spending.");
  }

  if (!topCategory) {
    tips.push("No expenses were recorded last month. Keep logging transactions so your reports can show useful trends.");
  } else {
    tips.push("Compare this top category with next month to spot whether your spending is trending up or down.");
  }

  return tips.slice(0, 3);
};

export const checkBudgetAlerts = inngest.createFunction(
  { id: "check-budget-alerts", triggers: [{ cron: "0 */6 * * *" }] },
  async ({ step }) => {
    const budgets = await step.run("fetch-budgets", async () => {
      return await db.budget.findMany({ include: { user: true } });
    });

    for (const budget of budgets) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const expenses = await step.run("check-budget-" + budget.id, async () => {
        return await db.transaction.aggregate({
          where: { userId: budget.userId, type: "EXPENSE", date: { gte: startOfMonth } },
          _sum: { amount: true },
        });
      });

      const totalExpenses = Number(expenses._sum?.amount || 0);
      const budgetAmount = Number(budget.amount);
      const percentageUsed = (totalExpenses / budgetAmount) * 100;

      const shouldAlert = percentageUsed >= 80 &&
        (!budget.lastAlertSent ||
          new Date(budget.lastAlertSent).getMonth() !== new Date().getMonth() ||
          new Date(budget.lastAlertSent).getFullYear() !== new Date().getFullYear());

      if (shouldAlert) {
        await step.run("send-budget-alert-" + budget.id, async () => {
          await sendEmail({
            to: budget.user.email,
            subject: `Budget Alert - ${percentageUsed.toFixed(1)}% Used`,
            react: EmailTemplate({
              userName: budget.user.name || "User",
              type: "budget-alert",
              data: { percentageUsed, budgetAmount, totalExpenses },
            }),
          });
          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() },
          });
        });
      }
    }

    return { checked: budgets.length };
  }
);

export const generateMonthlyReports = inngest.createFunction(
  { id: "generate-monthly-reports", triggers: [{ cron: "0 0 1 * *" }] },
  async ({ step }) => {
    const users = await step.run("fetch-users", async () => {
      return await db.user.findMany();
    });

    for (const user of users) {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const start = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
      const end = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 1);

      const transactions = await step.run("transactions-" + user.id, async () => {
        return await db.transaction.findMany({
          where: {
            userId: user.id,
            status: "COMPLETED",
            date: { gte: start, lt: end },
          },
          select: {
            type: true,
            amount: true,
            category: true,
          },
        });
      });

      const stats = buildMonthlyStats(transactions);
      stats.byCategory = sortCategoryBreakdown(stats.byCategory);

      const insights = buildFinancialTips(stats);

      await step.run("send-report-" + user.id, async () => {
        await sendEmail({
          to: user.email,
          subject: "Your Monthly Financial Report",
          react: EmailTemplate({
            userName: user.name || "User",
            type: "monthly-report",
            data: {
              month: getReportMonth(lastMonth),
              stats,
              insights,
            },
          }),
        });
      });
    }

    return { sent: users.length };
  }
);

export const syncUser = inngest.createFunction(
  { id: "sync-user", triggers: [{ event: "clerk/user.created" }] },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const email = email_addresses?.[0]?.email_address;
    const name = `${first_name || ""} ${last_name || ""}`.trim() || "User";

    const user = await step.run("sync-db", async () => {
      return await db.user.upsert({
        where: { clerkUserId: id },
        update: { name, imageUrl: image_url, email },
        create: { clerkUserId: id, name, imageUrl: image_url, email },
      });
    });

    if (email) {
      await step.run("send-welcome-email", async () => {
        await sendEmail({
          to: email,
          subject: "Welcome to Welth! 🚀",
          react: EmailTemplate({
            userName: name,
            type: "welcome-alert",
            data: {},
          }),
        });
      });
    }

    return { success: true, userId: user.id };
  }
);

export const sendOtpEmail = inngest.createFunction(
  { id: "send-otp-email", triggers: [{ event: "app/otp.send" }] },
  async ({ event, step }) => {
    const { email, otp, userName } = event.data;
    
    await step.run("send-otp", async () => {
      await sendEmail({
        to: email,
        subject: "Your Welth Verification Code",
        react: EmailTemplate({
          userName: userName || "User",
          type: "otp-alert",
          data: { otp },
        }),
      });
    });

    return { success: true, sentTo: email };
  }
);

export const sendTestAlertEmail = inngest.createFunction(
  { id: "send-test-alert-email", triggers: [{ event: "app/alert.send" }] },
  async ({ event, step }) => {
    const { email, alertType, userName } = event.data;

    await step.run("send-test-alert", async () => {
      if (alertType === "budget-alert") {
        await sendEmail({
          to: email,
          subject: "Budget Alert - 85% Used (Test)",
          react: EmailTemplate({
            userName: userName || "User",
            type: "budget-alert",
            data: {
              percentageUsed: 85,
              budgetAmount: 1000,
              totalExpenses: 850,
            },
          }),
        });
      } else if (alertType === "monthly-report") {
        await sendEmail({
          to: email,
          subject: "Your Monthly Financial Report (Test)",
          react: EmailTemplate({
            userName: userName || "User",
            type: "monthly-report",
            data: {
              month: "June 2026",
              stats: {
                totalIncome: 5000,
                totalExpenses: 3500,
                byCategory: {
                  housing: 1500,
                  groceries: 600,
                  transportation: 400,
                  entertainment: 300,
                  utilities: 700,
                },
              },
              insights: [
                "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
                "Great job keeping entertainment expenses under control this month!",
                "Setting up automatic savings could help you save 20% more of your income.",
              ],
            },
          }),
        });
      }
    });

    return { success: true, alertType, sentTo: email };
  }
);
