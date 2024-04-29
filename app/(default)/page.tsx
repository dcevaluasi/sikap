import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/features-blocks";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import TrainingTypeSection from "@/components/trainingTypeSection";
import FeatureCertificates from "@/components/features-certificates";
import FeaturesASN from "@/components/features-asn";

export default function Home() {
  return (
    <>
      <Hero />
      <TrainingTypeSection />
      <Features />
      <FeatureCertificates />
      {/* <FeaturesASN /> */}
    </>
  );
}
