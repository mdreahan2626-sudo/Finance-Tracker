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
  AlertTriangle
} from "lucide-react";

const FEATURES_DATA = {
  dashboard: {
    title: "Financial Cockpit (Dashboard)",
    subtitle: "Consolidated financial oversight panel",
    description: "Manage accounts, view transactions, and track your active budgets all in one unified cockpit.",
    icon: <LayoutDashboard className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    ctaText: "Launch Dashboard",
    ctaLink: "/dashboard",
    bullets: [
      "Aggregated balances across savings and current accounts.",
      "Visual chart widgets showing monthly cash flows.",
      "Direct budget progress alerts with colored thresholds.",
      "List of recent transaction items detailing categories."
    ],
    infoBox: "Your dashboard is clean. Since all seed data was removed, this cockpit will show $0.00 until you add your first manual transaction."
  },
  transaction: {
    title: "Log a Transaction",
    subtitle: "Fast manual expense and income entry",
    description: "Log individual financial entries with custom amounts, dates, recurring intervals, and receipts.",
    icon: <Receipt className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
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
    icon: <PieChart className="h-10 w-10 text-amber-600 dark:text-amber-400" />,
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
    icon: <CreditCard className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
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
    icon: <Cpu className="h-10 w-10 text-cyan-600 dark:text-cyan-400" />,
    ctaText: "Launch Inngest console",
    ctaLink: "http://localhost:8290",
    external: true,
    bullets: [
      "Runs automated cash flow updates every 24 hours.",
      "Executes checks for budget alerts every 6 hours.",
      "Builds and emails comprehensive monthly financial digests on the 1st of each month.",
      "Syncs profile updates and sends email welcomes dynamically."
    ],
    infoBox: "To run background tasks locally, keep the Inngest runner active (`npm run dev` handles this concurrently on port 8290)."
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
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
      {/* Back to Features */}
      <Link href="/features" className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all">
        <ArrowLeft className="h-4 w-4" /> Back to Features Portal
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Card: Core Onboarding Details (8 columns) */}
        <Card className="md:col-span-8 border-gray-200 dark:border-gray-800 shadow-md">
          <CardHeader className="space-y-4 pb-4 border-b">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border flex items-center justify-center shadow-sm shrink-0">
                {feature.icon}
              </div>
              <div className="space-y-1">
                <Badge className="bg-blue-600 text-white font-medium text-[10px] uppercase">Interactive Tool</Badge>
                <CardTitle className="text-2xl font-black">{feature.title}</CardTitle>
                <CardDescription className="text-xs">{feature.subtitle}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <p className="text-base text-muted-foreground leading-relaxed">
              {feature.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">What this supports:</h4>
              <div className="space-y-2">
                {feature.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50/50 dark:bg-gray-900/50 border-t flex flex-col sm:flex-row justify-between items-center gap-4 rounded-b-xl">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Calendar className="h-4 w-4" /> Ready for user-driven input
            </div>
            {feature.external ? (
              <a href={feature.ctaLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 active:scale-95 transition-all">
                  {feature.ctaText} <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            ) : (
              <Link href={feature.ctaLink}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 active:scale-95 transition-all">
                  {feature.ctaText} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>

        {/* Right Card: Side tip details (4 columns) */}
        <div className="md:col-span-4 space-y-6">
          <Card className="border-gray-200 dark:border-gray-800 bg-blue-50/20 dark:bg-gray-950/20 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Info className="h-4.5 w-4.5 text-blue-650" /> Developer Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed">
              {feature.infoBox}
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800 bg-amber-500/5 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500" /> Sandboxed Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed">
              No mock database records exist anymore. Adding, deleting, or updating will write directly to your local Docker PostgreSQL container on port 5433.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
