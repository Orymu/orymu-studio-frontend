import PortfolioHeader from "./PortfolioHeader";
import PortfolioShowcaseCard from "./PortfolioShowcaseCard";
import type { PortfolioItem } from "./portfolio-types";

const portfolioItems: PortfolioItem[] = [
  {
    name: "ORYMU",
    badge: "MOBILE APPS",
    description:
      "Kami membangun aplikasi seluler yang dirancang untuk penggunaan jangka panjang, bukan sekadar rilis awal. Fokus utama kami ada pada alur penggunaan yang konsisten, performa yang stabil, dan fondasi teknis yang siap berkembang.",
    visualType: "mobile",
    images: [
      {
        src: "/icons/phone-1.svg",
        className:
          "absolute bottom-[-10%] left-[-2%] z-10 h-[72%] w-auto drop-shadow-[0_24px_34px_rgba(15,23,42,0.24)] sm:h-[80%] md:-left-[10%] md:h-[86%]",
      },
      {
        src: "/icons/phone-2.svg",
        className:
          "absolute right-[-2%] top-[-4%] z-20 h-[96%] w-auto drop-shadow-[0_30px_44px_rgba(15,23,42,0.30)] md:-right-[10%]",
      },
    ],
    metrics: [
      { label: "Duration", value: "3 Month" },
      { label: "User", value: "50+" },
      { label: "Rate", value: "80%" },
    ],
  },
  {
    name: "ORYMU",
    badge: "WEB APPS",
    description:
      "Kami mengembangkan aplikasi berbasis web sebagai sistem pendukung produk yang ringan, terukur, dan mudah dikelola. Pendekatan kami menekankan kejelasan fungsi, kecepatan akses, dan integrasi yang rapi dengan sistem lain. Solusi ini dirancang agar mudah dimonitor, dimiliki tim internal, dan terus ditingkatkan seiring kebutuhan produk.",
    visualType: "web",
    images: [
      {
        src: "/icons/ipad.svg",
        className:
          "absolute bottom-[-10%] left-1/2 z-10 h-[72%] w-auto -translate-x-1/2 drop-shadow-[0_24px_34px_rgba(15,23,42,0.24)] sm:h-[80%] md:h-[86%]",
      },
    ],
    metrics: [
      { label: "Duration", value: "3 Month" },
      { label: "User", value: "50+" },
      { label: "Rate", value: "80%" },
    ],
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="mx-auto mt-16 w-full max-w-8xl px-4 py-4 sm:mt-20 sm:px-6 sm:py-6 lg:mt-24 lg:px-10 lg:py-10"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
        <PortfolioHeader />

        <div className="flex flex-col gap-10 sm:gap-12">
          {portfolioItems.map((item) => (
            <PortfolioShowcaseCard key={item.badge} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
