"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import { BIDANG_PELATIHAN } from "@/constants/pelatihan";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { FaEarthOceania, FaFishFins } from "react-icons/fa6";
import { IoArrowForwardOutline } from "react-icons/io5";
import Link from "next/link";

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

      <div className="relative w-full mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl w-full mx-auto text-center pflex flex-col items-center justify-center pb-5 md:pb-8">
            <h1 className="text-4xl font-calsans leading-[100%]">
              Program Utama
              <br /> Pelatihan dan Sertifikasi
            </h1>
            <p className="text-base text-gray-60">
              Pilih pelatihan kelautan dan perikanan yang tepat. Dapatkan
              sertifikasi resmi dan tingkatkan keterampilanmu untuk berkarier di
              dunia maritim. Daftar sekarang!
            </p>
          </div>

          <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-5 w-full -mt-12">
            <Swiper
              effect={"coverflow"}
              centeredSlides={true}
              slidesPerView={"auto"}
              initialSlide={1}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="mySwiper"
            >
              {/* Skeleton loading for programPelatihans */}
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SwiperSlide className="swiper-slide type" key={index}>
                      <div className="rounded-3xl group relative">
                        <div className="w-full relative flex items-center justify-center rounded-3xl animate-pulse bg-gray-300 h-[400px]"></div>
                        <div className="absolute bottom-7 w-full flex gap-2 px-5 items-start">
                          <div className="bg-gray-300 rounded-full p-5 w-12 h-12 animate-pulse"></div>
                          <div className="flex flex-col items-start">
                            <div className="w-32 h-6 bg-gray-300 animate-pulse mb-2"></div>
                            <div className="w-64 h-4 bg-gray-300 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                : programPelatihans.map((programPelatihan, index) => (
                    <SwiperSlide className="swiper-slide type" key={index}>
                      <Link
                        href={`/pelatihan/program/${programPelatihan.path!}`}
                        className="rounded-3xl group relative"
                      >
                        <div
                          className="w-full relative cursor-pointer flex items-center rounded-3xl justify-center hover:scale-105 duration-700"
                          key={index}
                        >
                          <div className="w-full h-full absolute duration-700 rounded-3xl top-0 bg-black group-hover:bg-opacity-40 bg-opacity-60"></div>
                          <Image
                            className="w-full object-cover h-[400px] rounded-3xl"
                            width={0}
                            height={0}
                            src={programPelatihan.cover}
                            alt={programPelatihan.name}
                          />
                          <div className="flex absolute gap-2 px-5 items-start bottom-7 w-full">
                            <div className="flex items-center justify-center group-hover:scale-150 duration-700 group-hover:-rotate-[20deg] group-hover:z-0 bg-black bg-opacity-25 rounded-full p-5">
                              {programPelatihan.component}
                            </div>
                            <div className="flex-col flex items-start group-hover:z-10 duration-700">
                              <h1 className="text-white text-4xl leading-none duration-700 font-calsans font-semibold">
                                {programPelatihan.name}
                              </h1>
                              <p className="text-gray-100 text-sm duration-700">
                                {programPelatihan.description}
                              </p>
                              <Link
                                href=""
                                className="flex gap-2 text-gray-100 text-sm items-center hover:animate-float"
                              >
                                <IoArrowForwardOutline />{" "}
                                <span>Lihat selengkapnya</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
