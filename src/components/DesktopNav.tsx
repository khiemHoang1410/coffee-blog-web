"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden md:block">
      <ul className="flex items-center gap-8">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive
                    ? "text-brand-accent"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-brand-accent transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
