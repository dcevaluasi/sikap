import ECommerce from "@/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Dashboard Lemdiklat - Elektronik Layanan Pelatihan Kelautan dan Perikanan Utama Terpadu",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
