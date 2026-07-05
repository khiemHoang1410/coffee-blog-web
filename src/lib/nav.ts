export const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Về chúng tôi" },
  { href: "/menu", label: "Menu" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Liên hệ" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
