"use client";

import React, { useState, useRef, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiSlack } from "react-icons/fi";
import { FaPlaceOfWorship } from "react-icons/fa6";
import { GrCertificate, GrLocation } from "react-icons/gr";

import { FaUserTie } from "react-icons/fa6";

import { PelatihanMasyarakat } from "@/types/product";
import ListBPPP from "./list-bppp";
import FeaturesPelatihanBalai from "./features-pelatihan-balai";
import Image from "next/image";

export default function BPPPProfile({ data }: { data: PelatihanMasyarakat[] }) {
  return (
    <section className="relative h-fit pb-10" id="explore">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16 pb-10 h-full"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}

          <div className="max-w-2xl mx-auto text-center pb-5 md:pb-8">
            <h1 className="text-3xl font-calsans leading-[110%]">
              Sedang Dalam Development!
            </h1>
            <Image
              src={"/illustrations/development.png"}
              alt="Not Found"
              width={0}
              height={0}
              className="w-[400px] mx-auto"
            />
            <p className="text-base text-gray-600">
              Fitur profile Balai Pelatihan sedang dalam pengembangan, harap
              pantau selalu E-Laut untuk mendapatkan fitur lengkap dan
              terbarunya sobat Elaut!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const Tab = () => {
  const [bidangSertifikasi, setBidangSertifikasi] = React.useState<string>("");
  const [jenisSertifikasi, setJenisSertifikasi] = React.useState<string>("");
  const sertifikasiKepelautan = [
    {
      id: 1,
      name: "HACCP",
      singkatan: "Hazard Analysis and Critical Control Points",
    },
    {
      id: 2,
      name: "SPI",
      singkatan: "Sertifikat Pengolah Ikan",
    },
    {
      id: 3,
      name: "API",
      singkatan: "Ahli Pengolah Ikan",
    },
    {
      id: 4,
      name: "CPIB",
      singkatan: "Cara Pembenihan Ikan Yang Baik",
    },
    {
      id: 5,
      name: "CPPIB",
      singkatan: "Cara Pemberian Pakan Ikan Yang Baik",
    },
    {
      id: 6,
      name: "CBIB ",
      singkatan: "Cara Budidaya Ikan Yang Baik",
    },
  ];

  return (
    <section className="grid grid-cols-4 gap-3 w-full items-center max-w-5xl mb-5 px-6 md:px-3 mx-auto">
      <Select
        value={bidangSertifikasi}
        onValueChange={(value) => setBidangSertifikasi(value)}
      >
        <SelectTrigger className="w-full rounded-3xl py-5 md:py-2">
          <p className="mr-3 flex items-center gap-1 text-sm">
            <FiSlack />
            {bidangSertifikasi != ""
              ? bidangSertifikasi
              : "Pilih Bidang Sertifikasi"}
          </p>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Bidang Sertifikasi</SelectLabel>
            <SelectItem value="Kepelautan">Kepelautan</SelectItem>
            <SelectItem value="Non-Kepelautan">Non-Kepelautan</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={jenisSertifikasi}
        onValueChange={(value) => setJenisSertifikasi(value)}
      >
        <SelectTrigger className="w-full rounded-3xl py-5 md:py-2 overflow-hidden">
          <p className="mr-3 flex items-center gap-1 text-sm">
            <GrCertificate />
            {jenisSertifikasi != ""
              ? jenisSertifikasi
              : "Pilih Jenis Sertifikasi"}
          </p>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Jenis Sertifikasi</SelectLabel>
            {bidangSertifikasi == "Non-Kepelautan"
              ? sertifikasiKepelautan.map((item, index) => (
                  <SelectItem value={`${item.name} - ${item.singkatan}`}>
                    {item.name} - {item.singkatan}
                  </SelectItem>
                ))
              : null}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full rounded-3xl py-5 md:py-2">
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

      <div className="relative w-full flex items-center border-neutral-200 border px-2 rounded-3xl">
        <Button
          type="button"
          variant={"outline"}
          className="flex items-center justify-center rounded-full bg-black w-fit h-fit absolute right-1"
        >
          {" "}
          <FiSearch className="text-gray-200 text-base" />
        </Button>
        <Input
          className="text-sm border-none -ml-1 focus:border-none border- active:outline-none active:border-none focus:outline-none focus-visible:ring-0"
          placeholder="Cari Pelatihan"
        />
      </div>
    </section>
  );
};
