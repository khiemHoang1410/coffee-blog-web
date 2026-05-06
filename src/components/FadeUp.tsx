"use client";

import { useEffect, useRef } from "react";
import type { ElementType } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  as?: ElementType;
  /** "up" | "down" | "left" | "right" | "scale" | "blur" */
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur";
}

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  direction = "up",
}: FadeUpProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = delay ? `${delay}ms` : "";
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const dirClass = {
    up: "scroll-animate",
    down: "scroll-animate-down",
    left: "scroll-animate-left",
    right: "scroll-animate-right",
    scale: "scroll-animate-scale",
    blur: "scroll-animate-blur",
  }[direction];

  return (
    <Tag ref={ref} className={`${dirClass} ${className}`}>
      {children}
    </Tag>
  );
}
