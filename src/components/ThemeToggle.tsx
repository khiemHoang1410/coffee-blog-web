"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Tránh hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Chuyển sang light mode" : "Chuyển sang dark mode"}
      className="group relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-surface transition-colors duration-500"
    >
      {/* Track */}
      <div className="relative w-[34px] h-[18px] rounded-full border border-brand-border bg-brand-surface transition-colors duration-300 group-hover:border-brand-accent/50">
        {/* Thumb */}
        <div
          className={`absolute top-[2px] w-[13px] h-[13px] rounded-full transition-all duration-300 ease-out flex items-center justify-center text-[7px]
            ${isDark
              ? "left-[2px] bg-brand-muted"
              : "left-[17px] bg-brand-accent"
            }`}
        >
          {isDark ? "🌙" : "☀️"}
        </div>
      </div>
    </button>
  );
}
