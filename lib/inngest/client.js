import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "finance-platform",
  name: "Finance Platform",
  isDev: process.env.NODE_ENV !== "production",
});