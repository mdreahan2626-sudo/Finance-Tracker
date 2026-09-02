"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  CreditCard,
  Orbit,
  CheckCircle2
} from "lucide-react";
import AuthModal from "@/components/auth-modal";
import Card3D from "@/components/card-3d";
import GyroscopicWealthOrb from "@/components/gyroscopic-wealth-orb";
import FinanceParticleCanvas from "@/components/finance-particle-canvas";

export default function HeroSection() {
  const [activeView, setActiveView] = useState("orb"); // "orb" or "card"

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200/80">
      
      {/* 3D Finance Currency Particle Mesh Canvas (Light Tinted Glyphs) */}
      <FinanceParticleCanvas />

      {/* Light Aurora Wave Glow Bands */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-100/60 via-teal-100/40 to-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[450px] bg-gradient-to-br from-blue-100/50 via-indigo-100/30 to-amber-100/30 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            
            {/* Live Financial Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-emerald-700 text-xs sm:text-sm font-semibold backdrop-blur-xl">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Next-Gen Institutional Wealth Intelligence</span>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px] uppercase font-bold ml-1 px-2 py-0.5">
                3D Live Core
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-slate-950">
              Master Capital. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600">
                Automate Wealth.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Institutional-grade cash flow analytics, continuous 3D portfolio simulations, AI-powered receipt scanning, and automated multi-account reconciliation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <AuthModal defaultTab="register">
                <Button size="lg" className="h-13 sm:h-14 px-8 sm:px-10 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black shadow-xl shadow-emerald-600/20 transition-all duration-300 flex items-center gap-2 text-base sm:text-lg active:scale-95">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Button>
              </AuthModal>
              <Link href="#simulator">
                <Button size="lg" variant="outline" className="h-13 sm:h-14 px-8 rounded-2xl border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base sm:text-lg shadow-sm">
                  3D Wealth Simulator
                </Button>
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-slate-600 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">256-Bit Hardware Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800">Sub-15ms Real-Time Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-slate-800">Autonomous Gemini OCR</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Gyroscopic Wealth Matrix / 3D Platinum Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* View Switcher Bar */}
            <div className="mb-4 inline-flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-md z-20">
              <button
                onClick={() => setActiveView("orb")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeView === "orb"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Orbit className="w-3.5 h-3.5" /> 3D Gyroscopic Orb
              </button>
              <button
                onClick={() => setActiveView("card")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeView === "card"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" /> 3D Platinum Card
              </button>
            </div>

            {/* Active 3D Showcase Component */}
            <div className="w-full relative z-10 transition-all duration-500">
              {activeView === "orb" ? (
                <GyroscopicWealthOrb />
              ) : (
                <Card3D balance={128450.00} />
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
