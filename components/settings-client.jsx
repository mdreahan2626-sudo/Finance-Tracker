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
  Sparkles,
  Lock
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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 md:px-8 relative overflow-hidden">
      {/* Soft Ambient Light Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> System Controls
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">Settings & Security</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Manage your interface appearance, two-factor OTP security, and trigger automated Inngest test queues.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Theme Card */}
          <Card className="border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xs rounded-3xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-base font-black text-slate-950">Interface Appearance</CardTitle>
              </div>
              <CardDescription className="text-xs text-slate-500">
                Toggle between Light and Dark themes to customize your viewing experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between pt-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-slate-900">Dark Mode</span>
                <span className="text-xs text-slate-500">
                  Switch to dark palette across cards and charts.
                </span>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={handleToggleTheme}
                className="data-[state=checked]:bg-emerald-600"
              />
            </CardContent>
          </Card>

          {/* Test Alert Emails Card */}
          <Card className="border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xs rounded-3xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base font-black text-slate-950">Automated Email Queues</CardTitle>
              </div>
              <CardDescription className="text-xs text-slate-500">
                Trigger mock notification emails processed asynchronously by Inngest background runners.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              <Button
                variant="outline"
                onClick={handleSendBudgetAlert}
                disabled={loadingBudgetAlert}
                className="w-full h-10 rounded-xl flex items-center justify-center gap-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold"
              >
                {loadingBudgetAlert ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Bell className="h-4 w-4 text-amber-600" />
                )}
                Trigger Test Budget Alert
              </Button>
              <Button
                variant="outline"
                onClick={handleSendMonthlyReport}
                disabled={loadingMonthlyReport}
                className="w-full h-10 rounded-xl flex items-center justify-center gap-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold"
              >
                {loadingMonthlyReport ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4 text-emerald-600" />
                )}
                Trigger Test Monthly Digest
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* OTP Security Verification Card */}
        <Card className="border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xs rounded-3xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <CardTitle className="text-base font-black text-slate-950">2FA OTP Identity Security</CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Verify your email identity with cryptographic one-time password security tokens dispatched via Inngest and Resend.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-slate-50 border-slate-300 rounded-xl text-sm"
              />
              <Button
                onClick={handleSendOtp}
                disabled={loadingOtp}
                className="h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xs shrink-0"
              >
                {loadingOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send 6-Digit OTP"}
              </Button>
            </div>

            {otpSent && (
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="flex justify-between items-center text-xs text-emerald-800 font-bold">
                  <span>Enter the code sent to {email}:</span>
                  {generatedOtp && (
                    <span className="font-mono text-[10px] text-emerald-600">Dev Mock: {generatedOtp}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="h-10 bg-white border-emerald-300 rounded-xl font-mono tracking-widest text-center text-base"
                    maxLength={6}
                  />
                  <Button
                    onClick={handleVerifyOtp}
                    disabled={loadingVerification}
                    className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    {loadingVerification ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify Code"}
                  </Button>
                </div>
                {verified && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 pt-1">
                    <CheckCircle2 className="w-4 h-4" /> Identity Verified Successfully!
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
