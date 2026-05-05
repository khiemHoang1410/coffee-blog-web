import type { Metadata } from "next";
import Image from "next/image";
import { getAllMenuItems } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityMenuItem } from "@/types";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Menu | Café Stories",
  description:
    "Khám phá thực đơn cà phê specialty của chúng tôi — từ espresso đậm đà đến pour over tinh tế.",
};

const CATEGORIES = [
  { value: "espresso", label: "Espresso" },
  { value: "pour-over", label: "Pour Over" },
  { value: "tra", label: "Trà" },
  { value: "khac", label: "Khác" },
] as const;

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function MenuCard({ item }: { item: SanityMenuItem }) {
  const imageUrl = item.image
    ? urlFor(item.image).width(600).height(400).format("webp").url()
    : null;

  return (
    <article className="group flex flex-col">
      {/* Ảnh */}
      <div className="relative aspect-[4/3] overflow-hidden rounded mb-4 bg-[#1A1A1A]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.image?.alt ?? item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A]" />
        )}

        {item.featured && (
          <span className="absolute top-3 left-3 bg-brand-accent text-brand-bg text-xs font-semibold px-2 py-0.5 rounded-sm tracking-wide">
            Nổi bật
          </span>
        )}
      </div>

      {/* Thông tin */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-brand-text text-lg font-semibold leading-snug">
            {item.name}
          </h3>
          <span className="text-brand-accent font-medium text-sm whitespace-nowrap shrink-0 mt-0.5">
            {formatPrice(item.price)}
          </span>
        </div>

        {item.description && (
          <p className="text-brand-muted text-sm leading-relaxed line-clamp-3">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}

export default async function MenuPage() {
  const allItems = await getAllMenuItems();

  // Group theo category
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: allItems.filter((item) => item.category === cat.value),
  })).filter((cat) => cat.items.length > 0);

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">
      {/* Hero */}
      <section className="py-24 px-4 text-center border-b border-[#1A1A1A]">
        <FadeUp>
          <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Thực đơn
          </p>
        </FadeUp>
        <FadeUp delay={100}>
          <h1 className="font-display text-5xl md:text-6xl font-light text-brand-text">
            Được pha chế
            <br />
            <span className="italic text-brand-accent">với tâm huyết</span>
          </h1>
        </FadeUp>
        <FadeUp delay={200}>
          <p className="text-brand-muted text-sm mt-6 max-w-md mx-auto leading-relaxed">
            Mỗi loại đồ uống là một trải nghiệm — không chỉ là hương vị, mà còn
            là khoảnh khắc bạn dành cho bản thân.
          </p>
        </FadeUp>
      </section>

      {/* Menu theo category */}
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
        {grouped.length === 0 && (
          <p className="text-center text-brand-muted py-20">
            Menu đang được cập nhật. Vui lòng quay lại sớm!
          </p>
        )}

        {grouped.map((cat) => (
          <section key={cat.value}>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px bg-brand-accent" />
              <h2 className="font-display text-2xl font-semibold text-brand-text tracking-wide">
                {cat.label}
              </h2>
              <div className="flex-1 h-px bg-[#1A1A1A]" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cat.items.map((item, i) => (
                <FadeUp key={item._id} delay={i * 100}>
                  <MenuCard item={item} />
                </FadeUp>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="border-t border-[#1A1A1A] py-8 px-4 text-center">
        <p className="text-brand-muted text-xs">
          Giá có thể thay đổi theo mùa. Vui lòng liên hệ để biết thêm thông tin.
        </p>
      </div>
    </main>
  );
}
