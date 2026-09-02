import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
import Link from "next/link";
import { ArrowLeft, CreditCard, Sparkles, Wifi, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AccountPage({ params }) {
  const { id } = await params;
  let accountData = null;

  try {
    accountData = await getAccountWithTransactions(id);
  } catch (e) {
    console.error("Failed to fetch account:", e);
  }

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  const isSavings = account.type === "SAVINGS";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 md:px-8 relative overflow-hidden">
      {/* Soft Ambient Light Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Back Link */}
        <div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl text-xs font-bold">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Account Virtual Card Banner */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-bold uppercase tracking-wider">
                {account.type} Account
              </Badge>
              {account.isDefault && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-xs font-bold">
                  Primary Default
                </Badge>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 capitalize">
              {account.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Institutional Ledger • 256-Bit Hardware Encrypted</span>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left md:text-right space-y-1 min-w-[220px]">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Available Balance
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              ${parseFloat(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              {account._count?.transactions || transactions.length} Logged Transactions
            </p>
          </div>
        </div>

        {/* Account Chart Visualization */}
        <Suspense
          fallback={<div className="h-48 flex items-center justify-center"><BarLoader width={"100%"} color="#059669" /></div>}
        >
          <AccountChart transactions={transactions} />
        </Suspense>

        {/* Transaction Table */}
        <Suspense
          fallback={<div className="h-48 flex items-center justify-center"><BarLoader width={"100%"} color="#059669" /></div>}
        >
          <TransactionTable transactions={transactions} />
        </Suspense>

      </div>
    </div>
  );
}
