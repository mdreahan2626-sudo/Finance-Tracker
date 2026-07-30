import { redirect } from "next/navigation";
import SettingsClient from "@/components/settings-client";
import { checkUser } from "@/lib/checkUser";

export const metadata = {
  title: "Settings - Welth",
  description: "Manage your preferences, security alerts, and system theme settings.",
};

export default async function SettingsPage() {
  const user = await checkUser();

  if (!user) {
    redirect("/api/auth/signin");
  }

  return <SettingsClient userEmail={user.email} userName={user.name || "User"} />;
}
