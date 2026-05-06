"use client";

import { useRef, MouseEvent } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0–1, default 0.35
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
}

/**
 * Element bị hút nhẹ theo con trỏ chuột — hiệu ứng magnetic.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as: Tag = "div",
  href,
  onClick,
}: MagneticButtonProps) {
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

  const props = {
    ref,
    className: `magnetic-btn ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    ...(href ? { href } : {}),
  };

  return (
    // @ts-expect-error — dynamic tag
    <Tag {...props} style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
      {children}
    </Tag>
  );
}
