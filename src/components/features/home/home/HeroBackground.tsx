export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[72px_72px] opacity-60" />
      <div className="absolute left-[28%] top-[40%] h-10 w-10 bg-slate-200" />
      <div className="absolute left-[32%] top-[52%] hidden h-10 w-10 bg-slate-200 sm:block" />
      <div className="absolute right-[20%] top-[30%] h-12 w-12 bg-slate-200" />
      <div className="absolute right-[8%] top-[55%] hidden h-8 w-8 bg-slate-200 sm:block" />
      <div className="absolute bottom-[24%] right-[24%] h-10 w-10 bg-slate-200" />
    </div>
  );
}
