import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  // Dùng date-based API version để tránh breaking changes
  apiVersion: "2024-01-01",
  // CDN caching cho production; tắt khi cần data real-time (preview mode)
  useCdn: process.env.NODE_ENV === "production",
});

/**
 * Fetch từ Sanity với ISR revalidate mỗi 60 giây.
 * Mọi query đều đi qua đây để đảm bảo caching nhất quán.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
  });
}
