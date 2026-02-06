import {
  About,
  Footer,
  Hero,
  Portfolio,
  Pricing,
  Service,
} from "@/components/features";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#how-we-work" },
  { label: "Service", href: "#service" },
  { label: "Portfolio", href: "#our-work" },
  { label: "Pricing", href: "#price" },
];
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1f2933]">
      <main className="px-4 py-4 sm:py-6 sm:px-6 lg:py-10 lg:px-10">
        <Hero navItems={navItems} />
        <About />
        <Service />
        <Portfolio />
        <Pricing />
        <Footer />
      </main>
    </div>
  );
}
