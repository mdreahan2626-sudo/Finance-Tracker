"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Receipt, 
  ShieldCheck, 
  TrendingUp, 
  PieChart, 
  Zap, 
  Lock, 
  CheckCircle2, 
  FileSearch, 
  Sparkles, 
  ArrowUpRight,
  Bell,
  Coins
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BentoGridFinance() {
  // Laser OCR Scanner state
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState({
    merchant: "NVIDIA Corp - AI Cluster",
    amount: "2,499.00",
    category: "Cloud Infrastructure",
    date: "2026-08-28",
    confidence: "99.9%",
    status: "Verified",
  });

  const runLaserScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScannedData({
        merchant: "Apple Infinite Loop Store",
        amount: "1,299.00",
        category: "Hardware",
        date: "Today, 14:20",
        confidence: "99.8%",
        status: "Auto-Categorized",
      });
    }, 2000);
  };

  return (
    <div className="space-y-8 text-slate-900">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Institutional Fintech Architecture
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          Engineered for Wealth Mastery
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-normal">
          Experience AI automation, instant transaction reconciliation, and enterprise security woven into one cohesive platform.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
        
        {/* Tile 1: AI Receipt Scanner with Glowing Laser Sweep (Span 7) */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-slate-200/40 hover:border-slate-300 transition-all duration-300">
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Receipt className="w-5 h-5" />
              </div>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                Gemini Vision 2.0
              </Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              AI Laser Receipt & Invoice OCR
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-normal">
              Autonomous machine-vision extracts line items, tax, and merchants directly into your Prisma ledger with sub-second accuracy.
            </p>
          </div>

          {/* Interactive Laser Scanning Card Mockup */}
          <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden">
            {/* The Laser Sweep Bar */}
            {scanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#06b6d4] animate-scanline z-20 pointer-events-none" />
            )}

            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 uppercase font-mono font-bold">Document Source</span>
                <span className="text-xs text-emerald-700 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {scannedData.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Merchant</span>
                  <div className="font-bold text-slate-900 text-sm truncate">{scannedData.merchant}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Total Amount</span>
                  <div className="font-bold text-emerald-600 text-sm">${scannedData.amount}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Category</span>
                  <div className="text-slate-700 font-medium">{scannedData.category}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">AI Confidence</span>
                  <div className="text-blue-600 font-bold font-mono">{scannedData.confidence}</div>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={runLaserScan}
            disabled={scanning}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-98 relative z-10"
          >
            {scanning ? "Laser Scanning Receipt Document..." : "Trigger Live Laser OCR Demo"}
          </Button>
        </div>

        {/* Tile 2: Portfolio Asset Allocation Radar (Span 5) */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-slate-200/40 hover:border-slate-300 transition-all duration-300">
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <PieChart className="w-5 h-5" />
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                Asset Allocation
              </Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Dynamic Liquidity Vault
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-normal">
              Multi-asset portfolio distribution automatically balanced across savings, equity, and reserves.
            </p>
          </div>

          {/* Asset Allocation Breakdown */}
          <div className="space-y-3.5 my-6 relative z-10">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Equities & Index Funds (52%)</span>
                <span className="text-slate-900 font-mono font-bold">$66,794</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-emerald-500 rounded-full w-[52%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">High-Yield Treasury Cash (28%)</span>
                <span className="text-slate-900 font-mono font-bold">$35,966</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-blue-500 rounded-full w-[28%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Crypto & Digital Assets (20%)</span>
                <span className="text-slate-900 font-mono font-bold">$25,690</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-amber-400 rounded-full w-[20%]" />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700 relative z-10">
            <span className="font-bold text-emerald-700">Total Portfolio Value</span>
            <span className="font-mono font-black text-slate-950 text-sm">$128,450.00</span>
          </div>
        </div>

        {/* Tile 3: Autonomous Budget Alert Sentinel (Span 6) */}
        <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-slate-200/40 hover:border-slate-300 transition-all duration-300">
          <div className="space-y-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Autonomous Budget Sentinel
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-normal">
              Set dynamic thresholds. Inngest background jobs send instant Resend email alerts whenever 80% category capacity is reached.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 my-4 relative z-10">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Monthly Operating Budget</span>
              <span className="text-amber-700 font-mono font-bold">$3,420 / $4,000 (85.5%)</span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full w-[85.5%]" />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded-lg font-medium">
              <Zap className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>Threshold reached: Inngest automated alert sent via Resend</span>
            </div>
          </div>
        </div>

        {/* Tile 4: 256-Bit Military Grade Security (Span 6) */}
        <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-slate-200/40 hover:border-slate-300 transition-all duration-300">
          <div className="space-y-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              256-Bit Hardware Cryptography
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-normal">
              Multi-tenant data isolation guarded with Arcjet Bot Shield, Clerk multi-factor authentication, and SSL encrypted Supabase tunnels.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 my-4 relative z-10 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase">Protection Layer</div>
              <div className="text-emerald-700 font-bold">Arcjet Security Active</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase">Latency</div>
              <div className="text-blue-600 font-bold">&lt; 14ms Global Edge</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
