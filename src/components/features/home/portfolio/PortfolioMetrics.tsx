import type { PortfolioMetric } from "./portfolio-types";

type PortfolioMetricsProps = {
  metrics: PortfolioMetric[];
};

export default function PortfolioMetrics({ metrics }: PortfolioMetricsProps) {
  return (
    <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-xl bg-white">
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-1.5 px-3 py-3 sm:px-5 sm:py-4">
          <p className="text-xs text-slate-500 sm:text-sm md:text-base">{metric.label}</p>
          <p className="text-lg font-semibold text-slate-800 sm:text-xl md:text-2xl">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}
