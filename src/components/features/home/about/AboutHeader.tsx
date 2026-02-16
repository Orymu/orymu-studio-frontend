export default function AboutHeader() {
  return (
    <div className="space-y-4 lg:max-w-sm">
      <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-mono text-sm font-semibold uppercase text-text-primary shadow-sm">
        <img src="/icons/crown.svg" alt="" className="h-5 w-5" aria-hidden="true" />
        About Us
      </span>
      <h2 className="text-3xl font-semibold leading-tight text-text-primary sm:text-4xl md:text-5xl">
        Cara Kami
        <br />
        Bekerja
      </h2>
      <p className="max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
        Proses yang sederhana, transparan, dan terstruktur dari ide hingga
        produk siap digunakan.
      </p>
    </div>
  );
}
