import TipeUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/TipeUjianKeahlian";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bank Soal Ujian - Dewan Penguji Keahlian Awak Kapal Perikanan",
  description:
    "Kelola bank soal ujian keahlian Awak Kapal Perikanan berdasarkan program ANKAPIN dan ATKAPIN.",
};

export default function Page() {
  return (
    <LayoutAdmin>
      <TipeUjianKeahlian />
    </LayoutAdmin>
  );
}
