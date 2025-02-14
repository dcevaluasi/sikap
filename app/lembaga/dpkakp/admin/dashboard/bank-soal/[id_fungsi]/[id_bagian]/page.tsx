import BankSoalUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/BankSoalUjianKeahlian";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Bank Soal Ujian Keahlian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Page() {
  return (
    <>
      <>
        <LayoutAdmin>
          <div className="flex-1 flex flex-col">

            <main className="mx-5 overflow-y-scroll">
              <BankSoalUjianKeahlian />
            </main>
            {/* main content */}
          </div>
        </LayoutAdmin>
      </>
    </>
  );
}
