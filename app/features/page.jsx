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
  Cpu
} from "lucide-react";

const APP_FEATURES = [
  {
    id: "dashboard",
    title: "Financial Cockpit (Dashboard)",
    description: "Your main command center displaying aggregated balances, monthly spending, and real-time transaction logs.",
    longDescription: "An all-in-one financial dashboard showcasing cash flow alerts, monthly expenses, account list grids, and visual budget progress trackers.",
    icon: <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    cta: "Explore Cockpit",
    color: "from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-900/30"
  },
  {
    id: "transaction",
    title: "Log a Transaction (New Entry)",
    description: "Record manually custom income fees, salary deposits, restaurant receipts, or daily groceries.",
    longDescription: "Quick input form designed with validation, customizable categories, recurring intervals, and receipt attachment placeholders.",
    icon: <Receipt className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
    cta: "Track Expense",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-900/30"
  },
  {
    id: "budget",
    title: "Spending Limits (Budget Planner)",
    description: "Establish monthly thresholds and receive email alerts before your expenditures hit the danger zone.",
    longDescription: "Allows configuring customized alerts at 80% capacity of your chosen monthly budget, powered by automated check processors.",
    icon: <PieChart className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
    cta: "Configure Budget",
    color: "from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-900/30"
  },
  {
    id: "accounts",
    title: "Multi-Account Manager",
    description: "Toggle default payment accounts, manage separate current or savings ledger buckets.",
    longDescription: "Support for custom account descriptions, balances, default tags, and unified total net worth sums across all accounts.",
    icon: <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    cta: "Manage Ledger",
    color: "from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-900/30"
  },
  {
    id: "inngest",
    title: "Automated Jobs Dashboard",
    description: "Monitor daily cron jobs executing background calculations for monthly reports and bills.",
    longDescription: "Integrated with local Inngest server runners checking database triggers, syncing auth profiles, and scheduling recurring logs.",
    icon: <Cpu className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    cta: "Monitor Automations",
    color: "from-cyan-500/10 to-indigo-500/10 border-cyan-200 dark:border-cyan-900/30"
  }
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold border border-blue-100 dark:border-blue-800/30">
          <Sparkles className="h-4 w-4" /> Feature Directory
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-title">
          Explore Wealth Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Select any of the features below to view their onboarding instructions and run them with fresh user-input-driven databases.
        </p>
      </div>

      {/* Grid of options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {APP_FEATURES.map((feature) => (
          <Card 
            key={feature.id} 
            className={`border bg-gradient-to-br ${feature.color} hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
          >
            <CardHeader className="space-y-3 pb-3">
              <div className="w-12 h-12 rounded-xl bg-background border flex items-center justify-center shadow-sm">
                {feature.icon}
              </div>
              <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
              <CardDescription className="text-xs line-clamp-2">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed pt-0 pb-4">
              {feature.longDescription}
            </CardContent>
            <CardFooter className="pt-3 border-t border-border bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center rounded-b-xl">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase">Onboarding available</span>
              <Link href={`/features/${feature.id}`}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1">
                  {feature.cta} <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Database fresh status info */}
      <div className="max-w-xl mx-auto p-4 rounded-xl border border-dashed border-teal-200 dark:border-teal-900/30 bg-teal-500/5 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-teal-650 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-teal-950 dark:text-teal-400">Database is Clean & Ready</h4>
          <p className="text-[11px] text-muted-foreground leading-normal">
            The application database has been reset and does not contain pre-packaged seed data. All entries, calculations, and progress parameters will be generated strictly from your manual inputs!
          </p>
        </div>
      </div>
    </div>
  );
}
