import FooterSocialLink from "./FooterSocialLink";
import type { FooterSocialLink as FooterSocialLinkType } from "./footer-types";

type FooterTopStripProps = {
  email: string;
  socialLinks: FooterSocialLinkType[];
};

export default function FooterTopStrip({ email, socialLinks }: FooterTopStripProps) {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="border-t border-[#e4e6ea]" />
      </div>

      <div className="mb-10 px-4 pt-5 sm:mb-14 sm:px-6 sm:pt-7 lg:mb-20 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3 md:gap-5">
          <div>
            <p className="text-sm text-[#7c8493]">Contact At</p>
            <a
              href={`mailto:${email}`}
              className="mt-1 inline-block break-all text-2xl font-semibold leading-none text-text-brand sm:break-normal sm:text-[32px] lg:text-[36px]"
            >
              {email}
            </a>
          </div>

          {socialLinks.map((link) => (
            <FooterSocialLink
              key={link.label}
              label={link.label}
              href={link.href}
              ariaLabel={link.ariaLabel}
            />
          ))}
        </div>
      </div>
    </>
  );
}
