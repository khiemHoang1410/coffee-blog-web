import type { Metadata } from "next";
import type React from "react";
import { getSiteSettings } from "@/sanity/lib/queries";
import ContactForm from "./ContactForm";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Liên hệ | Vy Coffee",
  description:
    "Liên hệ với chúng tôi để đặt bàn, hỏi về menu hoặc chỉ đơn giản là nói chuyện về cà phê.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const infoCards = [
    settings?.address && {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      ),
      label: "Địa chỉ",
      value: settings.address,
    },
    settings?.phone && {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      ),
      label: "Điện thoại",
      value: settings.phone,
    },
    settings?.openingHours && {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      label: "Giờ mở cửa",
      value: settings.openingHours,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  // Fallback nếu Sanity chưa có data
  const displayCards =
    infoCards.length > 0
      ? infoCards
      : [
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            ),
            label: "Địa chỉ",
            value: "123 Đường Cà Phê, Q.1",
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            ),
            label: "Điện thoại",
            value: "0901 234 567",
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            ),
            label: "Giờ mở cửa",
            value: "7:00 – 22:00",
          },
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
                <div className="text-brand-accent shrink-0">{item.icon}</div>
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
