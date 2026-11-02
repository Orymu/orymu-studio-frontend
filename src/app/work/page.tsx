import React, { Suspense } from "react";
import type { Metadata } from "next";
import WorkListClient from "./WorkListClient";

export const metadata: Metadata = {
  title: "Karya | Orymu Studio",
  description:
    "Kumpulan proyek web & mobile yang kami bangun. Buka salah satunya untuk melihat proyek selengkapnya.",
};

export default function WorkPage() {
  return (
    <div className="work-page-bleed">
      <Suspense
        fallback={
          <div className="content-frame work-page-container" style={{ minHeight: "60vh", padding: "100px 40px" }}>
            <p style={{ color: "rgba(12, 17, 24, 0.6)", fontFamily: "var(--font-mono)" }}>Memuat karya...</p>
          </div>
        }
      >
        <WorkListClient />
      </Suspense>
    </div>
  );
}
