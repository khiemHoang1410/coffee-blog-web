import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Café Stories — Specialty Coffee",
  description:
    "Chào mừng bạn đến với Café Stories — nơi mỗi tách cà phê là một câu chuyện. Specialty coffee được tuyển chọn kỹ lưỡng từ các farm uy tín.",
};

export default async function HomePage() {
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative bg-brand-bg text-brand-text min-h-[85vh] flex items-center">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600"
            alt="Café background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/20 via-transparent to-brand-bg/80" />

        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <FadeUp>
            <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em] mb-6">
              Specialty Coffee
            </p>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6 text-brand-text">
              Mỗi tách cà phê
              <br />
              <span className="text-brand-accent font-semibold italic">
                là một câu chuyện
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-brand-text/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Chúng tôi tìm kiếm những hạt cà phê tốt nhất từ các farm uy tín,
              rang tươi và pha chế với tình yêu mỗi ngày.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/menu"
                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-bg font-semibold px-8 py-3 rounded transition-colors text-sm tracking-wide"
              >
                Xem Menu
              </Link>
              <Link
                href="/about"
                className="border border-brand-text/20 hover:border-brand-accent text-brand-text/70 hover:text-brand-accent font-semibold px-8 py-3 rounded transition-colors text-sm tracking-wide"
              >
                Câu chuyện của chúng tôi
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-[#111111] py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              title: "Nguồn gốc minh bạch",
              desc: "Mỗi hạt đều có thể truy xuất đến trang trại cụ thể.",
            },
            {
              title: "Rang tươi hàng tuần",
              desc: "Chúng tôi rang nhỏ lô để đảm bảo độ tươi tối ưu.",
            },
            {
              title: "Pha chế tỉ mỉ",
              desc: "Barista được đào tạo bài bản, yêu nghề và yêu cà phê.",
            },
          ].map((item, i) => (
            <FadeUp key={item.title} delay={i * 120}>
              <div className="px-4">
                <div className="w-px h-8 bg-brand-accent mx-auto mb-6" />
                <h3 className="font-display text-brand-text text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Latest Posts ── */}
      {latestPosts.length > 0 && (
        <section className="bg-brand-bg py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em] mb-2">
                  Journal
                </p>
                <h2 className="font-display text-3xl font-semibold text-brand-text">
                  Bài viết mới nhất
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-brand-muted hover:text-brand-accent font-medium text-sm transition-colors"
              >
                Xem tất cả →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {latestPosts.map((post, i) => {
                const thumbUrl = post.thumbnail
                  ? urlFor(post.thumbnail).width(600).height(400).format("webp").url()
                  : null;

                return (
                  <FadeUp key={post._id} delay={i * 120}>
                    <article className="group">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block relative h-48 overflow-hidden rounded mb-4"
                      >
                        {thumbUrl ? (
                          <Image
                            src={thumbUrl}
                            alt={post.thumbnail?.alt ?? post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-brand-surface" />
                        )}
                      </Link>
                      <div>
                        <p className="text-brand-accent text-xs mb-1">
                          {formatDate(post.publishedAt)}
                        </p>
                        <h3 className="font-display text-brand-text text-lg font-semibold leading-snug mb-2 group-hover:text-brand-accent transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-brand-muted text-xs line-clamp-2 leading-relaxed">
                          {post.description}
                        </p>
                      </div>
                    </article>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-brand-surface border-y border-[#2A1F10] py-20 px-4 text-center">
        <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em] mb-4">
          Ghé thăm chúng tôi
        </p>
        <h2 className="font-display text-4xl font-light text-brand-text mb-6">
          Một tách cà phê đang chờ bạn
        </h2>
        <Link
          href="/contact"
          className="inline-block border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-bg font-semibold px-8 py-3 rounded transition-colors text-sm tracking-wide"
        >
          Liên hệ ngay
        </Link>
      </section>
    </main>
  );
}
