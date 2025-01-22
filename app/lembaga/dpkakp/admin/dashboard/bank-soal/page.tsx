import TipeUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/TipeUjianKeahlian";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TbDatabase } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Bank Soal Ujian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Page() {
  return (
    <>
      <LayoutAdmin>
        <div className="flex-1 flex flex-col h-full overflow-y-scroll">
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
            >
              {/* add button */}
            </ul>
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
                <TbDatabase className="text-3xl" />
                <div className="flex flex-col">
                  <h1 id="page-caption" className="font-semibold text-lg">
                    Jenis Program Keahlian
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

          {/* main content */}
          <TipeUjianKeahlian />
        </div>
      </LayoutAdmin>
    </>
  );
}
