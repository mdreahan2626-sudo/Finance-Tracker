"use server";

import { db } from "@/lib/prisma";
import { subDays } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { checkUser } from "@/lib/checkUser";
import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/emails/template";

const ACCOUNT_ID = "0a2aaae8-7555-4612-8f62-36a367185ee3";
const USER_ID = "4d1c9814-4402-40fb-8b3b-e10c45c3b0dc";

const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "transportation", range: [100, 500] },
    { name: "groceries", range: [200, 600] },
    { name: "utilities", range: [100, 300] },
    { name: "entertainment", range: [50, 200] },
    { name: "food", range: [50, 150] },
    { name: "shopping", range: [100, 500] },
    { name: "healthcare", range: [100, 1000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
  ],
};

function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomCategory(type) {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions() {
  try {
    const session = await getServerSession(authOptions);
    let activeUserId = USER_ID;
    let activeAccountId = ACCOUNT_ID;
    let recipientEmail = process.env.RESEND_EMAIL_TO || "mdrehan98178@gmail.com";
    let recipientName = "User";

    if (session && session.user?.email) {
      let dbUser = await db.user.findUnique({
        where: { email: session.user.email },
      });
      if (!dbUser) {
        dbUser = await checkUser();
      }
      if (dbUser) {
        activeUserId = dbUser.id;
        recipientEmail = dbUser.email;
        recipientName = dbUser.name || "User";
        
        let account = await db.account.findFirst({
          where: { userId: dbUser.id },
        });
        
        if (!account) {
          account = await db.account.create({
            data: {
              name: "Main Savings",
              type: "SAVINGS",
              balance: 0,
              userId: dbUser.id,
              isDefault: true,
            },
          });
        }
        activeAccountId = account.id;
      }
    } else {
      await db.user.upsert({
        where: { id: USER_ID },
        update: {},
        create: {
          id: USER_ID,
          email: "seed_user@example.com",
          name: "Seed User",
        },
      });

      await db.account.upsert({
        where: { id: ACCOUNT_ID },
        update: {},
        create: {
          id: ACCOUNT_ID,
          name: "Main Savings",
          type: "SAVINGS",
          balance: 0,
          userId: USER_ID,
          isDefault: true,
        },
      });
    }

    const transactions = [];
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;
    let categoryExpenses = {};

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const transaction = {
          id: crypto.randomUUID(),
          type,
          amount,
          description: `${
            type === "INCOME" ? "Received" : "Paid for"
          } ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId: activeUserId,
          accountId: activeAccountId,
          createdAt: date,
          updatedAt: date,
        };

        if (type === "INCOME") {
          totalIncome += amount;
          totalBalance += amount;
        } else {
          totalExpenses += amount;
          totalBalance -= amount;
          categoryExpenses[category] = (categoryExpenses[category] || 0) + amount;
        }

        transactions.push(transaction);
      }
    }

    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany({
        where: { accountId: activeAccountId },
      });

      await tx.transaction.createMany({
        data: transactions,
      });

      await tx.account.update({
        where: { id: activeAccountId },
        data: { balance: totalBalance },
      });
    });

    // 1. Send Test Transaction Alert Email
    let transactionEmailSent = false;
    try {
      await sendEmail({
        to: recipientEmail,
        subject: `[Seed Test] Welth Transaction Alert: -$${transactions[0]?.amount} (${transactions[0]?.category})`,
        react: EmailTemplate({
          userName: recipientName,
          type: "transaction-alert",
          data: {
            amount: transactions[0]?.amount || 250,
            description: transactions[0]?.description || "Paid for groceries",
            category: transactions[0]?.category || "groceries",
            date: new Date(),
            transactionType: transactions[0]?.type || "EXPENSE",
          },
        }),
      });
      transactionEmailSent = true;
    } catch (e) {
      console.error("Failed to send seed transaction email:", e.message);
    }

    // 2. Send Test Monthly Expense Summary Report Email
    let summaryEmailSent = false;
    try {
      await sendEmail({
        to: recipientEmail,
        subject: `[Seed Test] Your Monthly Expense Summary Report`,
        react: EmailTemplate({
          userName: recipientName,
          type: "monthly-report",
          data: {
            month: "July 2026",
            stats: {
              totalIncome: Math.round(totalIncome),
              totalExpenses: Math.round(totalExpenses),
              byCategory: categoryExpenses,
            },
            insights: [
              `Housing and travel were your highest expense categories this cycle.`,
              `Your net balance stands at $${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} across your accounts.`,
              `Automated AI receipt scanning is active on your profile.`
            ],
          },
        }),
      });
      summaryEmailSent = true;
    } catch (e) {
      console.error("Failed to send seed summary report email:", e.message);
    }

    return {
      success: true,
      message: `Created ${transactions.length} transactions in Prisma database!`,
      emails: {
        recipient: recipientEmail,
        transactionEmailSent,
        summaryEmailSent,
      }
    };
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return { success: false, error: error.message };
  }
}