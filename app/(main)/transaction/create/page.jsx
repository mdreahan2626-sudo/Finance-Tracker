import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Sparkles, Receipt, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AddTransactionPage({ searchParams }) {
  let accounts = [];
  try {
    accounts = await getUserAccounts();
  } catch (error) {
    redirect("/sign-in");
  }

  const resolvedSearchParams = await searchParams;
  const editId = resolvedSearchParams?.edit;

  let initialData = null;
  if (editId) {
    try {
      const transaction = await getTransaction(editId);
      initialData = transaction;
    } catch (e) {
      console.error("Error fetching transaction to edit:", e);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 md:px-8 relative overflow-hidden">
      {/* Soft Ambient Light Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        
        {/* Back Link & Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl text-xs font-bold">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Automated Ledger</span>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
            {editId ? "Edit Transaction" : "Record New Transaction"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Manually log a financial flow or use Gemini AI Vision OCR to extract data from a receipt image.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50">
          <AddTransactionForm
            accounts={accounts}
            categories={defaultCategories}
            editMode={!!editId}
            initialData={initialData}
          />
        </div>

      </div>
    </div>
  );
}
