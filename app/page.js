"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { 
  statsData, 
  featuresData, 
  howItWorksData, 
  testimonialsData 
} from "@/data/landing";
import HeroSection from "@/components/hero";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Receipt, 
  Bot, 
  Plus,
  Play,
  RotateCcw,
  UploadCloud,
  CheckCircle2,
  FileSearch
} from "lucide-react";

export default function LandingPage() {
  // Cash Flow Simulator States
  const [balance, setBalance] = useState(4250.00);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "INCOME", amount: 2500, description: "Monthly Consulting Fee", category: "Salary", date: "Today" },
    { id: 2, type: "EXPENSE", amount: 150, description: "Weekly Grocery Run", category: "Groceries", date: "Yesterday" }
  ]);
  const [incomeSimulated, setIncomeSimulated] = useState(0);
  const [expenseSimulated, setExpenseSimulated] = useState(0);

  // Receipt Scanner Simulator States
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

  const simulateIncome = () => {
    const amount = 3500;
    setBalance(prev => prev + amount);
    setIncomeSimulated(prev => prev + amount);
    setTransactions(prev => [
      {
        id: Date.now(),
        type: "INCOME",
        amount,
        description: "Freelance Project Deposit",
        category: "Freelance",
        date: "Just now"
      },
      ...prev
    ]);
  };

  const simulateExpense = () => {
    const amount = 120;
    setBalance(prev => prev - amount);
    setExpenseSimulated(prev => prev + amount);
    setTransactions(prev => [
      {
        id: Date.now(),
        type: "EXPENSE",
        amount,
        description: "Dinner with Clients",
        category: "Food",
        date: "Just now"
      },
      ...prev
    ]);
  };

  const resetSimulator = () => {
    setBalance(4250.00);
    setIncomeSimulated(0);
    setExpenseSimulated(0);
    setTransactions([
      { id: 1, type: "INCOME", amount: 2500, description: "Monthly Consulting Fee", category: "Salary", date: "Today" },
      { id: 2, type: "EXPENSE", amount: 150, description: "Weekly Grocery Run", category: "Groceries", date: "Yesterday" }
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
        category: "electronics",
        confidence: "99.4%"
      });
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-blue-50/40 dark:bg-gray-950/20 border-y border-blue-100 dark:border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Showcase Section */}
      <section className="py-24 container mx-auto px-4 space-y-24">
        
        {/* Interactive Cash Flow Cockpit Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-900/30">
              <Sparkles className="h-3 w-3" /> Live Sandbox
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Test-Drive Your Financial Dashboard
            </h2>
            <p className="text-muted-foreground text-base">
              Try adding sample income deposits or logging spending. See how account balances, cash flow metrics, and transaction history cards sync automatically in real-time.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={simulateIncome} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Deposit +$3,500
              </Button>
              <Button onClick={simulateExpense} variant="outline" className="border-gray-250 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold flex items-center gap-2">
                <TrendingDown className="h-4 w-4" /> Spend -$120
              </Button>
              <Button onClick={resetSimulator} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden bg-white/50 dark:bg-gray-950/50 backdrop-blur-md">
              <CardHeader className="bg-gray-50/50 dark:bg-gray-900/50 border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <DollarSign className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" /> Cockpit Simulator
                    </CardTitle>
                    <CardDescription className="text-xs">Interactive sandbox metrics</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 bg-blue-50/20 text-[10px]">
                    Interactive Demo
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Simulator Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="p-3 border bg-card">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Total Balance</div>
                    <div className="text-xl font-black mt-1 text-foreground">${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
                  </Card>
                  <Card className="p-3 border bg-card">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Simulated Income</div>
                    <div className="text-xl font-black mt-1 text-green-600">+${incomeSimulated.toLocaleString("en-US")}</div>
                  </Card>
                  <Card className="p-3 border bg-card">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Simulated Expenses</div>
                    <div className="text-xl font-black mt-1 text-red-600">-${expenseSimulated.toLocaleString("en-US")}</div>
                  </Card>
                </div>

                {/* Simulated Transactions List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent Transactions</h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {transactions.map((t) => (
                      <div key={t.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-card/60 transition-all hover:bg-card">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            t.type === "INCOME" ? "bg-green-50 dark:bg-green-950/20 text-green-600" : "bg-red-50 dark:bg-red-950/20 text-red-600"
                          }`}>
                            {t.type === "INCOME" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold">{t.description}</div>
                            <div className="text-[10px] text-muted-foreground">{t.category} • {t.date}</div>
                          </div>
                        </div>
                        <span className={`text-xs font-bold ${
                          t.type === "INCOME" ? "text-green-600" : "text-red-600"
                        }`}>
                          {t.type === "INCOME" ? "+" : "-"}${t.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live AI Receipt Scanner Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          <div className="lg:col-span-7 order-last lg:order-first">
            <Card className="border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden bg-white/50 dark:bg-gray-950/50 backdrop-blur-md">
              <CardHeader className="bg-gray-50/50 dark:bg-gray-900/50 border-b pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Receipt className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" /> AI Vision Engine (Gemini 2.5)
                </CardTitle>
                <CardDescription className="text-xs">Extracting metadata using generative vision OCR</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left: Scan Upload Widget */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 border border-dashed rounded-xl bg-card text-center space-y-3 min-h-48">
                    {scanning ? (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                        <span className="text-xs font-bold text-muted-foreground">Gemini scanning...</span>
                      </div>
                    ) : scannedResult ? (
                      <div className="flex flex-col items-center space-y-2">
                        <CheckCircle2 className="h-8 w-8 text-green-500 animate-bounce" />
                        <span className="text-xs font-bold">Receipt Processed</span>
                        <Button variant="ghost" size="xs" onClick={triggerScan} className="text-[10px] text-blue-600">Scan Again</Button>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="h-8 w-8 text-muted-foreground" />
                        <div className="space-y-1">
                          <div className="text-xs font-bold">Upload a Receipt</div>
                          <div className="text-[10px] text-muted-foreground">JPEG, PNG up to 5MB</div>
                        </div>
                        <Button size="sm" onClick={triggerScan} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5">
                          <Play className="h-3 w-3 fill-current" /> Demo Scan
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Right: Extracted JSON fields */}
                  <div className="md:col-span-7 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Extracted Metadata</h4>
                    {scannedResult ? (
                      <div className="space-y-2 border p-3 rounded-lg bg-card text-xs">
                        <div className="grid grid-cols-3 py-1 border-b">
                          <span className="text-muted-foreground">Merchant:</span>
                          <span className="col-span-2 font-bold text-right">{scannedResult.merchant}</span>
                        </div>
                        <div className="grid grid-cols-3 py-1 border-b">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="col-span-2 font-bold text-right">{scannedResult.date}</span>
                        </div>
                        <div className="grid grid-cols-3 py-1 border-b">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="col-span-2 font-bold text-green-600 text-right">${scannedResult.amount}</span>
                        </div>
                        <div className="grid grid-cols-3 py-1 border-b">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="col-span-2 font-bold capitalize text-right">{scannedResult.category}</span>
                        </div>
                        <div className="grid grid-cols-3 py-1">
                          <span className="text-muted-foreground">Confidence:</span>
                          <span className="col-span-2 font-bold text-blue-600 text-right">{scannedResult.confidence}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center border p-8 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 text-center min-h-[178px]">
                        <FileSearch className="h-6 w-6 text-muted-foreground/60 mb-2" />
                        <span className="text-xs text-muted-foreground">Trigger "Demo Scan" to see Gemini Vision in action.</span>
                      </div>
                    )}
                  </div>

                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-900/30">
              <Bot className="h-3 w-3" /> Smart Intelligence
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              AI-Powered Automated OCR
            </h2>
            <p className="text-muted-foreground text-base">
              Eliminate manual data entries. Take a photo of any grocery bill or retail invoice, and our Gemini Vision engine reads, processes, and catalogs it automatically in seconds.
            </p>
            <div className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs shrink-0 font-bold">AI</div>
              <p className="text-xs text-muted-foreground leading-normal">
                Supported by the newly integrated Gemini API key for instant image reasoning in Next.js Server Actions.
              </p>
            </div>
          </div>
        </div>

        {/* Onboarding Features Portal Banner */}
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold">
              <Sparkles className="h-3 w-3" /> Explore Interactive Features
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Ready to Explore Our Financial Cockpit?
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              We have compiled a directory of all available analytical tools, receipt scanners, and budget systems. Click below to view all options and get started.
            </p>
          </div>
          <Link href="/features">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold shrink-0 shadow-md flex items-center gap-2 active:scale-95 transition-all">
              View All Features <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

      </section>

      {/* Features Showcase */}
      <section id="features" className="py-20 bg-gray-50/50 dark:bg-gray-950/20 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card className="p-6 border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md hover:shadow-md transition-all duration-300" key={index}>
                <CardContent className="space-y-4 pt-4">
                  <div className="text-blue-600 dark:text-blue-400">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-6 border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md">
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-650 dark:bg-blue-950/30 border-t border-blue-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter with Welth
          </p>
          <Link href="/features">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 animate-bounce font-bold shadow-md"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}