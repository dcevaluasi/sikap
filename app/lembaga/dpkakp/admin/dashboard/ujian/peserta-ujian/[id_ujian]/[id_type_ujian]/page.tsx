import PesertaUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/PesertaUjianKeahlian";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peserta Ujian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Home() {
  return (
    <>
      <LayoutAdmin>
        <PesertaUjianKeahlian />
      </LayoutAdmin>
    </>
  );
}
