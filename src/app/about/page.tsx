import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "sanity";
import { getSiteSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/types";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Về chúng tôi | Café Stories",
  description:
    "Câu chuyện đằng sau Café Stories — từ đam mê đến từng tách cà phê specialty.",
};

// ─── PortableText custom components ──────────────────────────────────────────

const storyComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-brand-text/70 text-base leading-relaxed mb-6">
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-3xl font-semibold text-brand-text mt-14 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-xl font-semibold text-brand-text mt-10 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-brand-accent pl-6 my-10">
        <p className="font-display text-2xl font-light italic text-brand-text/80 leading-relaxed">
          {children}
        </p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-brand-text font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-brand-accent">{children}</em>
    ),
  },
  types: {
    // Ảnh inline trong rich text — layout editorial: full-width
    image: ({ value }: { value: SanityImage & { caption?: string } }) => {
      const imageUrl = urlFor(value).width(1200).format("webp").url();
      return (
        <figure className="my-12 -mx-4 md:-mx-16">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt ?? ""}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-brand-muted text-xs mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1600).format("webp").url()
    : null;

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">
      {/* Hero — editorial full-screen quote */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {heroImageUrl ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={heroImageUrl}
                alt={settings?.heroImage?.alt ?? "Café Stories"}
                fill
                className="object-cover opacity-20"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/60 via-transparent to-brand-bg" />
          </>
        ) : (
          <div className="absolute inset-0 bg-brand-surface" />
        )}

        <div className="relative max-w-3xl mx-auto px-5 sm:px-4 py-20 sm:py-24 text-center">
          <FadeUp>
            <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em] mb-6">
              Câu chuyện của chúng tôi
            </p>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-brand-text leading-tight">
              {settings?.tagline ?? (
                <>
                  Không chỉ là
                  <br />
                  <span className="italic text-brand-accent">cà phê</span>
                </>
              )}
            </h1>
          </FadeUp>
          {settings?.description && (
            <FadeUp delay={200}>
              <p className="text-brand-text/50 text-base mt-8 max-w-xl mx-auto leading-relaxed">
                {settings.description}
              </p>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Story content — rich text */}
      {settings?.storyContent && settings.storyContent.length > 0 && (
        <section className="max-w-2xl mx-auto px-5 sm:px-4 py-12 sm:py-16">
          <PortableText
            value={settings.storyContent as PortableTextBlock[]}
            components={storyComponents}
          />
        </section>
      )}

      {/* Info bar */}
      {(settings?.address || settings?.phone || settings?.openingHours) && (
        <section className="border-t border-brand-border py-12 sm:py-16 px-5 sm:px-4">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-8 sm:gap-10 text-center">
            {settings.address && (
              <FadeUp>
                <div>
                  <p className="text-brand-accent text-xs uppercase tracking-[0.2em] mb-2">
                    Địa chỉ
                  </p>
                  <p className="text-brand-text/60 text-sm leading-relaxed">
                    {settings.address}
                  </p>
                </div>
              </FadeUp>
            )}
            {settings.phone && (
              <FadeUp delay={100}>
                <div>
                  <p className="text-brand-accent text-xs uppercase tracking-[0.2em] mb-2">
                    Điện thoại
                  </p>
                  <p className="text-brand-text/60 text-sm">{settings.phone}</p>
                </div>
              </FadeUp>
            )}
            {settings.openingHours && (
              <FadeUp delay={200}>
                <div>
                  <p className="text-brand-accent text-xs uppercase tracking-[0.2em] mb-2">
                    Giờ mở cửa
                  </p>
                  <p className="text-brand-text/60 text-sm leading-relaxed">
                    {settings.openingHours}
                  </p>
                </div>
              </FadeUp>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
