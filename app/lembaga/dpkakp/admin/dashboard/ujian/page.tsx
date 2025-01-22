
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
        <div className="flex-1 flex flex-col">
          {/* section body top nav */}
          <nav
            aria-label="top bar"
            className="flex-none flex justify-between bg-white h-16"
          >
            {/* top bar left */}
            <ul
              aria-label="top bar left"
              aria-orientation="horizontal"
              className="flex"
            ></ul>
            {/* to bar right  */}
            <ul
              aria-label="top bar right"
              aria-orientation="horizontal"
              className="px-8 flex items-center"
            >


              <li className="h-10 w-10 ml-3">
                <button
                  title="Page Menu"
                  aria-label="page menu"
                  className="h-full w-full rounded-full border focus:outline-none focus:shadow-outline"
                >
                  <img
                    className="h-full w-full rounded-full mx-auto"
                    src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/me.jpg"
                  />
                </button>
              </li>
            </ul>
          </nav>
          {/* section body header */}

          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <header
                aria-label="page caption"
                className="flex-row  flex h-20 items-center gap-2 bg-gray-100 border-t px-4"
              >
                <LucideFileSignature className="text-3xl" />
                <div className="flex flex-col">
                  <h1 id="page-caption" className="font-semibold text-lg">
                    Pelaksaan Ujian Keahlian AKP
                  </h1>
                  <p className="font-medium text-gray-400 text-base">
                    Upload Bank Soal Untuk Sesuai Program Keahlian Yang Diujikan
                    Pada Pelaksanaan Ujian Keahlian Awak Kapal Perikanan Yang
                    Diselenggarakan!
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
