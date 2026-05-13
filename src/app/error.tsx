"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * App-level error boundary — hiển thị khi có lỗi runtime (fetch lỗi, crash, v.v.)
 * Phải là Client Component theo yêu cầu của Next.js.
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log lỗi ra console để debug (có thể thay bằng Sentry, v.v.)
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Decoration */}
      <div className="relative">
        <p className="text-[10rem] md:text-[14rem] font-display font-light text-brand-border select-none leading-none">
          Oops
        </p>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em]">
            Có lỗi xảy ra
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-brand-text">
            Tách cà phê này
            <span className="italic text-brand-accent"> bị đổ mất rồi</span>
          </h1>
        </div>
      </div>

      <p className="text-brand-muted text-sm max-w-sm leading-relaxed -mt-4 mb-10">
        Đã có lỗi không mong đợi xảy ra. Bạn có thể thử lại hoặc quay về trang chủ.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent2 text-brand-bg font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide hover:scale-[1.02]"
        >
          Thử lại
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-brand-border hover:border-brand-accent/50 text-brand-muted hover:text-brand-text font-medium px-8 py-3.5 rounded-full transition-all duration-300 text-sm"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
