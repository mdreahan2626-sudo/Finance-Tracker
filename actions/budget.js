"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getCurrentBudget(accountId) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) throw new Error("Unauthorized");

    let user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      user = await checkUser();
    }

    if (!user) {
      throw new Error("User not found");
    }

    const budget = await db.budget.findFirst({
      where: {
        userId: user.id,
      },
    });

    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const expenses = await db.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        accountId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      budget: budget ? { ...budget, amount: budget.amount.toNumber() } : null,
      currentExpenses: expenses._sum.amount
        ? expenses._sum.amount.toNumber()
        : 0,
    };
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
}

export async function updateBudget(amount) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) throw new Error("Unauthorized");

    let user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      user = await checkUser();
    }

    if (!user) throw new Error("User not found");

    const budget = await db.budget.upsert({
      where: {
        userId: user.id,
      },
      update: {
        amount,
      },
      create: {
        userId: user.id,
        amount,
      },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      data: { ...budget, amount: budget.amount.toNumber() },
    };
  } catch (error) {
    console.error("Error updating budget:", error);
    return { success: false, error: error.message };
  }
}

/**
 * RAG Implementation for AI Budget Optimization & Limit Recommendations
 * 1. RETRIEVAL: Pulls past 90 days of expense transactions from Prisma DB.
 * 2. AUGMENTATION: Groups expenses by category and builds prompt context documents.
 * 3. GENERATION: Passes context to Gemini AI to generate optimized budget targets.
 */
export async function getRagBudgetRecommendations() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) throw new Error("Unauthorized");

    let user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      user = await checkUser();
    }

    if (!user) throw new Error("User not found");

    // 1. RETRIEVAL STEP: Fetch last 90 days of expense transactions
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const expenseTransactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: { gte: ninetyDaysAgo },
      },
      select: {
        category: true,
        amount: true,
        date: true,
      },
    });

    // 2. AUGMENTATION STEP: Calculate category totals & monthly averages
    const categoryTotals = {};
    let totalSpentIn90Days = 0;

    expenseTransactions.forEach((tx) => {
      const amt = tx.amount.toNumber();
      totalSpentIn90Days += amt;
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + amt;
    });

    const averageMonthlyExpenses = totalSpentIn90Days / 3;

    const ragContext = `
User Profile: ${user.name} (${user.email})
Historical 90-Day Expense Total: $${totalSpentIn90Days.toFixed(2)}
Average Monthly Expense: $${averageMonthlyExpenses.toFixed(2)}

Spending Breakdown by Category (90-Day Aggregate):
${Object.entries(categoryTotals)
  .map(([cat, sum]) => `- ${cat}: $${sum.toFixed(2)} (Monthly Avg: $${(sum / 3).toFixed(2)})`)
  .join("\n")}
    `;

    // 3. GENERATION STEP: Pass augmented context to Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
You are an expert Financial Planner and RAG Budget Advisory Agent.
Based on the retrieved 90-day expense context below, generate:
1. Recommended total monthly budget limit.
2. Recommended category limits.
3. Three actionable RAG budget optimization tips.

Retrieved Context:
${ragContext}

Respond ONLY with valid JSON in this exact structure:
{
  "recommendedTotalBudget": number,
  "categoryBudgets": {
    "housing": number,
    "groceries": number,
    "utilities": number,
    "entertainment": number,
    "other": number
  },
  "ragTips": [
    "string tip 1",
    "string tip 2",
    "string tip 3"
  ]
}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();
    const data = JSON.parse(cleaned);

    return {
      success: true,
      data,
      averageMonthlyExpenses,
    };
  } catch (error) {
    console.error("RAG Budget Recommendation Error:", error);
    return {
      success: false,
      error: error.message || "Failed to generate RAG budget recommendations.",
    };
  }
}