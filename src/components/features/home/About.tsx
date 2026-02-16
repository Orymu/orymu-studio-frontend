export default function About() {
  const cards = [
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

  const renderVisual = (type: string) => {
    switch (type) {
      case "orbit":
        return (
          <div className="relative h-[440px] overflow-hidden rounded-xl bg-bg-hover p-6 md:h-[520px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-size-[10px_10px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/70" />
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/70" />
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-linear-to-b from-slate-100 via-slate-400 to-slate-600 shadow-[0_10px_20px_rgba(0,0,0,0.18),0_24px_48px_rgba(0,0,0,0.12)] ring-8 ring-white/70">
                <img
                  src="/icons/cube-focus.svg"
                  alt=""
                  className="h-18 w-18"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="absolute left-6 top-6 flex items-center gap-1.5">
              <img
                src="/icons/finding.svg"
                alt=""
                className="h-[180px] w-[180px]"
                aria-hidden="true"
              />
            </div>

            <div className="absolute right-6 top-24 flex items-center gap-1.5">
              <img
                src="/icons/fixing.svg"
                alt=""
                className="h-[110px] w-[180px]"
                aria-hidden="true"
              />
            </div>

            <div className="absolute bottom-10 left-4 flex items-center gap-1.5">
              <img
                src="/icons/flexibling.svg"
                alt=""
                className="h-20 w-36"
                aria-hidden="true"
              />
            </div>

            <div className="absolute bottom-8 right-3 flex items-center gap-1.5">
              <img
                src="/icons/understanding.svg"
                alt=""
                className="h-[90px] w-[180px]"
                aria-hidden="true"
              />
            </div>
          </div>
        );
      case "board":
        return (
          <div className="relative h-[440px] overflow-hidden bg-bg-hover md:h-[520px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[10px_10px]" />
            <img
              src="/icons/diagram.svg"
              alt=""
              className="relative z-10 h-full w-full object-contain"
              aria-hidden="true"
            />
          </div>
        );
      case "nodes":
        return (
          <div className="relative h-[440px] bg-[#f2f3f6] md:h-[520px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[10px_10px]" />

            <div className="absolute -top-40 left-1/2 h-80 w-[150%] -translate-x-1/2 rounded-[50%] bg-[#e0e3e7]" />
            <div className="absolute -bottom-60 left-1/2 h-80 w-[150%] -translate-x-1/2 rounded-[50%] bg-[#e0e3e7]" />

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/4">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-linear-to-b from-slate-100 via-slate-400 to-slate-600 shadow-[0_18px_40px_rgba(0,0,0,0.18)] ring-8 ring-white/90">
                <img
                  src="/icons/device.svg"
                  alt=""
                  className="h-18 w-18"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="absolute left-8 top-20 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-b from-white via-gray-50 to-gray-100 shadow-[0_10px_22px_rgba(0,0,0,0.14)] ring-1 ring-white/90">
              <img
                src="/icons/nodejs.svg"
                alt=""
                className="h-12 w-12"
                aria-hidden="true"
              />
            </div>

            <div className="absolute right-8 top-20 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-b from-white via-gray-50 to-gray-100 shadow-[0_10px_22px_rgba(0,0,0,0.14)] ring-1 ring-white/90">
              <img
                src="/icons/reactjs.svg"
                alt=""
                className="h-12 w-12"
                aria-hidden="true"
              />
            </div>

            <div className="absolute bottom-8 left-8 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-b from-white via-gray-50 to-gray-100 shadow-[0_10px_22px_rgba(0,0,0,0.14)] ring-1 ring-white/90">
              <img
                src="/icons/flutter.svg"
                alt=""
                className="h-12 w-12"
                aria-hidden="true"
              />
            </div>

            <div className="absolute bottom-8 right-8 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-b from-white via-gray-50 to-gray-100 shadow-[0_10px_22px_rgba(0,0,0,0.14)] ring-1 ring-white/90">
              <img
                src="/icons/kotlin.svg"
                alt=""
                className="h-12 w-12"
                aria-hidden="true"
              />
            </div>
          </div>
        );
      case "bars":
        return (
          <div className="relative h-[440px] overflow-hidden rounded-xl bg-[#f3f4f7] p-6 md:h-[520px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:12px_12px]" />
            <div className="relative flex h-full flex-col justify-between py-2">
              {[
                { label: "Feature A", value: 30 },
                { label: "Feature B", value: 21 },
                { label: "Feature C", value: 67 },
                { label: "Feature D", value: 56 },
                { label: "Feature E", value: 48 },
              ].map((item) => {
                const safeId = item.label.toLowerCase().replace(/\s+/g, "-");
                const bgId = `bars-bg-${safeId}`;
                const fillId = `bars-fill-${safeId}`;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 text-sm shadow-[0_8px_18px_rgba(15,23,42,0.08)]"
                  >
                    <span className="w-24 shrink-0 font-semibold text-slate-800">
                      {item.label}
                    </span>
                    <div className="relative h-4 flex-1">
                      <svg
                        className="absolute inset-0 h-full w-full"
                        aria-hidden="true"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <pattern
                            id={bgId}
                            width="8"
                            height="16"
                            patternUnits="userSpaceOnUse"
                          >
                            <rect
                              width="4"
                              height="16"
                              rx="3"
                              ry="3"
                              fill="rgba(15,23,42,0.18)"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#${bgId})`}
                        />
                      </svg>
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${item.value}%` }}
                      >
                        <svg
                          className="h-full w-full"
                          aria-hidden="true"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <pattern
                              id={fillId}
                              width="8"
                              height="16"
                              patternUnits="userSpaceOnUse"
                            >
                              <rect
                                width="4"
                                height="16"
                                rx="3"
                                ry="3"
                                fill="rgba(15,23,42,0.9)"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#${fillId})`}
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="w-12 shrink-0 text-right text-base font-semibold text-slate-400">
                      {item.value}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="about"
      className="mx-auto mt-16 md:mt-24 w-full max-w-8xl px-4 py-4 sm:py-6 sm:px-6 lg:py-10 lg:px-10"
    >
      <div className="flex justify-between lg:gap-24 xl:gap-32">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold uppercase text-text-primary shadow-sm font-mono">
            <img
              src="/icons/crown.svg"
              alt=""
              className="h-5 w-5"
              aria-hidden="true"
            />
            About Us
          </span>
          <h2 className="text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
            Cara Kami
            <br />
            Bekerja
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-text-secondary">
            Proses yang sederhana, transparan, dan terstruktur dari ide hingga
            produk siap digunakan.
          </p>
        </div>

        <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:max-w-6xl xl:max-w-7xl">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative flex flex-col overflow-hidden rounded-2xl text-text-primary border border-gray-100 bg-bg-hover p-5"
            >
              <div
                className={
                  card.type === "board" || card.type === "nodes"
                    ? "-mx-5 -mt-5 mb-4 relative z-0"
                    : "p-4 pb-0"
                }
              >
                {renderVisual(card.type)}
              </div>

              <div className="relative z-10 mt-auto border-t border-gray-100 bg-white p-5 rounded-xl">
                <h3 className="text-2xl font-semibold text-text-primary sm:min-h-9 sm:max-h-9 sm:overflow-hidden sm:[display:-webkit-box] sm:[-webkit-line-clamp:2] sm:[-webkit-box-orient:vertical]">
                  {card.title}
                </h3>
                <p className="mt-2 text-lg font-medium leading-relaxed text-text-secondary sm:min-h-16 sm:max-h-16 sm:overflow-hidden sm:[display:-webkit-box] sm:[-webkit-line-clamp:3] sm:[-webkit-box-orient:vertical]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
