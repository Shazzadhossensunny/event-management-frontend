import AboutSection from "../components/home/AboutSection";
import CtaSection from "../components/home/CtaSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
