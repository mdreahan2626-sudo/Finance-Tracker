"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ArrowRight, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function AuthModal({ children, defaultTab = "login" }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleOpenChange = (newOpen) => {
    if (newOpen && session) {
      router.push("/dashboard");
      return;
    }
    setOpen(newOpen);
  };

  // Form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
        name: tab === "register" ? name.trim() : undefined,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error || "Authentication failed. Check your credentials.");
      } else if (res?.ok) {
        toast.success(tab === "register" ? "Account created successfully! Welcome to Welth." : "Welcome back!");
        setOpen(false);
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard", prompt: "select_account" });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] border border-slate-200 bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl">
        <DialogHeader className="space-y-3 text-center items-center">
          <Image
            src="/logo.png"
            alt="Welth Logo"
            width={140}
            height={42}
            className="h-8 sm:h-9 w-auto object-contain mx-auto"
          />
          
          {/* Tab Selection */}
          <div className="flex w-full p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                tab === "login"
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                tab === "register"
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Create Account
            </button>
          </div>

          <div>
            <DialogTitle className="text-xl font-black text-slate-950">
              {tab === "login" ? "Welcome Back to Welth" : "Create Your Welth Account"}
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs mt-1">
              {tab === "login"
                ? "Enter your credentials or continue with Google."
                : "Register with your email and password or Google."}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Credentials Form */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-3.5 pt-2">
          {tab === "register" && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Full Name / Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="e.g. Alex Trader"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9 h-11 text-xs rounded-xl border-slate-200 bg-slate-50/80 text-slate-900 focus:bg-white focus:border-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Email or Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="you@domain.com or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 h-11 text-xs rounded-xl border-slate-200 bg-slate-50/80 text-slate-900 focus:bg-white focus:border-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 pr-10 h-11 text-xs rounded-xl border-slate-200 bg-slate-50/80 text-slate-900 focus:bg-white focus:border-emerald-500 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Email/Password Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <span>{tab === "login" ? "Sign In to Cockpit" : "Create Free Account"}</span>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
            <span className="bg-white px-3 text-slate-400">or continue with</span>
          </div>
        </div>

        {/* Google Sign-In Action Button */}
        <div>
          <Button
            type="button"
            size="lg"
            onClick={handleGoogleSignIn}
            className="w-full h-12 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold flex items-center justify-center gap-3 text-xs sm:text-sm shadow-xs border border-slate-200 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-bit encrypted authentication</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
