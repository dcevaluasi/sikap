"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import { BIDANG_PELATIHAN } from "@/constants/pelatihan";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function TrainingTypeSection() {
  const [selectedBidang, setSelectedBidang] = useState<number | null>(null);

  return (
    <section className="relative h-fit pb-20" id="explore">
      <div
        className="absolute inset-0 pointer-events-none mb-16 pb-10 h-full"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8">
            <h1 className="text-3xl font-calsans leading-[110%]">
              Ragam Bidang
              <br />
              Kelautan dan Perikanan
            </h1>
            <p className="text-base text-gray-600">
              Pilih bidang kepelautan dan perikanan untuk pelatihan dan
              sertifikasi yang ingin kamu ikuti!
            </p>
          </div>

          <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-5 md:gap-9">
            {BIDANG_PELATIHAN.map((bidangPelatihan, index) => (
              <Slide direction="up" duration={500 * index} key={index}>
                <Sheet>
                  <SheetTrigger asChild>
                    <div
                      className="flex flex-col gap-2 cursor-pointer items-center duration-1000 hover:scale-105 text-center"
                      onClick={() => setSelectedBidang(index)}
                    >
                      <div className="flex items-center justify-center bg-white shadow-custom rounded-full w-24 h-24 md:w-28 md:h-28 p-6">
                        <Image
                          className="w-16 md:w-16"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
