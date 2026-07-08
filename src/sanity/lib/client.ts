import { createClient } from "next-sanity";
import { cache } from "react";

/**
 * Sanity client config — đọc từ env vars.
 * apiVersion fix theo ngày để tránh breaking changes.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-01-01";

if (!projectId) {
  console.warn(
    "[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID chưa được set trong .env.local.\n" +
    "Chạy `npx sanity@latest init --env` hoặc tạo thủ công file .env.local."
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production", // Bật CDN trong production để tối ưu tốc độ, tắt trong dev để cập nhật dữ liệu tức thì
  perspective: "published",
});

/**
 * Fetch wrapper với ISR revalidate 60s.
 * Mọi page server-side query Sanity nên dùng hàm này.
 * Wrap bằng React cache() để dedup trong cùng một request.
 */
export const sanityFetch = cache(async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: 21600, // 6 giờ
      tags,
    },
  });
});
