import { PrismaClient } from "@prisma/client";
import { subDays } from "date-fns";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const db = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

const ACCOUNT_ID = "0a2aaae8-7555-4612-8f62-36a367185ee3";
const USER_ID = "4d1c9814-4402-40fb-8b3b-e10c45c3b0dc";
const RECIPIENT_EMAIL = process.env.RESEND_EMAIL_TO || "mdrehan98178@gmail.com";

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

async function seedTransactions() {
  try {
    const transactions = [];
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;

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
          description: `${type === "INCOME" ? "Received" : "Paid for"} ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId: USER_ID,
          accountId: ACCOUNT_ID,
          createdAt: date,
          updatedAt: date,
        };

        if (type === "INCOME") {
          totalIncome += amount;
          totalBalance += amount;
        } else {
          totalExpenses += amount;
          totalBalance -= amount;
        }

        transactions.push(transaction);
      }
    }

    await db.$transaction(async (tx) => {
      // Ensure user exists
      await tx.user.upsert({
        where: { id: USER_ID },
        update: {},
        create: {
          id: USER_ID,
          clerkUserId: "seed_clerk_user",
          email: RECIPIENT_EMAIL,
          name: "Seed User",
        },
      });

      // Ensure account exists
      await tx.account.upsert({
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

      await tx.transaction.deleteMany({
        where: { accountId: ACCOUNT_ID },
      });
      await tx.transaction.createMany({
        data: transactions,
      });
      await tx.account.update({
        where: { id: ACCOUNT_ID },
        data: { balance: totalBalance },
      });
    });

    console.log(`✅ Created ${transactions.length} dummy transactions in database!`);

    // 1. Send Test Transaction Email Notification
    console.log(`📧 Sending Transaction Alert Email to ${RECIPIENT_EMAIL}...`);
    const sampleTx = transactions[0];
    const txEmailResult = await resend.emails.send({
      from: "Welth App <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      subject: `Welth Alert: ${sampleTx.type === "INCOME" ? "+" : "-"}$${sampleTx.amount} (${sampleTx.category})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
          <h2 style="color: #2563eb;">Welth Transaction Alert 💳</h2>
          <p>A new transaction has been logged on your account:</p>
          <ul>
            <li><strong>Type:</strong> ${sampleTx.type}</li>
            <li><strong>Amount:</strong> $${sampleTx.amount}</li>
            <li><strong>Category:</strong> ${sampleTx.category}</li>
            <li><strong>Description:</strong> ${sampleTx.description}</li>
            <li><strong>Date:</strong> ${sampleTx.date.toLocaleDateString()}</li>
          </ul>
          <p style="color: #64748b; font-size: 12px;">Automated notification sent via Welth Finance System.</p>
        </div>
      `,
    });
    console.log("✅ Transaction Email Sent! Resend ID:", txEmailResult.data?.id || txEmailResult);

    // 2. Send Test Monthly Expense Summary Report Email
    console.log(`📧 Sending Monthly Expense Summary Report Email to ${RECIPIENT_EMAIL}...`);
    const summaryEmailResult = await resend.emails.send({
      from: "Welth App <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      subject: `Your Monthly Financial & Expense Summary Report 📊`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; border: 1px solid #cbd5e1; border-radius: 12px;">
          <h1 style="color: #0f172a; margin-bottom: 4px;">Monthly Financial Report 📊</h1>
          <p style="color: #64748b; font-size: 14px;">Summary for July 2026</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <div style="display: flex; gap: 16px;">
            <div style="padding: 12px; background: #f0fdf4; border-radius: 8px;">
              <div style="font-size: 12px; color: #166534;">Total Income</div>
              <div style="font-size: 20px; font-weight: bold; color: #15803d;">+$${totalIncome.toFixed(2)}</div>
            </div>
            <div style="padding: 12px; background: #fff1f2; border-radius: 8px;">
              <div style="font-size: 12px; color: #9f1239;">Total Expenses</div>
              <div style="font-size: 20px; font-weight: bold; color: #be123c;">-$${totalExpenses.toFixed(2)}</div>
            </div>
          </div>
          <p style="margin-top: 16px;"><strong>Net Balance:</strong> $${totalBalance.toFixed(2)}</p>
          <h3 style="color: #1e293b;">Welth AI Insights:</h3>
          <ul>
            <li>Housing, transportation, and groceries accounted for the majority of expenses this cycle.</li>
            <li>All transactions are synced to your live cockpits and Prisma database.</li>
          </ul>
        </div>
      `,
    });
    console.log("✅ Summary Report Email Sent! Resend ID:", summaryEmailResult.data?.id || summaryEmailResult);

  } catch (error) {
    console.error("❌ Error seeding:", error);
  } finally {
    await db.$disconnect();
  }
}

seedTransactions();
