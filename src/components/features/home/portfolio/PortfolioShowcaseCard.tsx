import PortfolioMetrics from "./PortfolioMetrics";
import type { PortfolioItem } from "./portfolio-types";

type PortfolioShowcaseCardProps = {
  item: PortfolioItem;
};

function DeviceShowcase({ item }: PortfolioShowcaseCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(180deg,#f7f8fa_0%,#eef1f5_100%)] px-4 pb-4 pt-0 shadow-[0_20px_40px_rgba(15,23,42,0.08)] sm:px-5 sm:pb-5 md:px-6 md:pb-6">
      <div className="relative mx-auto h-[300px] w-full max-w-[600px] sm:h-[400px] md:h-[480px]">
        {item.images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt=""
            className={image.className}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

export default function PortfolioShowcaseCard({ item }: PortfolioShowcaseCardProps) {
  return (
    <article className="w-full space-y-6 sm:space-y-8">
      <DeviceShowcase item={item} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold tracking-tight text-text-primary">
          {item.name}
        </h3>
        <span className="inline-flex items-center rounded-full border border-border-brand bg-[#c0c7d0] px-4 py-1.5 text-xs font-semibold text-text-primary sm:text-sm">
          {item.badge}
        </span>
      </div>

      <p className="text-base leading-relaxed text-slate-500 sm:text-lg md:text-xl">
        {item.description}
      </p>

      <PortfolioMetrics metrics={item.metrics} />
    </article>
  );
}
