"use client";

import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";

import React from "react";
import { HiUserGroup } from "react-icons/hi2";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <>
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <HiUserGroup className="text-4xl" />
              <div className="flex flex-col">
                <h1 className="text-3xl font-medium leading-[100%] font-calsans">
                  Peserta Pelatihan
                </h1>
                <p className="font-medium text-gray-400 text-base">
                  Verifikasi, Monitoring, dan Lihat Data Peserta Pelatihan!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-6 2xl:mt-7.5"></div>
        </>
      </DefaultLayout>
    </>
  );
}
