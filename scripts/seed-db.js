const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.DATABASE_URL || process.env.DIRECT_URL;
const db = new PrismaClient({
  datasources: {
    db: { url }
  }
});

const ACCOUNT_ID = "0a2aaae8-7555-4612-8f62-36a367185ee3";
const USER_ID = "4d1c9814-4402-40fb-8b3b-e10c45c3b0dc";
const RECIPIENT_EMAIL = process.env.GMAIL_USER || "mdreahan2626@gmail.com";

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

function subDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

async function seed() {
  try {
    console.log("Connecting to Supabase database...");
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
          id: require("crypto").randomUUID(),
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

    console.log("Upserting Seed User...");
    await db.user.upsert({
      where: { id: USER_ID },
      update: {},
      create: {
        id: USER_ID,
        clerkUserId: "seed_clerk_user",
        email: RECIPIENT_EMAIL,
        name: "Demo User",
      },
    });

    console.log("Upserting Main Account...");
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

    console.log("Clearing old dummy transactions...");
    await db.transaction.deleteMany({
      where: { accountId: ACCOUNT_ID },
    });

    console.log(`Inserting ${transactions.length} dummy transactions...`);
    await db.transaction.createMany({
      data: transactions,
    });

    console.log("Updating account balance...");
    await db.account.update({
      where: { id: ACCOUNT_ID },
      data: { balance: totalBalance },
    });

    console.log("✅ Seed completed successfully!");
    console.log({
      user: RECIPIENT_EMAIL,
      transactions: transactions.length,
      balance: totalBalance.toFixed(2),
      income: totalIncome.toFixed(2),
      expenses: totalExpenses.toFixed(2),
    });
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await db.$disconnect();
  }
}

seed();
