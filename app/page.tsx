import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LanguageSupportSection from "@/components/landing/LanguageSupportSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <LanguageSupportSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
