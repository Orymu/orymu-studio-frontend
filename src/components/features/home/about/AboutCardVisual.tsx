import type { AboutVisualType } from "./about-types";

type AboutCardVisualProps = {
  type: AboutVisualType;
};

const barItems = [
  { label: "Feature A", value: 30 },
  { label: "Feature B", value: 21 },
  { label: "Feature C", value: 67 },
  { label: "Feature D", value: 56 },
  { label: "Feature E", value: 48 },
];

function OrbitVisual() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-xl bg-bg-hover p-4 sm:h-[380px] sm:p-5 lg:h-[460px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-size-[10px_10px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/70 sm:h-[430px] sm:w-[430px]" />
        <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/70 sm:h-[270px] sm:w-[270px]" />
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-b from-slate-100 via-slate-400 to-slate-600 shadow-[0_10px_20px_rgba(0,0,0,0.18),0_24px_48px_rgba(0,0,0,0.12)] ring-8 ring-white/70 sm:h-32 sm:w-32">
          <img src="/icons/cube-focus.svg" alt="" className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden="true" />
        </div>
      </div>

      <div className="absolute left-4 top-4 flex items-center gap-1.5 sm:left-6 sm:top-6">
        <img src="/icons/finding.svg" alt="" className="h-[130px] w-[130px] sm:h-[170px] sm:w-[170px]" aria-hidden="true" />
      </div>

      <div className="absolute right-3 top-16 flex items-center gap-1.5 sm:right-6 sm:top-24">
        <img src="/icons/fixing.svg" alt="" className="h-[90px] w-[145px] sm:h-[110px] sm:w-[180px]" aria-hidden="true" />
      </div>

      <div className="absolute bottom-7 left-2 flex items-center gap-1.5 sm:bottom-10 sm:left-4">
        <img src="/icons/flexibling.svg" alt="" className="h-16 w-28 sm:h-20 sm:w-36" aria-hidden="true" />
      </div>

      <div className="absolute bottom-5 right-2 flex items-center gap-1.5 sm:bottom-8 sm:right-3">
        <img
          src="/icons/understanding.svg"
          alt=""
          className="h-[70px] w-[140px] sm:h-[90px] sm:w-[180px]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function BoardVisual() {
  return (
    <div className="relative h-[300px] overflow-hidden bg-bg-hover sm:h-[380px] lg:h-[460px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[10px_10px]" />
      <img src="/icons/diagram.svg" alt="" className="relative z-10 h-full w-full object-contain" aria-hidden="true" />
    </div>
  );
}

function NodesVisual() {
  return (
    <div className="relative h-[300px] bg-[#f2f3f6] sm:h-[380px] lg:h-[460px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[10px_10px]" />

      <div className="absolute -top-28 left-1/2 h-52 w-[150%] -translate-x-1/2 rounded-[50%] bg-[#e0e3e7] sm:-top-36 sm:h-72" />
      <div className="absolute -bottom-40 left-1/2 h-52 w-[150%] -translate-x-1/2 rounded-[50%] bg-[#e0e3e7] sm:-bottom-52 sm:h-72" />

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/4">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-b from-slate-100 via-slate-400 to-slate-600 shadow-[0_18px_40px_rgba(0,0,0,0.18)] ring-8 ring-white/90 sm:h-32 sm:w-32">
          <img src="/icons/device.svg" alt="" className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden="true" />
        </div>
      </div>

      <div className="absolute left-5 top-12 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-b from-white via-gray-50 to-gray-100 shadow-[0_10px_22px_rgba(0,0,0,0.14)] ring-1 ring-white/90 sm:left-8 sm:top-20 sm:h-20 sm:w-20">
        <img src="/icons/nodejs.svg" alt="" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true" />
      </div>

      <div className="absolute right-5 top-12 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-b from-white via-gray-50 to-gray-100 shadow-[0_10px_22px_rgba(0,0,0,0.14)] ring-1 ring-white/90 sm:right-8 sm:top-20 sm:h-20 sm:w-20">
        <img src="/icons/reactjs.svg" alt="" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true" />
      </div>

      <div className="absolute bottom-6 left-5 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-b from-white via-gray-50 to-gray-100 shadow-[0_10px_22px_rgba(0,0,0,0.14)] ring-1 ring-white/90 sm:bottom-8 sm:left-8 sm:h-20 sm:w-20">
        <img src="/icons/flutter.svg" alt="" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true" />
      </div>

      <div className="absolute bottom-6 right-5 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-b from-white via-gray-50 to-gray-100 shadow-[0_10px_22px_rgba(0,0,0,0.14)] ring-1 ring-white/90 sm:bottom-8 sm:right-8 sm:h-20 sm:w-20">
        <img src="/icons/kotlin.svg" alt="" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true" />
      </div>
    </div>
  );
}

function BarsVisual() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-xl bg-[#f3f4f7] p-4 sm:h-[380px] sm:p-5 lg:h-[460px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:12px_12px]" />
      <div className="relative flex h-full flex-col justify-between py-1 sm:py-2">
        {barItems.map((item) => {
          const safeId = item.label.toLowerCase().replace(/\s+/g, "-");
          const bgId = `bars-bg-${safeId}`;
          const fillId = `bars-fill-${safeId}`;

          return (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs shadow-[0_8px_18px_rgba(15,23,42,0.08)] sm:gap-4 sm:rounded-2xl sm:px-5 sm:py-4 sm:text-sm"
            >
              <span className="w-16 shrink-0 font-semibold text-slate-800 sm:w-24">
                {item.label}
              </span>
              <div className="relative h-3 flex-1 sm:h-4">
                <svg className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
                  <defs>
                    <pattern id={bgId} width="8" height="16" patternUnits="userSpaceOnUse">
                      <rect width="4" height="16" rx="3" ry="3" fill="rgba(15,23,42,0.18)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#${bgId})`} />
                </svg>
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${item.value}%` }}>
                  <svg className="h-full w-full" aria-hidden="true" preserveAspectRatio="none">
                    <defs>
                      <pattern id={fillId} width="8" height="16" patternUnits="userSpaceOnUse">
                        <rect width="4" height="16" rx="3" ry="3" fill="rgba(15,23,42,0.9)" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#${fillId})`} />
                  </svg>
                </div>
              </div>
              <span className="w-10 shrink-0 text-right text-xs font-semibold text-slate-400 sm:w-12 sm:text-base">
                {item.value}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AboutCardVisual({ type }: AboutCardVisualProps) {
  switch (type) {
    case "orbit":
      return <OrbitVisual />;
    case "board":
      return <BoardVisual />;
    case "nodes":
      return <NodesVisual />;
    case "bars":
      return <BarsVisual />;
    default:
      return null;
  }
}
