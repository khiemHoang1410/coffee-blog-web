"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** How much the image moves relative to scroll (0 = none, 0.3 = subtle) */
  speed?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Ảnh di chuyển chậm hơn trang khi scroll — hiệu ứng parallax.
 */
export default function ParallaxImage({
  src,
  alt,
  speed = 0.25,
  className = "",
  priority = false,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const viewH = window.innerHeight;
        // progress: -1 (above) → 0 (center) → 1 (below)
        const progress = (rect.top + rect.height / 2 - viewH / 2) / viewH;
        const offset = progress * speed * 100;
        img.style.transform = `translateY(${offset}%)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div
        ref={imgRef}
        className="relative w-full h-[115%] -top-[7.5%]"
        style={{ willChange: "transform" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
