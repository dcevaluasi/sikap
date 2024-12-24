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
            <Tabs defaultValue={"CoP"} className="w-full mb-3 -mt-7">
              <TabsList className="flex gap-2 w-full">
                <TabsTrigger value="CoC" className="w-full">
                  Pelatihan dan Sertifikasi Awak Kapal Perikanan
                </TabsTrigger>
                <TabsTrigger value="CoP" className="w-full">
                  Pelatihan dan Sertifikasi Perikanan
                </TabsTrigger>
              </TabsList>
              <TabsContent value="CoC">
                <SummaryAKP />
              </TabsContent>
              <TabsContent value="CoP">
                <SummaryELAUT />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </LayoutAdminElaut>
    </>
  );
}
