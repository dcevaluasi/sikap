import UjianKeahlianAKP from "@/components/dashboard/Dashboard/UjianKeahlianAKP";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ujian Keahlian - Dewan Penguji Keahlian Awak Kapal Perikanan",
  description: "Monitoring dan Pengelolaan Pelaksanaan Ujian Keahlian Awak Kapal Perikanan.",
};

export default function Page() {
  return (
    <LayoutAdmin>
      <UjianKeahlianAKP />
    </LayoutAdmin>
  );
}
