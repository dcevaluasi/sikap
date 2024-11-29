import Pelatihan from "@/components/dashboard/Dashboard/Pelatihan";
import PesertaPelatihan from "@/components/dashboard/Dashboard/PesertaPelatihan";
import LayoutAdminElaut from "@/components/dashboard/Layouts/LayoutAdminElaut";

import { Metadata } from "next";
import { HiUserGroup } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Peserta Pelatihan",
};

export default function Home() {
  return (
    <>
      <LayoutAdminElaut>
        <main className="w-full h-full">
          <PesertaPelatihan />
        </main>
      </LayoutAdminElaut>
    </>
  );
}
