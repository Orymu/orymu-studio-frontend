import { ArrowUpRight } from "lucide-react";

type FooterSocialLinkProps = {
  label: string;
  href: string;
  ariaLabel: string;
};

export default function FooterSocialLink({
  label,
  href,
  ariaLabel,
}: FooterSocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start"
      aria-label={ariaLabel}
    >
      <div>
        <p className="text-sm text-[#7c8493]">Connect With Us</p>
        <div className="mt-1 flex items-center gap-2 sm:gap-3">
          <span className="-ml-1 shrink-0 text-[#5f6775] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} aria-hidden="true" />
          </span>
          <p className="text-2xl font-semibold leading-none text-[#1f2430] sm:text-[32px] lg:text-[36px]">
            {label}
          </p>
        </div>
      </div>
    </a>
  );
}
