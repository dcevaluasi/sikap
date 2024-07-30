import BankSoalPelatihan from "@/components/dashboard/Dashboard/BankSoalPelatihan";
import BankSoalUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/BankSoalUjianKeahlian";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Bank Soal Ujian Keahlian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Page() {
  return (
    <>
      <DefaultLayout>
        <BankSoalUjianKeahlian />
      </DefaultLayout>
    </>
  );
}
