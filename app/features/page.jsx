"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Sparkles, 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  CreditCard, 
  Settings, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  TrendingUp
} from "lucide-react";

const APP_FEATURES = [
  {
    id: "dashboard",
    title: "Financial Cockpit (Dashboard)",
    description: "Your main command center displaying aggregated balances, monthly spending, and real-time transaction logs.",
    longDescription: "An all-in-one financial dashboard showcasing cash flow alerts, monthly expenses, account list grids, and visual budget progress trackers.",
    icon: <LayoutDashboard className="h-6 w-6 text-emerald-600" />,
    cta: "Explore Cockpit",
    color: "from-emerald-50 via-teal-50/40 to-transparent border-emerald-200"
  },
  {
    id: "transaction",
    title: "Log a Transaction (New Entry)",
    description: "Record manually custom income fees, salary deposits, restaurant receipts, or daily groceries.",
    longDescription: "Quick input form designed with validation, customizable categories, recurring intervals, and receipt attachment placeholders.",
    icon: <Receipt className="h-6 w-6 text-blue-600" />,
    cta: "Track Expense",
    color: "from-blue-50 via-indigo-50/40 to-transparent border-blue-200"
  },
  {
    id: "budget",
    title: "Spending Limits (Budget Planner)",
    description: "Establish monthly thresholds and receive email alerts before your expenditures hit the danger zone.",
    longDescription: "Allows configuring customized alerts at 80% capacity of your chosen monthly budget, powered by automated check processors.",
    icon: <PieChart className="h-6 w-6 text-amber-600" />,
    cta: "Configure Budget",
    color: "from-amber-50 via-yellow-50/40 to-transparent border-amber-200"
  },
  {
    id: "accounts",
    title: "Multi-Account Manager",
    description: "Toggle default payment accounts, manage separate current or savings ledger buckets.",
    longDescription: "Support for custom account descriptions, balances, default tags, and unified total net worth sums across all accounts.",
    icon: <CreditCard className="h-6 w-6 text-teal-600" />,
    cta: "Manage Ledger",
    color: "from-teal-50 via-cyan-50/40 to-transparent border-teal-200"
  },
  {
    id: "inngest",
    title: "Automated Jobs Dashboard",
    description: "Monitor daily cron jobs executing background calculations for monthly reports and bills.",
    longDescription: "Integrated with local Inngest server runners checking database triggers, syncing auth profiles, and scheduling recurring logs.",
    icon: <Cpu className="h-6 w-6 text-indigo-600" />,
    cta: "Monitor Automations",
    color: "from-indigo-50 via-purple-50/40 to-transparent border-indigo-200"
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Soft Ambient Light Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
            <Sparkles className="h-4 w-4" /> Feature Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
            Institutional Wealth Capabilities
          </h1>
          <p className="text-base text-slate-600 font-normal">
            Explore our automated ledger engines, AI vision scanning, budget threshold sentinels, and multi-currency accounts.
          </p>
        </div>

        {/* Grid of options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APP_FEATURES.map((feature) => (
            <Card 
              key={feature.id} 
              className={`border bg-white/95 backdrop-blur-xl shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between rounded-3xl overflow-hidden`}
            >
              <CardHeader className="space-y-3 pb-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg font-black text-slate-950">{feature.title}</CardTitle>
                <CardDescription className="text-xs text-slate-500 font-medium leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 leading-relaxed pt-0 pb-4 font-normal">
                {feature.longDescription}
              </CardContent>
              <CardFooter className="pt-3 border-t border-slate-100 bg-slate-50/70 flex justify-between items-center rounded-b-3xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Feature Enabled</span>
                <Link href={`/features/${feature.id}`}>
                  <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1">
                    {feature.cta} <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Status card */}
        <div className="max-w-2xl mx-auto p-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 flex items-start gap-3.5 shadow-xs">
          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-emerald-950">Active Database Synchronized</h4>
            <p className="text-xs text-slate-600 leading-normal">
              All records and parameters update live through Prisma ORM and Supabase transaction pooling with zero manual synchronization required.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
