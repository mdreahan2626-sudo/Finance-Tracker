import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SettingsClient from "@/components/settings-client";

export const metadata = {
  title: "Settings - Welth",
  description: "Manage your preferences, security alerts, and system theme settings.",
};

export default async function SettingsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
  const email = user.emailAddresses?.[0]?.emailAddress || "";

  return <SettingsClient userEmail={email} userName={name} />;
}
