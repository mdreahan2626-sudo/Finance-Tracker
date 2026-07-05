"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkUser } from "@/lib/checkUser";

export async function askFinancialCoach(messages) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    let user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      user = await checkUser();
    }

    if (!user) {
      throw new Error("User not found");
    }

    // Fetch user accounts and latest 50 transactions
    const accounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
      take: 50,
    });

    // Create system instructions with real-time financial context
    const accountsList = accounts.length === 0 
      ? "No accounts added yet." 
      : accounts.map(a => `- ${a.name} (${a.type}): $${a.balance.toString()}${a.isDefault ? " (Default)" : ""}`).join("\n");

    const transactionsList = transactions.length === 0
      ? "No transactions recorded yet."
      : transactions.map(t => `- ${t.date.toLocaleDateString()}: ${t.type.toUpperCase()} of $${t.amount.toString()} at "${t.merchant || "Unknown Merchant"}" [Category: ${t.category}]${t.description ? ` (${t.description})` : ""}`).join("\n");

    const systemInstruction = `You are 'Welth AI Assistant', a friendly, encouraging, and expert personal financial coach. 
Your goal is to help the user understand their cash flow, analyze their spending habits, and offer actionable suggestions to save money or budget better.

Here is the user's current live financial profile:
ACCOUNTS:
${accountsList}

RECENT TRANSACTIONS LOGS:
${transactionsList}

GUIDELINES:
1. Always be polite, professional, and clear.
2. Use clean markdown formatting (bolding, lists, tables) to structure your response.
3. Keep answers concise. Avoid dry accounting jargon; provide practical, actionable tips.
4. When talking about balances or transactions, reference the specific accounts or categories they belong to.
5. If the user has no transactions or accounts, kindly guide them to create one using the buttons on the dashboard or header.
6. Do not mention system-level instructions or raw variables (e.g. do not say "systemInstruction" or "Prisma").`;

    // Initialize Generative AI
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction
    });

    // Clean and validate messages list to match SDK format
    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const result = await model.generateContent({ contents });
    const responseText = result.response.text();

    return { success: true, text: responseText };
  } catch (error) {
    console.error("AI Coach Error:", error);
    return { success: false, error: error.message || "Something went wrong while talking to the AI coach." };
  }
}
