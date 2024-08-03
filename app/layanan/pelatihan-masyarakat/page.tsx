"use client";

import Hero from "@/components/hero";
import MapIndonesia from "@/components/map";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Bounce, Slide } from "react-awesome-reveal";
import { MdKeyboardArrowRight } from "react-icons/md";

export const bidangPelatihan = [
  {
    id: 0,
    name: "Budidaya",
    desc: "Budidaya ikan",
    icon: "/images/bidangPelatihan/budidaya.png",
  },
  {
    id: 1,
    name: "Konservasi",
    desc: "Jaga kelestarian",
    icon: "/images/bidangPelatihan/konservasi.png",
  },
  {
    id: 2,
    name: "SD Perikanan",
    desc: "Kembangkan potensi",
    icon: "/images/bidangPelatihan/sd-perikanan.png",
  },
  {
    id: 3,
    name: "Kepelautan",
    desc: "Ahli kapal",
    icon: "/images/bidangPelatihan/kepelautan.png",
  },
  {
    id: 4,
    name: "Penangkapan",
    desc: "Hasil tangkap",
    icon: "/images/bidangPelatihan/penangkapan.png",
  },
  {
    id: 5,
    name: "Mesin Perikanan",
    desc: "Berlayar canggih",
    icon: "/images/bidangPelatihan/mesin-perikanan.png",
  },
  {
    id: 6,
    name: "Pengolahan dan Pemasaran",
    desc: "Tingkatkan nilai produk",
    icon: "/images/bidangPelatihan/pengolahan-pemasaran.png",
  },
];

function page() {
  return (
    <>
      <section className="mt-44 max-w-6xl mx-10 md:mx-auto flex flex-col gap-24">
        <div className="flex flex-col gap-0 relative">
          {/* <div className="absolute right-10 bottom-0">
            <Bounce className="">
              <Image
                className="w-[350px] rotate-12 z-[9999] mb-5 -mt-16 "
                width={0}
                height={0}
                src={"/images/logo/logo-elaut-color.png"}
                alt="Kementrian Kelautan dan Perikanan RI Logo"
              />
            </Bounce>
          </div> */}

          <div className="max-w-3xl ">
            {" "}
            <Slide direction="left" duration={1000}>
              <h1 className="text-4xl  font-normal leading-[100%] tracking-tighter mb-3 -mt-2 text-[#000] font-calsans">
                Ikut pelatihan, kembangkan <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  potensi dan kompetensi di bidang kelautan dan perikanan
                </span>
              </h1>
            </Slide>
            <p className="text-gray-600 max-w-2xl">
              Temukan dan dikuti berbagai macam pelatihan di bidang kelautan dan
              perikanan, kembangkan potensi dan kompetensi diri menjadi SDM
              unggul kelautan dan perikanan membangun indonesia emas.
            </p>
            <div className="flex mt-3">
              <Link
                href="/login"
                className={`btn-sm ${"text-blue-500 hover:text-white"} border border-blue-500 hover:bg-blue-500`}
              >
                <span>Ikuti Pelatian</span>
              </Link>

              <Link
                href="/login"
                className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
              >
                <span>Explore Bidang Pelatihan</span>
                <svg
                  className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                    fillRule="nonzero"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-2">
            <h1 className="text-xl  font-normal leading-[100%] tracking-tighter mb-3 -mt-2 text-[#000] font-calsans">
              Top bidang pelatihan
              <br />
            </h1>
            <h2 className="text-sm  font-normal leading-[100%] tracking-tighter mb-3 -mt-2 text-gray-700 flex gap-2 items-center justify-center">
              Explore Lebih <MdKeyboardArrowRight />
              <br />
            </h2>
          </div>

          <div className="grid  grid-cols-4 gap-4 w-full mt-6">
            {bidangPelatihan.map((bidang, index) => (
              <div
                key={index}
                className="flex flex-row gap-1 items-center w-full"
              >
                <div className="border border-gray-300 p-2 h-14 w-14  items-center justify-center flex rounded-xl">
                  <Image
                    src={bidang.icon}
                    alt={bidang.name}
                    className="w-9 h-9 object-contain"
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-calsans text-base">{bidang.name}</h3>
                  <p className="text-xs text-gray-400 -mt-1">{bidang.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-2">
            <h1 className="text-xl  font-normal leading-[100%] tracking-tighter mb-3 -mt-2 text-[#000] font-calsans">
              Balai pelatihan
              <br />
            </h1>
            <h2 className="text-sm  font-normal leading-[100%] tracking-tighter mb-3 -mt-2 text-gray-700 flex gap-2 items-center justify-center">
              Explore Lebih <MdKeyboardArrowRight />
              <br />
            </h2>
          </div>

          <div className=" gap-4 w-full mt-6">
            <MapIndonesia />
          </div>
        </div>
      </section>{" "}
      <Footer />
    </>
  );
}

export default page;
