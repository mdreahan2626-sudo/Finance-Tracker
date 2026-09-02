"use client";

import React, { useState } from "react";
import { TrendingUp, Sparkles, DollarSign, Calculator, Layers, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WealthSimulator3D() {
  const [principal, setPrincipal] = useState(25000);
  const [monthly, setMonthly] = useState(1500);
  const [rate, setRate] = useState(10); // 10% annual return

  // Calculate compound interest
  const calculateFutureValue = (years) => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const futurePrincipal = principal * Math.pow(1 + r, n);
    const futureMonthly = monthly * ((Math.pow(1 + r, n) - 1) / r);
    return Math.round(futurePrincipal + futureMonthly);
  };

  const totalContributions = (years) => {
    return principal + monthly * 12 * years;
  };

  const val5 = calculateFutureValue(5);
  const val10 = calculateFutureValue(10);
  const val20 = calculateFutureValue(20);

  const interestGained10 = val10 - totalContributions(10);

  return (
    <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" /> 3D Wealth Compounding Engine
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Visualize Your Capital Trajectory
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
            Simulate institutional asset returns and watch compound interest scale your portfolio exponentially.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">10-Year Projected Wealth</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              ${val10.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Controls & Visual Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Sliders Left Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Slider 1: Initial Deposit */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Initial Capital</span>
              <span className="font-mono text-base font-black text-white">${principal.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$1,000</span>
              <span>$100,000</span>
              <span>$200,000</span>
            </div>
          </div>

          {/* Slider 2: Monthly Deposit */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Monthly Investment</span>
              <span className="font-mono text-base font-black text-emerald-400">+${monthly.toLocaleString()}/mo</span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$100/mo</span>
              <span>$5,000/mo</span>
              <span>$10,000/mo</span>
            </div>
          </div>

          {/* Slider 3: Expected Return */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Target Annual Yield</span>
              <span className="font-mono text-base font-black text-blue-400">{rate}% ARR</span>
            </div>
            <input
              type="range"
              min="4"
              max="18"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>4% (Bonds)</span>
              <span>10% (S&P 500)</span>
              <span>18% (Aggressive AI)</span>
            </div>
          </div>
        </div>

        {/* 3D Timeline Visualizer Right Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Compounding Milestones</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +${interestGained10.toLocaleString()} Free Yield (10y)
              </span>
            </div>

            {/* 3D Milestone Bars */}
            <div className="space-y-4">
              {/* 5 Year */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">5-Year Portfolio</span>
                  <span className="text-white font-mono font-bold">${val5.toLocaleString()}</span>
                </div>
                <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((val5 / val20) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* 10 Year */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">10-Year Portfolio</span>
                  <span className="text-emerald-400 font-mono font-bold">${val10.toLocaleString()}</span>
                </div>
                <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500 shadow-lg shadow-emerald-500/20"
                    style={{ width: `${Math.min((val10 / val20) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* 20 Year */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">20-Year Portfolio (Exponential Scale)</span>
                  <span className="text-amber-300 font-mono font-bold">${val20.toLocaleString()}</span>
                </div>
                <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-emerald-300 rounded-full transition-all duration-500 shadow-lg shadow-amber-500/20"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-center">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Capital Contributed</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">${totalContributions(10).toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
                <div className="text-[10px] uppercase font-bold text-emerald-400">Interest Earned</div>
                <div className="text-sm font-bold text-emerald-300 mt-0.5">+${interestGained10.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
