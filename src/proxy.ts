import { NextRequest, NextResponse } from "next/server";

/**
 * Bảo vệ route /studio — chỉ cho phép truy cập trong môi trường dev
 * hoặc khi có env NEXT_PUBLIC_ENABLE_STUDIO=true
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/studio")) {
    const isDev = process.env.NODE_ENV === "development";
    const isEnabled = process.env.NEXT_PUBLIC_ENABLE_STUDIO === "true";

    if (!isDev && !isEnabled) {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
