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
  { label: "About", href: "#about" },
  { label: "Service", href: "#service" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
];
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main>
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
