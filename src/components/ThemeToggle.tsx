"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Placeholder cùng kích thước để tránh layout shift
  if (!mounted) return <div className="w-[34px] h-[18px]" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Chuyển sang light mode" : "Chuyển sang dark mode"}
      className="group relative flex items-center justify-center"
    >
      {/* Track */}
      <div className="relative w-[34px] h-[18px] rounded-full border border-brand-border bg-brand-surface group-hover:border-brand-accent/50"
        style={{ transition: "border-color 0.3s ease" }}
      >
        {/* Thumb — override global transition để đồng bộ */}
        <div
          className="absolute top-[2px] w-[13px] h-[13px] rounded-full flex items-center justify-center text-[7px] leading-none"
          style={{
            transition: "left 0.3s ease, background-color 0.3s ease",
            left: isDark ? "2px" : "17px",
            backgroundColor: isDark ? "var(--brand-muted)" : "var(--brand-accent)",
          }}
        >
          {isDark ? "🌙" : "☀️"}
        </div>
      </div>
    </button>
  );
}
