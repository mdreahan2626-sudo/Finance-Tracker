"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard", prompt: "select_account" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative z-50">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/90 backdrop-blur-2xl shadow-2xl rounded-3xl text-slate-100 p-6 text-center space-y-6">
        <CardHeader className="space-y-3">
          <Image
            src="/logo.png"
            alt="Welth Logo"
            width={160}
            height={48}
            className="h-10 w-auto object-contain mx-auto dark:invert"
          />
          <CardTitle className="text-2xl font-black text-white">Welcome to Welth</CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Sign in with your Google account to access your AI financial cockpit
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            size="lg"
            onClick={handleSignIn}
            className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold flex items-center justify-center gap-3 text-base shadow-xl shadow-blue-600/25 transition-all active:scale-95 cursor-pointer"
          >
            <span>Continue with Google</span>
            <ArrowRight className="w-5 h-5" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Select any Google account available on your device</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}