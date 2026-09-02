"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/hero";
import MarketTicker from "@/components/market-ticker";
import WealthSimulator3D from "@/components/wealth-simulator-3d";
import BentoGridFinance from "@/components/bento-grid-finance";
import AnimatedSection from "@/components/animated-section";
import AnimatedCounter from "@/components/animated-counter";
import ScrollProgressBar from "@/components/scroll-progress-bar";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import dynamic from "next/dynamic";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  RotateCcw,
  Zap,
  ArrowUpRight
} from "lucide-react";

const AnalyticsShowcase = dynamic(() => import("@/components/analytics-showcase"), {
  ssr: false,
});

export default function LandingPage() {
  // Cash Flow Sandbox Simulator States
  const [balance, setBalance] = useState(128450.00);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "INCOME", amount: 14500.00, description: "Series A Consulting Retainer", category: "Capital", date: "Today, 09:42 AM" },
    { id: 2, type: "EXPENSE", amount: 1250.00, description: "AWS Cloud Infrastructure", category: "DevOps", date: "Yesterday" },
    { id: 3, type: "INCOME", amount: 3200.00, description: "Stripe Recurring Subscription", category: "SaaS", date: "2 days ago" },
  ]);
  const [incomeSimulated, setIncomeSimulated] = useState(0);
  const [expenseSimulated, setExpenseSimulated] = useState(0);

  const simulateIncome = () => {
    const amount = 4500;
    setBalance(prev => prev + amount);
    setIncomeSimulated(prev => prev + amount);
    setTransactions(prev => [
      {
        id: Date.now(),
        type: "INCOME",
        amount,
        description: "Equities Dividend Yield",
        category: "Investments",
        date: "Just now"
      },
      ...prev
    ]);
  };

  const simulateExpense = () => {
    const amount = 380;
    setBalance(prev => prev - amount);
    setExpenseSimulated(prev => prev + amount);
    setTransactions(prev => [
      {
        id: Date.now(),
        type: "EXPENSE",
        amount,
        description: "Figma Enterprise License",
        category: "Software",
        date: "Just now"
      },
      ...prev
    ]);
  };

  const resetSimulator = () => {
    setBalance(128450.00);
    setIncomeSimulated(0);
    setExpenseSimulated(0);
    setTransactions([
      { id: 1, type: "INCOME", amount: 14500.00, description: "Series A Consulting Retainer", category: "Capital", date: "Today, 09:42 AM" },
      { id: 2, type: "EXPENSE", amount: 1250.00, description: "AWS Cloud Infrastructure", category: "DevOps", date: "Yesterday" },
      { id: 3, type: "INCOME", amount: 3200.00, description: "Stripe Recurring Subscription", category: "SaaS", date: "2 days ago" },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* 0. Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* 1. Real-Time Global Market Ticker Bar */}
      <MarketTicker />

      {/* 2. Hero Section (With 3D Titanium Card, Floating Glass Badges & Currency Mesh Canvas) */}
      <HeroSection />

      {/* 3. Live Stats Bar with Animated Count-Up Numbers */}
      <AnimatedSection direction="up">
        <section className="py-14 bg-slate-900/90 border-y border-slate-800/80 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
              
              <div className="text-center px-4 space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  $<AnimatedCounter target={2.4} decimals={1} suffix="B+" />
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Assets Tracked
                </div>
              </div>

              <div className="text-center px-4 pt-4 lg:pt-0 space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  <AnimatedCounter target={48} suffix="k+" />
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Active Portfolios
                </div>
              </div>

              <div className="text-center px-4 pt-4 lg:pt-0 space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-blue-400 tracking-tight">
                  <AnimatedCounter target={99.98} decimals={2} suffix="%" />
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  System Uptime SLA
                </div>
              </div>

              <div className="text-center px-4 pt-4 lg:pt-0 space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight">
                  +<AnimatedCounter target={34.2} decimals={1} suffix="%" />
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Avg Annual Growth
                </div>
              </div>

            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 4. Interactive 3D Wealth Compounding Simulator */}
      <section id="simulator" className="py-24 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up">
            <WealthSimulator3D />
          </AnimatedSection>
        </div>
      </section>

      {/* 5. Institutional Bento Grid (Laser OCR Sweep + Asset Allocation + Budget Sentinel) */}
      <section id="features" className="py-24 bg-slate-900/40 border-t border-slate-800/80">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up">
            <BentoGridFinance />
          </AnimatedSection>
        </div>
      </section>

      {/* 6. Dashboard Showcase & Live Sandbox Simulator */}
      <AnimatedSection direction="up" className="py-24 border-t border-slate-800/80">
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> High-Performance Cockpit
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Institutional-Grade Financial Visibility
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
              Consolidate your multi-account ledgers, liquidity, and investment allocations into one real-time cockpit.
            </p>
          </div>

          <Card className="border border-slate-800 bg-slate-900/80 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-3xl text-slate-100">
            <CardHeader className="bg-slate-950/80 border-b border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold flex items-center gap-2.5 text-white">
                  <DollarSign className="w-5 h-5 text-emerald-400" /> Wealth Ledger Cockpit
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">Live multi-account balance stream</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1">
                  Active Sync • 12ms
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-8">
              {/* Top Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-1.5 shadow-lg">
                  <div className="text-xs uppercase font-bold text-slate-400">Total Net Liquidity</div>
                  <div className="text-2xl sm:text-3xl font-black text-white">${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="p-5 rounded-2xl border border-emerald-900/40 bg-emerald-950/20 space-y-1.5 shadow-lg">
                  <div className="text-xs uppercase font-bold text-emerald-400">Simulated Deposits</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">+${incomeSimulated.toLocaleString("en-US")}</div>
                </div>
                <div className="p-5 rounded-2xl border border-rose-900/40 bg-rose-950/20 space-y-1.5 shadow-lg">
                  <div className="text-xs uppercase font-bold text-rose-400">Simulated Expenses</div>
                  <div className="text-2xl sm:text-3xl font-black text-rose-400">-${expenseSimulated.toLocaleString("en-US")}</div>
                </div>
              </div>

              {/* Interactive Simulation Action Buttons */}
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Interactive Cash Flow Injector</span>
                  <Button onClick={resetSimulator} variant="ghost" size="xs" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button onClick={simulateIncome} className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 text-xs shadow-lg shadow-emerald-600/20">
                    <TrendingUp className="w-4 h-4" /> Inject +$4,500 Dividend Deposit
                  </Button>
                  <Button onClick={simulateExpense} variant="outline" className="h-11 rounded-xl border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold flex items-center justify-center gap-2 text-xs">
                    <TrendingDown className="w-4 h-4 text-rose-400" /> Log -$380 Software Expense
                  </Button>
                </div>
              </div>

              {/* Recent Ledger List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Real-Time Transactions</h4>
                  <span className="text-xs text-emerald-400 font-semibold cursor-pointer hover:underline">View Full Ledger</span>
                </div>
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-800/80 bg-slate-950/50 hover:bg-slate-950 transition-all duration-200">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          t.type === "INCOME" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                        }`}>
                          {t.type === "INCOME" ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{t.description}</div>
                          <div className="text-xs text-slate-400">{t.category} • {t.date}</div>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${
                        t.type === "INCOME" ? "text-emerald-400" : "text-rose-400"
                      }`}>
                        {t.type === "INCOME" ? "+" : "-"}${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </AnimatedSection>

      {/* 7. Analytics Deep-Dive Section */}
      <AnimatedSection direction="up" className="py-24 bg-slate-900/40 border-t border-slate-800/80">
        <section className="container mx-auto px-4">
          <AnalyticsShowcase />
        </section>
      </AnimatedSection>

      {/* 8. Testimonials Scroll-Snap Carousel */}
      <AnimatedSection direction="up" className="py-24 border-t border-slate-800/80">
        <section id="testimonials" className="container mx-auto px-4">
          <TestimonialsCarousel />
        </section>
      </AnimatedSection>

      {/* 9. Final Full-Bleed Call to Action */}
      <AnimatedSection direction="up" className="py-24">
        <section className="container mx-auto px-4">
          <div className="p-12 sm:p-20 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white text-center space-y-8 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4 relative z-10">
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Take Command of Your Wealth Today
              </h2>
              <p className="text-emerald-50 text-base sm:text-lg font-light leading-relaxed">
                Join thousands of founders, investors, and wealth managers managing their capital with Welth AI.
              </p>
            </div>

            <div className="pt-2 relative z-10">
              <Link href="/dashboard">
                <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all">
                  Start Free Trial Today <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}
