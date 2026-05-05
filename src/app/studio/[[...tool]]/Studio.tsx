"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function Studio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/40 text-sm">Đang tải Studio...</p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
