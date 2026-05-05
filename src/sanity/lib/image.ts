import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

/**
 * Build URL ảnh từ Sanity image reference.
 *
 * @example
 * urlFor(post.thumbnail).width(800).height(450).format("webp").url()
 */
export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source).auto("format");
}
