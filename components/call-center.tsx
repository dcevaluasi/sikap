"use client";

import Image from "next/image";
import React from "react";
import { Bounce, Slide } from "react-awesome-reveal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineDocument } from "react-icons/hi2";

function CallCenter() {
  const [open, setOpen] = React.useState(false);
  const [openTataTertib, setOpenTataTertib] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 w-fit fixed right-10 bottom-10 z-[9999]">
      <AlertDialog open={openTataTertib}>
        <AlertDialogTrigger>
          <div onClick={(e) => setOpenTataTertib(true)} className="gap-4 ">
            <Bounce duration={1000}>
              <div className="flex flex-col gap-2 cursor-pointer items-center duration-1000 hover:scale-105 text-center">
                <div className="flex flex-col items-center justify-center  bg-white shadow-custom rounded-full w-12 h-12 md:w-16 md:h-16 p-2">
                  <Image
                    className="w-8 md:w-10"
                    width={0}
                    height={0}
                    src={"/illustrations/contract.png"}
                    alt="Kementrian Kelautan dan Perikanan RI Logo"
                  />

                </div>
              </div>
            </Bounce>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="!w-[400px]">
          <AlertDialogHeader>
            <div className="flex flex-col gap-1">
              <AlertDialogTitle className="text-center text-xl">
                Tata Tertib
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Lihat tata tertib pelaksanaan ujian keahlian awak kapal perikanan pada tautan berikut.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full flex flex-col">
            <AlertDialogCancel onClick={(e) => setOpenTataTertib(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction className="bg-blue-500 flex gap-2 items-center group duration-700">
              <Link
                href={
                  'https://docs.google.com/document/d/1-a2TPipBVUtNC_MScp8h_VX-bqlyIbh0/edit?usp=sharing&ouid=112666838213779179844&rtpof=true&sd=true'
                }
                target="_blank"
                className="bg-transparent flex gap-2 items-center group-hover:bg-transparent duration-700"
              >
                <HiOutlineDocument />
                Lihat Tata Tertib
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={open}>
        <AlertDialogTrigger>
          <div onClick={(e) => setOpen(true)} className="gap-4 ">
            <Bounce duration={1000}>
              <div className="flex flex-col gap-2 cursor-pointer items-center duration-1000 hover:scale-105 text-center">
                <div className="flex flex-col items-center justify-center  bg-white shadow-custom rounded-full w-12 h-12 md:w-16 md:h-16 p-2">
                  <Image
                    className="w-8 md:w-10"
                    width={0}
                    height={0}
                    src={"/illustrations/call-center.png"}
                    alt="Kementrian Kelautan dan Perikanan RI Logo"
                  />

                </div>
              </div>
            </Bounce>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="!w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl">
              Layanan Pengaduan
            </AlertDialogTitle>
            {/* <Image
            className="w-64 md:w-64 py-0 mx-auto"
            width={0}
            height={0}
            src={"/illustrations/helpdesk.jpg"}
            alt="Kementrian Kelautan dan Perikanan RI Logo"
          /> */}
            <AlertDialogDescription className="text-center">
              Jika kamu mengalami kendala, gangguan, atau hal lainnya yang
              terjadi dalam penggunaan aplikasi{" "}
              <span className="font-semibold">ELAUT</span>, hubungi call center{" "}
              <span className="font-semibold">
                Pusat Pelatihan Kelautan dan Perikanan
              </span>{" "}
              untuk mendapatkan solusi!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full flex flex-col">
            <AlertDialogCancel onClick={(e) => setOpen(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction className="bg-blue-500 flex gap-2 items-center group duration-700">
              <Link
                href={
                  usePathname().includes("bitung")
                    ? "https://wa.me/6285397924888"
                    : usePathname().includes("tegal")
                      ? "https://wa.me/6285229654056?text=Hallo,%20saya%20adalah%20pendaftar%20dari%20BPPP%20Tegal.%20Saya%20mohon%20bantuan%20karena%20terdapat%20kendala%20pada%20website%20ini."
                      : usePathname().includes("medan")
                        ? "https://api.whatsapp.com/send?phone=6289508166527&text=Hallo,%20saya%20adalah%20pendaftar%20dari%20BPPP%20Medan.%20Saya%20mohon%20bantuan%20karena%20terdapat%20kendala%20pada%20website%20ini."
                        : usePathname().includes("ambon")
                          ? "https://wa.me/6281288550286"
                          : "https://api.whatsapp.com/send?phone=6282123104078&text=Halo, Sobat Elaut! Ada yang bisa dibantu?"
                }
                className="bg-transparent flex gap-2 items-center group-hover:bg-transparent duration-700"
              >
                <IoLogoWhatsapp />
                Hubungi
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CallCenter;
