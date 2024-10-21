"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HiUserGroup } from "react-icons/hi2";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./../app/css/additional-styles/features-slider.css";

// import required modules
import "swiper/css/navigation";
import { Slide } from "react-awesome-reveal";
import { usePathname } from "next/navigation";
import { extractPathAfterBppp, getPenyeleggara } from "@/utils/pelatihan";
import { User } from "@/types/user";
import UserTrainingService from "./user-training-service";
import UserCertificateService from "./user-certificate-service";
import UserDocuments from "./user-documents";
import { ManningAgent } from "@/types/product";
import ManningAgentTrainingService from "./manning-agent-training-service";

export default function ManningAgentService({
  manningAgent,
}: {
  manningAgent: ManningAgent | null;
}) {
  const tabMenus = [
    {
      id: 1,
      name: "Pelatihan",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/bppp-training.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 2,
      name: "Uji Kompetensi",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/bppp-certificate.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 4,
      name: "Profile",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/user-profile.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
  ];

  const pathname = usePathname();
  const location = extractPathAfterBppp(pathname);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  const [menuSelected, setMenuSelected] = React.useState(false);
  const [indexMenuSelected, setIndexMenuSelected] = React.useState(0);
  const handleSelectedMenu = (index: number) => {
    setMenuSelected(!menuSelected);
    setIndexMenuSelected(index);
  };

  return (
    <div className="w-full">
      <section className="relative pb-20 -mt-16" id="explore">
        <div
          className="absolute inset-0 pointer-events-none mb-16 pb-10 h-full"
          aria-hidden="true"
        ></div>

        <div className="relative w-full mx-auto px-4 sm:px-6">
          <div className="">
            <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-5 md:gap-9">
              {tabMenus.map((tabMenu, index) => (
                <div key={index} className="gap-4 w-fit">
                  <Slide direction="up" duration={500 * index}>
                    <div
                      key={index}
                      onClick={(e) => handleSelectedMenu(index)}
                      className="flex flex-col gap-2 cursor-pointer items-center duration-1000 hover:scale-105 text-center"
                    >
                      <div className="flex items-center justify-center  bg-white shadow-custom rounded-full w-24 h-24 md:w-28 md:h-28 p-6">
                        <Image
                          className="w-16 md:w-16"
                          width={0}
                          height={0}
                          src={tabMenu.image}
                          alt="Kementrian Kelautan dan Perikanan RI Logo"
                        />
                      </div>
                      <p className="text-sm text-white font-semibold">
                        {tabMenu.name}
                      </p>
                    </div>
                  </Slide>
                </div>
              ))}
            </div>
            {/* </Swiper> */}
          </div>
        </div>
      </section>

      {indexMenuSelected == 0 && (
        <ManningAgentTrainingService manningAgent={manningAgent} />
      )}
    </div>
  );
}
