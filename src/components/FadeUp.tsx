"use client";

import { useEffect, useRef } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  as?: keyof JSX.IntrinsicElements;
}

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className={`scroll-animate ${className}`}>
      {children}
    </Tag>
  );
}
