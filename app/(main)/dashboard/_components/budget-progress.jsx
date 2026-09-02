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
  let progressColor = "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm";
  let alertBanner = null;

  if (percentUsed >= 100) {
    progressColor = "bg-gradient-to-r from-rose-500 to-red-600 shadow-sm";
    alertBanner = (
      <div className="flex items-center gap-2 text-xs font-semibold text-red-700 bg-red-50 p-3 rounded-xl border border-red-200">
        <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
        <span>You have exceeded your monthly budget by ${Math.abs(remaining).toFixed(2)}!</span>
      </div>
    );
  } else if (percentUsed >= 90) {
    progressColor = "bg-gradient-to-r from-rose-400 to-red-500 shadow-sm";
    alertBanner = (
      <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
        <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
        <span>Critical Warning: You've used {percentUsed.toFixed(0)}% of your monthly budget.</span>
      </div>
    );
  } else if (percentUsed >= 75) {
    progressColor = "bg-gradient-to-r from-amber-400 to-orange-500 shadow-sm";
    alertBanner = (
      <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
        <span>Warning: You have used {percentUsed.toFixed(0)}% of your budget. Slow down spending.</span>
      </div>
    );
  } else if (initialBudget) {
    alertBanner = (
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
        <Sparkles className="h-4 w-4 shrink-0 text-emerald-600" />
        <span>Budget is in a healthy state. You are on track this month!</span>
      </div>
    );
  }

  return (
    <Card className="relative overflow-hidden border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xs rounded-2xl text-slate-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex-1">
          <CardTitle className="text-base font-black text-slate-950 tracking-tight flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-emerald-600" /> Monthly Budget Optimizer
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-1">
            Track, adjust, and limit your monthly expenses for your default account.
          </CardDescription>
        </div>

        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-28 h-8 text-sm border-slate-300"
                placeholder="Amount"
                autoFocus
                disabled={isLoading}
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-emerald-700 border-emerald-300 bg-emerald-50 hover:bg-emerald-100"
                onClick={handleUpdateBudget}
                disabled={isLoading}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-rose-700 border-rose-300 bg-rose-50 hover:bg-rose-100"
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
              className="h-8 text-xs font-bold gap-1.5 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-xs"
            >
              <Pencil className="h-3 w-3 text-emerald-600" />
              {initialBudget ? "Edit Budget" : "Set Budget"}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {initialBudget ? (
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">
                Spent: <span className="font-bold text-slate-950">${currentExpenses.toFixed(2)}</span>
              </span>
              <span className="text-slate-600">
                Cap: <span className="font-bold text-slate-950">${initialBudget.amount.toFixed(2)}</span>
              </span>
            </div>

            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">
                {percentUsed.toFixed(1)}% consumed
              </span>
              <span className={`font-bold ${remaining >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
                {remaining >= 0 ? `$${remaining.toFixed(2)} remaining` : `-$${Math.abs(remaining).toFixed(2)} over limit`}
              </span>
            </div>

            {alertBanner}
          </div>
        ) : (
          <div className="p-6 text-center border border-dashed border-slate-300 rounded-2xl bg-slate-50/60 text-slate-500 text-xs">
            No budget set yet for your default account. Click "Set Budget" above to start tracking.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
