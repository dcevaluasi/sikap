"use client";

import { BlankoComponent } from "@/components/dashboard/Dashboard/AKP/BlankoComponent";
import DefaultLayoutAKP from "@/components/dashboard/Layouts/DefaultLayoutAKP";
import TableDataBlanko from "@/components/dashboard/Pelatihan/TableDataBlanko";
import { RiFilePaperLine } from "react-icons/ri";

export default function Home() {
  return (
    <DefaultLayoutAKP>
      <BlankoComponent
        icon={<RiFilePaperLine className="text-4xl" />}
        title="Persediaan Blanko"
        description="Tracking dan Monitoring Persediaan Blanko Sertifikasi Awak Kapal Perikanan!"
        table={<TableDataBlanko />}
      />
    </DefaultLayoutAKP>
  );
}
