"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { Resend } from "resend";
import nodemailer from "nodemailer";

export async function sendMonthlyStatementEmail() {
  try {
    const user = await checkUser();
    if (!user) {
      return { success: false, error: "Please log in to send your statement." };
    }

    const primaryRecipient = user.email || "mdreahan2626@gmail.com";
    const resendBackupRecipient = process.env.RESEND_EMAIL_TO || "mdrehan98178@gmail.com";

    const accounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryTotals = {};

    transactions.forEach((tx) => {
      const amt = Number(tx.amount);
      if (tx.type === "INCOME") {
        totalIncome += amt;
      } else {
        totalExpenses += amt;
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + amt;
      }
    });

    const totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0);

    const categoryRows = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; text-transform: capitalize; color: #334155; font-weight: 600;">${cat}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; color: #e11d48; font-weight: 700;">-$${amt.toFixed(2)}</td>
        </tr>
      `)
      .join("");

    const txRows = transactions.slice(0, 35)
      .map((tx) => {
        const isExp = tx.type === "EXPENSE";
        const dateStr = new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        return `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px;">${dateStr}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${tx.description || "Direct Transaction"}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; text-transform: capitalize; color: #64748b; font-size: 12px;">${tx.category}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 700; color: ${isExp ? "#e11d48" : "#10b981"};">
              ${isExp ? "-" : "+"}$${Number(tx.amount).toFixed(2)}
            </td>
          </tr>
        `;
      })
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welth Monthly Financial & Transaction Report</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 28px; text-align: left; border-bottom: 3px solid #10b981;">
            <div style="display: inline-block; padding: 4px 12px; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); border-radius: 9999px; color: #34d399; font-size: 11px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 12px;">
              Executive Financial Statement
            </div>
            <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 26px; font-weight: 900; letter-spacing: -0.02em;">
              Welth Monthly Statement & Ledger
            </h1>
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">
              Account Holder: <strong style="color: #f8fafc;">${user.name}</strong> (${user.email})
            </p>
          </div>

          <div style="padding: 28px;">
            <div style="display: table; width: 100%; margin-bottom: 24px;">
              <div style="display: table-cell; width: 32%; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 14px; text-align: center;">
                <div style="font-size: 11px; font-weight: 700; color: #166534; text-transform: uppercase;">Total Income</div>
                <div style="font-size: 20px; font-weight: 900; color: #15803d; margin-top: 4px;">+$${totalIncome.toFixed(2)}</div>
              </div>
              <div style="display: table-cell; width: 2%;"></div>
              <div style="display: table-cell; width: 32%; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 12px; padding: 14px; text-align: center;">
                <div style="font-size: 11px; font-weight: 700; color: #9f1239; text-transform: uppercase;">Total Expenses</div>
                <div style="font-size: 20px; font-weight: 900; color: #be123c; margin-top: 4px;">-$${totalExpenses.toFixed(2)}</div>
              </div>
              <div style="display: table-cell; width: 2%;"></div>
              <div style="display: table-cell; width: 32%; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 14px; text-align: center;">
                <div style="font-size: 11px; font-weight: 700; color: #1e40af; text-transform: uppercase;">Net Balance</div>
                <div style="font-size: 20px; font-weight: 900; color: #1d4ed8; margin-top: 4px;">$${totalBalance.toFixed(2)}</div>
              </div>
            </div>

            <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 24px 0 10px 0;">
              📊 Top Expense Categories
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 28px;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="padding: 8px 12px; text-align: left; color: #64748b; font-size: 11px; text-transform: uppercase;">Category</th>
                  <th style="padding: 8px 12px; text-align: right; color: #64748b; font-size: 11px; text-transform: uppercase;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${categoryRows}
              </tbody>
            </table>

            <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 24px 0 10px 0;">
              💳 Latest Itemized Transactions (Last 35)
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="padding: 8px 12px; text-align: left; color: #64748b; font-size: 11px; text-transform: uppercase;">Date</th>
                  <th style="padding: 8px 12px; text-align: left; color: #64748b; font-size: 11px; text-transform: uppercase;">Description</th>
                  <th style="padding: 8px 12px; text-align: left; color: #64748b; font-size: 11px; text-transform: uppercase;">Category</th>
                  <th style="padding: 8px 12px; text-align: right; color: #64748b; font-size: 11px; text-transform: uppercase;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${txRows}
              </tbody>
            </table>

            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0;">Automated monthly summary generated by <strong>Welth AI Financial Intelligence</strong>.</p>
              <p style="margin: 4px 0 0 0;">Synced directly with your Supabase cloud database.</p>
            </div>

          </div>
        </div>
      </body>
      </html>
    `;

    const subject = `Welth Monthly Financial & Transaction Report (${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })})`;

    // Step 1: Try Gmail SMTP if configured
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ""),
          },
        });

        const info = await transporter.sendMail({
          from: `Welth Finance <${process.env.GMAIL_USER}>`,
          to: primaryRecipient,
          subject,
          html: emailHtml,
        });

        return { success: true, recipient: primaryRecipient, method: "gmail", messageId: info.messageId };
      } catch (smtpErr) {
        console.warn("Gmail SMTP delivery failed, falling back to Resend:", smtpErr.message);
      }
    }

    // Step 2: Try Resend to logged-in user
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      const res = await resend.emails.send({
        from: "Welth App <onboarding@resend.dev>",
        to: primaryRecipient,
        subject,
        html: emailHtml,
      });

      if (res.data?.id) {
        return { success: true, recipient: primaryRecipient, method: "resend", messageId: res.data.id };
      }
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (resendErr) {
      console.warn(`Resend failed for ${primaryRecipient}:`, resendErr.message);
      
      // Step 3: Resend sandbox allows only verified owner address
      if (resendBackupRecipient && resendBackupRecipient !== primaryRecipient) {
        const fallbackRes = await resend.emails.send({
          from: "Welth App <onboarding@resend.dev>",
          to: resendBackupRecipient,
          subject: `[Statement for ${primaryRecipient}] ${subject}`,
          html: emailHtml,
        });

        if (fallbackRes.data?.id) {
          return {
            success: true,
            recipient: resendBackupRecipient,
            targetAccount: primaryRecipient,
            method: "resend-fallback",
            messageId: fallbackRes.data.id,
            notice: `Resend is in sandbox mode (permits only verified account: ${resendBackupRecipient}). Statement successfully sent there!`
          };
        }
      }
      throw resendErr;
    }

    return { success: false, error: "Unable to send email via available mail providers." };
  } catch (error) {
    console.error("sendMonthlyStatementEmail error:", error);
    return { success: false, error: error.message };
  }
}
