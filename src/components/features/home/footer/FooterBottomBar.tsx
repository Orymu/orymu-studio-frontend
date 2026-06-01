import type { FooterNavLink } from "./footer-types";

type FooterBottomBarProps = {
  currentYear: number;
  navLinks: FooterNavLink[];
};

export default function FooterBottomBar({
  currentYear,
  navLinks,
}: FooterBottomBarProps) {
  return (
    <div>
      <div className="flex flex-col gap-3 border-t border-[#e4e6ea] px-3 py-4 text-xs text-[#7b8290] md:flex-row md:items-center md:justify-between">
        <p>&copy;{currentYear} Orymu Studio All rights reserved</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-[#555d6c]">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
