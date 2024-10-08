import PemberitahuanPelatihan from "@/components/dashboard/Dashboard/PemberitahuanPelatihan";
import PengajuanPelatihan from "@/components/dashboard/Dashboard/PengajuanPelatihan";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import React from "react";
import { TbSchool } from "react-icons/tb";

function page() {
  return (
    <>
      <DefaultLayout>
        <PemberitahuanPelatihan />
      </DefaultLayout>
    </>
  );
}

export default page;
