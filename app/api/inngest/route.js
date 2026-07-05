import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import {
  helloWorld,
  triggerRecurringTransactions,
  processRecurringTransaction,
  checkBudgetAlerts,
  generateMonthlyReports,
  syncUser,
  sendOtpEmail,
  sendTestAlertEmail,
} from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  servePath: "/api/inngest",
  functions: [
    helloWorld,
    triggerRecurringTransactions,
    processRecurringTransaction,
    checkBudgetAlerts,
    generateMonthlyReports,
    syncUser,
    sendOtpEmail,
    sendTestAlertEmail,
  ],
}); 
