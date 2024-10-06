"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import { BIDANG_PELATIHAN } from "@/constants/pelatihan";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { FaEarthOceania, FaFishFins } from "react-icons/fa6";
import { IoArrowForwardOutline } from "react-icons/io5";
import Link from "next/link";

import { CalendarIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./coverflow.css";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { RiShipFill } from "react-icons/ri";

export default function TrainingTypeSection() {
  const [selectedBidang, setSelectedBidang] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const programPelatihans = [
    {
      id: 1,
      name: "Perikanan",
      cover: "/images/program-pelatihan/perikanan.jpg",
      icon: "/images/program-pelatihan/icons/perikanan.png",
      description:
        "Bidang perikanan adalah petualangan di laut yang melibatkan penangkapan, budidaya, serta inovasi sumber daya laut berkelanjutan.",
      component: <FaFishFins className="text-white text-[3rem]" />,
      path: "perikanan",
    },
    {
      id: 2,
      name: "Awak Kapal Perikanan",
      cover: "/images/program-pelatihan/awak-kapal-perikanan.jpg",
      icon: "/images/program-pelatihan/icons/perikanan.png",
      description:
        "Bidang kelautan adalah eksplorasi tak terbatas yang mencakup pengelolaan sumber daya, konservasi, riset, dan inovasi teknologi di laut.",
      component: <RiShipFill className="text-white text-[3rem]" />,
      path: "akp",
    },
    {
      id: 3,
      name: "Kelautan",
      cover: "/images/program-pelatihan/kelautan.jpeg",
      icon: "/images/program-pelatihan/icons/perikanan.png",
      description:
        "Bidang kelautan adalah eksplorasi tak terbatas yang mencakup pengelolaan sumber daya, konservasi, riset, dan inovasi teknologi di laut.",
      component: <FaEarthOceania className="text-white text-[3rem]" />,
      path: "kelautan",
    },
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-fit pb-20" id="explore">
      <div
        className="absolute inset-0 pointer-events-none mb-16 pb-10 h-full"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className=" w-full mx-auto text-center flex flex-col items-center justify-center pb-5 md:pb-8">
            <h1 className="text-4xl font-calsans leading-[100%]">
              Program Utama
              <br /> Pelatihan dan Sertifikasi
            </h1>
            <p className="text-base text-gray-60 max-w-3xl">
              Pilih pelatihan kelautan dan perikanan yang tepat. Dapatkan
              sertifikasi resmi dan tingkatkan keterampilanmu untuk berkarier di
              dunia maritim. Daftar sekarang!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 w-full">
            {programPelatihans.map((programPelatihan, index) => (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link
                    href={`/layanan/program/${programPelatihan.path!}`}
                    className="rounded-3xl group relative"
                  >
                    <div
                      className="w-full relative cursor-pointer flex items-center rounded-3xl justify-center hover:scale-105 duration-700"
                      key={index}
                    >
                      <div className="w-full h-full absolute duration-700 rounded-3xl top-0 bg-black group-hover:bg-opacity-40 bg-opacity-60"></div>
                      <Image
                        className="w-full object-cover h-[150px] rounded-3xl"
                        width={0}
                        height={0}
                        src={programPelatihan.cover}
                        alt={programPelatihan.name}
                      />
                      <div className="flex absolute gap-2 px-5 items-center bottom-7 w-full">
                        <div className="flex items-center justify-center group-hover:scale-150 duration-700 group-hover:-rotate-[20deg] group-hover:z-0 bg-black bg-opacity-25 rounded-full p-5">
                          {programPelatihan.component}
                        </div>
                        <div className="flex-col flex items-start group-hover:z-10 duration-700">
                          <h1 className="text-white text-3xl leading-none duration-700 font-calsans font-semibold">
                            {programPelatihan.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">
                        {programPelatihan?.name}
                      </h4>
                      <p className="text-sm">{programPelatihan?.description}</p>
                      <div className="flex items-center pt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
