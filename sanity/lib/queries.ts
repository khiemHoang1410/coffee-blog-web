import type { SanityPost, SanityMenuItem, SanitySiteSettings } from "@/types";
import { sanityFetch } from "./client";

// ─── Field projections để tái sử dụng ────────────────────────────────────────

const postFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  description,
  thumbnail { asset, alt },
  tags,
  author,
  seoKeywords,
  seoDescription
`;

const menuItemFields = `
  _id,
  name,
  "slug": slug.current,
  category,
  price,
  description,
  image { asset, alt },
  featured,
  available,
  order
`;

// ─── Blog Post Queries ────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<SanityPost[]> {
  return sanityFetch<SanityPost[]>(
    `*[_type == "post"] | order(publishedAt desc) { ${postFields} }`
  );
}

export async function getPostBySlug(
  slug: string
): Promise<SanityPost | null> {
  return sanityFetch<SanityPost | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      ${postFields},
      body
    }`,
    { slug }
  );
}

export async function getAllSlugs(): Promise<string[]> {
  const results = await sanityFetch<Array<{ slug: string }>>(
    `*[_type == "post"] { "slug": slug.current }`
  );
  return results.map((r) => r.slug);
}

// ─── Menu Item Queries ────────────────────────────────────────────────────────

export async function getAllMenuItems(): Promise<SanityMenuItem[]> {
  return sanityFetch<SanityMenuItem[]>(
    `*[_type == "menuItem" && available == true] | order(order asc, name asc) { ${menuItemFields} }`
  );
}

export async function getMenuItemsByCategory(
  category: string
): Promise<SanityMenuItem[]> {
  return sanityFetch<SanityMenuItem[]>(
    `*[_type == "menuItem" && category == $category && available == true] | order(order asc, name asc) { ${menuItemFields} }`,
    { category }
  );
}

export async function getFeaturedMenuItems(): Promise<SanityMenuItem[]> {
  return sanityFetch<SanityMenuItem[]>(
    `*[_type == "menuItem" && featured == true && available == true] | order(order asc) { ${menuItemFields} }`
  );
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityFetch<SanitySiteSettings | null>(
    `*[_type == "siteSettings"][0] {
      siteName,
      tagline,
      description,
      address,
      phone,
      openingHours,
      heroImage { asset, alt },
      storyContent
    }`
  );
}
