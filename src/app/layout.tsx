import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f6f6f6",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.orymu.studio"),
  title: "Orymu Studio | Sistem Lead, Booking, dan Product Engineering",
  description:
    "Orymu Studio membangun sistem lead dan booking yang menghasilkan pelanggan, serta membantu tim produk menyelamatkan dan menskalakan produk web/mobile yang sudah berjalan.",
  alternates: {
    canonical: "https://www.orymu.studio",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/orymu-logo.jpg",
  },
  openGraph: {
    title: "Orymu Studio | Sistem Lead, Booking, dan Product Engineering",
    description:
      "Kami membangun sistem lead dan booking yang menghasilkan pelanggan, serta membantu tim produk menyelamatkan dan menskalakan produk web/mobile.",
    type: "website",
    url: "https://www.orymu.studio",
    images: [
      {
        url: "/images/selected-work/arunika-wedding.avif",
        width: 1200,
        height: 630,
        alt: "Orymu Studio - Digital Product Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orymu Studio | Sistem Lead, Booking, dan Product Engineering",
    description:
      "Kami membangun sistem lead dan booking yang menghasilkan pelanggan, serta membantu tim produk menyelamatkan dan menskalakan produk web/mobile.",
    images: ["/images/selected-work/arunika-wedding.avif"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var el = document.documentElement;
                el.classList.add('js');
                if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  el.classList.add('reduce-motion');
                }
              } catch(e) {}
            })();`,
          }}
        />
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className={`${geistSans.className} min-h-full flex flex-col bg-[var(--light-1,#f6f6f6)] text-[var(--ink,#0c1118)]`}>
        <MotionProvider>
          <Navbar />
          <main className="canvas-page flex-1">
            {children}
            <SectionDivider />
            <Footer />
          </main>
        </MotionProvider>
      </body>
    </html>
  );
}
