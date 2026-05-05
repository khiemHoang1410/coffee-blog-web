import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Không tìm thấy trang",
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl mb-4">☕</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
      <p className="text-gray-600 mb-8 max-w-sm">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa. Hãy thử quay lại trang chủ.
      </p>
      <Link
        href="/"
        className="bg-coffee-600 hover:bg-coffee-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Về trang chủ
      </Link>
    </main>
  );
}
