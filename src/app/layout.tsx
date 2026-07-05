import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import MobileNav from "@/components/MobileNav";
import ScrollToTop from "@/components/ScrollToTop";
import AdminEasterEgg from "@/components/AdminEasterEgg";
import { getSiteSettings } from "@/sanity/lib/queries";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-dm-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vy Coffee — Specialty Coffee",
    template: "%s | Vy Coffee",
  },
  description:
    "Quán cà phê specialty với những hạt cà phê được tuyển chọn kỹ lưỡng từ các farm uy tín trong và ngoài nước.",
  keywords: ["cà phê", "specialty coffee", "café", "pour over", "espresso"],
  authors: [{ name: "Vy Coffee" }],
  creator: "Vy Coffee",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Vy Coffee",
    title: "Vy Coffee — Specialty Coffee",
    description:
      "Quán cà phê specialty với những hạt cà phê được tuyển chọn kỹ lưỡng.",
    images: [
      {
        url: `${SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Vy Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vy Coffee — Specialty Coffee",
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <html
      lang="vi"
      className={`${plusJakarta.variable} ${beVietnamPro.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-brand-bg font-sans antialiased">
        <ThemeProvider>
          {/* Header */}
          <header className="bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
              >
                {/* Logo Icon */}
                <Image
                  src="/logo_icon.png"
                  alt="Vy Coffee Icon"
                  width={120}
                  height={70}
                  className="h-10 object-contain"
                  style={{ width: "auto" }}
                  priority
                />
                {/* Logo Text */}
                <Image
                  src="/logo_text.png"
                  alt="Vy Coffee Text"
                  width={386}
                  height={64}
                  className="h-6 object-contain"
                  style={{ width: "auto" }}
                  priority
                />
              </Link>

              <div className="flex items-center gap-6">
                <nav aria-label="Main navigation" className="hidden md:block">
                  <ul className="flex items-center gap-8">
                    {NAV_LINKS.map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors relative group"
                        >
                          {label}
                          <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-brand-accent transition-all duration-300" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Theme toggle */}
                <ThemeToggle />

                {/* Mobile hamburger */}
                <MobileNav />
              </div>
            </div>
          </header>

          <div className="flex-1">{children}</div>

          <ScrollToTop />

          {/* Footer */}
          <footer className="bg-brand-surface border-t border-brand-border text-brand-muted py-12 sm:py-16 px-5 sm:px-6 mt-auto">
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
              {/* Brand */}
              <div className="sm:col-span-2">
                <p className="font-display text-brand-text text-2xl font-semibold mb-3">
                  Vy Coffee
                </p>
                <p className="text-sm leading-relaxed max-w-xs mb-6">
                  Specialty coffee — Hạt cà phê chất lượng cao, rang tươi và pha chế tỉ mỉ mỗi ngày.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-brand-accent" />
                  <p className="text-brand-accent text-xs uppercase tracking-widest font-semibold">
                    Farm to Cup
                  </p>
                </div>
              </div>

              {/* Links */}
              <div>
                <p className="text-brand-text font-semibold text-sm mb-4 uppercase tracking-wider">
                  Liên kết
                </p>
                <ul className="space-y-2.5 text-sm">
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

              {/* Hours — từ Sanity, fallback hardcode */}
              <div>
                <p className="text-brand-text font-semibold text-sm mb-4 uppercase tracking-wider">
                  Giờ mở cửa
                </p>
                {settings?.openingHours ? (
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {settings.openingHours}
                  </p>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p>Thứ 2 – Thứ 6</p>
                    <p className="text-brand-text">7:00 – 22:00</p>
                    <p className="mt-3">Thứ 7 – Chủ nhật</p>
                    <p className="text-brand-text">7:00 – 23:00</p>
                  </div>
                )}
                {settings?.address && (
                  <p className="text-sm mt-4 text-brand-muted/70 leading-relaxed">
                    {settings.address}
                  </p>
                )}
                {settings?.phone && (
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="text-sm mt-1 text-brand-muted/70 hover:text-brand-accent transition-colors block"
                  >
                    {settings.phone}
                  </a>
                )}
              </div>
            </div>

            <div className="max-w-6xl mx-auto mt-10 sm:mt-12 pt-6 border-t border-brand-border text-xs text-center text-brand-muted/40">
              <AdminEasterEgg />
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
