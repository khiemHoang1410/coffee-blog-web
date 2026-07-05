import type { Metadata } from "next";
import { getSiteSettings } from "@/sanity/lib/queries";
import ContactForm from "./ContactForm";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Liên hệ | Café Stories",
  description:
    "Liên hệ với chúng tôi để đặt bàn, hỏi về menu hoặc chỉ đơn giản là nói chuyện về cà phê.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const infoCards = [
    settings?.address && {
      icon: "📍",
      label: "Địa chỉ",
      value: settings.address,
    },
    settings?.phone && {
      icon: "📞",
      label: "Điện thoại",
      value: settings.phone,
    },
    settings?.openingHours && {
      icon: "⏰",
      label: "Giờ mở cửa",
      value: settings.openingHours,
    },
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  // Fallback nếu Sanity chưa có data
  const displayCards =
    infoCards.length > 0
      ? infoCards
      : [
          { icon: "📍", label: "Địa chỉ", value: "123 Đường Cà Phê, Q.1" },
          { icon: "📞", label: "Điện thoại", value: "0901 234 567" },
          { icon: "⏰", label: "Giờ mở cửa", value: "7:00 – 22:00" },
        ];

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text py-12 sm:py-20 px-5 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-px bg-brand-accent" />
              <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em]">
                Liên hệ
              </p>
              <div className="w-6 h-px bg-brand-accent" />
            </div>
            <h1 className="font-display text-5xl font-light text-brand-text mb-4">
              Nói chuyện với
              <br />
              <span className="italic text-brand-accent">chúng tôi</span>
            </h1>
            <p className="text-brand-muted text-sm max-w-sm mx-auto leading-relaxed">
              Chúng tôi luôn sẵn lòng lắng nghe. Hãy để lại tin nhắn và chúng
              tôi sẽ phản hồi trong vòng 24 giờ.
            </p>
          </div>
        </FadeUp>

        {/* Info cards — data từ Sanity */}
        <FadeUp delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {displayCards.map((item) => (
              <div
                key={item.label}
                className="bg-brand-surface border border-brand-border rounded-2xl p-4 flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 text-left sm:text-center hover:border-brand-accent/30 transition-colors"
              >
                <div className="text-2xl shrink-0">{item.icon}</div>
                <div>
                  <p className="font-semibold text-brand-text text-xs mb-0.5 uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-brand-muted text-xs leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Form */}
        <FadeUp delay={200}>
          <ContactForm />
        </FadeUp>
      </div>
    </main>
  );
}
