import type { ServiceItem } from "./service-types";

type ServiceTimelineProps = {
  services: ServiceItem[];
};

function ServiceTimelineItem({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  return (
    <article className="relative pl-12 sm:pl-16 lg:pl-24">
      <div className="absolute left-4 top-4 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-slate-300 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.08)] sm:left-6 sm:h-10 sm:w-10 lg:left-8 lg:h-14 lg:w-14">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-[0_8px_18px_rgba(15,23,42,0.18)] sm:h-7 sm:w-7 sm:text-sm lg:h-9 lg:w-9">
          {index + 1}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_20px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          {service.title}
        </h3>
        <div
          className="mt-4 h-px w-full sm:mt-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(226,232,240,1) 0px, rgba(226,232,240,1) 10px, transparent 10px, transparent 22px)",
          }}
        />
        <p className="mt-4 text-base leading-relaxed text-slate-500 sm:mt-5 sm:text-lg lg:text-xl">
          {service.description}
        </p>
      </div>
    </article>
  );
}

export default function ServiceTimeline({ services }: ServiceTimelineProps) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute left-4 top-2 h-[calc(100%-1rem)] w-px sm:left-6 lg:left-8"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(226,232,240,1) 0px, rgba(226,232,240,1) 8px, transparent 8px, transparent 28px)",
        }}
      />

      <div className="space-y-4 sm:space-y-6">
        {services.map((service, index) => (
          <ServiceTimelineItem key={service.title} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}
