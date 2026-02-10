export default function Service() {
  const services = [
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

  return (
    <section id="service" className="mx-auto mt-16 md:mt-24 w-full max-w-8xl">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold uppercase text-text-primary shadow-sm font-mono">
            <img
              src="/icons/joystick.svg"
              alt=""
              className="h-5 w-5"
              aria-hidden="true"
            />
            Services
          </span>
          <h2 className="text-4xl font-semibold text-text-primary md:text-5xl">
            Industri yang
            <br />
            Kami Tangani
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-slate-500 md:text-xl">
            Kami membangun sistem digital yang fokus pada konversi dari
            perhatian menjadi booking, inquiry, dan pelanggan.
          </p>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-8 top-0 hidden h-full w-0.5 lg:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(226,232,240,1) 0px, rgba(226,232,240,1) 8px, transparent 8px, transparent 32px)",
            }}
          />
          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={service.title} className="relative lg:pl-24">
                <div className="absolute left-8 top-4 hidden h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-slate-300 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.08)] lg:flex">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(15,23,42,0.18)]">
                    {index + 1}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {service.title}
                  </h3>
                  <div
                    className="mt-5 h-px w-full"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, rgba(226,232,240,1) 0px, rgba(226,232,240,1) 10px, transparent 10px, transparent 22px)",
                    }}
                  />
                  <p className="mt-5 text-lg leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>  
    </section>
  );
}
