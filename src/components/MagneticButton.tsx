"use client";

import { useRef, MouseEvent, ElementType, ComponentPropsWithRef } from "react";

type MagneticButtonProps<T extends ElementType = "div"> = {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0–1, default 0.35
  as?: T;
} & Omit<ComponentPropsWithRef<T>, "children" | "className" | "as">;

/**
 * Element bị hút nhẹ theo con trỏ chuột — hiệu ứng magnetic.
 */
export default function MagneticButton<T extends ElementType = "div">({
  children,
  className = "",
  strength = 0.35,
  as,
  ...rest
}: MagneticButtonProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <Tag
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
