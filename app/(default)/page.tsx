import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/features-blocks";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import TrainingTypeSection from "@/components/trainingTypeSection";
import FeatureCertificates from "@/components/features-certificates";
import FeaturesASN from "@/components/features-asn";
import PelatihanAspirasi from "@/components/pelatihan-aspirasi";

export default function Home() {
  return (
    <>
      <Hero />
      <TrainingTypeSection />
      <Features />
      <PelatihanAspirasi />
      <FeatureCertificates />
      {/* <FeaturesASN /> */}
    </>
  );
}
