"use client";

import { useState } from "react";
import { useTheme } from "./theme-provider";
import { triggerOtpEmail, triggerTestAlertEmail } from "@/actions/security";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Sun,
  Moon,
  ShieldCheck,
  Mail,
  Bell,
  FileText,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function SettingsClient({ userEmail, userName }) {
  const { theme, setTheme } = useTheme();

  // OTP State
  const [email, setEmail] = useState(userEmail || "");
  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [loadingVerification, setLoadingVerification] = useState(false);

  // Alerts State
  const [loadingBudgetAlert, setLoadingBudgetAlert] = useState(false);
  const [loadingMonthlyReport, setLoadingMonthlyReport] = useState(false);

  const handleToggleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
    toast.success(`Switched to ${checked ? "Dark" : "Light"} mode`);
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoadingOtp(true);
    try {
      const res = await triggerOtpEmail(email);
      if (res.success) {
        setOtpSent(true);
        setGeneratedOtp(res.otp);
        setVerified(false);
        setVerificationCode("");
        toast.success(`OTP sent to ${email} (via Inngest background queue)`);
      } else {
        toast.error(res.error || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("An error occurred while sending OTP");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleVerifyOtp = () => {
    setLoadingVerification(true);
    setTimeout(() => {
      if (verificationCode === generatedOtp) {
        setVerified(true);
        toast.success("Identity verified successfully!");
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
      setLoadingVerification(false);
    }, 800);
  };

  const handleSendBudgetAlert = async () => {
    setLoadingBudgetAlert(true);
    try {
      const res = await triggerTestAlertEmail("budget-alert");
      if (res.success) {
        toast.success("Test Budget Alert triggered! (Processing via Inngest)");
      } else {
        toast.error(res.error || "Failed to trigger budget alert");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoadingBudgetAlert(false);
    }
  };

  const handleSendMonthlyReport = async () => {
    setLoadingMonthlyReport(true);
    try {
      const res = await triggerTestAlertEmail("monthly-report");
      if (res.success) {
        toast.success("Test Monthly Report triggered! (Processing via Inngest)");
      } else {
        toast.error(res.error || "Failed to trigger monthly report");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoadingMonthlyReport(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight gradient-title mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application theme, security OTP alerts, and test background email queues.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Theme Card */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500 dark:hidden" />
              <Moon className="h-5 w-5 text-blue-400 hidden dark:block" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Toggle between Light and Dark themes to customize your viewing experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-sm">Dark Mode</span>
              <span className="text-xs text-muted-foreground">
                Apply dark styling to elements and layouts.
              </span>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleToggleTheme}
              className="data-[state=checked]:bg-blue-600"
            />
          </CardContent>
        </Card>

        {/* Test Alert Emails Card */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              <CardTitle>Alert Notification Queues</CardTitle>
            </div>
            <CardDescription>
              Trigger mock notification emails processed asynchronously by Inngest background jobs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={handleSendBudgetAlert}
                disabled={loadingBudgetAlert}
                className="w-full flex items-center justify-center gap-2 border-gray-200 dark:border-gray-800"
              >
                {loadingBudgetAlert ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Bell className="h-4 w-4" />
                )}
                Trigger Test Budget Alert
              </Button>
              <Button
                variant="outline"
                onClick={handleSendMonthlyReport}
                disabled={loadingMonthlyReport}
                className="w-full flex items-center justify-center gap-2 border-gray-200 dark:border-gray-800"
              >
                {loadingMonthlyReport ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                Trigger Test Monthly Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OTP Panel Card */}
      <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <CardTitle>Identity OTP Verification Alert</CardTitle>
          </div>
          <CardDescription>
            Simulate sending a secure verification code to verify email configuration using Resend + Inngest events.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full space-y-2">
              <label className="text-sm font-medium">Verify Email</label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-200 dark:border-gray-800"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button
              onClick={handleSendOtp}
              disabled={loadingOtp}
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 w-full md:w-auto"
            >
              {loadingOtp ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send OTP Code"
              )}
            </Button>
          </div>

          {otpSent && (
            <div className="border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/10 p-6 rounded-lg space-y-4">
              <div className="space-y-2">
                <span className="font-medium text-sm block">Enter 6-Digit Passcode</span>
                <p className="text-xs text-muted-foreground">
                  A verification email was sent to <strong>{email}</strong>. Check your inbox and enter the passcode below.
                </p>
                <div className="flex flex-col md:flex-row gap-4 items-center mt-2">
                  <Input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full md:w-48 text-center text-lg font-semibold tracking-widest border-gray-200 dark:border-gray-800"
                    disabled={verified}
                  />
                  {!verified ? (
                    <Button
                      onClick={handleVerifyOtp}
                      disabled={loadingVerification || verificationCode.length !== 6}
                      className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-700 w-full md:w-auto"
                    >
                      {loadingVerification ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Verify Code"
                      )}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                      <CheckCircle2 className="h-5 w-5" />
                      Verified!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
