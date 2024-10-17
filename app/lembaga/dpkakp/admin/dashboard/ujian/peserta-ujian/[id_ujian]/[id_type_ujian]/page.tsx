import PesertaUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/PesertaUjianKeahlian";
import Pelatihan from "@/components/dashboard/Dashboard/Pelatihan";
import PesertaPelatihan from "@/components/dashboard/Dashboard/PesertaPelatihan";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peserta Ujian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Home() {
  return (
    <>
      <DefaultLayoutDPKAKP>
        <PesertaUjianKeahlian />
      </DefaultLayoutDPKAKP>
    </>
  );
}
