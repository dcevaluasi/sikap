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

function CallCenter() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger>
        <div
          onClick={(e) => setOpen(true)}
          className="gap-4 w-fit fixed right-10 bottom-10 z-[9999]"
        >
          <Bounce duration={1000}>
            <div className="flex flex-col gap-2 cursor-pointer items-center duration-1000 hover:scale-105 text-center">
              <div className="flex flex-col items-center justify-center  bg-white shadow-custom rounded-full w-24 h-24 md:w-20 md:h-20 p-2">
                <Image
                  className="w-12 md:w-12"
                  width={0}
                  height={0}
                  src={"/illustrations/call-center.png"}
                  alt="Kementrian Kelautan dan Perikanan RI Logo"
                />
                {/* <p className="text-xs text-black font-semibold">Info Pengaudan</p> */}
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
            Jika kamu mengalami kendala, gangguan, atau hal lainnya yang terjadi
            dalam penggunaan aplikasi{" "}
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
                "https://api.whatsapp.com/send?phone=0123456789&text=I'm%20interested%20in%20your%20services"
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
  );
}

export default CallCenter;
