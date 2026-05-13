"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";

/**
 * Click vào copyright text 5 lần liên tiếp trong 3 giây
 * để hiện link vào Sanity Studio.
 */
export default function AdminEasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [showLink, setShowLink] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    if (showLink) return;

    setClicks((prev) => {
      const next = prev + 1;

      // Reset timer mỗi lần click
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setClicks(0);
        timerRef.current = null;
      }, 3000);

      if (next >= 5) {
        clearTimeout(timerRef.current!);
        timerRef.current = null;
        setShowLink(true);
        return 0;
      }

      return next;
    });
  }, [showLink]);

  return (
    <span className="inline-flex items-center gap-3">
      <span
        onClick={handleClick}
        className="cursor-default select-none"
        title=""
      >
        © {new Date().getFullYear()} Café Stories. All rights reserved.
      </span>

      {showLink && (
        <Link
          href="/studio"
          className="text-brand-accent/60 hover:text-brand-accent transition-colors underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Studio ↗
        </Link>
      )}
    </span>
  );
}
