import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/components/session-provider";
import ChatCoach from "@/components/chat-coach";

export const metadata = {
  title: "Welth | AI Financial Management",
  description: "Next-generation AI wealth management platform with live 3D analytics",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className="font-sans bg-slate-50 text-slate-900 transition-colors duration-300 antialiased selection:bg-emerald-500 selection:text-white">
          <ThemeProvider>
            <Header />
            <main className="min-h-screen pt-16 bg-slate-50">{children}</main>
            
            {/* Corner Floating Customer Service Chatbot Widget */}
            <ChatCoach />

            <Toaster richColors />

            <footer className="bg-white py-12 border-t border-slate-200">
              <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
                <p>Made with 💗 for Smart Wealth Management</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
