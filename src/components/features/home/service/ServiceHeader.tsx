export default function ServiceHeader() {
  return (
    <div className="space-y-4 lg:max-w-md">
      <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-mono text-sm font-semibold uppercase text-text-primary shadow-sm">
        <img src="/icons/joystick.svg" alt="" className="h-5 w-5" aria-hidden="true" />
        Services
      </span>
      <h2 className="text-3xl font-semibold leading-tight text-text-primary sm:text-4xl md:text-5xl">
        Industri yang
        <br />
        Kami Tangani
      </h2>
      <p className="max-w-md text-base leading-relaxed text-slate-500 sm:text-lg md:text-xl">
        Kami membangun sistem digital yang fokus pada konversi dari perhatian
        menjadi booking, inquiry, dan pelanggan.
      </p>
    </div>
  );
}
