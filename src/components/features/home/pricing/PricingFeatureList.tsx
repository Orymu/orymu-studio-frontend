type PricingFeatureListProps = {
  features: string[];
};

function CheckIcon() {
  return (
    <span className="mt-0.5 inline-flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[2px] bg-[#243246] text-white">
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3.25 8.4L6.45 11.5L12.75 4.9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function PricingFeatureList({ features }: PricingFeatureListProps) {
  return (
    <ul className="mb-3 space-y-4 sm:space-y-5 md:space-y-6">
      {features.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <CheckIcon />
          <span className="text-sm leading-snug text-slate-500">{item}</span>
        </li>
      ))}
    </ul>
  );
}
