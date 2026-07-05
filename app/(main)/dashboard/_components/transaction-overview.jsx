"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import {
  ArrowUpRight,
  ArrowDownRight,
  Utensils,
  ShoppingBag,
  Tv,
  Zap,
  Briefcase,
  TrendingUp,
  Tag,
  Car,
  HeartPulse,
  GraduationCap,
  Plane,
  Home,
  Calendar,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Curated modern color palette
const COLORS = [
  "#4f46e5", // Indigo
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#f43f5e", // Rose
  "#8b5cf6", // Violet
  "#3b82f6", // Blue
];

// Rich Category mapping config for icons, background styling, and borders
const CATEGORY_CONFIGS = {
  housing: { icon: Home, bg: "bg-blue-500/10 text-blue-500", border: "border-blue-500/20" },
  transportation: { icon: Car, bg: "bg-purple-500/10 text-purple-500", border: "border-purple-500/20" },
  groceries: { icon: ShoppingBag, bg: "bg-emerald-500/10 text-emerald-500", border: "border-emerald-500/20" },
  food: { icon: Utensils, bg: "bg-amber-500/10 text-amber-500", border: "border-amber-500/20" },
  dining: { icon: Utensils, bg: "bg-amber-500/10 text-amber-500", border: "border-amber-500/20" },
  utilities: { icon: Zap, bg: "bg-cyan-500/10 text-cyan-500", border: "border-cyan-500/20" },
  entertainment: { icon: Tv, bg: "bg-pink-500/10 text-pink-500", border: "border-pink-500/20" },
  healthcare: { icon: HeartPulse, bg: "bg-rose-500/10 text-rose-500", border: "border-rose-500/20" },
  education: { icon: GraduationCap, bg: "bg-indigo-500/10 text-indigo-500", border: "border-indigo-500/20" },
  travel: { icon: Plane, bg: "bg-sky-500/10 text-sky-500", border: "border-sky-500/20" },
  shopping: { icon: ShoppingBag, bg: "bg-pink-500/10 text-pink-500", border: "border-pink-500/20" },
  
  salary: { icon: Briefcase, bg: "bg-emerald-500/10 text-emerald-500", border: "border-emerald-500/20" },
  freelance: { icon: TrendingUp, bg: "bg-teal-500/10 text-teal-500", border: "border-teal-500/20" },
  investments: { icon: TrendingUp, bg: "bg-indigo-500/10 text-indigo-500", border: "border-indigo-500/20" },
  gift: { icon: Tag, bg: "bg-orange-500/10 text-orange-500", border: "border-orange-500/20" },
  other: { icon: Tag, bg: "bg-neutral-500/10 text-neutral-500", border: "border-neutral-500/20" },
};

function getCategoryConfig(category) {
  const normalized = category?.toLowerCase() || "other";
  return CATEGORY_CONFIGS[normalized] || CATEGORY_CONFIGS.other;
}

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for donut chart
  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  // Calculate month's total expenses sum
  const totalMonthExpenses = pieChartData.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltips with frosted glass layout
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-semibold capitalize text-foreground">{payload[0].name}</p>
          <p className="text-rose-500 dark:text-rose-400 font-bold">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <Card className="border border-border/80 bg-gradient-to-br from-indigo-500/[0.01] to-transparent shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="space-y-1">
            <CardTitle className="text-base font-bold tracking-tight">
              Recent Transactions
            </CardTitle>
            <CardDescription className="text-xs">
              Review your latest account activity and transfers.
            </CardDescription>
          </div>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[150px] h-8 text-xs font-semibold">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id} className="text-xs">
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3.5">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-10 border border-dashed rounded-xl bg-muted/10">
                <Calendar className="h-8 w-8 text-muted-foreground/60 mx-auto mb-2" />
                <p className="text-xs font-semibold text-muted-foreground">No recent transactions</p>
                <p className="text-[10px] text-muted-foreground/80 mt-0.5">Transactions you add will show up here</p>
              </div>
            ) : (
              recentTransactions.map((transaction) => {
                const config = getCategoryConfig(transaction.category);
                const IconComponent = config.icon;
                const isExpense = transaction.type === "EXPENSE";

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Icon Container */}
                      <div className={cn("p-2 rounded-xl border shrink-0", config.bg, config.border)}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      
                      {/* Description & Category Badge */}
                      <div className="space-y-0.5 min-w-0">
                        <p className="text-xs font-semibold leading-tight text-foreground truncate">
                          {transaction.description || "Untitled Transaction"}
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <span>{format(new Date(transaction.date), "PP")}</span>
                          <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                          <span className="capitalize">{transaction.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center gap-1 shrink-0 font-bold text-sm">
                      <span className={cn(isExpense ? "text-rose-500 dark:text-rose-400" : "text-emerald-500 dark:text-emerald-400")}>
                        {isExpense ? "-" : "+"}${transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown Card */}
      <Card className="border border-border/80 bg-gradient-to-br from-indigo-500/[0.01] to-transparent shadow-sm">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base font-bold tracking-tight">
            Monthly Expense Breakdown
          </CardTitle>
          <CardDescription className="text-xs">
            Review how your funds are distributed by category this month.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {pieChartData.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-xl bg-muted/10">
              <TrendingUp className="h-8 w-8 text-muted-foreground/60 mx-auto mb-2" />
              <p className="text-xs font-semibold text-muted-foreground">No expenses this month</p>
              <p className="text-[10px] text-muted-foreground/80 mt-0.5">Add expenses to generate charts</p>
            </div>
          ) : (
            <div className="relative h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="hsl(var(--card))"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle" 
                    iconSize={8}
                    wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Absolute Center Content inside Donut Hole */}
              <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">
                  Spent
                </span>
                <span className="text-lg font-extrabold text-foreground mt-0.5">
                  ${totalMonthExpenses.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}