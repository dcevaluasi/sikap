"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import { BIDANG_PELATIHAN } from "@/constants/pelatihan";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { FaFishFins } from "react-icons/fa6";

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
        "Bidang perikanan adalah petualangan di laut yang melibatkan penangkapan, budidaya, serta inovasi pengelolaan sumber daya laut secara berkelanjutan.",
    },
    {
      id: 2,
      name: "Kelautan",
      cover: "/images/program-pelatihan/kelautan.jpeg",
      icon: "/images/program-pelatihan/icons/perikanan.png",
      description:
        "Bidang kelautan adalah eksplorasi tak terbatas yang mencakup pengelolaan sumber daya, konservasi, riset, dan inovasi teknologi di laut.",
    },
  ];

  useEffect(() => {
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
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center pb-5 md:pb-8">
            <h1 className="text-3xl font-calsans leading-[110%]">
              Program Pelatihan
            </h1>
            <p className="text-base text-gray-600 max-w-xl">
              Pilih program pelatihan kepelautan dan perikanan untuk pelatihan
              dan sertifikasi yang ingin kamu ikuti!
            </p>
          </div>

          <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-5 w-full">
            {programPelatihans.map((programPelatihan, index) => (
              <Slide
                direction="up"
                duration={1000 * index}
                className="w-1/2 rounded-3xl group relative"
              >
                <div
                  className="w-full relative cursor-pointer flex items-center justify-center"
                  key={index}
                >
                  <div className="w-full h-[400px] absolute duration-700 rounded-3xl top-0 bg-blue-500 group-hover:bg-opacity-40 bg-opacity-20"></div>
                  <Image
                    className={`w-full object-cover h-[400px] rounded-3xl`}
                    width={0}
                    height={0}
                    src={programPelatihan.cover}
                    alt={programPelatihan.name}
                  />

                  <div className="flex  flex-col absolute items-center justify-center max-w-lg text-center gap-0">
                    <FaFishFins className="text-white text-4xl" />
                    <h1 className=" text-white text-5xl leading-none group-hover:scale-110 duration-700 font-calsans font-semibold">
                      {programPelatihan.name}
                    </h1>
                    <p className="text-gray-100 group-hover:scale-110 duration-700">
                      {programPelatihan.description}
                    </p>
                  </div>
                </div>
              </Slide>
            ))}

            {/* {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <Slide direction="up" duration={500 * index} key={index}>
                    <div className="flex flex-col gap-2 items-center text-center">
                      <div className="flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse shadow-custom rounded-full w-24 h-24 md:w-28 md:h-28 p-6"></div>

                      <div className="w-20 h-6  bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400  animate-pulse rounded"></div>
                    </div>
                  </Slide>
                ))
              : BIDANG_PELATIHAN.map((bidangPelatihan, index) => (
                  <Slide direction="up" duration={500 * index} key={index}>
                    <Sheet>
                      <SheetTrigger asChild>
                        <div
                          className="flex flex-col gap-2 cursor-pointer items-center duration-1000 hover:scale-105 text-center"
                          onClick={() => setSelectedBidang(index)}
                        >
                          <div className="flex items-center justify-center bg-white shadow-custom rounded-full w-24 h-24 md:w-28 md:h-28 p-6">
                            <Image
                              className={` ${
                                bidangPelatihan.Name === "Mesin Perikanan"
                                  ? "w-36 max-w-[5rem]"
                                  : "w-16 md:w-16"
                              }`}
                              width={0}
                              height={0}
                              src={bidangPelatihan.Image}
                              alt={bidangPelatihan.Name}
                            />
                          </div>
                          <p className="text-sm text-black font-semibold">
                            {bidangPelatihan.Name}
                          </p>
                        </div>
                      </SheetTrigger>

                      {selectedBidang === index && (
                        <SheetContent className="z-[10000000]" side={"left"}>
                          <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">
                              {bidangPelatihan.Name}
                            </h2>
                            <Image
                              className="w-16 md:w-full"
                              width={0}
                              height={0}
                              src={bidangPelatihan.Illustration!}
                              alt={bidangPelatihan.Name}
                            />
                            <p className="text-gray-600">
                              {bidangPelatihan.Description}
                            </p>
                            <ul className="mt-4 list-disc list-inside">
                              {bidangPelatihan.Pelatihan.map((item, i) => (
                                <li key={i} className="text-gray-700">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </SheetContent>
                      )}
                    </Sheet>
                  </Slide>
                ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
