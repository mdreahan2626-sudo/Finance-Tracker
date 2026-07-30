"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, PieChart as PieIcon, BarChart3, LineChart as LineIcon, ArrowUpRight, DollarSign } from "lucide-react";

const spendingTrends = [
  { month: "Jan", income: 4200, expense: 2100, savings: 2100 },
  { month: "Feb", income: 4500, expense: 2300, savings: 2200 },
  { month: "Mar", income: 4800, expense: 1900, savings: 2900 },
  { month: "Apr", income: 5100, expense: 2400, savings: 2700 },
  { month: "May", income: 5600, expense: 2200, savings: 3400 },
  { month: "Jun", income: 6200, expense: 2600, savings: 3600 },
];

const categoryData = [
  { name: "Housing & Rent", value: 1200, color: "#3b82f6" },
  { name: "Food & Dining", value: 540, color: "#10b981" },
  { name: "Shopping", value: 380, color: "#f59e0b" },
  { name: "Utilities & Bills", value: 290, color: "#8b5cf6" },
  { name: "Entertainment", value: 190, color: "#ec4899" },
];

export default function AnalyticsShowcase() {
  const [activeTab, setActiveTab] = useState("area");

  return (
    <div className="w-full">
      <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur-xl text-slate-100 shadow-2xl overflow-hidden rounded-3xl">
        <CardHeader className="border-b border-slate-800/80 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> Interactive Analytics
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white pt-1">
              Visual Cash Flow Insights
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Real-time analytics engine categorizing your spending, savings growth, and financial targets.
            </CardDescription>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={activeTab === "area" ? "default" : "outline"}
              onClick={() => setActiveTab("area")}
              className={`rounded-xl text-xs font-semibold ${
                activeTab === "area"
                  ? "bg-blue-600 text-white"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <LineIcon className="w-3.5 h-3.5 mr-1.5" /> Trends
            </Button>
            <Button
              size="sm"
              variant={activeTab === "bar" ? "default" : "outline"}
              onClick={() => setActiveTab("bar")}
              className={`rounded-xl text-xs font-semibold ${
                activeTab === "bar"
                  ? "bg-blue-600 text-white"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" /> Income vs Expense
            </Button>
            <Button
              size="sm"
              variant={activeTab === "pie" ? "default" : "outline"}
              onClick={() => setActiveTab("pie")}
              className={`rounded-xl text-xs font-semibold ${
                activeTab === "pie"
                  ? "bg-blue-600 text-white"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <PieIcon className="w-3.5 h-3.5 mr-1.5" /> Breakdown
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Chart Render Container */}
            <div className="lg:col-span-8 h-[340px] sm:h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === "area" ? (
                  <AreaChart data={spendingTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `$${val}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#f8fafc" }}
                    />
                    <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="income" name="Monthly Income" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                    <Area type="monotone" dataKey="savings" name="Net Savings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
                  </AreaChart>
                ) : activeTab === "bar" ? (
                  <BarChart data={spendingTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `$${val}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#f8fafc" }}
                    />
                    <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />
                    <Bar dataKey="income" name="Income" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#f8fafc" }}
                      formatter={(value) => [`$${value}`, "Amount"]}
                    />
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Right KPI Summary Cards */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Average Monthly Income</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px]">
                    +12.4% vs last year
                  </Badge>
                </div>
                <div className="text-2xl font-black text-white">$5,233.00</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Highest Spending Category</span>
                  <span className="text-emerald-400 text-xs font-semibold">46% of budget</span>
                </div>
                <div className="text-xl font-bold text-slate-100 flex items-center justify-between">
                  <span>Housing & Rent</span>
                  <span className="text-slate-400 text-sm">$1,200/mo</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-emerald-600/20 border border-blue-500/30">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                  <ArrowUpRight className="w-4 h-4" /> AI Recommendation
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  You saved <strong className="text-white">$3,600</strong> in June! Putting this into your high-yield savings account will yield an estimated <strong className="text-emerald-400">$180/yr</strong> in interest.
                </p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
