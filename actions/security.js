"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { inngest } from "@/lib/inngest/client";

// Generate and send a verification OTP
export async function triggerOtpEmail(email) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

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

    return { success: true, otp }; // Return OTP for direct verification in the UI
  } catch (error) {
    console.error("Error triggering OTP:", error);
    return { success: false, error: error.message };
  }
}

// Trigger test email alerts (Budget or Monthly Report)
export async function triggerTestAlertEmail(alertType) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

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
