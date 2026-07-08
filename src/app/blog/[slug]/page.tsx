import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "sanity";
import { getPostBySlug, getAllSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import type { SanityImage } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── Static Generation ────────────────────────────────────────────────────────

export const dynamicParams = true;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Dynamic SEO Metadata ─────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Không tìm thấy bài viết" };

  const url = `${SITE_URL}/blog/${post.slug}`;
  const thumbUrl = post.thumbnail
    ? urlFor(post.thumbnail).width(1200).height(630).format("webp").url()
    : undefined;

  // Dùng seoDescription nếu có, fallback về description
  const metaDescription = post.seoDescription ?? post.description;

  return {
    title: `${post.title} | Vy Coffee`,
    description: metaDescription,
    // seoKeywords hiển thị trong meta keywords
    keywords: post.seoKeywords ?? post.tags,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description: metaDescription,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: thumbUrl
        ? [{ url: thumbUrl, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: metaDescription,
      images: thumbUrl ? [thumbUrl] : undefined,
    },
    alternates: { canonical: url },
  };
}

// ─── PortableText custom components ──────────────────────────────────────────

const bodyComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-brand-text/75 leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-2xl font-bold text-brand-text mt-10 mb-4 border-b border-brand-border pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-xl font-semibold text-brand-text mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-brand-accent bg-brand-surface pl-5 py-3 my-6 italic text-brand-text/70 rounded-r">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-brand-text">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-brand-accent">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-brand-surface text-brand-accent px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string; blank?: boolean };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-brand-accent hover:text-brand-accent/80 underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-1 mb-5 text-brand-text/75">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-1 mb-5 text-brand-text/75">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value: SanityImage & { caption?: string };
    }) => {
      const imageUrl = urlFor(value).width(900).format("webp").url();
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={value.alt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-brand-muted text-xs mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.body) {
    notFound();
  }

  const thumbUrl = post.thumbnail
    ? urlFor(post.thumbnail).width(1600).height(900).format("webp").url()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.description,
    image: thumbUrl,
    author: { "@type": "Person", name: post.author ?? "Vy Coffee" },
    datePublished: post.publishedAt,
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: (post.seoKeywords ?? post.tags ?? []).join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-brand-bg">
        {/* Hero thumbnail */}
        <div className="relative h-52 sm:h-72 md:h-[28rem] w-full bg-brand-surface">
          {thumbUrl && (
            <Image
              src={thumbUrl}
              alt={post.thumbnail?.alt ?? post.title}
              fill
              className="object-cover opacity-60"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg from-10% via-brand-bg/50 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-4 -mt-10 sm:-mt-16 md:-mt-24 relative z-10">
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 mb-12">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-brand-accent border border-brand-accent/30 px-2 py-0.5 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-text leading-tight mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-muted border-b border-brand-border pb-6 mb-8">
              {post.author && (
                <span className="font-medium text-brand-text/70">{post.author}</span>
              )}
              {post.author && <span>·</span>}
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>

            {/* Body — PortableText */}
            <article>
              <PortableText
                value={post.body as PortableTextBlock[]}
                components={bodyComponents}
              />
            </article>
          </div>

          <div className="text-center pb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-accent font-medium transition-colors text-sm"
            >
              ← Quay lại danh sách bài viết
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
