"use server";

import { Resend } from "resend";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Welth Finance <onboarding@resend.dev>";

export async function sendEmail({ to, subject, react }) {
  const recipient = to || process.env.RESEND_EMAIL_TO;

  if (!recipient) {
    throw new Error("Email recipient is required");
  }

  try {
    const html = react ? await render(react) : undefined;

    // OPTION 1: GMAIL SMTP (NO CUSTOM DOMAIN NEEDED - DELIVERS TO ANY RECIPIENT)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: `Welth Finance <${process.env.GMAIL_USER}>`,
        to: recipient,
        subject,
        html,
      });

      console.log(`Gmail SMTP email sent successfully to ${recipient}:`, info.messageId);
      return { success: true, data: { id: info.messageId } };
    }

    // OPTION 2: RESEND API FALLBACK
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY or GMAIL_USER credentials are not configured");
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: recipient,
      subject,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error(error.message);
    }

    console.log(`Resend Email sent successfully to ${recipient}:`, data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
