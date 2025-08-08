
import UjianKeahlianAKP from "@/components/dashboard/Dashboard/UjianKeahlianAKP";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";
import { LucideFileSignature } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ujian Keahlian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Page() {
  return (
    <>
      <LayoutAdmin>
        <div className="">


          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <header
                aria-label="page caption"
                className="flex-row  flex h-20 items-center gap-2 w-full bg-gray-100 border-t px-4"
              >
                <LucideFileSignature className="text-3xl" />
                <div className="flex flex-col">
                  <h1 id="page-caption" className="font-semibold text-lg">
                    Pelaksaan Ujian Keahlian AKP
                  </h1>
                  <p className="font-medium text-gray-400 text-base">
                    Monitoring Pelaksaan Ujian Keahlian Awak kapal Perikanan!
                  </p>
                </div>
              </header>
            </div>
          </div>
          <main className="flex w-full h-full">
            <UjianKeahlianAKP />
            {/* section content */}
          </main>
          {/* main content */}
        </div>
      </LayoutAdmin>
    </>
  );
}
