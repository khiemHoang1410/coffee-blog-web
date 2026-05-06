"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Delay trước khi bắt đầu scramble (ms) */
  delay?: number;
  /** Tốc độ giải mã — ms mỗi frame */
  speed?: number;
  /** Số lần random mỗi ký tự trước khi reveal */
  iterations?: number;
  /** Trigger khi component mount hay khi vào viewport */
  trigger?: "mount" | "viewport";
}

/**
 * Text Scramble — chữ xuất hiện bằng cách "giải mã" từ ký tự random.
 *
 * Hiệu năng:
 * - Chỉ update textContent, không đụng layout
 * - 1 RAF loop, tự dừng khi xong
 * - Respect prefers-reduced-motion: skip thẳng đến text thật
 */
export default function ScrambleText({
  text,
  className = "",
  delay = 0,
  speed = 40,
  iterations = 8,
  trigger = "mount",
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState<string>(() => {
    // SSR: hiện text thật ngay (tránh layout shift)
    return text;
  });
  const rafRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  const runScramble = () => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(text);
      return;
    }

    // Mỗi ký tự có counter riêng: bao nhiêu lần random trước khi lock
    const counters = Array.from({ length: text.length }, () => 0);
    const locked = Array.from({ length: text.length }, () => false);
    let frame = 0;

    const tick = () => {
      frame++;

      // Cứ `speed`ms thì tăng counter
      const shouldAdvance = frame % Math.max(1, Math.round(speed / 16)) === 0;

      const next = text
        .split("")
        .map((char, i) => {
          // Giữ nguyên space
          if (char === " ") return " ";

          if (locked[i]) return char;

          if (shouldAdvance) {
            counters[i]++;
            // Unlock theo thứ tự từ trái sang phải với stagger
            if (counters[i] >= iterations + i * 1.5) {
              locked[i] = true;
              return char;
            }
          }

          // Random char
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayed(next);

      // Dừng khi tất cả đã lock
      if (locked.every(Boolean)) return;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount") {
      timeoutRef.current = setTimeout(runScramble, delay);
    } else {
      // viewport trigger
      const el = containerRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timeoutRef.current = setTimeout(runScramble, delay);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={containerRef}
      className={`font-mono-scramble ${className}`}
      aria-label={text}
    >
      {displayed}
    </span>
  );
}
