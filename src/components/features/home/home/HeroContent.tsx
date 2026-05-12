import { Button } from "@/components/ui/button";

export default function HeroContent() {
  return (
    <div className="w-full max-w-6xl space-y-4">
      <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border-primary bg-white px-3 py-2">
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute h-6 w-6 rounded-full bg-[#3ccf7d]/15 blur-[6px]" />
          <span className="relative h-3 w-3 rounded-full bg-[#3ccf7d]" />
        </span>
        <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs font-semibold leading-tight tracking-wider text-text-primary sm:text-sm md:text-base">
          <span>Product Engineering Studio</span>
          <span aria-hidden="true">&bull;</span>
          <span>Mobile & Web</span>
        </span>
      </div>

      <h1 className="max-w-5xl text-3xl font-semibold leading-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
        Orymu Studio Sistem Lead, Booking,
        <br className="hidden md:block" />
        dan Product Engineering
      </h1>

      <p className="max-w-5xl text-base font-medium leading-relaxed text-text-secondary sm:text-lg md:text-xl lg:text-2xl">
        Kami membangun sistem lead dan booking yang menghasilkan pelanggan,
        serta membantu tim produk menyelamatkan dan menskalakan produk
        web/mobile yang sudah berjalan.
      </p>

      <div className="flex flex-col gap-3 text-shark-100 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
        <Button className="w-full rounded-xl p-5 text-base text-text-inverse shadow-[0_60px_120px_rgba(15,23,42,0.45),0_22px_44px_rgba(15,23,42,0.30)] sm:w-auto sm:p-7">
          Booking Now
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-xl border border-border-brand bg-transparent p-5 text-base text-text-brand shadow-[0_8px_18px_rgba(15,23,42,0.08)] sm:w-auto sm:p-7"
        >
          View Our Process
        </Button>
      </div>
    </div>
  );
}
