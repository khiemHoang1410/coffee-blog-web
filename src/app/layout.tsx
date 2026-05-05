import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Café Stories — Specialty Coffee",
    template: "%s | Café Stories",
  },
  description:
    "Quán cà phê specialty với những hạt cà phê được tuyển chọn kỹ lưỡng từ các farm uy tín trong và ngoài nước.",
  keywords: ["cà phê", "specialty coffee", "café", "pour over", "espresso"],
  authors: [{ name: "Café Stories" }],
  creator: "Café Stories",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Café Stories",
    title: "Café Stories — Specialty Coffee",
    description:
      "Quán cà phê specialty với những hạt cà phê được tuyển chọn kỹ lưỡng.",
    images: [
      {
        url: `${SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Café Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Stories — Specialty Coffee",
    description:
      "Quán cà phê specialty với những hạt cà phê được tuyển chọn kỹ lưỡng.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Về chúng tôi" },
  { href: "/menu", label: "Menu" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Liên hệ" },
] as const;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-brand-bg font-sans antialiased">
        {/* Header */}
        <header className="bg-brand-bg border-b border-[#1A1A1A] sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-xl font-semibold text-brand-text hover:text-brand-accent transition-colors tracking-wide"
            >
              Café Stories
            </Link>

            <nav aria-label="Main navigation">
              <ul className="flex items-center gap-6">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm font-medium text-brand-text/70 hover:text-brand-accent transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        {/* Footer */}
        <footer className="bg-[#080808] text-brand-text/50 py-12 px-4 mt-auto border-t border-[#1A1A1A]">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <p className="font-display text-brand-text text-lg font-semibold mb-2">
                Café Stories
              </p>
              <p className="text-sm leading-relaxed">
                Specialty coffee — Hạt cà phê chất lượng cao, pha chế tỉ mỉ.
              </p>
            </div>

            <div>
              <p className="text-brand-text font-medium text-sm mb-3">
                Liên kết
              </p>
              <ul className="space-y-2 text-sm">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-brand-accent transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-brand-text font-medium text-sm mb-3">
                Giờ mở cửa
              </p>
              <p className="text-sm">Thứ 2 – Thứ 6: 7:00 – 22:00</p>
              <p className="text-sm">Thứ 7 – Chủ nhật: 7:00 – 23:00</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-[#1A1A1A] text-xs text-center text-brand-text/30">
            © {new Date().getFullYear()} Café Stories. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
