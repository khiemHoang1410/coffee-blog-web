"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

/**
 * Click vào copyright text 5 lần liên tiếp trong 3 giây
 * để hiện link vào Sanity Studio.
 */
export default function AdminEasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [showLink, setShowLink] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    if (showLink) return;

    setClicks((prev) => {
      const next = prev + 1;

      // Reset timer mỗi lần click
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        setClicks(0);
      }, 3000);
      setTimer(newTimer);

      if (next >= 5) {
        setShowLink(true);
        clearTimeout(newTimer);
        setTimer(null);
        return 0;
      }

      return next;
    });
  }, [showLink, timer]);

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
