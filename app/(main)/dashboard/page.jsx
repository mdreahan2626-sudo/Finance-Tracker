import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import { checkUser } from "@/lib/checkUser";
import Exporter from "@/components/exporter";

export default async function DashboardPage() {
  const [accounts, transactions, user] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
    checkUser(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
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
    <div className="space-y-8 px-4 md:px-6 max-w-7xl mx-auto py-6 text-slate-100">
      {/* Welcome / Header Section with Exporter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here's a summary of your financial status for {formattedDate}
          </p>
        </div>

        {/* One-Click RAG LangChain PDF & CSV Exporter Action Bar */}
        <Exporter />
      </div>

      {/* Summary Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Net Balance */}
        <Card className="relative overflow-hidden border border-indigo-500/20 bg-slate-900/60 backdrop-blur-xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-400">
              Total Balance
            </CardTitle>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Wallet className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-white">
              ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Combined balance of all accounts
            </p>
          </CardContent>
        </Card>

        {/* Monthly Income */}
        <Card className="relative overflow-hidden border border-emerald-500/20 bg-slate-900/60 backdrop-blur-xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-400">
              Monthly Income
            </CardTitle>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-emerald-400">
              +${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Earned this calendar month
            </p>
          </CardContent>
        </Card>

        {/* Monthly Expenses */}
        <Card className="relative overflow-hidden border border-rose-500/20 bg-slate-900/60 backdrop-blur-xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-400">
              Monthly Expenses
            </CardTitle>
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <TrendingDown className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-rose-400">
              -${monthlyExpense.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Spent this calendar month
            </p>
          </CardContent>
        </Card>

        {/* Savings & Rate */}
        <Card className="relative overflow-hidden border border-sky-500/20 bg-slate-900/60 backdrop-blur-xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-400">
              Net Savings
            </CardTitle>
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
              <PiggyBank className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold tracking-tight ${netSavings >= 0 ? "text-sky-400" : "text-rose-400"}`}>
              {netSavings >= 0 ? "+" : "-"}${Math.abs(netSavings).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Savings rate: {savingsRate.toFixed(1)}% of income
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
      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-white">Your Accounts</h2>
        <p className="text-sm text-slate-400">
          Manage your default payment options and settings.
        </p>
      </div>

      {/* Accounts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-dashed border-2 border-slate-800 hover:border-blue-500/50 group bg-transparent flex flex-col justify-center min-h-[160px]">
            <CardContent className="flex flex-col items-center justify-center text-slate-400 h-full py-6">
              <div className="p-3 rounded-full bg-slate-900 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all duration-300 mb-3">
                <Plus className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold group-hover:text-blue-400 transition-colors">Add New Account</p>
              <p className="text-xs text-slate-500 mt-1">Create savings or current account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts?.length > 0 &&
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
}