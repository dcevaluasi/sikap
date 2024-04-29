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
import { Sertif, SertifPenilaian } from "../sertifikat-valid/page";
import { MdVerified } from "react-icons/md";

function page() {
  return (
    <section className="relative w-full mt-[17%]">
      <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8">
        <h1 className="h2 text-5xl mb-2 font-calsans leading-[100%]">
          Cek Validitas <br />
          Sertifikat Pelatihan & Kompetensi
        </h1>
        <p className="text-base text-gray-600">
          Pastikan keaslian dan nilai sertifikat pelatihan serta kompetensi Anda
          dengan layanan cek validitas kami. Percayakan masa depan Anda pada
          sertifikasi yang terpercaya dan diakui secara luas. Cek sekarang untuk
          memastikan langkah Anda menuju kesuksesan yang terjamin!
        </p>
      </div>
      <Tab />
    </section>
  );
}

const Tab = () => {
  return (
    <section className="flex flex-row gap-3 items-center w-full mb-5 px-3 mx-auto">
      <div className="relative w-[400px] mx-auto flex items-center border-black border px-2 rounded-3xl">
        <DialogSertifikat>
          <Button
            type="button"
            variant={"outline"}
            className="flex items-center justify-center rounded-full bg-black-2 w-fit hover:bg-black h-fit absolute right-1"
          >
            {" "}
            <FiSearch className="text-gray-200 text-base" />
          </Button>
        </DialogSertifikat>

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
          <Sertif />
          <SertifPenilaian />
        </div>
        <DialogFooter>
          <Button type="submit">Download</Button>
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
