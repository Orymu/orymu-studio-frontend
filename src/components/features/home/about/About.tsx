import AboutHeader from "./AboutHeader";
import AboutProcessCard from "./AboutProcessCard";
import type { AboutCard } from "./about-types";

const cards: AboutCard[] = [
  {
    title: "Discover",
    description:
      "Kami memahami bisnis, pengguna, dan tujuan Anda melalui diskusi awal, riset singkat, dan perumusan masalah yang jelas.",
    type: "orbit",
  },
  {
    title: "Design",
    description:
      "Insight diterjemahkan menjadi user flow, wireframe, dan desain UI yang rapi, usable, dan siap dikembangkan.",
    type: "board",
  },
  {
    title: "Build",
    description:
      "Desain kami implementasikan menjadi kode yang bersih, scalable, dan siap digunakan di web maupun mobile.",
    type: "nodes",
  },
  {
    title: "Launch & Improve",
    description:
      "Satu alur utama dengan scope ketat dan hasil terukur. Monitoring dan peningkatan berkelanjutan berbasis data.",
    type: "bars",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto mt-16 w-full max-w-8xl px-4 py-4 sm:mt-20 sm:px-6 sm:py-6 lg:mt-24 lg:px-10 lg:py-10"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-16 xl:gap-24">
        <AboutHeader />

        <div className="grid w-full gap-5 sm:grid-cols-2 lg:flex-1 lg:gap-6">
          {cards.map((card) => (
            <AboutProcessCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
