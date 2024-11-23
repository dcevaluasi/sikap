import FeaturesDiklatKepelautan from "@/components/features-diklat-kepelautan";

import Newsletter from "@/components/newsletter";
import HeroPelatihan from "@/components/pelatihan/hero-pelatihan";
import React from "react";

function page() {
  return (
    <>
      <HeroPelatihan />

      <FeaturesDiklatKepelautan />

      <Newsletter />
    </>
  );
}

export default page;
