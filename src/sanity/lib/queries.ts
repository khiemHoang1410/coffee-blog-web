import { groq } from "next-sanity";
import { sanityFetch } from "./client";
import type {
  SanityPost,
  SanityMenuItem,
  SanitySiteSettings,
} from "@/types";

// ─── GROQ Queries ──────────────────────────────────────────────────────────

/** List bài viết — không lấy body (nhẹ payload) */
const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    description,
    thumbnail { ..., "alt": coalesce(alt, "") },
    tags,
    author,
    seoKeywords,
    seoDescription
  }
`;

/** Một bài viết cụ thể — kèm body */
const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    description,
    thumbnail { ..., "alt": coalesce(alt, "") },
    tags,
    author,
    seoKeywords,
    seoDescription,
    body
  }
`;

/** N bài viết mới nhất — dùng cho homepage */
const latestPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    description,
    thumbnail { ..., "alt": coalesce(alt, "") }
  }
`;

/** Slug list cho generateStaticParams */
const allSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

/** Dữ liệu tối thiểu cho sitemap */
const allPostsForSitemapQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt
  }
`;

const allMenuItemsQuery = groq`
  *[_type == "menuItem" && available == true] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    price,
    description,
    image { ..., "alt": coalesce(alt, "") },
    featured,
    available,
    order
  }
`;

const menuItemsByCategoryQuery = groq`
  *[_type == "menuItem" && available == true && category == $category] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    price,
    description,
    image { ..., "alt": coalesce(alt, "") },
    featured,
    available,
    order
  }
`;

const featuredMenuItemsQuery = groq`
  *[_type == "menuItem" && featured == true && available == true] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    price,
    description,
    image { ..., "alt": coalesce(alt, "") },
    featured,
    available,
    order
  }
`;

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    address,
    phone,
    openingHours,
    heroImage { ..., "alt": coalesce(alt, "") },
    storyContent
  }
`;

// ─── Wrapper Functions ─────────────────────────────────────────────────────

export async function getAllPosts(): Promise<SanityPost[]> {
  return sanityFetch<SanityPost[]>({
    query: allPostsQuery,
    tags: ["post"],
  });
}

export async function getLatestPosts(limit: number = 3): Promise<SanityPost[]> {
  return sanityFetch<SanityPost[]>({
    query: latestPostsQuery,
    params: { limit },
    tags: ["post"],
  });
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityFetch<SanityPost | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post", `post:${slug}`],
  });
}

export async function getAllSlugs(): Promise<string[]> {
  return sanityFetch<string[]>({
    query: allSlugsQuery,
    tags: ["post"],
  });
}

export async function getAllPostsForSitemap(): Promise<
  { slug: string; publishedAt: string | null }[]
> {
  return sanityFetch({
    query: allPostsForSitemapQuery,
    tags: ["post"],
  });
}

export async function getAllMenuItems(): Promise<SanityMenuItem[]> {
  return sanityFetch<SanityMenuItem[]>({
    query: allMenuItemsQuery,
    tags: ["menuItem"],
  });
}

export async function getMenuItemsByCategory(
  category: string,
): Promise<SanityMenuItem[]> {
  return sanityFetch<SanityMenuItem[]>({
    query: menuItemsByCategoryQuery,
    params: { category },
    tags: ["menuItem", `menuItem:${category}`],
  });
}

export async function getFeaturedMenuItems(): Promise<SanityMenuItem[]> {
  return sanityFetch<SanityMenuItem[]>({
    query: featuredMenuItemsQuery,
    tags: ["menuItem"],
  });
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityFetch<SanitySiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });
}
