import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ChatCoach from "@/components/chat-coach";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welth",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className} bg-background text-foreground transition-colors duration-300`}>
          <ThemeProvider>
            <Header />
            <main className="min-h-screen pt-20">{children}</main>
            <SignedIn>
              <ChatCoach />
            </SignedIn>
            <Toaster richColors />

            <footer className="bg-blue-50 dark:bg-gray-950 py-12 border-t border-blue-100 dark:border-gray-900">
              <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                <p>Made with 💗 by RoadsideCoder</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}