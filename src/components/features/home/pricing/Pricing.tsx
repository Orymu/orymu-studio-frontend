import PricingHeader from "./PricingHeader";
import PricingPlanCard from "./PricingPlanCard";
import type { PricingPlan } from "./pricing-types";

const plans: PricingPlan[] = [
  {
    name: "Care Plan",
    description:
      "Best for: produk yang sudah berjalan dan ingin berkembang secara terkontrol dan berkelanjutan",
    price: "$2,500 - $4,000",
    features: [
      "Pengembangan dan perbaikan produk berkelanjutan",
      "Monitoring stabilitas, performa, dan reliabilitas",
      "Iterasi fitur berdasarkan data dan kebutuhan bisnis",
      "Perawatan sistem dan pencegahan isu teknis",
      "Dukungan teknis dan rekomendasi peningkatan produk",
    ],
  },
  {
    name: "Custom Build",
    description:
      "Best for: bisnis atau tim yang membutuhkan solusi spesifik dengan target hasil yang jelas",
    price: "$6,000 - $10,000",
    features: [
      "Perancangan dan pengembangan sistem sesuai kebutuhan",
      "Pemetaan alur utama dan tujuan produk",
      "Desain dan implementasi fitur inti",
      "Integrasi API dan layanan pihak ketiga",
      "Tracking, logging, dan pengukuran hasil",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto mt-16 w-full max-w-8xl scroll-mt-32 px-4 py-4 sm:mt-20 sm:px-6 sm:py-6 lg:mt-24 lg:px-10 lg:py-10"
    >
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-6">
        <PricingHeader />

        <div className="grid min-w-0 gap-4 sm:gap-6 md:grid-cols-2 md:gap-6">
          {plans.map((plan) => (
            <PricingPlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
