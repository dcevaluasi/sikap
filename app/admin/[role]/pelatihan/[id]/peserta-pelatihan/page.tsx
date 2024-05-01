import Pelatihan from "@/components/dashboard/Dashboard/Pelatihan";
import PesertaPelatihan from "@/components/dashboard/Dashboard/PesertaPelatihan";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peserta Pelatihan",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <PesertaPelatihan />
      </DefaultLayout>
    </>
  );
}
