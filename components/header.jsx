import React from "react";
import { Button } from "./ui/button";
import { 
  PenBox, 
  LayoutDashboard, 
  Settings, 
  Menu, 
  ChevronDown, 
  Receipt, 
  PieChart, 
  CreditCard, 
  Cpu, 
  Sparkles 
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";
import ThemeToggle from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              alt="Welth Logo"
              width={200}
              height={60}
              className="h-12 w-auto object-contain dark:invert"
            />
          </div>
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-200 dark:border-gray-800 flex items-center gap-1.5 px-3">
                <Menu size={18} />
                <span className="font-semibold text-sm">Main Menu</span>
                <ChevronDown size={14} className="opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel>Wealth Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/features">
                <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                  <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">Features Hub</span>
                    <span className="text-[10px] text-muted-foreground">View all tools directory</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/features/dashboard">
                <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                  <LayoutDashboard size={16} className="text-blue-600 dark:text-blue-400" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">Financial Cockpit</span>
                    <span className="text-[10px] text-muted-foreground">Aggregated balances & logs</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/features/transaction">
                <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                  <Receipt size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">Log Transaction</span>
                    <span className="text-[10px] text-muted-foreground">Track income & expenses</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/features/budget">
                <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                  <PieChart size={16} className="text-amber-600 dark:text-amber-400" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">Spending Limits</span>
                    <span className="text-[10px] text-muted-foreground">Monthly threshold alerts</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/features/accounts">
                <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                  <CreditCard size={16} className="text-purple-600 dark:text-purple-400" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">Account Ledgers</span>
                    <span className="text-[10px] text-muted-foreground">Manage cash & cards</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/features/inngest">
                <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                  <Cpu size={16} className="text-cyan-600 dark:text-cyan-400" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">Automations</span>
                    <span className="text-[10px] text-muted-foreground">Background chron checker</span>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <SignedIn>
            <Link
              href="/dashboard"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
            >
              <Button variant="outline" className="border-gray-200 dark:border-gray-800">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            
            <Link
              href="/settings"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
            >
              <Button variant="outline" className="border-gray-200 dark:border-gray-800">
                <Settings size={18} />
                <span className="hidden md:inline">Settings</span>
              </Button>
            </Link>

            <a href="/transaction/create">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="border-gray-200 dark:border-gray-800">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;