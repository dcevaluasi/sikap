import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/features-blocks";
import Newsletter from "@/components/newsletter";
import TrainingTypeSection from "@/components/trainingTypeSection";
import MapIndonesia from "@/components/map";

export default function Home() {
  return (
    <>
      <Hero />
      <TrainingTypeSection />
      <Features />
      <FeaturesBlocks />
      {/* <MapIndonesia /> */}
      <Newsletter />
    </>
  );
}
