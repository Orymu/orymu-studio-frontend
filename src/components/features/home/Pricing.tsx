export default function Pricing() {
  const plans = [
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

  return (
    <section id="price" className="mx-auto mt-16 w-full max-w-8xl">
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold uppercase text-text-primary shadow-sm font-mono">
            <img
              src="/icons/confetti.svg"
              alt=""
              className="h-5 w-5"
              aria-hidden="true"
            />
            Pricing
          </span>
          <h2 className="text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
            Pricing Plans
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-text-secondary">
            Paket fleksibel yang dirancang untuk setiap tahap pertumbuhan. Harga
            transparan. Tanpa biaya tersembunyi.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="rounded-xl border border-slate-200 bg-bg-hover p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_24px_rgba(15,23,42,0.08)]"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-b from-slate-100 via-slate-400 to-slate-600 shadow-[0_10px_20px_rgba(0,0,0,0.18),0_24px_48px_rgba(0,0,0,0.12)] ring-8 ring-white/70">
                <img
                  src="/icons/lightning.svg"
                  alt=""
                  className="h-8 w-8"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-3xl font-semibold text-[#262c36] md:text-[34px]">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm leading-tight text-slate-500">
                {plan.description}
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-[#2c2f36] sm:text-[40px]">
                {plan.price}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  /Project
                </span>
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-[#f6f7f8] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <ul className="space-y-5 md:space-y-7 mb-3">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[2px] bg-[#243246] text-white">
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M3.25 8.4L6.45 11.5L12.75 4.9"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm leading-snug text-slate-500">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-4 h-11 w-full rounded-lg bg-[linear-gradient(180deg,#2d3b4d_0%,#17263a_100%)] text-base font-semibold text-white shadow-[0_60px_120px_rgba(15,23,42,0.45),0_22px_44px_rgba(15,23,42,0.30)] transition hover:opacity-95"
                >
                  Get Started
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
