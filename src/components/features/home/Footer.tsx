import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative mt-16 w-full overflow-hidden border-t border-[#e4e6ea] pt-5 pb-6 sm:pt-7 sm:pb-8"
    >
      <div className="px-5 sm:px-8 md:px-10 lg:px-12 mb-12 md:mb-20">
        <div className="grid gap-5 text-text-secondary md:grid-cols-3">
          <div>
            <p className="text-sm">Contact At</p>
            <a
              href="mailto:Orymu@studio.com"
              className="mt-1 inline-block text-[34px] font-semibold leading-none text-text-brand sm:text-[36px]"
            >
              Orymu@studio.com
            </a>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group flex items-start"
            aria-label="Instagram"
          >
            <div>
              <p className="text-sm">Connect With Us</p>
              <div className="mt-1 flex items-center gap-3">
                <span className="-ml-1 shrink-0 text-[#5f6775] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight
                    className="h-6 w-6"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
                <p className="text-[34px] font-semibold leading-none text-[#1f2430] sm:text-[36px]">
                  Instagram
                </p>
              </div>
            </div>
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="group flex items-start"
            aria-label="X.com"
          >
            <div>
              <p className="text-sm">Connect With Us</p>
              <div className="mt-1 flex items-center gap-3">
                <span className="-ml-1 shrink-0 text-[#5f6775] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight
                    className="h-6 w-6"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
                <p className="text-[34px] font-semibold leading-none text-[#1f2430] sm:text-[36px]">
                  X.com
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="mt-3 w-full overflow-hidden px-0 pb-12">
        <p className="-ml-16 mx-0 select-none whitespace-nowrap text-[145px] font-semibold leading-[0.86] tracking-tight text-[#8d99a8] sm:text-[210px] md:text-[285px] lg:text-[330px]">
          Orymu Studio
        </p>
      </div>

      <div className="px-5 sm:px-8 md:px-10 lg:px-12">
        <div className="mt-6 flex flex-col gap-4 border-t border-[#e4e6ea] py-5 text-sm text-[#7b8290] sm:flex-row sm:items-center sm:justify-between">
          <p>@{currentYear} Orymu Studio All rights reserved</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#about" className="hover:text-[#555d6c]">
              About
            </a>
            <a href="#service" className="hover:text-[#555d6c]">
              Service
            </a>
            <a href="#pricing" className="hover:text-[#555d6c]">
              Pricing
            </a>
            <a href="#portfolio" className="hover:text-[#555d6c]">
              Portfolio
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
