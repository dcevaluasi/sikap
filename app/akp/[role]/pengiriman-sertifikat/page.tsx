"use client";

import DefaultLayoutAKP from "@/components/dashboard/Layouts/DefaultLayoutAKP";
import {
  BlankoComponent,
  TableDataPengirimanSertifikat,
} from "@/components/dashboard/Dashboard/AKP/index";
import { GrSend } from "react-icons/gr";

export default function Home() {
  return (
    <DefaultLayoutAKP>
      <BlankoComponent
        icon={<GrSend className="text-4xl" />}
        title="Pengiriman Sertifikat"
        description="Tracking dan Monitoring Pengiriman Sertifikat ke Lemdiklatek"
        table={<TableDataPengirimanSertifikat />}
      />
    </DefaultLayoutAKP>
  );
}
