import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import React from "react";

function page() {
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium leading-[100%]">
            DATABASE PELATIHAN
          </h1>
          <p className="font-medium text-gray-400 text-base">
            Elektronik Layanan Pelatihan Umum Terpadu BPPSDM KP
          </p>
        </div>
      </DefaultLayout>
    </>
  );
}

export default page;
