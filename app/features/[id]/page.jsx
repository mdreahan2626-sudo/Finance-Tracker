"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  CreditCard, 
  Cpu, 
  Sparkles,
  Info,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ShieldCheck
} from "lucide-react";

const FEATURES_DATA = {
  dashboard: {
    title: "Financial Cockpit (Dashboard)",
    subtitle: "Consolidated financial oversight panel",
    description: "Manage accounts, view transactions, and track your active budgets all in one unified cockpit.",
    icon: <LayoutDashboard className="h-10 w-10 text-emerald-600" />,
    ctaText: "Launch Dashboard",
    ctaLink: "/dashboard",
    bullets: [
      "Aggregated balances across savings and current accounts.",
      "Visual chart widgets showing monthly cash flows.",
      "Direct budget progress alerts with colored thresholds.",
      "List of recent transaction items detailing categories."
    ],
    infoBox: "Your cockpit displays real-time balances, income, and outflow metrics calculated synchronously across all connected accounts."
  },
  transaction: {
    title: "Log a Transaction",
    subtitle: "Fast manual expense and income entry",
    description: "Log individual financial entries with custom amounts, dates, recurring intervals, and receipts.",
    icon: <Receipt className="h-10 w-10 text-blue-600" />,
    ctaText: "Add Transaction",
    ctaLink: "/transaction/create",
    bullets: [
      "Select between INCOME (deposits, salaries) or EXPENSE (bills, shopping).",
      "Assign to predefined categories (Salary, Housing, Travel, Food, Groceries).",
      "Set as recurring (Daily, Weekly, Monthly) to auto-process in the background.",
      "Configure manual date calendars to track past or future logs."
    ],
    infoBox: "Creating transactions automatically updates your default account balances and re-calculates active budgets in real-time."
  },
  budget: {
    title: "Spending Limits (Budget Planner)",
    subtitle: "Intelligent threshold limit monitor",
    description: "Define a monthly spending budget to track expenses and prevent overspending.",
    icon: <PieChart className="h-10 w-10 text-amber-600" />,
    ctaText: "Set Budget Limits",
    ctaLink: "/dashboard",
    bullets: [
      "Configure a custom monthly cap amount on your dashboard.",
      "Keep track of active spending progress bars.",
      "Automated system triggers email alerts when monthly spending exceeds 80%.",
      "Resets automatically at the start of each calendar month."
    ],
    infoBox: "You can configure your monthly budget cap directly on the main Dashboard view inside the 'Budget Progress' widget."
  },
  accounts: {
    title: "Multi-Account Manager",
    subtitle: "Granular control over payment ledgers",
    description: "Create distinct ledgers to separate savings, pocket cash, or current bank deposits.",
    icon: <CreditCard className="h-10 w-10 text-teal-600" />,
    ctaText: "Open Accounts Panel",
    ctaLink: "/dashboard",
    bullets: [
      "Create Current or Savings account categories.",
      "Assign default ledger targets for automatic expense logging.",
      "Track independent balances per payment method.",
      "Review transaction counts per card/account."
    ],
    infoBox: "Use the 'Add New Account' dashed card drawer on the main dashboard to establish your initial account balance!"
  },
  inngest: {
    title: "Automated Jobs Dashboard",
    subtitle: "Background job execution monitor",
    description: "Monitor, trigger, and debug recurring transactions, email alerts, and user synchronization.",
    icon: <Cpu className="h-10 w-10 text-indigo-600" />,
    ctaText: "Launch Inngest Console",
    ctaLink: "http://localhost:8290",
    external: true,
    bullets: [
      "Runs automated cash flow updates every 24 hours.",
      "Executes checks for budget alerts every 6 hours.",
      "Builds and emails comprehensive monthly financial digests on the 1st of each month.",
      "Syncs profile updates and sends email welcomes dynamically."
    ],
    infoBox: "To run background tasks locally, keep the Inngest runner active (`npm run dev` handles this concurrently)."
  }
};

export default function DynamicFeaturePage({ params }) {
  const unwrappedParams = use(params);
  const featureId = unwrappedParams.id;
  const feature = FEATURES_DATA[featureId];

  if (!feature) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 md:px-8 relative overflow-hidden">
      {/* Soft Ambient Light Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Back to Features */}
        <Link href="/features" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-all">
          <ArrowLeft className="h-4 w-4" /> Back to Features Directory
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Card: Core Onboarding Details (8 columns) */}
          <Card className="md:col-span-8 border-slate-200 bg-white/95 backdrop-blur-2xl shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
            <CardHeader className="space-y-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs shrink-0">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold uppercase">
                    Interactive Feature
                  </Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-black text-slate-950">{feature.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-500 font-medium">{feature.subtitle}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                {feature.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Capabilities:</h4>
                <div className="space-y-2.5">
                  {feature.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Real-time active sync
              </div>
              {feature.external ? (
                <a href={feature.ctaLink} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 active:scale-95 transition-all">
                    {feature.ctaText} <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              ) : (
                <Link href={feature.ctaLink}>
                  <Button size="lg" className="h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 active:scale-95 transition-all">
                    {feature.ctaText} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>

          {/* Right Column: Tips & Context (4 columns) */}
          <div className="md:col-span-4 space-y-6">
            <Card className="border-slate-200 bg-white/95 backdrop-blur-xl shadow-xs rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-emerald-600" /> Platform Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 font-normal leading-relaxed">
                {feature.infoBox}
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50/50 shadow-xs rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-600" /> Automated Sync
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-emerald-900/80 font-normal leading-relaxed">
                All ledger modifications are stored in your encrypted PostgreSQL tables and reflected synchronously in the Cockpit.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
