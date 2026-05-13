import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLatestPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import FadeUp from "@/components/FadeUp";
import ScrambleText from "@/components/ScrambleText";

export const metadata: Metadata = {
  title: "Café Stories — Specialty Coffee",
  description:
    "Chào mừng bạn đến với Café Stories — nơi mỗi tách cà phê là một câu chuyện. Specialty coffee được tuyển chọn kỹ lưỡng từ các farm uy tín.",
};

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{backgroundColor: '#0a0f0a'}}>
        {/* Ảnh nền */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600"
            alt="Café background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        {/* Gradient overlay — hardcode tối, không đổi theo theme */}
        <div
          className="absolute inset-0"
          style={{background: 'linear-gradient(135deg, rgba(10,15,10,0.92) 0%, rgba(10,15,10,0.25) 50%, rgba(10,15,10,0.82) 100%)'}}
        />

        {/* Đường kẻ trang trí góc trên trái */}
        <div className="absolute top-0 left-0 w-px h-40 bg-gradient-to-b from-[#a8e63d99] to-transparent ml-12 hidden md:block" />
        <div className="absolute top-0 left-0 h-px w-40 bg-gradient-to-r from-[#a8e63d99] to-transparent mt-12 hidden md:block" />

        <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-8 h-px" style={{backgroundColor: '#a8e63d'}} />
                <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{color: '#a8e63d'}}>
                  Specialty Coffee
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-light leading-[1.05] mb-6 sm:mb-8" style={{color: '#e8f5e2'}}>
                <ScrambleText
                  text="Mỗi tách"
                  delay={200}
                  speed={30}
                  iterations={6}
                  className="block"
                />
                <span className="block font-semibold italic" style={{color: '#a8e63d'}}>
                  <ScrambleText
                    text="cà phê"
                    delay={500}
                    speed={30}
                    iterations={6}
                  />
                </span>
                <ScrambleText
                  text="là một câu chuyện"
                  delay={800}
                  speed={30}
                  iterations={6}
                  className="block text-2xl sm:text-4xl md:text-5xl font-light mt-2 text-[rgba(232,245,226,0.65)]"
                />
              </h1>
            </FadeUp>

            <FadeUp delay={200}>
              <p className="text-sm sm:text-base max-w-md mb-8 sm:mb-12 leading-relaxed" style={{color: '#7aaa72'}}>
                Chúng tôi tìm kiếm những hạt cà phê tốt nhất từ các farm uy tín,
                rang tươi và pha chế với tình yêu mỗi ngày.
              </p>
            </FadeUp>

            <FadeUp delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/menu"
                  className="group relative inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-lg hover:scale-[1.02] transition-all duration-300"
                  style={{backgroundColor: '#a8e63d', color: '#0a0f0a', boxShadow: '0 8px 24px rgba(168,230,61,0.25)'}}
                >
                  Xem Menu
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 font-medium px-8 py-4 rounded-full text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:scale-[1.01]"
                  style={{border: '1px solid rgba(232,245,226,0.2)', color: 'rgba(232,245,226,0.7)'}}
                >
                  Câu chuyện của chúng tôi
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-3" style={{color: 'rgba(122,170,114,0.5)'}}>
          <span className="text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mb-4">Scroll</span>
          <div className="w-px h-16" style={{background: 'linear-gradient(to bottom, rgba(168,230,61,0.5), transparent)'}} />
        </div>
      </section>

      {/* ── Marquee strip ── */}
      <div className="bg-brand-accent py-3 overflow-hidden" style={{backgroundColor: '#a8e63d'}}>
        <div className="marquee-track whitespace-nowrap text-brand-bg text-xs font-semibold uppercase tracking-[0.25em]">
          {Array(8).fill("Specialty Coffee · Rang Tươi · Farm to Cup · Pha Chế Tỉ Mỉ · ").join("")}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="bg-brand-surface py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex items-center gap-4 mb-10 sm:mb-16">
              <div className="w-8 h-px bg-brand-accent" />
              <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em]">
                Tại sao chọn chúng tôi
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-border border border-brand-border">
            {[
              {
                num: "01",
                title: "Nguồn gốc\nminh bạch",
                desc: "Mỗi hạt đều có thể truy xuất đến trang trại cụ thể — chúng tôi biết cà phê đến từ đâu.",
              },
              {
                num: "02",
                title: "Rang tươi\nhàng tuần",
                desc: "Rang nhỏ lô, giao ngay sau rang để bạn luôn có tách cà phê tươi nhất.",
              },
              {
                num: "03",
                title: "Pha chế\ntỉ mỉ",
                desc: "Barista được đào tạo bài bản, yêu nghề — mỗi tách là một tác phẩm nhỏ.",
              },
            ].map((item, i) => (
              <FadeUp key={item.num} delay={i * 120}>
                <div className="bg-brand-surface hover:bg-brand-bg transition-colors duration-300 p-7 sm:p-10 group">
                  <p className="font-mono text-brand-accent/50 text-xs tracking-widest mb-5 sm:mb-6 group-hover:text-brand-accent transition-colors">
                    {item.num}
                  </p>
                  <h3 className="font-display text-brand-text text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 leading-tight whitespace-pre-line">
                    {item.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-6 sm:mt-8 w-0 group-hover:w-8 h-px bg-brand-accent transition-all duration-500" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Posts ── */}
      {latestPosts.length > 0 && (
        <section className="bg-brand-bg py-16 sm:py-24 px-5 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <FadeUp>
              <div className="flex items-end justify-between mb-10 sm:mb-14">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-px bg-brand-accent" />
                    <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em]">
                      Journal
                    </p>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-text">
                    Bài viết mới nhất
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="hidden md:inline-flex items-center gap-2 text-brand-muted hover:text-brand-accent font-medium text-sm transition-colors group"
                >
                  Xem tất cả
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </FadeUp>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              {latestPosts.map((post, i) => {
                const thumbUrl = post.thumbnail
                  ? urlFor(post.thumbnail).width(600).height(400).format("webp").url()
                  : null;

                return (
                  <FadeUp key={post._id} delay={i * 120}>
                    <article className="group flex flex-col h-full bg-brand-surface rounded-2xl overflow-hidden border border-brand-border hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1">
                      {/* Ảnh */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block relative aspect-[3/2] overflow-hidden bg-brand-border"
                      >
                        {thumbUrl ? (
                          <Image
                            src={thumbUrl}
                            alt={post.thumbnail?.alt ?? post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-brand-border" />
                        )}
                      </Link>

                      {/* Nội dung */}
                      <div className="flex flex-col flex-1 p-5">
                        <p className="text-brand-accent text-xs font-medium mb-2 tracking-wide">
                          {formatDate(post.publishedAt)}
                        </p>
                        <h3 className="font-display text-brand-text text-xl font-semibold leading-snug mb-3 group-hover:text-brand-accent transition-colors duration-300">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-brand-muted text-sm line-clamp-2 leading-relaxed flex-1">
                          {post.description}
                        </p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-brand-accent text-xs font-semibold mt-4 hover:gap-2 transition-all"
                        >
                          Đọc tiếp <span>→</span>
                        </Link>
                      </div>
                    </article>
                  </FadeUp>
                );
              })}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link
                href="/blog"
                className="text-brand-muted hover:text-brand-accent font-medium text-sm transition-colors"
              >
                Xem tất cả bài viết →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative bg-brand-bg py-20 sm:py-28 px-5 sm:px-6 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-transparent to-brand-bg" />

        {/* Đường kẻ trang trí */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-brand-accent/40" />

        <FadeUp>
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-brand-border" />
              <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.35em]">
                Ghé thăm chúng tôi
              </p>
              <div className="w-12 h-px bg-brand-border" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-brand-text mb-4 leading-tight">
              Một tách cà phê
              <br />
              <span className="italic text-brand-accent">đang chờ bạn</span>
            </h2>

            <p className="text-brand-muted text-sm mb-8 sm:mb-10 leading-relaxed">
              Hãy ghé thăm chúng tôi hoặc để lại lời nhắn — chúng tôi luôn sẵn lòng.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent2 text-brand-bg font-semibold px-10 py-4 rounded-full transition-all duration-300 text-sm tracking-wide shadow-lg shadow-brand-accent/20 hover:scale-[1.02]"
              >
                Liên hệ ngay
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 border border-brand-border hover:border-brand-accent/50 text-brand-muted hover:text-brand-text font-medium px-10 py-4 rounded-full transition-all duration-300 text-sm"
              >
                Xem thực đơn
              </Link>
            </div>
          </div>
        </FadeUp>

        {/* Đường kẻ trang trí dưới */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent to-brand-accent/40" />
      </section>
    </main>
  );
}
