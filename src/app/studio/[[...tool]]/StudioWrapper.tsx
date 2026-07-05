"use client";

import dynamic from "next/dynamic";

// Khởi tạo dynamic import với { ssr: false } ở mức Client Component wrapper
const Studio = dynamic(() => import("./Studio"), { ssr: false });

export default function StudioWrapper() {
  return <Studio />;
}
