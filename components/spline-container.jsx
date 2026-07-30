"use client";

import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Loader2 } from "lucide-react";

export default function SplineContainer({ sceneUrl = "https://prod.spline.design/r-QmtDwl63eBL8sv/scene.splinecode", className = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[450px] bg-transparent space-y-3">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500/80" />
      </div>
    );
  }

  return (
    <div className={`w-full h-full min-h-[450px] relative bg-transparent ${className}`}>
      <Spline 
        scene={sceneUrl} 
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      />
    </div>
  );
}
