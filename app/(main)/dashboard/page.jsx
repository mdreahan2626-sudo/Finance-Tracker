import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  const [accounts, transactions, user] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
    currentUser(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  // Calculate statistics across all accounts/transactions for the current month
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

  // Format date nicely
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8 px-4 md:px-6 max-w-7xl mx-auto py-6">
      {/* Welcome / Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
            Welcome back, {user?.firstName || "there"} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's a summary of your financial status for {formattedDate}
          </p>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Net Balance */}
        <Card className="relative overflow-hidden border border-indigo-500/10 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Total Balance
            </CardTitle>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-400">
              <Wallet className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Combined balance of all accounts
            </p>
          </CardContent>
        </Card>

        {/* Monthly Income */}
        <Card className="relative overflow-hidden border border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Monthly Income
            </CardTitle>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
              +${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Earned this calendar month
            </p>
          </CardContent>
        </Card>

        {/* Monthly Expenses */}
        <Card className="relative overflow-hidden border border-rose-500/10 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Monthly Expenses
            </CardTitle>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400">
              <TrendingDown className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400">
              -${monthlyExpense.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Spent this calendar month
            </p>
          </CardContent>
        </Card>

        {/* Savings & Rate */}
        <Card className="relative overflow-hidden border border-sky-500/10 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Net Savings
            </CardTitle>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-500/20 dark:text-sky-400">
              <PiggyBank className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold tracking-tight ${netSavings >= 0 ? "text-sky-600 dark:text-sky-400" : "text-rose-600 dark:text-rose-400"}`}>
              {netSavings >= 0 ? "+" : "-"}${Math.abs(netSavings).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
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
        accounts={accounts}
        transactions={transactions || []}
      />

      {/* Accounts Grid Title */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">Your Accounts</h2>
        <p className="text-sm text-muted-foreground">
          Manage your default payment options and settings.
        </p>
      </div>

      {/* Accounts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-dashed border-2 border-muted-foreground/20 hover:border-primary/40 group bg-transparent flex flex-col justify-center min-h-[160px]">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full py-6">
              <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 mb-3">
                <Plus className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold group-hover:text-primary transition-colors">Add New Account</p>
              <p className="text-xs text-muted-foreground/75 mt-1">Create savings or current account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
}