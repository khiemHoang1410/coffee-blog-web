"use client";

import dynamic from "next/dynamic";
import config from "../../../../sanity.config";

// ssr: false hợp lệ vì đây là Client Component ("use client")
// NextStudio dùng browser APIs nên không thể SSR
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
