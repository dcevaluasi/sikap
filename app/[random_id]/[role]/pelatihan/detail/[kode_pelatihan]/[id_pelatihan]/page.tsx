"use client";

import DetailPelatihan from "@/components/dashboard/Dashboard/DetailPelatihan";
import LayoutAdminElaut from "@/components/dashboard/Layouts/LayoutAdminElaut";
import React from "react";
import { TbSchool } from "react-icons/tb";

function page() {
  return (
    <>
      <LayoutAdminElaut>
        <section className="flex-1 flex flex-col">
          <main className="w-full h-full">
            <DetailPelatihan />
          </main>
        </section>
      </LayoutAdminElaut>
    </>
  );
}

export default page;
