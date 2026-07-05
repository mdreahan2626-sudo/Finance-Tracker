import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.RESEND_EMAIL_TO || "mdrehan98178@gmail.com";

  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY is missing from environment variables" });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Finance App <onboarding@resend.dev>",
      to: recipient,
      subject: "Next.js App Test",
      html: `<p>Testing Resend directly from the Next.js app environment. Recipient: ${recipient}</p>`,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        recipient,
        error: error.message,
        details: error,
      });
    }

    return NextResponse.json({
      success: true,
      recipient,
      messageId: data?.id,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      recipient,
      error: error.message,
      stack: error.stack,
    });
  }
}
