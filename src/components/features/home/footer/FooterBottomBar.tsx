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
    <div className="px-4 sm:px-6 lg:px-10">
      <div className="mt-6 flex flex-col gap-3 border-t border-[#e4e6ea] py-5 text-sm text-[#7b8290] md:flex-row md:items-center md:justify-between">
        <p>@{currentYear} Orymu Studio All rights reserved</p>
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
