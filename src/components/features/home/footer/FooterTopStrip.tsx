import FooterSocialLink from "./FooterSocialLink";
import type { FooterSocialLink as FooterSocialLinkType } from "./footer-types";

type FooterTopStripProps = {
  email: string;
  socialLinks: FooterSocialLinkType[];
};

export default function FooterTopStrip({ email, socialLinks }: FooterTopStripProps) {
  return (
    <>
      <div className="border-t border-[#e4e6ea]" />

      <div className="py-6 sm:py-7">
        <div className="grid gap-6 md:grid-cols-3 md:gap-8 lg:px-5">
          <div>
            <p className="text-base text-[#7c8493]">Contact At</p>
            <a
              href={`mailto:${email}`}
              className="mt-2 inline-block break-all text-xl font-semibold leading-none text-text-brand sm:break-normal sm:text-2xl"
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
