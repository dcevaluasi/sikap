"use client";

import { usePathname, useSearchParams } from "next/navigation";
import HeroBPPP from "@/components/hero-bppp";
import React from "react";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import { extractPathAfterBppp, getPenyeleggara } from "@/utils/pelatihan";
import TrainingTypeSection from "@/components/trainingTypeSection";
import BPPPServices from "@/components/bppp-services";
import BPPPTrainings from "@/components/bppp-trainings";

export default function Page() {
  const pathname = usePathname();
  const location = extractPathAfterBppp(pathname);
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
      <BPPPServices />
    </>
  );
}
