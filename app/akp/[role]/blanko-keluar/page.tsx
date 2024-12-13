import { Metadata } from "next";
import BlankoKeluar from "@/components/dashboard/Dashboard/BlankoKeluar";
import DefaultLayoutAKP from "@/components/dashboard/Layouts/DefaultLayoutAKP";

export const metadata: Metadata = {
  title: "Database Pelatihan - Elektronik Layanan Pelatihan KP Utama Terpadu",
};

export default function Home() {
  return (
    <>
      <DefaultLayoutAKP>
        <BlankoKeluar />
      </DefaultLayoutAKP>
    </>
  );
}
