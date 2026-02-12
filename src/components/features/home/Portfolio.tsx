export default function Portfolio() {
  return (
    <section id="our-work" className="mx-auto mt-16 w-full max-w-8xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_24px_50px_rgba(15,23,42,0.08)] md:p-12">
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
              Our Works
            </h2>
            <p className="max-w-sm text-lg leading-relaxed text-text-secondary">
              Dipercaya oleh para pendiri, tim produk, dan perusahaan.
            </p>
          </div>
          <div className="bg-red-700 flex flex-col gap-8">
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
              <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
                Kami membangun aplikasi seluler yang dirancang untuk penggunaan
                jangka panjang, bukan sekadar rilis awal. Fokus utama kami ada
                pada alur penggunaan yang konsisten, performa yang stabil, dan
                fondasi teknis yang siap berkembang.
              </p>
              <div className="mt-5 grid rounded-xl border border-slate-200 bg-white sm:grid-cols-3">
                <div className="space-y-1.5 px-3 py-4 sm:px-4 sm:py-5">
                  <p className="text-sm text-slate-500 md:text-base">
                    Duration
                  </p>
                  <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                    3 Month
                  </p>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 px-3 py-4 sm:border-l sm:border-t-0 sm:px-4 sm:py-5">
                  <p className="text-sm text-slate-500 md:text-base">User</p>
                  <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                    50+
                  </p>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 px-3 py-4 sm:border-l sm:border-t-0 sm:px-4 sm:py-5">
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
              <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
                Kami membangun aplikasi seluler yang dirancang untuk penggunaan
                jangka panjang, bukan sekadar rilis awal. Fokus utama kami ada
                pada alur penggunaan yang konsisten, performa yang stabil, dan
                fondasi teknis yang siap berkembang.
              </p>
              <div className="mt-5 grid rounded-xl border border-slate-200 bg-white sm:grid-cols-3">
                <div className="space-y-1.5 px-3 py-4 sm:px-4 sm:py-5">
                  <p className="text-sm text-slate-500 md:text-base">
                    Duration
                  </p>
                  <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                    3 Month
                  </p>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 px-3 py-4 sm:border-l sm:border-t-0 sm:px-4 sm:py-5">
                  <p className="text-sm text-slate-500 md:text-base">User</p>
                  <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                    50+
                  </p>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 px-3 py-4 sm:border-l sm:border-t-0 sm:px-4 sm:py-5">
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
              <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
                Kami membangun aplikasi seluler yang dirancang untuk penggunaan
                jangka panjang, bukan sekadar rilis awal. Fokus utama kami ada
                pada alur penggunaan yang konsisten, performa yang stabil, dan
                fondasi teknis yang siap berkembang.
              </p>
              <div className="mt-5 grid rounded-xl border border-slate-200 bg-white sm:grid-cols-3">
                <div className="space-y-1.5 px-3 py-4 sm:px-4 sm:py-5">
                  <p className="text-sm text-slate-500 md:text-base">
                    Duration
                  </p>
                  <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                    3 Month
                  </p>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 px-3 py-4 sm:border-l sm:border-t-0 sm:px-4 sm:py-5">
                  <p className="text-sm text-slate-500 md:text-base">User</p>
                  <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                    50+
                  </p>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 px-3 py-4 sm:border-l sm:border-t-0 sm:px-4 sm:py-5">
                  <p className="text-sm text-slate-500 md:text-base">Rate</p>
                  <p className="text-xl font-semibold text-slate-800 md:text-2xl">
                    80%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
