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
      className="group block"
      aria-label={ariaLabel}
    >
      <p className="text-base text-[#7c8493]">Connect With Us</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xl font-semibold leading-none text-[#1f2430] sm:text-2xl">{label}</p>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 text-[#1f2430] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    </a>
  );
}
