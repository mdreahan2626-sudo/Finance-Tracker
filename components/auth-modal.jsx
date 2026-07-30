"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, ArrowRight, UserPlus, LogIn } from "lucide-react";
import Image from "next/image";

export default function AuthModal({ children, defaultTab = "login" }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(defaultTab);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard", prompt: "select_account" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] border border-slate-800 bg-slate-950/95 backdrop-blur-2xl text-slate-100 rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="space-y-3 text-center items-center">
          <Image
            src="/logo.png"
            alt="Welth Logo"
            width={160}
            height={48}
            className="h-10 w-auto object-contain dark:invert mx-auto"
          />
          
          {/* Tab Selection */}
          <div className="flex w-full p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
                tab === "login"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
                tab === "register"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Create Account
            </button>
          </div>

          <DialogTitle className="text-xl font-black text-white pt-1">
            {tab === "login" ? "Welcome Back to Welth" : "Create Your Free Account"}
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-xs leading-relaxed">
            {tab === "login"
              ? "Access your AI wealth cockpit, live multi-account balances, and receipt logs."
              : "Start tracking your assets, automated receipt OCR, and smart budget goals."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Google Sign-In Action Button */}
          <Button
            size="lg"
            onClick={handleGoogleSignIn}
            className="w-full h-14 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black flex items-center justify-center gap-3 text-base shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <ArrowRight className="w-4 h-4 text-slate-600" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Select any Google account available on your device</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
