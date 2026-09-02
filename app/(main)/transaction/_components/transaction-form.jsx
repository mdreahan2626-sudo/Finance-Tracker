"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  CalendarIcon, 
  Loader2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Check, 
  CreditCard,
  Layers,
  Repeat,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/lib/schema";
import { ReceiptScanner } from "./recipt-scanner";

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  const handleScanComplete = (scannedData) => {
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        setValue("category", scannedData.category);
      }
      toast.success("Receipt parsed into form");
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/dashboard`);
    }
  }, [transactionResult, transactionLoading, editMode]);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-slate-900">
      
      {/* 1. AI Receipt Scanner Banner */}
      {!editMode && <ReceiptScanner onScanComplete={handleScanComplete} />}

      {/* 2. Interactive Type Switcher (Income vs Expense Segmented Tabs) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Transaction Flow Type
        </label>
        <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setValue("type", "EXPENSE")}
            className={cn(
              "flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200",
              type === "EXPENSE"
                ? "bg-white text-rose-700 shadow-sm border border-slate-200/80 scale-99"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <TrendingDown className="w-4 h-4 text-rose-600" />
            <span>Expense (Outflow)</span>
          </button>

          <button
            type="button"
            onClick={() => setValue("type", "INCOME")}
            className={cn(
              "flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200",
              type === "INCOME"
                ? "bg-white text-emerald-700 shadow-sm border border-slate-200/80 scale-99"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Income (Inflow)</span>
          </button>
        </div>
        {errors.type && (
          <p className="text-xs text-rose-600 font-semibold">{errors.type.message}</p>
        )}
      </div>

      {/* 3. Amount and Target Account */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Amount ($ USD)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
              $
            </span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="pl-8 text-base font-bold bg-slate-50 border-slate-300 rounded-xl h-11 focus-visible:ring-emerald-500"
              {...register("amount")}
            />
          </div>
          {errors.amount && (
            <p className="text-xs text-rose-600 font-semibold">{errors.amount.message}</p>
          )}
        </div>

        {/* Account Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Destination Account
          </label>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}
          >
            <SelectTrigger className="h-11 bg-slate-50 border-slate-300 rounded-xl text-sm font-semibold">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id} className="text-xs font-medium">
                  {account.name} (${parseFloat(account.balance).toFixed(2)})
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button
                  variant="ghost"
                  className="relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 pl-4 pr-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50 outline-none"
                >
                  + Create New Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="text-xs text-rose-600 font-semibold">{errors.accountId.message}</p>
          )}
        </div>
      </div>

      {/* 4. Category & Date */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Category */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Category
          </label>
          <Select
            onValueChange={(value) => setValue("category", value)}
            defaultValue={getValues("category")}
          >
            <SelectTrigger className="h-11 bg-slate-50 border-slate-300 rounded-xl text-sm font-semibold">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {filteredCategories.map((category) => (
                <SelectItem key={category.id} value={category.id} className="text-xs font-medium">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-xs text-rose-600 font-semibold">{errors.category.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Date of Transaction
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-11 pl-3.5 text-left font-semibold bg-slate-50 border-slate-300 rounded-xl text-sm",
                  !date && "text-slate-400"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 text-slate-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border-slate-200" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => setValue("date", date)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-xs text-rose-600 font-semibold">{errors.date.message}</p>
          )}
        </div>
      </div>

      {/* 5. Description */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Description / Note
        </label>
        <Input 
          placeholder="e.g. Figma License, AWS Hosting, Salary Bonus" 
          className="h-11 bg-slate-50 border-slate-300 rounded-xl text-sm"
          {...register("description")} 
        />
        {errors.description && (
          <p className="text-xs text-rose-600 font-semibold">{errors.description.message}</p>
        )}
      </div>

      {/* 6. Recurring Automation Toggle */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Repeat className="w-4 h-4 text-emerald-600" />
            <span>Recurring Transaction Schedule</span>
          </div>
          <p className="text-xs text-slate-500">
            Automatically execute and log this transaction on a recurring cadence
          </p>
        </div>
        <Switch
          checked={isRecurring}
          onCheckedChange={(checked) => setValue("isRecurring", checked)}
          className="data-[state=checked]:bg-emerald-600"
        />
      </div>

      {/* 7. Recurring Interval Selector */}
      {isRecurring && (
        <div className="space-y-2 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Recurring Frequency
          </label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger className="h-11 bg-white border-emerald-300 rounded-xl text-sm font-semibold">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="DAILY">Daily Cycle</SelectItem>
              <SelectItem value="WEEKLY">Weekly Cycle</SelectItem>
              <SelectItem value="MONTHLY">Monthly Cycle (Billing)</SelectItem>
              <SelectItem value="YEARLY">Yearly Cycle (Annual)</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-xs text-rose-600 font-semibold">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

      {/* 8. Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-1/3 h-12 rounded-xl border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="w-full sm:w-2/3 h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-md shadow-emerald-600/20 active:scale-98 transition-all"
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>{editMode ? "Updating Ledger..." : "Writing to Ledger..."}</span>
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Save & Post Transaction"
          )}
        </Button>
      </div>
    </form>
  );
}
