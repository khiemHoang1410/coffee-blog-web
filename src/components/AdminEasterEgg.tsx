"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";

/**
 * Click vào copyright text 5 lần liên tiếp trong 3 giây
 * để hiện link vào Sanity Studio.
 */
export default function AdminEasterEgg() {
  const [showLink, setShowLink] = useState(false);
  const clicksRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    if (showLink) return;

    clicksRef.current += 1;

    // Reset timer mỗi lần click
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      clicksRef.current = 0;
      timerRef.current = null;
    }, 3000);

    if (clicksRef.current >= 5) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      clicksRef.current = 0;
      setShowLink(true);
    }
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
