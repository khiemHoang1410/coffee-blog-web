"use client";

import { useEffect, useRef } from "react";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number; // ms between each child
  delay?: number;   // initial delay
  threshold?: number;
}

/**
 * Wrapper tự động stagger animate tất cả children trực tiếp.
 * Mỗi child cần có class `stagger-item` để nhận animation.
 */
export default function StaggerChildren({
  children,
  className = "",
  stagger = 80,
  delay = 0,
  threshold = 0.1,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>(".stagger-item");
          items.forEach((item, i) => {
            item.style.transitionDelay = `${delay + i * stagger}ms`;
            item.classList.add("in-view");
          });
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, delay, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
