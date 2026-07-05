import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPaginatedPosts, getPostCount } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import FadeUp from "@/components/FadeUp";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const POSTS_PER_PAGE = 6;

export const metadata: Metadata = {
  title: "Blog | Vy Coffee",
  description:
    "Những câu chuyện về cà phê, hành trình tìm kiếm hạt cà phê specialty và triết lý thưởng thức của chúng tôi.",
  openGraph: {
    title: "Blog | Vy Coffee",
    description:
      "Những câu chuyện về cà phê, hành trình tìm kiếm hạt cà phê specialty và triết lý thưởng thức.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-blog.jpg`, width: 1200, height: 630 }],
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedSearchParams.page ?? "1"));

  // Chạy song song: chỉ tải đúng 6 bài cần + đếm tổng — không tải thừa
  const [paginatedPosts, totalPosts] = await Promise.all([
    getPaginatedPosts(currentPage, POSTS_PER_PAGE),
    getPostCount(),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 text-center border-b border-brand-border">
        <FadeUp>
          <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Journal
          </p>
        </FadeUp>
        <FadeUp delay={100}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-brand-text">
            Vy Coffee
          </h1>
        </FadeUp>
        <FadeUp delay={200}>
          <p className="text-brand-muted text-sm mt-5 max-w-md mx-auto leading-relaxed">
            Những câu chuyện về cà phê, con người và những khoảnh khắc đáng
            trân trọng trong từng tách.
          </p>
        </FadeUp>
      </section>

      {/* Post grid */}
      <section className="max-w-4xl mx-auto px-5 sm:px-4 py-12 sm:py-16">
        {paginatedPosts.length === 0 ? (
          <p className="text-center text-brand-muted py-20">
            Chưa có bài viết nào. Hãy quay lại sớm nhé!
          </p>
        ) : (
          <div>
            <div className="grid gap-10 md:grid-cols-2">
              {paginatedPosts.map((post, i) => {
                const thumbUrl = post.thumbnail
                  ? urlFor(post.thumbnail).width(800).height(500).format("webp").url()
                  : null;

                return (
                  <FadeUp key={post._id} delay={i * 100}>
                    <article className="group">
                      {/* Thumbnail */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block relative aspect-[16/10] overflow-hidden rounded-2xl mb-4 bg-brand-surface"
                      >
                        {thumbUrl && (
                          <Image
                            src={thumbUrl}
                            alt={post.thumbnail?.alt ?? post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        )}
                      </Link>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
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
                      <h2 className="font-display text-xl font-semibold text-brand-text mb-2 leading-snug group-hover:text-brand-accent transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      {/* Description */}
                      <p className="text-brand-muted text-sm line-clamp-2 mb-4 leading-relaxed">
                        {post.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-brand-muted/60 border-t border-brand-border pt-4">
                        {post.author && <span>{post.author}</span>}
                        {post.author && <span>·</span>}
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    </article>
                  </FadeUp>
                );
              })}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <nav className="flex justify-center items-center gap-2 mt-12 sm:mt-16">
                {/* Nút Trước */}
                <Link
                  href={currentPage > 2 ? `/blog?page=${currentPage - 1}` : "/blog"}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-brand-border transition-colors ${
                    currentPage === 1
                      ? "pointer-events-none opacity-40"
                      : "hover:border-brand-accent hover:text-brand-accent text-brand-text"
                  }`}
                  aria-disabled={currentPage === 1}
                >
                  Trước
                </Link>

                {/* Số trang */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNumber = i + 1;
                    const isActive = pageNumber === currentPage;
                    return (
                      <Link
                        key={pageNumber}
                        href={pageNumber === 1 ? "/blog" : `/blog?page=${pageNumber}`}
                        className={`w-9 h-9 flex items-center justify-center text-xs font-semibold rounded-lg border transition-colors ${
                          isActive
                            ? "bg-brand-accent text-brand-bg border-brand-accent"
                            : "border-brand-border hover:border-brand-accent hover:text-brand-accent text-brand-muted"
                        }`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}
                </div>

                {/* Nút Sau */}
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-brand-border transition-colors ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-40"
                      : "hover:border-brand-accent hover:text-brand-accent text-brand-text"
                  }`}
                  aria-disabled={currentPage === totalPages}
                >
                  Sau
                </Link>
              </nav>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
