"use client";

import Image from "next/image";
import { Bounce } from "react-awesome-reveal";
import { FaBiohazard } from "react-icons/fa6";
import { GiCirclingFish, GiFishEggs, GiFoodChain } from "react-icons/gi";
import { MdAssuredWorkload } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

export default function FeaturesKepelautan() {
  const competenceFields = [
    {
      id: 1,
      name: "COC",
      fullName: "Certificate Of Competency",
      description:
        "Kompetensi mengamankan pangan dengan identifikasi bahaya dan penerapan kontrol",
      icon: (
        <FaBiohazard className="text-6xl text-sky-500 group-hover:text-sky-500 duration-700" />
      ),
      img: "coc.png",
    },
    {
      id: 2,
      name: "COP",
      fullName: "Certificate Of Proficiency",
      description:
        "Pengawasan organisasi untuk tujuan efektif dan kepatuhan, melalui kegiatan berkelanjutan",
      icon: (
        <TbTargetArrow className="text-6xl text-sky-500 group-hover:text-sky-500 duration-700" />
      ),
      img: "cop.png",
    },
    {
      id: 3,
      name: "DPM",
      fullName: "Diklat Pemberdayaan Masyarakat",
      description:
        "Pengawasan organisasi untuk tujuan efektif dan kepatuhan, melalui kegiatan berkelanjutan",
      icon: (
        <TbTargetArrow className="text-6xl text-sky-500 group-hover:text-sky-500 duration-700" />
      ),
      img: "dpm.png",
    },
  ];
  return (
    <section className="relative mb-24">
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="text-3xl font-calsans leading-[110%]">
              Pelatihan dan Uji Kompetensi <br className="hidden md:block" />
              Kepelautan
            </h1>

            <p className="text-base text-gray-600">
              Jelajahi Peluang Baru dengan Pelatihan dan Uji Kompetensi
              Inovatif, bergabunglah dengan Program Kami untuk Mengasah
              Kompetensi-mu di Dunia Non-Kepelautan!
            </p>
          </div>

          {/* Items */}
          <div className="max-w-md mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {competenceFields?.map((competenceItem, index) => (
              <Bounce key={index} duration={500 * index}>
                <div className="relative flex flex-col items-center px-6 py-7 bg-white rounded shadow-xl hover:cursor-pointer hover:scale-105 duration-1000 w-2/3 mx-auto md:mx-0 md:w-full">
                  {/* {competenceItem?.icon} */}
                  <Image
                    className="w-16 md:w-20"
                    width={0}
                    height={0}
                    src={`/images/bidangPelatihan/${competenceItem?.img}`}
                    alt="Kementrian Kelautan dan Perikanan RI Logo"
                  />
                  <h4 className="text-3xl font-bold leading-snug font-calsans mt-1 tracking-tight mb-1">
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
  );
}
