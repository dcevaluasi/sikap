"use client";

import React from "react";

import { TbSchool } from "react-icons/tb";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import TableDataDewanenguji from "@/components/dashboard/Pelatihan/TableDataPenguji";


const Blanko: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
            Data Penguji Ankapin dan Atkapin KP
            </h1>

    
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataDewanenguji />
      </div>
      </DefaultLayout>
  );
};

export default Blanko;
