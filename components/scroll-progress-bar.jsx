"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-900/80 z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(16,185,129,0.7)]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
