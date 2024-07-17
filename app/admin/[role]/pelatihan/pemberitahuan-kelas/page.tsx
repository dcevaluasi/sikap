import PengajuanPelatihan from "@/components/dashboard/Dashboard/PengajuanPelatihan";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import React from "react";
import { TbSchool } from "react-icons/tb";

function page() {
  return (
    <>
      <DefaultLayout>
        <PengajuanPelatihan />
      </DefaultLayout>
    </>
  );
}

export default page;
