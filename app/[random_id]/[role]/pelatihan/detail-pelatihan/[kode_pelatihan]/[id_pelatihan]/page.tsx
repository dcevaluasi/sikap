import DetailPelatihan from "@/components/dashboard/Dashboard/pelatihan/DetailPelatihan";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import React from "react";

function page() {
  return (
    <>
      <DefaultLayout>
        <DetailPelatihan />
      </DefaultLayout>
    </>
  );
}

export default page;
