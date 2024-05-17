"use client";

import React, { useState, useRef, useEffect } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { TbFileCertificate } from "react-icons/tb";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";

import { FaUserTie } from "react-icons/fa6";

import axios, { AxiosResponse } from "axios";
import { PelatihanMasyarakat } from "@/types/product";
import ListBPPP from "./list-bppp";
import { useSearchParams } from "next/navigation";
import { getPenyeleggara } from "@/utils/pelatihan";

export default function FeaturesBPPP({
  data,
}: {
  data: PelatihanMasyarakat[];
}) {
  return (
    <section className="relative h-fit pb-10" id="explore">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16 pb-10 h-full"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}

          <div className="max-w-2xl mx-auto text-center pb-5 md:pb-8">
            <h1 className="text-3xl font-calsans leading-[110%]">
              Pelatihan Masyarakat Umum KP
            </h1>
            <p className="text-base text-gray-600">
              Optimalkan potensi sumber daya laut. Bergabunglah dalam pelatihan
              masyarakat kelautan dan perikanan untuk masa depan yang
              berkelanjutan dan produktif.
            </p>
          </div>
          <ListBPPP pelatihan={data} />
        </div>
      </div>
    </section>
  );
}
