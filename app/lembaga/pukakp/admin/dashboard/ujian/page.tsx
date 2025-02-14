
import CallCenter from "@/components/call-center";
import UjianKeahlianAKP from "@/components/dashboard/Dashboard/UjianKeahlianAKP";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ujian Keahlian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Page() {
  return (
    <>
      <LayoutAdmin>
        <div className="flex-1 flex flex-col">
        
          <header
            aria-label="page caption"
            className="flex-none flex h-16 w-full bg-gray-100 border-t px-4 items-center"
          >
            <h1 id="page-caption" className="font-semibold text-lg">
              Pelaksanaan Ujian AKP
            </h1>
          </header>
          <main className="mx-5 overflow-y-scroll">
            <UjianKeahlianAKP />

            <CallCenter />
          </main>
          {/* main content */}
        </div>
      </LayoutAdmin>
    </>
  );
}
