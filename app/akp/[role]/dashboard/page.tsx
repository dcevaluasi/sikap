import AKP from "@/components/dashboard/Dashboard/AKP";
import ECommerce from "@/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import DefaultLayoutAKP from "@/components/dashboard/Layouts/DefaultLayoutAKP";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Dashboard Lemdiklat - Elektronik Layanan Pelatihan Kelautan dan Perikanan Utama Terpadu",
};

export default function Home() {
  return (
    <>
      <DefaultLayoutAKP>
        <AKP />
      </DefaultLayoutAKP>
    </>
  );
}
