import ServiceHeader from "./ServiceHeader";
import ServiceTimeline from "./ServiceTimeline";
import type { ServiceItem } from "./service-types";

const services: ServiceItem[] = [
  {
    title: "Bisnis Lokal",
    description:
      "Kami membangun sistem lead dan booking yang sederhana namun efektif untuk mengubah perhatian menjadi pertanyaan dan pemesanan. Fokus pada satu alur aksi yang jelas, mudah dijalankan, dan dapat diukur.",
  },
  {
    title: "Untuk Tim Produk",
    description:
      "Kami membantu tim menstabilkan dan mempercepat pengembangan produk yang sudah berjalan. Fokus pada pengurangan risiko, peningkatan performa, dan delivery yang kembali terprediksi.",
  },
];

export default function Service() {
  return (
    <section
      id="service"
      className="mx-auto mt-16 w-full max-w-8xl px-4 py-4 sm:mt-20 sm:px-6 sm:py-6 lg:mt-24 lg:px-10 lg:py-10"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10">
        <ServiceHeader />
        <ServiceTimeline services={services} />
      </div>
    </section>
  );
}
