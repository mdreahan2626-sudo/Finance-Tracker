"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard, Shield, Wifi } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault, _count } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation
    event.stopPropagation(); // Stop propagation to Link

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  // Design tokens based on type
  const isSavings = type === "SAVINGS";
  const cardGradient = isSavings
    ? "from-emerald-500 via-emerald-600 to-teal-700 text-white border-emerald-500/25 shadow-emerald-500/10 dark:from-emerald-500/90 dark:via-emerald-600/90 dark:to-teal-700/90"
    : "from-indigo-500 via-violet-600 to-purple-700 text-white border-indigo-500/25 shadow-indigo-500/10 dark:from-indigo-500/90 dark:via-violet-600/90 dark:to-purple-700/90";

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer border rounded-2xl flex flex-col justify-between h-[210px] bg-gradient-to-br",
        cardGradient,
        isDefault
          ? "ring-2 ring-amber-400 dark:ring-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
          : "border-white/10 dark:border-white/5"
      )}
    >
      <Link href={`/account/${id}`} className="flex flex-col justify-between h-full w-full p-5">
        
        {/* Virtual Card Header */}
        <div className="flex justify-between items-start w-full">
          <div className="space-y-0.5">
            <span className="text-[10px] tracking-widest font-black uppercase text-white/60">
              WELTH PLATINUM
            </span>
            <CardTitle className="text-lg font-bold capitalize text-white truncate max-w-[150px]">
              {name}
            </CardTitle>
          </div>
          
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {isDefault && (
              <Badge className="bg-amber-400 text-neutral-900 border-none hover:bg-amber-400 font-bold text-[9px] px-2 py-0.5 shadow-sm rounded-full">
                DEFAULT
              </Badge>
            )}
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-amber-400 data-[state=unchecked]:bg-white/20"
            />
          </div>
        </div>

        {/* Card Graphics: Chip and NFC */}
        <div className="flex items-center gap-2.5 my-3 opacity-90">
          {/* Card Chip graphic */}
          <div className="w-9 h-7 bg-amber-200/95 dark:bg-amber-300/90 rounded-md border border-white/20 relative shadow-sm overflow-hidden flex flex-col justify-between p-1">
            <div className="grid grid-cols-3 gap-0.5 h-full w-full opacity-60">
              <div className="border-r border-b border-neutral-800/20"></div>
              <div className="border-r border-b border-neutral-800/20"></div>
              <div className="border-b border-neutral-800/20"></div>
              <div className="border-r border-neutral-800/20"></div>
              <div className="border-r border-neutral-800/20"></div>
              <div className="border-neutral-800/20"></div>
            </div>
            <div className="absolute inset-2 border border-neutral-800/10 rounded-sm bg-amber-400/20"></div>
          </div>
          
          {/* NFC Contactless Wave */}
          <Wifi className="h-5 w-5 text-white/60 rotate-90" />
        </div>

        {/* Card Number & Balance */}
        <div className="space-y-1">
          <div className="text-2xl font-extrabold tracking-wide text-white drop-shadow-sm">
            ${parseFloat(balance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="flex justify-between items-center text-[10px] text-white/70 font-semibold tracking-wider uppercase">
            <span>
              {type} ACCOUNT
            </span>
            {_count?.transactions !== undefined && (
              <span className="bg-white/10 dark:bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                {_count.transactions} {_count.transactions === 1 ? "Tx" : "Txs"}
              </span>
            )}
          </div>
        </div>

      </Link>
    </Card>
  );
}