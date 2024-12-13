"use client";

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
          <div className="w-full mt-8">
            <Tabs defaultValue={"CoP"} className="w-full mb-3 -mt-4">
              <TabsList className="flex gap-2 w-full">
                <TabsTrigger value="CoC" className="w-full">
                  Summary Pelatihan Kepelautan
                </TabsTrigger>
                <TabsTrigger value="CoP" className="w-full">
                  Summary Pelatihan Non-Kepelautan
                </TabsTrigger>
              </TabsList>
              <TabsContent value="CoC">
                <SummaryELAUT />
              </TabsContent>
              <TabsContent value="CoP">
                <SummaryAKP />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </LayoutAdminElaut>
    </>
  );
}
