"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiSearch, FiSlack } from "react-icons/fi";
import { TbClockHour2 } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { FaPlaceOfWorship } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pelatihan } from "@/types/pelatihan";
import { PELATIHAN } from "@/dummies/pelatihan";
import { createSlug } from "@/utils";

function page() {
  return (
    <section className="relative w-full mt-36">
      <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 px-3 md:px-0">
        <h1 className="h2 text-4xl md:text-5xl mb-2 font-calsans leading-[100%] text-black">
          Pelatihan Masyarakat <br />
          Kelautan & Perikanan
        </h1>
        <p className="text-base text-gray-600">
          Optimalkan potensi sumber daya laut. Bergabunglah dalam pelatihan
          masyarakat kelautan dan perikanan untuk masa depan yang berkelanjutan
          dan produktif.
        </p>
      </div>

      <Tab />

      <div className="flex flex-row gap-3 flex-wrap w-full items-center justify-evenly  max-w-6xl mx-auto">
        {PELATIHAN.map((pelatihan: Pelatihan, index: number) => (
          <CardPelatihan pelatihan={pelatihan} key={index} />
        ))}
      </div>

      <PaginationPage />
    </section>
  );
}

const CardPelatihan = ({ pelatihan }: { pelatihan: Pelatihan }) => {
  return (
    <div className="coverflow flex flex-col shadow-custom relative w-[360px] h-fit rounded-3xl">
      <div className="w-fit absolute top-4 right-4 flex gap-1">
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.HargaPelatihan == 0
            ? "Gratis"
            : "Rp. " + pelatihan.HargaPelatihan}
        </div>
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.BidangPelatihan}
        </div>
      </div>

      <Image
        className="w-full rounded-tl-3xl rounded-tr-3xl h-fit object-cover"
        alt=""
        src={`/images${pelatihan.CoverPelatihan}`}
        width={0}
        height={0}
      />
      <div className="px-6 py-3">
        <div className="w-full pb-4 gap-3">
          <h2 className="font-calsans text-xl duration-1000 text-black mt-2 leading-[110%]">
            {pelatihan.JudulPelatihan}
          </h2>
          <div className="flex gap-1 text-gray-600 text-sm items-center">
            <TbClockHour2 />
            <p>{pelatihan.TanggalPendaftaran}</p>
          </div>
          <p className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000">
            Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat
            kelautan perikanan yang ingin mengasah skill nya dibidang kelautan
            dan perikanan...
          </p>
          <Link
            href={`/pelatihan/${createSlug(pelatihan.JudulPelatihan)}`}
            className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
          >
            Registrasi
          </Link>
        </div>
      </div>
    </div>
  );
};

const Tab = () => {
  return (
    <section className="flex flex-col md:flex-row gap-3 w-full items-center max-w-6xl mb-5 px-6 md:px-3 mx-auto">
      <Select>
        <SelectTrigger className="w-full md:w-fit rounded-3xl py-5 md:py-2">
          <p className="mr-3 flex items-center gap-1 text-sm">
            <FiSlack />
            Pilih Bidang Pelatihan
          </p>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Bidang Pelatihan</SelectLabel>
            <SelectItem value="Budidaya">Budidaya</SelectItem>
            <SelectItem value="Penangkapan">Penangkapan</SelectItem>
            <SelectItem value="Kepelautan">Kepelautan</SelectItem>
            <SelectItem value="Pengolahan dan Pemasaran">
              Pengolahan dan Pemasaran
            </SelectItem>
            <SelectItem value="Mesin Perikanan">Mesin Perikanan</SelectItem>
            <SelectItem value="Konservasi">Konservasi</SelectItem>
            <SelectItem value="SD Perikanan">SD Perikanan</SelectItem>
            <SelectItem value="Wisata Bahari">Wisata Bahari</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full md:w-fit rounded-3xl py-5 md:py-2">
          <p className="mr-3 flex items-center gap-1 text-sm">
            <FaPlaceOfWorship />
            Pilih Penyelenggara Pelatihan
          </p>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Penyelenggara Pelatihan</SelectLabel>
            <SelectItem value="apple">BPPP Tegal</SelectItem>
            <SelectItem value="banana">BPPP Medan</SelectItem>
            <SelectItem value="blueberry">BPPP Banyuwangi</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full md:w-fit rounded-3xl py-5 md:py-2">
          <p className="mr-3 flex items-center gap-1 text-sm">
            <GrLocation />
            Pilih Pelaksanaan Pelatihan
          </p>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Pelaksanaan Pelatihan</SelectLabel>
            <SelectItem value="apple">Blended (Onsite + Online)</SelectItem>
            <SelectItem value="banana">On Site</SelectItem>
            <SelectItem value="blueberry">Online</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="relative w-full flex items-center border-black border px-2 rounded-3xl">
        <Button
          type="button"
          variant={"outline"}
          className="flex items-center justify-center rounded-full bg-black w-fit h-fit absolute right-1"
        >
          {" "}
          <FiSearch className="text-gray-200 text-base" />
        </Button>
        <Input
          className="text-sm border-none -ml-1 focus:border-none active:outline-none active:border-none focus:outline-none focus-visible:ring-0"
          placeholder="Cari Pelatihan"
        />
      </div>
    </section>
  );
};

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
