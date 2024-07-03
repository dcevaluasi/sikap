"use client";

import { PelatihanMasyarakat } from "@/types/product";
import Image from "next/image";
import { Bounce } from "react-awesome-reveal";
import { FaBiohazard } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import ListBPPP from "./list-bppp";
import React from "react";

export default function FeaturesPelatihanBalai({
  pelatihan,
}: {
  pelatihan: PelatihanMasyarakat[];
}) {
  const competenceFields = [
    {
      id: 1,
      name: "Kepelautan",
      fullName: "Certificate Of Competency",
      description:
        "Pengelolaan dan operasional kapal serta awaknya untuk memastikan keselamatan dan kepatuhan maritim.",
      icon: (
        <FaBiohazard className="text-6xl text-sky-500 group-hover:text-sky-500 duration-700" />
      ),
      img: "cop.png",
    },
    {
      id: 2,
      name: "Non-Kepelautan",
      fullName: "Certificate Of Proficiency",
      description:
        "Proses pemeliharaan, pengolahan, penangkapan, ikan untuk produksi optimal dan berkelanjutan dan bersinergi.",
      icon: (
        <TbTargetArrow className="text-6xl text-sky-500 group-hover:text-sky-500 duration-700" />
      ),
      img: "budidaya.png",
    },
  ];
  const [selectedMenu, setSelectedMenu] = React.useState<number>(100);
  const handleSelectedMenu = (index: number) => {
    setSelectedMenu(index);
  };

  return (
    <>
      <section className="relative mb-24 mx-16 rounded-xl">
        <div
          className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 rounded-2xl bg-gray-900 pointer-events-none"
          aria-hidden="true"
        ></div>
        <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 -mt-5">
          <div className="py-12 md:py-20">
            {/* <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="text-3xl font-calsans leading-[110%]">
                Pelatihan dan Uji Kompetensi <br className="hidden md:block" />
                Kepelautan
              </h1>

              <p className="text-base text-gray-600">
                Jelajahi Peluang Baru dengan Pelatihan dan Uji Kompetensi
                Inovatif, bergabunglah dengan Program Kami untuk Mengasah
                Kompetensi-mu di Dunia Non-Kepelautan!
              </p>
            </div> */}

            {/* Items */}
            <div className="max-w-md mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-2 items-center md:max-w-2xl lg:max-w-3xl">
              {competenceFields?.map((competenceItem, index) => (
                <Bounce key={index} duration={500 * index}>
                  <div
                    className={`${
                      selectedMenu == index ? "scale-110 animate-pulse" : ""
                    } relative flex flex-col items-center px-6 py-7 bg-white rounded shadow-xl hover:cursor-pointer hover:scale-105 duration-1000 w-1/3 mx-auto md:mx-0 md:w-full`}
                    onClick={(e) => handleSelectedMenu(index)}
                  >
                    {/* {competenceItem?.icon} */}
                    <Image
                      className="w-16 md:w-16"
                      width={0}
                      height={0}
                      src={`/images/bidangPelatihan/${competenceItem?.img}`}
                      alt="Kementrian Kelautan dan Perikanan RI Logo"
                    />
                    <h4 className="text-3xl font-bold leading-snug font-calsans mt-1 tracking-tight mb-1 mt-3">
                      {competenceItem?.name}
                    </h4>
                    <p className="text-sm -mt-2 text-black font-semibold text-center">
                      {competenceItem?.fullName}
                    </p>
                    <p className="text-gray-600 text-center text-sm">
                      {competenceItem?.description}
                    </p>
                  </div>
                </Bounce>
              ))}
            </div>
          </div>
        </div>
      </section>
      {selectedMenu == 0 ? (
        <ListBPPP pelatihan={pelatihan} type="Kepelautan" />
      ) : (
        <ListBPPP pelatihan={pelatihan} type="Non-Kepelautan" />
      )}
    </>
  );
}
