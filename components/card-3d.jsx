"use client";

import React, { useState, useRef } from "react";
import { Wifi, Sparkles, ShieldCheck, RefreshCw } from "lucide-react";

export default function Card3D({ balance = 128450.00 }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [currency, setCurrency] = useState({ symbol: "$", code: "USD", rate: 1 });

  const currencies = [
    { symbol: "$", code: "USD", rate: 1 },
    { symbol: "€", code: "EUR", rate: 0.92 },
    { symbol: "£", code: "GBP", rate: 0.78 },
    { symbol: "₹", code: "INR", rate: 83.5 },
  ];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.4,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const displayBalance = (balance * currency.rate).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col items-center justify-center p-2">
      {/* 3D Perspective Wrapper */}
      <div
        className="perspective-1000 w-full max-w-[420px] h-[250px] sm:h-[260px] cursor-pointer select-none group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          ref={cardRef}
          className="relative w-full h-full duration-200 preserve-3d transition-transform ease-out"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${
              rotate.y + (isFlipped ? 180 : 0)
            }deg) scale3d(1.02, 1.02, 1.02)`,
          }}
        >
          {/* ================= FRONT OF CARD (Platinum / Light Frosted Luxury) ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 backface-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 shadow-2xl shadow-emerald-500/10 flex flex-col justify-between overflow-hidden">
            {/* Dynamic Holographic Foil Glare */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl mix-blend-color-dodge"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(52, 211, 153, 0.45) 0%, rgba(59, 130, 246, 0.25) 40%, transparent 70%)`,
                opacity: glare.opacity,
              }}
            />

            {/* Ambient Platinum Sheen */}
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header: Brand & Contactless */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-emerald-500/30">
                  <span className="font-black text-white text-base">W</span>
                </div>
                <div>
                  <span className="font-black text-base sm:text-lg tracking-wider bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
                    WELTH PLATINUM
                  </span>
                  <div className="text-[9px] uppercase tracking-widest text-emerald-600 font-black">
                    Institutional Tier
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Wifi className="w-5 h-5 rotate-90 text-slate-600" />
              </div>
            </div>

            {/* EMV Gold Chip & Balance Row */}
            <div className="relative z-10 flex items-center justify-between my-auto">
              {/* Metallic Chip */}
              <div className="w-11 h-9 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-300/80 p-1.5 shadow-md shadow-amber-500/20 flex flex-col justify-between">
                <div className="border-b border-amber-800/40 h-1/2" />
                <div className="border-t border-amber-800/40 h-1/2" />
              </div>

              {/* Dynamic Balance */}
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Available Portfolio Liquidity
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-end gap-1">
                  <span className="text-emerald-600 font-bold">{currency.symbol}</span>
                  <span>{displayBalance}</span>
                </div>
              </div>
            </div>

            {/* Card Footer: Number & Holder */}
            <div className="relative z-10 flex items-end justify-between border-t border-slate-200 pt-3">
              <div>
                <div className="font-mono text-xs sm:text-sm tracking-widest text-slate-700 font-bold">
                  •••• •••• •••• 9842
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
                  ALEXANDER V. VANCE
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                  VALID THRU
                </div>
                <div className="font-mono text-xs font-bold text-slate-800">
                  12/30
                </div>
              </div>
            </div>
          </div>

          {/* ================= BACK OF CARD ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 backface-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-700 shadow-2xl flex flex-col justify-between overflow-hidden"
            style={{ transform: "rotateY(180deg)" }}
          >
            {/* Magnetic Stripe */}
            <div className="absolute top-7 inset-x-0 h-11 bg-gradient-to-r from-slate-950 via-slate-900 to-black border-y border-slate-800" />

            <div className="pt-14 relative z-10 space-y-4">
              {/* Signature / CVV Strip */}
              <div className="flex items-center gap-3">
                <div className="h-8 flex-1 bg-slate-800/90 rounded-md flex items-center px-3 text-[10px] text-slate-400 font-mono italic">
                  Authorized Signature
                </div>
                <div className="h-8 w-14 bg-white text-slate-950 font-mono font-black text-xs flex items-center justify-center rounded-md shadow">
                  742
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" /> 256-Bit Hardware Encrypted
                </div>
                <span className="font-mono">WELTH-SEC-09</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-500 leading-tight">
              Issued under institutional charter by Welth Financial Corp. Real-time ledger sync enabled via Supabase & Inngest v4.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <div className="inline-flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-sm">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={(e) => {
                e.stopPropagation();
                setCurrency(c);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                currency.code === c.code
                  ? "bg-emerald-600 text-white shadow-sm scale-105"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {c.code} ({c.symbol})
            </button>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-all shadow-sm active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
          <span>Flip Card</span>
        </button>
      </div>
    </div>
  );
}
