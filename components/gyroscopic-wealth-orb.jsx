"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react";

export default function GyroscopicWealthOrb() {
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[460px] h-[440px] sm:h-[480px] flex items-center justify-center select-none perspective-1000 mx-auto"
    >
      {/* Ambient Light Bloom Behind Orb */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-emerald-400/20 via-teal-300/25 to-blue-400/20 blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute w-48 h-48 rounded-full bg-amber-300/15 blur-2xl pointer-events-none" />

      {/* Main 3D Gyroscopic Gimbal Master Container */}
      <div
        className="relative w-72 h-72 sm:w-80 sm:h-80 preserve-3d transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${mouseOffset.y}deg) rotateY(${mouseOffset.x}deg)`,
        }}
      >
        {/* ================= 1. OUTER PLATINUM / TITANIUM RING (Axis 1) ================= */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-300/80 shadow-[0_0_25px_rgba(16,185,129,0.25),inset_0_0_20px_rgba(255,255,255,0.8)] preserve-3d animate-gyro-outer">
          {/* Platinum Ring Surface Gradient Accent */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-slate-200/40 via-white/80 to-slate-300/40 backdrop-blur-[2px] opacity-70" />
          
          {/* Orbiting Satellite Node 1: Emerald Gem */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-300 border-2 border-white shadow-lg shadow-emerald-500/50 flex items-center justify-center text-slate-950 font-black text-[10px]">
            $
          </div>
          {/* Orbiting Satellite Node 2: Gold Gem */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 border-2 border-white shadow-lg shadow-amber-400/50 flex items-center justify-center text-slate-950 font-black text-[9px]">
            ↗
          </div>
        </div>

        {/* ================= 2. MIDDLE EMERALD & CYAN RING (Axis 2) ================= */}
        <div className="absolute inset-4 rounded-full border-3 border-emerald-500/70 shadow-[0_0_30px_rgba(16,185,129,0.35),inset_0_0_15px_rgba(52,211,153,0.3)] preserve-3d animate-gyro-middle">
          {/* Glowing Translucent Band */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 via-teal-300/10 to-transparent pointer-events-none" />

          {/* Orbiting Satellite Node: Euro Symbol */}
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-300 border-2 border-white shadow-md shadow-teal-400/40 flex items-center justify-center text-slate-950 font-black text-[9px]">
            €
          </div>
          {/* Orbiting Satellite Node: Bitcoin Symbol */}
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-white shadow-md shadow-amber-500/40 flex items-center justify-center text-slate-950 font-black text-[9px]">
            ₿
          </div>
        </div>

        {/* ================= 3. INNER CHAMPAGNE GOLD RING (Axis 3) ================= */}
        <div className="absolute inset-10 rounded-full border-3 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.3),inset_0_0_15px_rgba(254,240,138,0.6)] preserve-3d animate-gyro-inner">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-200/30 via-yellow-100/40 to-transparent" />
          {/* Inner Light Pulse Point */}
          <div className="absolute top-2 left-1/4 w-3 h-3 rounded-full bg-white shadow-md shadow-amber-300 animate-ping" />
        </div>

        {/* ================= 4. CENTER FLOATING GOLD/PLATINUM MEDALLION ================= */}
        <div className="absolute inset-16 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 border-2 border-white shadow-[0_15px_35px_rgba(16,185,129,0.2),inset_0_2px_10px_rgba(255,255,255,1)] flex items-center justify-center preserve-3d animate-levitate">
          
          {/* Specular Core Lens Flare */}
          <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-600 shadow-inner flex flex-col items-center justify-center text-white">
            
            {/* Medallion Core Logo */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="font-black text-2xl sm:text-3xl tracking-tighter drop-shadow-md text-white">
                W
              </span>
              <span className="text-[8px] uppercase tracking-widest font-black text-emerald-100">
                WELTH
              </span>
            </div>

            {/* Core Continuous Specular Reflection Sweep */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/50 to-transparent rotate-45 animate-shimmer" />
            </div>

          </div>
        </div>

      </div>

      {/* Floating 3D Satellite Glass Pill 1: Top Left */}
      <div className="absolute top-4 left-0 sm:-left-4 z-20 flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xl shadow-slate-200/50 backdrop-blur-xl animate-float-slow">
        <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-xs">
          <TrendingUp className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Live ARR Yield</div>
          <div className="text-xs font-black text-emerald-600">+18.4% APY</div>
        </div>
      </div>

      {/* Floating 3D Satellite Glass Pill 2: Bottom Right */}
      <div className="absolute bottom-4 right-0 sm:-right-4 z-20 flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xl shadow-slate-200/50 backdrop-blur-xl animate-float-delayed">
        <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Autonomous Sync</div>
          <div className="text-xs font-black text-slate-900">Zero Latency</div>
        </div>
      </div>

    </div>
  );
}
