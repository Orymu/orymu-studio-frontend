import PricingFeatureList from "./PricingFeatureList";
import type { PricingPlan } from "./pricing-types";

type PricingPlanCardProps = {
  plan: PricingPlan;
};

export default function PricingPlanCard({ plan }: PricingPlanCardProps) {
  return (
    <article className="min-w-0 rounded-xl border border-border-primary bg-bg-hover p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_24px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-b from-slate-100 via-slate-400 to-slate-600 shadow-[0_10px_20px_rgba(0,0,0,0.18),0_24px_48px_rgba(0,0,0,0.12)] ring-8 ring-white/70 sm:mb-6 sm:h-20 sm:w-20">
        <img src="/icons/lightning.svg" alt="" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
      </div>

      <h3 className="text-2xl font-semibold text-[#262c36] sm:text-[30px] md:text-[34px]">
        {plan.name}
      </h3>
      <p className="mt-2 text-sm leading-tight text-slate-500">{plan.description}</p>
      <p className="mt-4 flex flex-wrap items-baseline text-2xl font-semibold tracking-tight text-[#2c2f36] sm:text-3xl lg:text-[40px]">
        {plan.price}
        <span className="ml-1 text-sm font-medium text-slate-400">/Project</span>
      </p>

      <div className="mt-4 rounded-xl border border-border-primary bg-bg-primary p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-4">
        <PricingFeatureList features={plan.features} />
        <button
          type="button"
          className="mt-3 h-11 w-full rounded-lg bg-[linear-gradient(180deg,#2d3b4d_0%,#17263a_100%)] text-base font-semibold text-white shadow-[0_60px_120px_rgba(15,23,42,0.45),0_22px_44px_rgba(15,23,42,0.30)] transition hover:opacity-95"
        >
          Get Started
        </button>
      </div>
    </article>
  );
}
