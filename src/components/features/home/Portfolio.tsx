export default function Portfolio() {
  return (
    <section id="our-work" className="mx-auto mt-16 w-full max-w-8xl">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold uppercase text-text-primary shadow-sm font-mono">
            <img
              src="/icons/lego.svg"
              alt=""
              className="h-5 w-5"
              aria-hidden="true"
            />
            Our Works
          </span>
          <h2 className="text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
            Our Work
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-text-secondary">
            Dipercaya oleh para pendiri, tim produk, dan perusahaan.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="relative space-y-8">
            <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(180deg,#f7f8fa_0%,#eef1f5_100%)] px-4 pb-4 pt-0 shadow-[0_20px_40px_rgba(15,23,42,0.08)] md:px-6 md:pb-6 md:pt-0">
              <div className="relative mx-auto h-[360px] w-full max-w-[440px] md:h-[430px]">
                <img
                  src="/icons/phone-1.svg"
                  alt=""
                  className="absolute bottom-[-10%] left-[-2%] z-10 h-[72%] w-auto drop-shadow-[0_24px_34px_rgba(15,23,42,0.24)] md:-left-[10%] md:h-[86%]"
                  aria-hidden="true"
                />
                <img
                  src="/icons/phone-2.svg"
                  alt=""
                  className="absolute right-[-2%] top-[-4%] z-20 h-[96%] w-auto drop-shadow-[0_30px_44px_rgba(15,23,42,0.30)] md:-right-[10%]"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-text-primary">
                ORYMU
              </h3>
              <span className="inline-flex items-center rounded-full border border-border-brand bg-[#c0c7d0] px-4 py-1.5 text-xs font-semibold text-text-primary md:text-sm">
                MOBILE APPS
              </span>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-slate-500 md:text-xl">
              Kami membangun aplikasi seluler yang dirancang untuk penggunaan
              jangka panjang, bukan sekadar rilis awal. Fokus utama kami ada
              pada alur penggunaan yang konsisten, performa yang stabil, dan
              fondasi teknis yang siap berkembang.
            </p>
            <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-xl bg-white">
              <div className="space-y-1.5 px-4 y-4 sm:px-6 sm:py-5">
                <p className="text-sm text-slate-500 md:text-base">Duration</p>
                <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                  3 Month
                </p>
              </div>
              <div className="space-y-1.5 px-4 py-4 sm:px-6 sm:py-5">
                <p className="text-sm text-slate-500 md:text-base">User</p>
                <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                  50+
                </p>
              </div>
              <div className="space-y-1.5 px-4 py-4 sm:px-6 sm:py-5">
                <p className="text-sm text-slate-500 md:text-base">Rate</p>
                <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                  80%
                </p>
              </div>
            </div>
          </div>
          <div className="relative space-y-8">
            <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(180deg,#f7f8fa_0%,#eef1f5_100%)] px-4 pb-4 pt-0 shadow-[0_20px_40px_rgba(15,23,42,0.08)] md:px-6 md:pb-6 md:pt-0">
              <div className="relative mx-auto h-[360px] w-full max-w-[440px] md:h-[430px]">
                <img
                  src="/icons/phone-1.svg"
                  alt=""
                  className="absolute bottom-[-10%] left-[-2%] z-10 h-[72%] w-auto drop-shadow-[0_24px_34px_rgba(15,23,42,0.24)] md:-left-[10%] md:h-[86%]"
                  aria-hidden="true"
                />
                <img
                  src="/icons/phone-2.svg"
                  alt=""
                  className="absolute right-[-2%] top-[-4%] z-20 h-[96%] w-auto drop-shadow-[0_30px_44px_rgba(15,23,42,0.30)] md:-right-[10%]"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-text-primary">
                ORYMU
              </h3>
              <span className="inline-flex items-center rounded-full border border-border-brand bg-[#c0c7d0] px-4 py-1.5 text-xs font-semibold text-text-primary md:text-sm">
                MOBILE APPS
              </span>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-slate-500 md:text-xl">
              Kami membangun aplikasi seluler yang dirancang untuk penggunaan
              jangka panjang, bukan sekadar rilis awal. Fokus utama kami ada
              pada alur penggunaan yang konsisten, performa yang stabil, dan
              fondasi teknis yang siap berkembang.
            </p>
            <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-xl bg-white">
              <div className="space-y-1.5 px-3 py-4 sm:px-4 sm:py-5">
                <p className="text-sm text-slate-500 md:text-base">Duration</p>
                <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                  3 Month
                </p>
              </div>
              <div className="space-y-1.5 px-3 py-4 sm:px-4 sm:py-5">
                <p className="text-sm text-slate-500 md:text-base">User</p>
                <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                  50+
                </p>
              </div>
              <div className="space-y-1.5 px-3 py-4 sm:px-4 sm:py-5">
                <p className="text-sm text-slate-500 md:text-base">Rate</p>
                <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                  80%
                </p>
              </div>
            </div>
          </div>
          <div className="relative space-y-8">
            <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(180deg,#f7f8fa_0%,#eef1f5_100%)] px-4 pb-4 pt-0 shadow-[0_20px_40px_rgba(15,23,42,0.08)] md:px-6 md:pb-6 md:pt-0">
              <div className="relative mx-auto h-[360px] w-full max-w-[440px] md:h-[430px]">
                <img
                  src="/icons/ipad.svg"
                  alt=""
                  className="absolute bottom-[-10%] left-1/2 z-10 h-[72%] w-auto -translate-x-1/2 drop-shadow-[0_24px_34px_rgba(15,23,42,0.24)] md:h-[86%]"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-text-primary">
                ORYMU
              </h3>
              <span className="inline-flex items-center rounded-full border border-border-brand bg-[#c0c7d0] px-4 py-1.5 text-xs font-semibold text-text-primary md:text-sm">
                WEB APPS
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
              Kami mengembangkan aplikasi berbasis web sebagai sistem pendukung
              produk—ringan, terukur, dan mudah dikelola. Pendekatan kami
              menekankan kejelasan fungsi, kecepatan akses, dan integrasi yang
              rapi dengan sistem lain. Solusi ini dirancang agar mudah
              dimonitor, dimiliki tim internal, dan terus ditingkatkan seiring
              kebutuhan produk.
            </p>
            <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-xl bg-white">
              <div className="space-y-1.5 px-3 py-4 sm:px-4 sm:py-5">
                <p className="text-sm text-slate-500 md:text-base">Duration</p>
                <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                  3 Month
                </p>
              </div>
              <div className="space-y-1.5 px-3 py-4 sm:px-4 sm:py-5">
                <p className="text-sm text-slate-500 md:text-base">User</p>
                <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                  50+
                </p>
              </div>
              <div className="space-y-1.5 px-3 py-4 sm:px-4 sm:py-5">
                <p className="text-sm text-slate-500 md:text-base">Rate</p>
                <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                  80%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
