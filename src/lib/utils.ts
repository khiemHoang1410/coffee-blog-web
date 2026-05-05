import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Gộp Tailwind classes, tự động resolve xung đột (e.g. px-2 vs px-4) */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Chuyển chuỗi ISO date thành ngày đọc được, ví dụ: "15 tháng 3, 2024" */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Validate email format cơ bản */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
