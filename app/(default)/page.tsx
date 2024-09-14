import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/features-blocks";
import Newsletter from "@/components/newsletter";
import TrainingTypeSection from "@/components/trainingTypeSection";
import FeaturesKepelautan from "@/components/features-kepelatuan";
import FeaturesDiklatKepelautan from "@/components/features-diklat-kepelautan";
import Testimonials from "@/components/testimonials";
import LogoIntegrated from "@/components/logoIntegrated";
import Timeline from "@/components/landing/Timeline";
import BalaiPelatihan from "@/components/landing/BalaiPelatihan";
export default function Home() {
  return (
    <>
      <Hero />
      <TrainingTypeSection />
      <Timeline />
      <BalaiPelatihan />
      {/* <FeaturesKepelautan /> */}
      {/* <FeaturesDiklatKepelautan /> */}
      {/* <FeaturesBlocks /> */}
      {/* <Features /> */}
      <Testimonials />
      <Newsletter />
      <LogoIntegrated />
    </>
  );
}
