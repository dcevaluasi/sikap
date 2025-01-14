import FungsiUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/FungsiUjianKeahlian";
import TipeUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/TipeUjianKeahlian";

import UjianKeahlianAKP from "@/components/dashboard/Dashboard/UjianKeahlianAKP";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fungsi Ujian Keahlian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Page() {
  return (
    <>
      <DefaultLayoutDPKAKP>
        <FungsiUjianKeahlian />
      </DefaultLayoutDPKAKP>
    </>
  );
}
