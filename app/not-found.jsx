import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Ambient background bloom */}
      <div className="absolute w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6 max-w-md mx-auto p-8 rounded-3xl bg-white/90 border border-slate-200 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-xs">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight text-slate-950">404</h1>
          <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
          <p className="text-xs text-slate-500 font-normal">
            The page you are looking for has been moved or does not exist in the ledger.
          </p>
        </div>

        <Link href="/">
          <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
