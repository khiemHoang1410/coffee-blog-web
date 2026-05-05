import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = imageUrlBuilder(client);

/**
 * Trả về image URL builder cho Sanity image asset.
 *
 * Dùng: urlFor(post.thumbnail).width(800).format("webp").url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
