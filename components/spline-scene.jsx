"use client";

import Spline from "@splinetool/react-spline";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function SplineScene({ scene, className = "", onLoad }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
      >
        <Spline scene={scene} onLoad={onLoad} />
      </Suspense>
    </div>
  );
}
