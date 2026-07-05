import { Webhook } from "svix";
import { headers } from "next/headers";
import { inngest } from "@/lib/inngest/client";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  const isDev = process.env.NODE_ENV === "development";

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // If secret is not set and we're in development, bypass signature verification
  if (!WEBHOOK_SECRET) {
    if (isDev) {
      console.log("⚠️ CLERK_WEBHOOK_SECRET is missing. Bypassing verification in development.");
      const eventType = payload.type;
      
      if (eventType === "user.created") {
        await inngest.send({
          name: "clerk/user.created",
          data: payload.data,
        });
      }
      
      return new Response("Bypassed signature check in dev", { status: 200 });
    } else {
      console.error("❌ CLERK_WEBHOOK_SECRET is missing in production.");
      return new Response("Error: Webhook secret not configured", { status: 500 });
    }
  }

  // If headers are missing, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  // Verify signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Verification failed", { status: 400 });
  }

  // Process verified event
  const eventType = evt.type;

  if (eventType === "user.created") {
    await inngest.send({
      name: "clerk/user.created",
      data: evt.data,
    });
  }

  return new Response("Webhook processed", { status: 200 });
}
