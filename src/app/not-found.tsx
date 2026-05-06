import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Không tìm thấy trang",
};

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Số 404 lớn làm background decoration */}
      <div className="relative">
        <p className="text-[10rem] md:text-[14rem] font-display font-light text-brand-border select-none leading-none">
          404
        </p>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em]">
            Trang không tồn tại
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-brand-text">
            Tách cà phê này đã
            <span className="italic text-brand-accent"> thất lạc</span>
          </h1>
        </div>
      </div>

      <p className="text-brand-muted text-sm max-w-sm leading-relaxed -mt-4 mb-10">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
        Hãy quay lại và thử một trang khác nhé.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent2 text-brand-bg font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide hover:scale-[1.02]"
        >
          Về trang chủ
        </Link>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 border border-brand-border hover:border-brand-accent/50 text-brand-muted hover:text-brand-text font-medium px-8 py-3.5 rounded-full transition-all duration-300 text-sm"
        >
          Xem Menu
        </Link>
      </div>
    </main>
  );
}
