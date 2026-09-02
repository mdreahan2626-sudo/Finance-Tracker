import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Wallet, TrendingUp, TrendingDown, PiggyBank, Sparkles, ShieldCheck } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import { checkUser } from "@/lib/checkUser";
import Exporter from "@/components/exporter";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  let accounts = [];
  let transactions = [];
  let user = null;

  try {
    const results = await Promise.all([
      getUserAccounts(),
      getDashboardData(),
      checkUser(),
    ]);
    accounts = results[0] || [];
    transactions = results[1] || [];
    user = results[2];
  } catch (error) {
    redirect("/sign-in");
  }

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    try {
      budgetData = await getCurrentBudget(defaultAccount.id);
    } catch (e) {
      console.error("Budget fetch error:", e);
    }
  }

  const currentDate = new Date();
  const totalBalance = accounts?.reduce((sum, acc) => sum + parseFloat(acc.balance || 0), 0) || 0;

  const currentMonthTransactions = transactions?.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  }) || [];

  const monthlyIncome = currentMonthTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const monthlyExpense = currentMonthTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const netSavings = monthlyIncome - monthlyExpense;
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpense) / monthlyIncome) * 100 : 0;

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 md:px-8 relative overflow-hidden">
      
      {/* Soft Ambient Light Glow Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Welcome / Header Section with Exporter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/80 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Live Portfolio Stream</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              Welcome back, {user?.name?.split(" ")[0] || "Trader"} 👋
            </h1>
            <p className="text-sm text-slate-500">
              Financial intelligence overview for <span className="font-semibold text-slate-700">{formattedDate}</span>
            </p>
          </div>

          {/* Exporter Action Bar */}
          <div className="flex items-center gap-3">
            <Exporter />
          </div>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Total Net Balance */}
          <Card className="relative overflow-hidden border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Balance
              </CardTitle>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Wallet className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Combined balance across all accounts
              </p>
            </CardContent>
          </Card>

          {/* Monthly Income */}
          <Card className="relative overflow-hidden border border-emerald-200 bg-emerald-50/40 backdrop-blur-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Monthly Inflow
              </CardTitle>
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-700">
                +${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-emerald-600 font-medium">
                Deposited this calendar month
              </p>
            </CardContent>
          </Card>

          {/* Monthly Expenses */}
          <Card className="relative overflow-hidden border border-rose-200 bg-rose-50/40 backdrop-blur-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Monthly Outflow
              </CardTitle>
              <div className="p-2 rounded-xl bg-rose-100 text-rose-700 border border-rose-200">
                <TrendingDown className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-rose-600">
                -${monthlyExpense.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-rose-600 font-medium">
                Spent this calendar month
              </p>
            </CardContent>
          </Card>

          {/* Savings & Rate */}
          <Card className="relative overflow-hidden border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Net Savings
              </CardTitle>
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
                <PiggyBank className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className={`text-2xl sm:text-3xl font-black tracking-tight ${netSavings >= 0 ? "text-teal-700" : "text-rose-600"}`}>
                {netSavings >= 0 ? "+" : "-"}${Math.abs(netSavings).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Savings rate: <span className="font-bold text-slate-800">{savingsRate.toFixed(1)}%</span> of income
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Progress */}
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />

        {/* Dashboard Overview */}
        <DashboardOverview
          accounts={accounts || []}
          transactions={transactions || []}
        />

        {/* Accounts Grid Title */}
        <div className="space-y-1 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">Your Connected Accounts</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Click any virtual account card to view its transaction history or change your default account.
          </p>
        </div>

        {/* Accounts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-dashed border-2 border-slate-300 hover:border-emerald-500 group bg-white/60 hover:bg-white flex flex-col justify-center min-h-[210px] rounded-2xl">
              <CardContent className="flex flex-col items-center justify-center text-slate-500 h-full py-6">
                <div className="p-3.5 rounded-full bg-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 text-slate-600 transition-all duration-300 mb-3 shadow-xs">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Add New Account</p>
                <p className="text-xs text-slate-500 mt-1">Create Savings or Current Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
          {accounts?.length > 0 &&
            accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>
    </div>
  );
}
