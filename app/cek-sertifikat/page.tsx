"use client";

import React, { ReactElement } from "react";
import { FiSearch, FiSlack } from "react-icons/fi";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MdVerified } from "react-icons/md";
import { TbCloudDownload, TbLink } from "react-icons/tb";
import Image from "next/image";
import SertifikatPage1 from "@/components/sertifikat/sertifikatPage1";
import SertifikatPage2 from "@/components/sertifikat/sertifikatPage2";
import CertificationTypeSection from "@/components/certificationTypeSection";

function page() {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src={'/images/hero-img5.jpg'}
          className="absolute w-full h-full object-cover duration-1000"
          alt=""
          layout="fill"
          priority
        />

        <div className="absolute w-full h-full bg-black bg-opacity-80"></div>

        {/* Illustration behind hero content */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
          aria-hidden="true"
        >
          <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 z-[40]">
          {/* Hero content */}
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Section header */}

            <div className="text-center pb-12 md:pb-16 flex flex-col items-center justify-center ">
              {/* <Image
              className="w-[250px] z-[9999] -mb-11 -mt-20"
              width={0}
              height={0}
              src={"/logo-elaut.png"}
              alt="Kementrian Kelautan dan Perikanan RI Logo"
            /> */}
              <h1
                className="text-4xl md:text-[3.9rem] font-extrabold leading-[110%] tracking-tighter mb-3 -mt-2 text-white font-calsans"

              >
                Cek Sertifikat<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 leading-[110%]">
                  Pelatihan dan Uji Kompetensi/Keahlianmu
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-lg text-gray-200 mb-8"

                  data-aos-delay="150"
                >
                  Aplikasi Pelatihan serta sertifikasi KP yang dikembangkan oleh
                  BPPSDMKP untuk menjaring masyarakat KP, aparatur KP, dll untuk
                  meningkatkan kompetensi di bidang KP
                </p>
              </div>
              <CertificationTypeSection />
            </div>
          </div>
        </div>
      </section>
    </>

  );
}

const Tab = () => {
  return (
    <section className="flex flex-row gap-3 items-center w-full mb-5 px-3 mx-auto">
      <div className="relative w-[400px] mx-auto flex items-center border-black border px-2 rounded-3xl">
        <Input
          className="text-sm border-none -ml-1 focus:border-none active:outline-none active:border-none focus:outline-none focus-visible:ring-0"
          placeholder="Nomor Sertifikat"
        />
      </div>
    </section>
  );
};

function DialogSertifikat({ children }: { children: ReactElement }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[1225px]">
        <DialogHeader>
          <div className="flex gap-2 items-center">
            <MdVerified className="text-3xl text-blue-500" />
            <div className="flex flex-col">
              <DialogTitle>B.45/BPPP.BYW/RSDM.510/I/2024</DialogTitle>
              <DialogDescription>
                No. Sertifikasi terdaftar dan dinyatakan valid telah mengikuti
                pelatihan!
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="max-h-[500px] flex flex-col gap-2 overflow-y-auto scroll-smooth">
          {/* <SertifikatPage1 />
          <SertifikatPage2 /> */}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-500"
          >
            <TbLink />
            Salin Tautan
          </Button>
          <Button type="submit" className="flex items-center gap-1">
            <TbCloudDownload />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PaginationPage() {
  const [active, setActive] = React.useState(true);
  return (
    <Pagination className="my-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className={`${active && "text-white"}`}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default page;
