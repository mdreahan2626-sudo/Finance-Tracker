"use server";

import { db } from "@/lib/prisma";
import { subDays } from "date-fns";
import { auth } from "@clerk/nextjs/server";
import { checkUser } from "@/lib/checkUser";

const ACCOUNT_ID = "0a2aaae8-7555-4612-8f62-36a367185ee3";
const USER_ID = "4d1c9814-4402-40fb-8b3b-e10c45c3b0dc";

// Categories with their typical amount ranges
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

// Helper to generate random amount within a range
function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Helper to get random category with amount
function getRandomCategory(type) {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions() {
  try {
    const { userId } = await auth();
    let activeUserId = USER_ID;
    let activeAccountId = ACCOUNT_ID;

    if (userId) {
      let dbUser = await db.user.findUnique({
        where: { clerkUserId: userId },
      });
      if (!dbUser) {
        dbUser = await checkUser();
      }
      if (dbUser) {
        activeUserId = dbUser.id;
        
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
          clerkUserId: "seed_clerk_user",
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

    // Generate 90 days of transactions
    const transactions = [];
    let totalBalance = 0;

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);

      // Generate 1-3 transactions per day
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        // 40% chance of income, 60% chance of expense
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

        totalBalance += type === "INCOME" ? amount : -amount;
        transactions.push(transaction);
      }
    }

    // Insert transactions in batches and update account balance
    await db.$transaction(async (tx) => {
      // Clear existing transactions
      await tx.transaction.deleteMany({
        where: { accountId: activeAccountId },
      });

      // Insert new transactions
      await tx.transaction.createMany({
        data: transactions,
      });

      // Update account balance
      await tx.account.update({
        where: { id: activeAccountId },
        data: { balance: totalBalance },
      });
    });

    return {
      success: true,
      message: `Created ${transactions.length} transactions`,
    };
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return { success: false, error: error.message };
  }
}