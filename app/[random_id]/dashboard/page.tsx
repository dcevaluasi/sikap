"use client";

import AKP from "@/components/dashboard/Dashboard/AKP";
import SummaryAKP from "@/components/dashboard/Dashboard/Summary/SummaryAKP";
import SummaryELAUT from "@/components/dashboard/Dashboard/Summary/SummaryELAUT";
import LayoutAdminElaut from "@/components/dashboard/Layouts/LayoutAdminElaut";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  return (
    <>
      <LayoutAdminElaut>
        <section className="p-10">
          <div className="w-full mt-1">
            <SummaryELAUT />
          </div>
        </section>
      </LayoutAdminElaut>
    </>
  );
}
