import ECommerce from "@/components/dashboard/Dashboard/E-commerce";
import Pelatihan from "@/components/dashboard/Dashboard/Pelatihan";
import UjianKeahlianAKP from "@/components/dashboard/Dashboard/UjianKeahlianAKP";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ujian Keahlian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Page() {
  return (
    <>
      <DefaultLayoutDPKAKP>
        <UjianKeahlianAKP />
      </DefaultLayoutDPKAKP>
    </>
  );
}
