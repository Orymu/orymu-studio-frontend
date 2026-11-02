import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import WorkSection from "@/components/WorkSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <SectionDivider />
      <WhySection />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <WorkSection />
      <SectionDivider />
      <PricingSection />
      <SectionDivider />
      <FaqSection />
    </>
  );
}
