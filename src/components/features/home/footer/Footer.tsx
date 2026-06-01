import Image from "next/image";

import FooterBottomBar from "@/components/features/home/footer/FooterBottomBar";
import FooterTopStrip from "@/components/features/home/footer/FooterTopStrip";
import { Button } from "@/components/ui/button";
import type {
  FooterNavLink,
  FooterSocialLink,
} from "@/components/features/home/footer/footer-types";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks: FooterSocialLink[] = [
    {
      label: "Instagram",
      href: "https://instagram.com",
      ariaLabel: "Instagram",
    },
    {
      label: "X.com",
      href: "https://x.com",
      ariaLabel: "X.com",
    },
  ];
  const navLinks: FooterNavLink[] = [
    { label: "About", href: "#about" },
    { label: "Service", href: "#service" },
    { label: "Pricing", href: "#pricing" },
    { label: "Portfolio", href: "#portfolio" },
  ];

  return (
    <footer
      id="footer"
      className="relative mt-16 w-full overflow-hidden px-4 pb-3 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-6"
    >
      <div className="flex flex-col gap-6 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-7">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e4e6ea] bg-white px-3 py-1.5 font-mono text-[10px] font-semibold uppercase text-text-primary">
            <Image src="/icons/phone.svg" alt="" width={16} height={16} aria-hidden="true" />
            Contact Us
          </span>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-[46px]">
            Ready to Build Something
            <br />
            Great?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
            Let&apos;s turn your idea into a high-impact digital product Let&apos;s design and develop a product that
            <br className="hidden sm:block" />
            moves your business forward.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:shrink-0">
          <Button
            asChild
            className="h-10 rounded-lg px-4 text-xs text-text-inverse shadow-[0_14px_22px_rgba(15,23,42,0.32)]"
          >
            <a href="mailto:Orymu@studio.com">Booking Now</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-10 rounded-lg border-border-brand bg-white px-4 text-xs text-text-brand"
          >
            <a href="#service">View Our Process</a>
          </Button>
        </div>
      </div>

      <FooterTopStrip email="Orymu@studio.com" socialLinks={socialLinks} />
      <FooterBottomBar currentYear={currentYear} navLinks={navLinks} />
    </footer>
  );
}
