import { z } from "zod";

export const transactionSchema = z
  .object({
    type: z.enum(["INCOME", "EXPENSE"]),
    amount: z.string().min(1, "Amount is required"),
    description: z.string().optional(),
    accountId: z.string().min(1, "Account is required"),
    category: z.string().min(1, "Category is required"),
    date: z.date({
      required_error: "Date is required",
    }),
    isRecurring: z.boolean().default(false),
    recurringInterval: z
      .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      if (data.isRecurring && !data.recurringInterval) {
        return false;
      }
      return true;
    },
    {
      message: "Recurring interval is required for recurring transactions",
      path: ["recurringInterval"],
    }
  );

export const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["CURRENT", "SAVINGS"]),
  balance: z.string().min(1, "Initial balance is required"),
  isDefault: z.boolean().default(false),
});
