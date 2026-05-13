"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Về chúng tôi" },
  { href: "/menu", label: "Menu" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Liên hệ" },
] as const;

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Đóng menu khi chuyển trang
  useEffect(() => setOpen(false), [pathname]);

  // Khoá scroll + Escape key khi menu mở
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // Màu hardcode theo theme — tránh bị override bởi hero-dark scope
  const isDark = !mounted || resolvedTheme === "dark";
  const drawerBg    = isDark ? "#111a11" : "#ffffff";
  const drawerBorder = isDark ? "#1e3020" : "#c8e6c0";
  const textColor   = isDark ? "#e8f5e2" : "#1a2e1a";
  const mutedColor  = isDark ? "#7aaa72" : "#4a7a42";
  const accentColor = isDark ? "#a8e63d" : "#5cb85c";

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Đóng menu" : "Mở menu"}
        aria-expanded={open}
        className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
      >
        <span
          className="block w-5 h-px transition-all duration-300 origin-center"
          style={{
            backgroundColor: textColor,
            transform: open ? "rotate(45deg) translateY(6px)" : "none",
          }}
        />
        <span
          className="block h-px transition-all duration-300"
          style={{
            backgroundColor: textColor,
            width: open ? "0" : "16px",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block w-5 h-px transition-all duration-300 origin-center"
          style={{
            backgroundColor: textColor,
            transform: open ? "rotate(-45deg) translateY(-6px)" : "none",
          }}
        />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className="md:hidden fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Drawer — hardcode màu để không bị ảnh hưởng bởi hero scope */}
      <div
        className="md:hidden fixed top-0 right-0 h-full w-72 z-50 flex flex-col transition-transform duration-300 ease-out"
        style={{
          backgroundColor: drawerBg,
          borderLeft: `1px solid ${drawerBorder}`,
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header drawer */}
        <div
          className="flex items-center justify-between px-6 h-16"
          style={{ borderBottom: `1px solid ${drawerBorder}` }}
        >
          <span
            className="font-display text-lg font-semibold tracking-wide"
            style={{ color: textColor }}
          >
            Café Stories
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Đóng menu"
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors text-sm"
            style={{ color: mutedColor }}
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ href, label }, i) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      color: isActive ? accentColor : mutedColor,
                      backgroundColor: isActive
                        ? `${accentColor}18`
                        : "transparent",
                      transitionDelay: open ? `${i * 40}ms` : "0ms",
                    }}
                  >
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer drawer */}
        <div
          className="px-6 py-5"
          style={{ borderTop: `1px solid ${drawerBorder}` }}
        >
          <div
            className="flex items-center gap-2 mb-3"
          >
            <div className="w-4 h-px" style={{ backgroundColor: accentColor }} />
            <p
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Giờ mở cửa
            </p>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: mutedColor }}>
            Thứ 2–6: 7:00 – 22:00
            <br />
            Thứ 7–CN: 7:00 – 23:00
          </p>
        </div>
      </div>
    </>
  );
}
