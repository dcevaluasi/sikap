'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiSearch, FiSlack } from "react-icons/fi";
import { TbClockHour2 } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { FaPlaceOfWorship, FaRupiahSign } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function page() {
  return (
    <section className="relative w-full mt-36 flex flex-row gap-5">
      <div className="max-w-6xl mx-auto text-left pb-5 md:pb-8 flex flex-col">
        <h1 className="h2 text-5xl mb-2 font-calsans leading-[100%]">Konservasi Kelautan Berbasis Kelestarian Lingkungan</h1>
        <p className="text-base text-gray-600">
          Dapatkan keunggulan kompetitif dengan sertifikasi masyarakat kelautan dan perikanan. Tingkatkan kredibilitas dan peluang karier Anda dalam industri yang dinamis dan berkelanjutan. Bergabunglah hari ini untuk langkah menuju kesuksesan!
        </p>

        <Tab />
      </div>

      <div className="max-w-3xl mx-auto text-left pb-5 md:pb-8 flex flex-col"></div>
    </section>
  );
}

const Tab = () => {
  return (<section className="flex flex-row gap-3 w-full items-center max-w-6xl mb-5 px-3 mx-auto">
    <Select>
      <SelectTrigger className="w-fit rounded-3xl py-2">
        <p className="mr-3 flex items-center gap-1 text-sm"><FiSlack />Pilih Bidang Sertifikasi</p>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Bidang Sertifikasi</SelectLabel>
          <SelectItem value="apple">Budidaya</SelectItem>
          <SelectItem value="banana">Penangkapan</SelectItem>
          <SelectItem value="blueberry">Pengolahan dan Pemasaran</SelectItem>
          <SelectItem value="grapes">Mesin Perikanan</SelectItem>
          <SelectItem value="pineapple">Konservasi</SelectItem>
          <SelectItem value="pineapple">SD Perikanan</SelectItem>
          <SelectItem value="pineapple">Wisata Bahari</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>

    <Select>
      <SelectTrigger className="w-fit rounded-3xl py-2">
        <p className="mr-3 flex items-center gap-1 text-sm"><FaPlaceOfWorship />Pilih Penyelenggara Sertifikasi</p>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Penyelenggara Sertifikasi</SelectLabel>
          <SelectItem value="apple">BPPP Tegal</SelectItem>
          <SelectItem value="banana">BPPP Medan</SelectItem>
          <SelectItem value="blueberry">BPPP Banyuwangi</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>

    <Select>
      <SelectTrigger className="w-fit rounded-3xl py-2">
        <p className="mr-3 flex items-center gap-1 text-sm"><FaRupiahSign />Harga Sertifikasi</p>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Harga Sertifikasi</SelectLabel>
          <SelectItem value="apple">Rp 0 - Rp 100.000</SelectItem>
          <SelectItem value="banana">Rp 100.000 - Rp 500.000</SelectItem>
          <SelectItem value="blueberry">Rp 500.000 - Rp 1.000.000</SelectItem>
          <SelectItem value="blueberry">Rp 1.000.000 - Rp 2.000.000</SelectItem>
          <SelectItem value="blueberry">{'>'} Rp 2.000.000</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <div className="relative w-full flex items-center border-black border px-2 rounded-3xl">

      <Button type="button" variant={"outline"} className="flex items-center justify-center rounded-full bg-black w-fit h-fit absolute right-1">  <FiSearch className="text-gray-200 text-base" /></Button>
      <Input className="text-sm border-none -ml-1 focus:border-none active:outline-none active:border-none focus:outline-none focus-visible:ring-0" placeholder="Cari Sertifikasi" />
    </div>
  </section >)
}

function PaginationPage() {
  const [active, setActive] = React.useState(true)
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
          <PaginationLink href="#" isActive className={`${active && 'text-white'}`}>
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
  )
}

export default page;
