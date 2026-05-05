import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ | Café Stories",
  description:
    "Liên hệ với chúng tôi để đặt bàn, hỏi về menu hoặc chỉ đơn giản là nói chuyện về cà phê.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-accent text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Liên hệ
          </p>
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

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-4 mb-10 text-center text-sm">
          {[
            { icon: "📍", label: "Địa chỉ", value: "123 Đường Cà Phê, Q.1" },
            { icon: "📞", label: "Điện thoại", value: "0901 234 567" },
            { icon: "⏰", label: "Giờ mở cửa", value: "7:00 – 22:00" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-brand-surface border border-[#2A1F10] rounded-xl p-4"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="font-semibold text-brand-text text-xs mb-1">{item.label}</p>
              <p className="text-brand-muted text-xs">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Form — Client Component */}
        <ContactForm />
      </div>
    </main>
  );
}
