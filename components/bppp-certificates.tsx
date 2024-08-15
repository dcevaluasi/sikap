"use client";

import React, { useState, useRef, useEffect } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { TbFileCertificate } from "react-icons/tb";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";

import FeaturesBg from "@/public/images/features-bg.png";
import FeaturesElement from "@/public/images/features-element.png";
import { GiLuckyFisherman, GiWaterSplash } from "react-icons/gi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiSlack } from "react-icons/fi";
import { FaPlaceOfWorship } from "react-icons/fa6";
import { GrCertificate, GrLocation } from "react-icons/gr";

import { FaUserTie } from "react-icons/fa6";

import axios, { AxiosResponse } from "axios";
import { PelatihanMasyarakat } from "@/types/product";
import ListBPPP from "./list-bppp";
import { useSearchParams } from "next/navigation";
import { getPenyeleggara } from "@/utils/pelatihan";
import FeaturesPelatihanBalai from "./features-pelatihan-balai";
import Image from "next/image";
import Link from "next/link";

export default function BPPPCertificates({
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

      {data.length == 0 ? (
        <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20 flex flex-col items-center">
            <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 -mt-2">
              <h1 className="text-3xl font-calsans leading-[110%] text-black">
                Belum Ada Uji Kompetensi
              </h1>
              <Image
                src={"/illustrations/not-found.png"}
                alt="Not Found"
                width={0}
                height={0}
                className="w-[400px]"
              />
              <div className="text-gray-600 text-center  max-w-md">
                Kamu belum mengikuti pelatihan apapun, ayo cari pelatihan
                menarik di E-LAUT dan jadilah SDM unggul untuk Indonesia!{" "}
                <Link
                  href="/"
                  className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                >
                  Cari Pelatihan
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}

            <div className="max-w-2xl mx-auto text-center pb-5 md:pb-8">
              <h1 className="text-3xl font-calsans leading-[110%]">
                Uji Kompetensi
              </h1>
              <p className="text-base text-gray-600">
                Optimalkan potensi sumber daya laut. Bergabunglah dalam
                pelatihan masyarakat kelautan dan perikanan untuk masa depan
                yang berkelanjutan dan produktif.
              </p>
            </div>
            {/* <Tab />
          <ListBPPP pelatihan={data} ty /> */}

            <FeaturesPelatihanBalai pelatihan={data} />
          </div>
        </div>
      )}
    </section>
  );
}
