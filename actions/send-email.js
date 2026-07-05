"use server";

import { Resend } from "resend";
import { render } from "@react-email/components";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Finance App <onboarding@resend.dev>";

export async function sendEmail({ to, subject, react }) {
  const recipient = process.env.RESEND_EMAIL_TO || to;

  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!recipient) {
    throw new Error("Email recipient is required");
  }

  try {
    const html = react ? await render(react) : undefined;

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

    console.log("Email sent successfully:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
