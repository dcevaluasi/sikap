import BagianUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/BagianUjianKeahlian";
import FungsiUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/FungsiUjianKeahlian";

import UjianKeahlianAKP from "@/components/dashboard/Dashboard/UjianKeahlianAKP";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bagian Ujian Keahlian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Page() {
  return (
    <>
      <DefaultLayoutDPKAKP>
        <BagianUjianKeahlian />
      </DefaultLayoutDPKAKP>
    </>
  );
}
