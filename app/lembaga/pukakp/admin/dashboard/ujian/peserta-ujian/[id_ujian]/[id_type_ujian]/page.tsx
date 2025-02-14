import PesertaUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/PesertaUjianKeahlian";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peserta Ujian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Home() {
  return (
    <>
      <>
        <LayoutAdmin>
          <div className="flex-1 flex flex-col">

            <main className="mx-5 overflow-y-scroll">
              <PesertaUjianKeahlian />
            </main>
            {/* main content */}
          </div>
        </LayoutAdmin>
      </>
    </>
  );
}
