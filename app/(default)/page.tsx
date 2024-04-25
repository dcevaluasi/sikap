export const metadata = {
  title: 'E-LAUT Kementerian Kelautan dan Perikanan RI',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import FeaturesBlocks from '@/components/features-blocks'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import TrainingTypeSection from '@/components/trainingTypeSection'

export default function Home() {
  return (
    <>
      <Hero />
      <TrainingTypeSection />
      <Features />

      {/* <FeaturesBlocks /> */}
      {/* <Testimonials />
      <Newsletter /> */}
    </>
  )
}
