"use client";

import { useEffect, useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  /** "words" | "chars" | "lines" */
  splitBy?: "words" | "chars";
  stagger?: number; // ms between each unit
}

/**
 * Splits text into words or chars and reveals them one by one
 * with a sliding mask effect.
 */
export default function TextReveal({
  children,
  className = "",
  delay = 0,
  splitBy = "words",
  stagger = 60,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const units = el.querySelectorAll<HTMLSpanElement>(".reveal-unit");
          units.forEach((unit, i) => {
            unit.style.transitionDelay = `${delay + i * stagger}ms`;
            unit.classList.add("revealed");
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger]);

  const units =
    splitBy === "chars"
      ? children.split("")
      : children.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={children}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <span className="reveal-unit inline-block translate-y-full opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {unit}
            {splitBy === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
