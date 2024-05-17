"use client";

import { useSearchParams } from "next/navigation";
import HeroBPPP from "@/components/hero-bppp";
import FeaturesBPPP from "@/components/features-bppp";
import React from "react";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import { getPenyeleggara } from "@/utils/pelatihan";

export default function Page() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const penyelenggara = getPenyeleggara(location!);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const handleFetchingPublicTrainingDataByPenyelenggara = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/lemdik/getPelatihan?penyelenggara_pelatihan=${penyelenggara}`
      );
      console.log({ response });
      setData(response.data.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      handleFetchingPublicTrainingDataByPenyelenggara();
    }, 1000);
  }, []);

  return (
    <>
      <HeroBPPP bppp={location!} />
      <FeaturesBPPP data={data} />
    </>
  );
}
