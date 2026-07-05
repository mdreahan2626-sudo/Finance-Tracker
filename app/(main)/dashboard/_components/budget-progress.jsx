"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, PiggyBank, ArrowDownRight, Sparkles, AlertTriangle } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const remaining = initialBudget ? initialBudget.amount - currentExpenses : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  // Determine indicator style and alert messages
  let progressColor = "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
  let alertBanner = null;

  if (percentUsed >= 100) {
    progressColor = "bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.4)]";
    alertBanner = (
      <div className="flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-500/10 dark:bg-red-500/15 p-3 rounded-lg border border-red-500/20">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>You have exceeded your monthly budget by ${Math.abs(remaining).toFixed(2)}!</span>
      </div>
    );
  } else if (percentUsed >= 90) {
    progressColor = "bg-gradient-to-r from-rose-400 to-red-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]";
    alertBanner = (
      <div className="flex items-center gap-2 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-500/15 p-3 rounded-lg border border-rose-500/20">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>Critical Warning: You've used {percentUsed.toFixed(0)}% of your monthly budget.</span>
      </div>
    );
  } else if (percentUsed >= 75) {
    progressColor = "bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]";
    alertBanner = (
      <div className="flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/15 p-3 rounded-lg border border-amber-500/20">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>Warning: You have used {percentUsed.toFixed(0)}% of your budget. Slow down spending.</span>
      </div>
    );
  } else if (initialBudget) {
    alertBanner = (
      <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/15 p-3 rounded-lg border border-emerald-500/20">
        <Sparkles className="h-4 w-4 shrink-0" />
        <span>Budget is in a healthy state. You are on track this month!</span>
      </div>
    );
  }

  return (
    <Card className="relative overflow-hidden border border-border/80 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-transparent shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex-1">
          <CardTitle className="text-base font-bold tracking-tight">
            Monthly Budget Optimizer
          </CardTitle>
          <CardDescription className="text-xs mt-1">
            Track, adjust, and limit your monthly expenses for the default account.
          </CardDescription>
        </div>

        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-28 h-8 text-sm"
                placeholder="Amount"
                autoFocus
                disabled={isLoading}
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-green-600 border-green-500/20 bg-green-500/5 hover:bg-green-500/10"
                onClick={handleUpdateBudget}
                disabled={isLoading}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-red-600 border-red-500/20 bg-red-500/5 hover:bg-red-500/10"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-8 text-xs font-semibold gap-1"
            >
              <Pencil className="h-3 w-3" />
              {initialBudget ? "Edit Budget" : "Set Budget"}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!initialBudget ? (
          <div className="text-center py-6 border border-dashed rounded-xl bg-muted/20">
            <PiggyBank className="h-10 w-10 text-muted-foreground/60 mx-auto mb-2" />
            <p className="text-sm font-semibold">No Monthly Budget Set</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 px-4">
              Set up a monthly spending limit to manage your wealth responsibly and receive real-time updates.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 3-Column Summary Stats */}
            <div className="grid grid-cols-3 gap-2 text-center bg-muted/30 dark:bg-muted/10 p-3 rounded-xl border">
              <div>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Total Limit</p>
                <p className="text-base font-bold mt-0.5 text-foreground">
                  ${initialBudget.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="border-x">
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Spent</p>
                <p className="text-base font-bold mt-0.5 text-rose-500">
                  ${currentExpenses.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  {remaining >= 0 ? "Remaining" : "Over Budget"}
                </p>
                <p className={`text-base font-bold mt-0.5 ${remaining >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  ${Math.abs(remaining).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Custom Progress Bar Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-medium">Spending Progress</span>
                <span className="font-semibold text-foreground">
                  {percentUsed.toFixed(1)}% used
                </span>
              </div>
              <Progress
                value={percentUsed > 100 ? 100 : percentUsed}
                className="h-3 bg-muted/60 dark:bg-muted/20"
                extraStyles={progressColor}
              />
            </div>

            {/* Warning / Health Status Banner */}
            {alertBanner}
          </div>
        )}
      </CardContent>
    </Card>
  );
}