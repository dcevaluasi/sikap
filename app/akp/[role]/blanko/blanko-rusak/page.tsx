"use client";

import { BlankoComponent } from "@/components/dashboard/Dashboard/AKP/BlankoComponent";
import DefaultLayoutAKP from "@/components/dashboard/Layouts/DefaultLayoutAKP";
import TableDataBlankoRusak from "@/components/dashboard/Pelatihan/TableDataBlankoRusak";
import { PiImageBroken } from "react-icons/pi";

export default function Home() {
  return (
    <DefaultLayoutAKP>
      <BlankoComponent
        icon={<PiImageBroken className="text-4xl" />}
        title="Kerusakan Blanko"
        description="Tracking dan Monitoring Kerusakan Blanko Yang Telah Digunakan!"
        table={<TableDataBlankoRusak />}
      />
    </DefaultLayoutAKP>
  );
}
