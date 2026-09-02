"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const TICKER_ITEMS = [
  { symbol: "S&P 500", price: "5,864.67", change: "+1.24%", up: true },
  { symbol: "NASDAQ", price: "18,518.61", change: "+1.68%", up: true },
  { symbol: "BTC/USD", price: "$64,280.00", change: "+3.85%", up: true },
  { symbol: "ETH/USD", price: "$3,490.50", change: "+2.90%", up: true },
  { symbol: "GOLD (XAU)", price: "$2,654.10", change: "+0.72%", up: true },
  { symbol: "EUR/USD", price: "1.0864", change: "-0.15%", up: false },
  { symbol: "10Y TREASURY", price: "3.94%", change: "-0.04%", up: false },
  { symbol: "GLOBAL WEALTH INDEX", price: "142.8", change: "+2.40%", up: true },
];

export default function MarketTicker() {
  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-xl overflow-hidden py-2.5 select-none relative z-20">
      {/* Subtle edge fades */}
      <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] space-x-8">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-tight text-slate-300 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800/50 hover:border-slate-700 transition-colors"
          >
            <span className="font-bold text-white">{item.symbol}</span>
            <span className="text-slate-400">{item.price}</span>
            <span
              className={`flex items-center gap-0.5 font-semibold text-[11px] ${
                item.up ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {item.up ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
