"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import AuthModal from "@/components/auth-modal";

// Lazy load 3D WebGL Spline scene to keep main thread sub-50ms fast
const SplineContainer = dynamic(() => import("@/components/spline-container"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-slate-950 text-slate-50">
      
      {/* 3D Spline Scene Background Layer (pointer-events-none so clicks pass through) */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-none">
        <SplineContainer sceneUrl="https://prod.spline.design/r-QmtDwl63eBL8sv/scene.splinecode" />
      </div>

      {/* Dark Ambient Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950 z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Foreground Hero Content Layer */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-blue-400 text-xs sm:text-sm font-medium backdrop-blur-xl shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>Next-Gen AI Wealth Intelligence</span>
            <Badge className="bg-blue-600 text-white text-[10px] uppercase font-bold ml-1 px-2 py-0.5">
              v2.0 3D
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] drop-shadow-2xl">
            Manage Your Finances <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-emerald-400">
              with Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
            Master your cash flow, automate receipt scanning with AI, set smart budget limits, and track investments with real-time 3D analytics.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <AuthModal defaultTab="register">
              <Button size="lg" className="h-14 px-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold shadow-xl shadow-blue-500/25 transition-all duration-300 flex items-center gap-2 text-lg active:scale-95">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </AuthModal>
            <Link href="#features">
              <Button size="lg" variant="outline" className="h-14 px-9 rounded-2xl border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold backdrop-blur-xl text-lg shadow-lg">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Floating Live Metric Overlay Glass Badge */}
          <div className="pt-6 flex justify-center">
            <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-base">
                  +$
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Total Net Worth Tracked</div>
                  <div className="text-base sm:text-xl font-black text-slate-100">$128,450.00</div>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 hidden sm:inline-flex">
                +14.2% this month
              </Badge>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="pt-10 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Bank-Grade Encryption</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Real-Time Insights</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-400 font-medium">AI Receipt OCR</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}