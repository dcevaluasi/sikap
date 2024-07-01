import Fasilitas from "@/components/dashboard/Dashboard/Fasilitas";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Database Fasilitas Penginapan - Elektronik Layanan Pelatihan Kelautan dan Perikanan Umum Terpadu",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Fasilitas />
      </DefaultLayout>
    </>
  );
}
