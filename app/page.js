"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/hero";
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
  Receipt, 
  Bot, 
  RotateCcw,
  UploadCloud,
  CheckCircle2,
  FileSearch,
  Play,
  Check,
  Shield,
  CreditCard,
  Target,
  BarChart2,
  Lock,
  Layers,
  Zap
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

  // AI Receipt Scanner States
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

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

  const triggerScan = () => {
    setScanning(true);
    setScannedResult(null);
    setTimeout(() => {
      setScanning(false);
      setScannedResult({
        merchant: "Apple Store Infinite Loop",
        date: "2026-07-04",
        amount: "1,299.00",
        tax: "103.92",
        category: "hardware",
        confidence: "99.8%"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* 0. Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* 1. Hero Section (With Background 3D Spline Canvas) */}
      <HeroSection />

      {/* 2. Live Stats Bar with Animated Count-Up Numbers (Odd: Slide Left) */}
      <AnimatedSection direction="left">
        <section className="py-14 bg-slate-900/80 border-y border-slate-800/80 backdrop-blur-xl">
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

      {/* 3. Dashboard Showcase (Even: Slide Right) */}
      <AnimatedSection direction="right" className="py-24">
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> High-Performance Cockpit
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Institutional-Grade Financial Visibility
            </h2>
            <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
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

              {/* Recent Ledger List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Real-Time Transactions</h4>
                  <span className="text-xs text-blue-400 font-semibold cursor-pointer hover:underline">View Full Ledger</span>
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

      {/* 4. Offset Zig-Zag Features Section */}
      <section id="features" className="py-24 bg-slate-900/40 border-t border-slate-800/80">
        <div className="container mx-auto px-4 space-y-28">
          
          {/* Zig-Zag Feature 1: Left Interactive Sandbox + Right Text */}
          <AnimatedSection direction="left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6 shadow-2xl">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" /> Real-Time Live Controls
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Test our live ledger simulation engine right here. Click to inject simulated income yields or log spending entries.
                  </p>
                  <div className="space-y-3">
                    <Button onClick={simulateIncome} className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/20">
                      <TrendingUp className="w-4 h-4" /> Inject +$4,500 Dividend Deposit
                    </Button>
                    <Button onClick={simulateExpense} variant="outline" className="w-full h-12 rounded-xl border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold flex items-center justify-center gap-2 text-sm">
                      <TrendingDown className="w-4 h-4 text-rose-400" /> Log -$380 Software Expense
                    </Button>
                    <Button onClick={resetSimulator} variant="ghost" className="w-full h-10 rounded-xl text-slate-400 hover:text-white flex items-center justify-center gap-2 text-xs">
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Sandbox Values
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <Zap className="w-3.5 h-3.5" /> Feature 01 • Instant Sync
                </div>
                <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Instant Ledger Synchronization
                </h3>
                <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
                  Every deposit, trade, and bill payment updates your net worth metrics synchronously across all connected devices with zero latency.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Zig-Zag Feature 2: Right OCR Mockup + Left Text */}
          <AnimatedSection direction="right">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6 order-last lg:order-first">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
                  <Bot className="w-3.5 h-3.5" /> Feature 02 • AI Reasoning
                </div>
                <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Automated Gemini Vision OCR
                </h3>
                <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
                  Never manually input invoice line items again. Capture a photo of any receipt, and our Gemini Vision engine categorizes vendor, tax, and totals in seconds.
                </p>
              </div>

              <div className="lg:col-span-6">
                <Card className="border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl text-slate-100 overflow-hidden">
                  <CardHeader className="bg-slate-950 p-5 border-b border-slate-800">
                    <CardTitle className="text-base font-bold flex items-center gap-2 text-white">
                      <Receipt className="w-4.5 h-4.5 text-blue-400" /> AI Receipt OCR Engine
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                      <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 border border-dashed border-slate-700 rounded-2xl bg-slate-950/60 text-center space-y-3 min-h-[190px]">
                        {scanning ? (
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                            <span className="text-xs text-slate-300">Gemini parsing...</span>
                          </div>
                        ) : scannedResult ? (
                          <div className="flex flex-col items-center space-y-2">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
                            <span className="text-xs font-bold text-white">Metadata Extracted</span>
                            <Button variant="ghost" size="xs" onClick={triggerScan} className="text-[10px] text-blue-400">Scan Again</Button>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-8 h-8 text-blue-400" />
                            <div className="text-xs font-bold text-white">Upload Receipt Image</div>
                            <Button size="sm" onClick={triggerScan} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl">
                              <Play className="w-3 h-3 fill-current mr-1" /> Run Demo OCR
                            </Button>
                          </>
                        )}
                      </div>

                      <div className="sm:col-span-7 space-y-2 text-xs">
                        {scannedResult ? (
                          <div className="space-y-2 border border-slate-800 p-3.5 rounded-xl bg-slate-950/80">
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                              <span className="text-slate-400">Merchant:</span>
                              <span className="font-bold text-white">{scannedResult.merchant}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                              <span className="text-slate-400">Total:</span>
                              <span className="font-bold text-emerald-400">${scannedResult.amount}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                              <span className="text-slate-400">Category:</span>
                              <span className="font-bold text-blue-400 capitalize">{scannedResult.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Confidence:</span>
                              <span className="font-bold text-emerald-400">{scannedResult.confidence}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="border border-slate-800 p-6 rounded-xl bg-slate-950/40 text-center">
                            <FileSearch className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                            <span className="text-xs text-slate-400">Click "Run Demo OCR" to trigger metadata extraction.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* 5. Analytics Deep-Dive Section (Even: Slide Right) */}
      <AnimatedSection direction="right" className="py-24">
        <section className="container mx-auto px-4">
          <AnalyticsShowcase />
        </section>
      </AnimatedSection>

      {/* 6. Testimonials Scroll-Snap Carousel (Odd: Slide Left) */}
      <AnimatedSection direction="left" className="py-24 bg-slate-900/40 border-t border-slate-800/80">
        <section id="testimonials" className="container mx-auto px-4">
          <TestimonialsCarousel />
        </section>
      </AnimatedSection>

      {/* 7. Final Full-Bleed Call to Action (Slide Up) */}
      <AnimatedSection direction="up" className="py-24">
        <section className="container mx-auto px-4">
          <div className="p-12 sm:p-20 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white text-center space-y-8 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4 relative z-10">
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Take Command of Your Net Worth Today
              </h2>
              <p className="text-blue-100 text-lg font-light leading-relaxed">
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