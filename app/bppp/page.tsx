'use client'

import { useSearchParams } from "next/navigation";
import HeroBPPP from "@/components/hero-bppp";
import FeaturesBPPP from "@/components/features-bppp";
import React from "react";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import { getPenyeleggara } from "@/utils/pelatihan";

export default function Page() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location')
  const penyelenggara = getPenyeleggara(location!)

  return (
    <>
      <HeroBPPP bppp={location!} />
      <FeaturesBPPP />
    </>
  );
}
