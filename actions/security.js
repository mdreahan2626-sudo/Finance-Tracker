"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prisma";
import { inngest } from "@/lib/inngest/client";
import { checkUser } from "@/lib/checkUser";

// Generate and send a verification OTP
export async function triggerOtpEmail(email) {
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

    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Dispatch event to Inngest to send email asynchronously
    await inngest.send({
      name: "app/otp.send",
      data: {
        email: email || user.email,
        otp,
        userName: user.name || "User",
      },
    });

    return { success: true, otp };
  } catch (error) {
    console.error("Error triggering OTP:", error);
    return { success: false, error: error.message };
  }
}

// Trigger test email alerts (Budget or Monthly Report)
export async function triggerTestAlertEmail(alertType) {
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

    // Dispatch event to Inngest to send alert email asynchronously
    await inngest.send({
      name: "app/alert.send",
      data: {
        email: user.email,
        alertType,
        userName: user.name || "User",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error triggering test alert:", error);
    return { success: false, error: error.message };
  }
}
