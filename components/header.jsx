"use client";

import React from "react";
import { Button } from "./ui/button";
import { 
  PenBox, 
  LayoutDashboard, 
  LogOut,
  UserPlus,
  LogIn
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import AuthModal from "@/components/auth-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200/80 shadow-xs">
      <nav className="container mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              alt="Welth Logo"
              width={200}
              height={60}
              className="h-10 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-600 hover:text-emerald-600 font-semibold text-sm transition-colors">
            Features
          </a>
          <a href="#simulator" className="text-slate-600 hover:text-emerald-600 font-semibold text-sm transition-colors">
            3D Simulator
          </a>
          <a href="#testimonials" className="text-slate-600 hover:text-emerald-600 font-semibold text-sm transition-colors">
            Testimonials
          </a>
        </div>

        {/* Action Buttons & Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {session ? (
            <>
              {/* Dashboard Button */}
              <Link href="/dashboard">
                <Button variant="outline" className="flex items-center gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs">
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>

              {/* Add Transaction Button */}
              <Link href="/transaction/create">
                <Button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20">
                  <PenBox className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Transaction</span>
                </Button>
              </Link>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-slate-200 p-0 overflow-hidden shrink-0 shadow-xs">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User Avatar"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                        {session.user?.name?.[0] || "U"}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border-slate-200 text-slate-800 shadow-xl" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none text-slate-900">{session.user?.name}</p>
                      <p className="text-xs leading-none text-slate-500">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer flex items-center gap-2 text-slate-700 hover:text-slate-900">
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/transaction/create" className="cursor-pointer flex items-center gap-2 text-slate-700 hover:text-slate-900">
                      <PenBox className="w-4 h-4 text-emerald-600" /> Log Transaction
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer text-rose-600 focus:text-rose-700 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Signed-Out State: Dashboard & Add Transaction Trigger AuthModal */}
              <AuthModal defaultTab="login">
                <Button variant="outline" className="flex items-center gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950 shadow-xs">
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </AuthModal>

              {/* Login Button with Modal */}
              <AuthModal defaultTab="login">
                <Button
                  variant="ghost"
                  className="text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-semibold rounded-xl px-3 flex items-center gap-1.5 text-xs sm:text-sm"
                >
                  <LogIn className="w-4 h-4 text-emerald-600" />
                  <span>Log In</span>
                </Button>
              </AuthModal>

              {/* Create New Account Button with Modal */}
              <AuthModal defaultTab="register">
                <Button
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl px-3.5 sm:px-4 text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </Button>
              </AuthModal>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
