"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full opacity-0">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full text-muted-foreground hover:text-foreground transition-all duration-300 relative overflow-hidden active:scale-95"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === "dark" ? (
          <Sun className="h-5 w-5 transition-transform duration-500 rotate-0 scale-100 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 transition-transform duration-500 rotate-0 scale-100 text-blue-600" />
        )}
      </div>
    </Button>
  );
}
