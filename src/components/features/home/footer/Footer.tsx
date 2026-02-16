import FooterBottomBar from "@/components/features/home/footer/FooterBottomBar";
import FooterBrandMarquee from "@/components/features/home/footer/FooterBrandMarquee";
import FooterTopStrip from "@/components/features/home/footer/FooterTopStrip";
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
      className="relative mt-16 w-full overflow-hidden pb-6 sm:pb-8"
    >
      <FooterTopStrip email="Orymu@studio.com" socialLinks={socialLinks} />
      <FooterBrandMarquee brand="Orymu Studio" />
      <FooterBottomBar currentYear={currentYear} navLinks={navLinks} />
    </footer>
  );
}
