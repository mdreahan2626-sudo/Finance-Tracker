"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Welth replaced 4 separate tools for us. The real-time cash flow cockpit and automated Gemini OCR OCR parse thousands of vendor receipts without a single error.",
    author: "Alexandra Vance",
    title: "Head of Finance @ HyperScale Labs",
    metrics: "$14.8M Tracked",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    quote: "The interface feels like an extension of my brain. Seeing net worth projections recalculate dynamically as I adjust spending targets gives me 100% confidence.",
    author: "Marcus Chen",
    title: "Founding Partner @ Apex Capital",
    metrics: "$42.1M Assets",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    quote: "Finally, a financial tracker that doesn't look like an Excel sheet or a cookie-cutter SaaS template. The attention to typography, micro-interactions, and 3D scenes is unmatched.",
    author: "Elena Rostova",
    title: "Design Director @ Solstice Studio",
    metrics: "3x Savings Rate",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    quote: "The automated category breakdown and high-yield savings recommendations netted me an additional $4,200 in interest returns last quarter alone.",
    author: "David Thorne",
    title: "Staff Engineer @ Stripe",
    metrics: "+18.4% YoY Return",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
  },
];

export default function TestimonialsCarousel() {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  return (
    <div className="relative w-full space-y-6">
      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
            Trusted by 50,000+ Founders & Wealth Managers
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Snap Scroll Container */}
      <div
        ref={containerRef}
        className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="snap-start shrink-0 w-[340px] sm:w-[420px] p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group"
          >
            <div className="space-y-4">
              <Quote className="w-8 h-8 text-emerald-400/40 group-hover:text-emerald-400 transition-colors" />
              <p className="text-slate-200 text-base leading-relaxed font-light italic">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.author}
                  width={44}
                  height={44}
                  className="rounded-full border border-slate-700 object-cover"
                />
                <div>
                  <div className="text-sm font-extrabold text-white">{t.author}</div>
                  <div className="text-xs text-slate-400 font-medium">{t.title}</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                {t.metrics}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
