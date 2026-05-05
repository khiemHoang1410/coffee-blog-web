import type { PortableTextBlock } from "sanity";

// ─── Sanity Image ─────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

// ─── Sanity Blog Post ─────────────────────────────────────────────────────────

export interface SanityPost {
  _id: string;
  _type: "post";
  title: string;
  /** GROQ projection trả về string thay vì { current: string } */
  slug: string;
  publishedAt: string;
  description: string;
  thumbnail?: SanityImage;
  tags?: string[];
  author?: string;
  seoKeywords?: string[];
  seoDescription?: string;
  /** Chỉ có khi query getPostBySlug */
  body?: PortableTextBlock[];
}

// ─── Sanity Menu Item ─────────────────────────────────────────────────────────

export interface SanityMenuItem {
  _id: string;
  _type: "menuItem";
  name: string;
  slug?: string;
  category: "espresso" | "pour-over" | "tra" | "khac";
  price: number;
  description?: string;
  image?: SanityImage;
  featured: boolean;
  available: boolean;
  order?: number;
}

// ─── Sanity Site Settings ─────────────────────────────────────────────────────

export interface SanitySiteSettings {
  siteName?: string;
  tagline?: string;
  description?: string;
  address?: string;
  phone?: string;
  openingHours?: string;
  heroImage?: SanityImage;
  storyContent?: PortableTextBlock[];
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}

// ─── Validation Errors ────────────────────────────────────────────────────────

export interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}
