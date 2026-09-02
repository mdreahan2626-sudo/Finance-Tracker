"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Lock,
  Coins,
  ArrowUpRight
} from "lucide-react";
import AuthModal from "@/components/auth-modal";
import Card3D from "@/components/card-3d";
import FinanceParticleCanvas from "@/components/finance-particle-canvas";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-slate-950 text-slate-50">
      
      {/* 3D Finance Currency Particle Mesh Canvas */}
      <FinanceParticleCanvas />

      {/* Ambient Lighting & Glow Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950 z-0 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            
            {/* Live Financial Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-emerald-400 text-xs sm:text-sm font-medium backdrop-blur-xl shadow-lg shadow-emerald-500/5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Institutional Wealth Intelligence</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] uppercase font-bold ml-1 px-2 py-0.5">
                v3.0 3D
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] drop-shadow-2xl">
              Master Capital. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-blue-400">
                Automate Wealth.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light drop-shadow-md">
              Institutional-grade cash flow analytics, AI-powered receipt extraction, automated recurring budgeting, and live 3D portfolio simulations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <AuthModal defaultTab="register">
                <Button size="lg" className="h-13 sm:h-14 px-8 sm:px-10 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black shadow-xl shadow-emerald-500/20 transition-all duration-300 flex items-center gap-2 text-base sm:text-lg active:scale-95">
                  Launch Free Account <ArrowRight className="w-5 h-5" />
                </Button>
              </AuthModal>
              <Link href="#simulator">
                <Button size="lg" variant="outline" className="h-13 sm:h-14 px-8 rounded-2xl border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold backdrop-blur-xl text-base sm:text-lg shadow-lg">
                  3D Simulator
                </Button>
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-slate-300">Bank-Grade 256-Bit</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-slate-300">Live Supabase Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-slate-300">Gemini OCR AI</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Titanium Holographic Card & Floating Financial Badges */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Floating Metric Badge 1: Top Right */}
            <div className="hidden sm:flex absolute -top-4 -right-4 z-20 items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 backdrop-blur-2xl shadow-xl shadow-emerald-500/10 animate-bounce duration-1000">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Dividend Yield</div>
                <div className="font-black text-emerald-400">+$14,500.00</div>
              </div>
            </div>

            {/* 3D Holographic Interactive Card */}
            <div className="w-full relative z-10">
              <Card3D balance={128450.00} />
            </div>

            {/* Floating Metric Badge 2: Bottom Left */}
            <div className="hidden sm:flex absolute -bottom-6 -left-4 z-20 items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-2xl shadow-xl">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Security Shield</div>
                <div className="font-black text-white">0.00% Fraud Risk</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
