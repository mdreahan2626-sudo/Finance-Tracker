const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");
require("dotenv").config();

const db = new PrismaClient();
const RECIPIENT_EMAIL = "mdreahan2626@gmail.com";

async function runSeedAndEmailTest() {
  console.log(`🚀 Seeding Dummy Data & Dispatching Gmail Confirmation Emails for: ${RECIPIENT_EMAIL}`);

  try {
    // 1. Ensure user exists in Prisma DB
    let user = await db.user.findUnique({
      where: { email: RECIPIENT_EMAIL },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          email: RECIPIENT_EMAIL,
          name: "Md Reahan",
          imageUrl: "",
        },
      });
      console.log("✅ Created User in DB:", user.id);
    } else {
      console.log("✅ Found User in DB:", user.id);
    }

    // 2. Ensure account exists for user
    let account = await db.account.findFirst({
      where: { userId: user.id },
    });

    if (!account) {
      account = await db.account.create({
        data: {
          name: "Main Savings Account",
          type: "SAVINGS",
          balance: 18450.00,
          userId: user.id,
          isDefault: true,
        },
      });
      console.log("✅ Created Account in DB:", account.id);
    } else {
      console.log("✅ Found Account in DB:", account.id);
    }

    // 3. Insert fresh dummy transaction
    const sampleTx = await db.transaction.create({
      data: {
        id: crypto.randomUUID(),
        type: "EXPENSE",
        amount: 340.00,
        description: "AWS Cloud Infrastructure & Server Quotas",
        category: "utilities",
        date: new Date(),
        status: "COMPLETED",
        userId: user.id,
        accountId: account.id,
      },
    });
    console.log("✅ Seeded transaction in Prisma DB:", sampleTx.id);

    // Setup Gmail Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 4. Send Transaction Confirmation Email to mdreahan2626@gmail.com via Gmail SMTP
    console.log(`📧 Dispatching Transaction Confirmation Email via Gmail SMTP to ${RECIPIENT_EMAIL}...`);
    const txEmail = await transporter.sendMail({
      from: `Welth Finance <${process.env.GMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `Welth Transaction Confirmation: -$${sampleTx.amount} (${sampleTx.category})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; max-width: 520px; margin: 0 auto; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: 800;">Welth Financial Alert 💳</h1>
            <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Transaction Confirmation Notice</p>
          </div>
          <p style="color: #334155; font-size: 15px;">Hello <strong>Md Reahan</strong>,</p>
          <p style="color: #475569; font-size: 14px;">A new transaction has been logged on your account (<strong>${RECIPIENT_EMAIL}</strong>):</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 18px; border-radius: 12px; margin: 20px 0;">
            <table style="width: 100%; font-size: 14px; color: #334155;">
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Type:</strong></td>
                <td style="padding: 6px 0; text-align: right;"><span style="color: #ef4444; font-weight: bold; background: #fee2e2; padding: 2px 8px; border-radius: 4px;">EXPENSE</span></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Amount:</strong></td>
                <td style="padding: 6px 0; text-align: right; font-weight: bold; font-size: 16px; color: #0f172a;">$340.00</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Category:</strong></td>
                <td style="padding: 6px 0; text-align: right;">utilities</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Details:</strong></td>
                <td style="padding: 6px 0; text-align: right;">AWS Cloud Infrastructure</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Date:</strong></td>
                <td style="padding: 6px 0; text-align: right;">${new Date().toLocaleDateString()}</td>
              </tr>
            </table>
          </div>
          <p style="color: #94a3b8; font-size: 12px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px; margin: 0;">Automated confirmation notice from Welth Finance Cockpit.</p>
        </div>
      `,
    });
    console.log("✅ SUCCESS! Transaction Confirmation Email Delivered! Message ID:", txEmail.messageId);

    // 5. Send Monthly Expense Summary Email to mdreahan2626@gmail.com via Gmail SMTP
    console.log(`📧 Dispatching Monthly Expense Summary Email via Gmail SMTP to ${RECIPIENT_EMAIL}...`);
    const summaryEmail = await transporter.sendMail({
      from: `Welth Finance <${process.env.GMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `Your Monthly Financial & Expense Summary Report 📊`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; border: 1px solid #cbd5e1; border-radius: 16px; max-width: 550px; margin: 0 auto; background-color: #ffffff;">
          <h1 style="color: #0f172a; margin-top: 0; font-size: 24px; font-weight: 800;">Monthly Expense Report 📊</h1>
          <p style="color: #64748b; font-size: 14px;">Summary for <strong>${RECIPIENT_EMAIL}</strong> - July 2026</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 14px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; width: 48%;">
                <div style="font-size: 12px; color: #166534; font-weight: 600;">Total Income</div>
                <div style="font-size: 22px; font-weight: bold; color: #15803d; margin-top: 4px;">+$7,200.00</div>
              </td>
              <td style="width: 4%;"></td>
              <td style="padding: 14px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 10px; width: 48%;">
                <div style="font-size: 12px; color: #9f1239; font-weight: 600;">Total Expenses</div>
                <div style="font-size: 22px; font-weight: bold; color: #be123c; margin-top: 4px;">-$3,140.00</div>
              </td>
            </tr>
          </table>

          <div style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 18px;">
            <p style="margin: 0; font-size: 14px; color: #334155;"><strong>Net Monthly Savings:</strong> <span style="color: #10b981; font-weight: bold;">+$4,060.00</span> (56.4% Savings Rate)</p>
          </div>

          <h3 style="color: #1e293b; font-size: 16px; margin-bottom: 10px;">Welth AI Insights:</h3>
          <ul style="color: #475569; font-size: 14px; padding-left: 20px; margin: 0; line-height: 1.6;">
            <li>Housing, utilities, and cloud subscriptions represented your top spending categories.</li>
            <li>Your monthly savings rate is 56.4% — far exceeding standard benchmark targets.</li>
            <li>Your accounts are connected with bank-grade encryption.</li>
          </ul>
        </div>
      `,
    });
    console.log("✅ SUCCESS! Summary Report Email Delivered! Message ID:", summaryEmail.messageId);

  } catch (err) {
    console.error("❌ Test error:", err);
  } finally {
    await db.$disconnect();
  }
}

runSeedAndEmailTest();
