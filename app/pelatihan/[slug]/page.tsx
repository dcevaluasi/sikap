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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import { FiSearch, FiSlack } from "react-icons/fi";
import {
  TbBroadcast,
  TbBuildingBank,
  TbCalendarUser,
  TbClockHour2,
  TbCloudDownload,
  TbLink,
  TbMap2,
} from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { FaFilePdf, FaPlaceOfWorship, FaRupiahSign } from "react-icons/fa6";

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
import { PELATIHAN } from "@/dummies/pelatihan";
import Footer from "@/components/ui/footer";
import { MdOutlineAppRegistration, MdVerified } from "react-icons/md";
import SertifikatPage1 from "@/components/sertifikat/sertifikatPage1";
import SertifikatPage2 from "@/components/sertifikat/sertifikatPage2";

function page() {
  return (
    <section className="relative w-full mt-36">
      <div className="flex gap-2 max-w-6xl mx-auto px-5">
        <div className="w-full pb-5 md:pb-8 flex flex-col ">
          <h1 className="h2 text-5xl mb-2 font-calsans leading-[100%] max-w-3xl">
            {PELATIHAN[3].JudulPelatihan}
          </h1>

          <div className="w-full flex gap-10">
            <div className="flex flex-col w-[70%]">
              <div className="relative w-full">
                <Image
                  className="w-full rounded-3xl h-[350px] object-cover"
                  alt=""
                  src={`/images/hero-img4-preview.jpg`}
                  width={0}
                  height={0}
                />
                <div className="w-fit absolute top-4 right-4 flex gap-1">
                  <div className="text-sm font-medium px-4 py-3 bg-blue-500 rounded-3xl text-white">
                    {PELATIHAN[3].HargaPelatihan == 0
                      ? "Gratis"
                      : "Rp. " + PELATIHAN[3].HargaPelatihan}
                  </div>
                  <div className="text-sm font-medium px-4 py-3 bg-blue-500 rounded-3xl text-white">
                    {PELATIHAN[3].BidangPelatihan}
                  </div>
                </div>
              </div>

              <p className="text-base text-gray-600 max-w-4xl mt-3">
                Dapatkan keunggulan kompetitif dengan sertifikasi masyarakat
                kelautan dan perikanan. Tingkatkan kredibilitas dan peluang
                karier Anda dalam industri yang dinamis dan berkelanjutan.
                Bergabunglah hari ini untuk langkah menuju kesuksesan!
              </p>

              {/* <Tab /> */}

              <div className="w-full text-gray-600 text-left mt-9 text-base">
                <h1 className="text-black font-bold text-lg">
                  Deskripsi Program Pelatihan
                </h1>
                <p>
                  Setelah mengikuti pelatihan ini, diharapkan peserta akan
                  memiliki keterampilan berikut:
                </p>
                <ol className="list-disc ml-7">
                  <li>
                    Membuat dan merawat lingkungan pembesaran udang vaname yang
                    optimal.
                  </li>
                  <li>
                    Memahami prinsip-prinsip dasar manajemen air dan kualitas
                    air dalam pembesaran udang.
                  </li>
                  <li>
                    Mengidentifikasi penyakit dan hama pada udang vaname serta
                    mengambil tindakan pencegahan dan penanggulangan yang tepat.
                  </li>
                  <li>
                    Memahami teknik pemberian pakan yang sesuai dan efisien.
                  </li>
                  <li>
                    Melakukan pemantauan dan pengukuran parameter lingkungan
                    secara berkala.
                  </li>
                  <li>
                    Memahami konsep dasar pengelolaan limbah budidaya udang
                    vaname.
                  </li>
                </ol>

                <h1 className="text-black font-bold text-lg mt-5">
                  Persyaratan Peserta
                </h1>
                <p>
                  Untuk menjadi peserta pelatihan ini, peserta harus memenuhi
                  syarat-syarat berikut:
                </p>
                <ul className="list-disc ml-7">
                  <li>Warga Negara Indonesia.</li>
                  <li>Usia maksimal 30 tahun pada saat mendaftar.</li>
                  <li>Minimal lulusan SMA atau sederajat.</li>
                  <li>
                    Belum memiliki pekerjaan tetap atau sedang tidak bekerja.
                  </li>
                  <li>Lulus seleksi administrasi dan tes substansi.</li>
                  <li>
                    Memiliki minat dan motivasi yang tinggi dalam bidang
                    budidaya udang vaname.
                  </li>
                </ul>

                <h1 className="text-black font-bold text-lg mt-5">
                  Sarana Peserta yang Disarankan
                </h1>
                <p>
                  Untuk mendukung kelancaran pelatihan, peserta disarankan untuk
                  memiliki sarana sebagai berikut:
                </p>
                <ol className="list-disc ml-7">
                  <li>
                    Laptop atau perangkat komputer dengan spesifikasi minimal
                    sebagai berikut:
                  </li>
                  <ul className="list-disc ml-7">
                    <li>RAM minimal 4 GB.</li>
                    <li>Prosesor 64-bit.</li>
                    <li>Sistem Operasi Windows 10.</li>
                    <li>Koneksi internet yang stabil.</li>
                    <li>Kamera web (webcam).</li>
                  </ul>
                  <li>
                    Akses internet yang stabil dan cukup untuk mengakses materi
                    pembelajaran secara online.
                  </li>
                  <li>
                    Terinstall aplikasi atau perangkat lunak yang diperlukan
                    untuk simulasi dan pembelajaran, seperti perangkat lunak
                    simulasi budidaya udang vaname.
                  </li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col gap-6 w-[30%]">
              <div className="flex flex-col gap-2 -mt-1">
                <h1 className="text-black font-bold text-3xl font-calsans leading-[110%]">
                  Ikuti Pelatihan
                </h1>
                <p className="text-base text-gray-600 max-w-4xl -mt-3">
                  Segera daftarkan dirimu dan jadilah SDM Kelautan dan Perikanan
                  Unggul!
                </p>
                <div className="w-[100px] h-1 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-2">
                <DialogFormRegistrasi>
                  <div className="text-base font-medium px-4 py-3 hover:cursor-pointer items-center justify-center text-center flex gap-1 bg-blue-500 rounded-3xl text-white">
                    <MdOutlineAppRegistration /> Daftar Pelatihan
                  </div>
                </DialogFormRegistrasi>

                <div className="text-base font-medium px-4 py-3 hover:cursor-pointer items-center justify-center text-center flex gap-1 bg-teal-400 rounded-3xl text-white">
                  <FaFilePdf /> Unduh Silabus Pelatihan
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <table>
                    <tr>
                      <td className="text-gray-600">
                        <TbCalendarUser className="text-lg w-6" />
                      </td>
                      <td>
                        <p className="text-base text-gray-600 flex w-full items-center gap-1">
                          Tanggal Pelaksanaan :{" "}
                          {PELATIHAN[3].TanggalPendaftaran}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-600">
                        <TbMap2 className="text-lg w-6" />
                      </td>
                      <td>
                        <p className="text-base text-gray-600 flex w-full items-center gap-1">
                          Lokasi Pelatihan : {PELATIHAN[3].LokasiPelatihan}{" "}
                          (Balai Pelatihan Pengembangan dan Penyuluhan Tegal)
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-600">
                        <TbBroadcast className="text-lg w-6" />
                      </td>
                      <td>
                        <p className="text-base text-gray-600 flex w-full items-center gap-1">
                          Pelaksanaan Pelatihan :{" "}
                          {PELATIHAN[3].PelaksanaanPelatihan}
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <h1 className="text-black font-bold text-3xl font-calsans leading-[110%]">
                  Pelatihan Terbaru
                </h1>
                <p className="text-base text-gray-600 max-w-4xl -mt-3">
                  Lihat pelatihan terbaru serupa disini!
                </p>
                <div className="w-[100px] h-1 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-left pb-5 md:pb-8 flex flex-col"></div>

      <Footer />
    </section>
  );
}

const Tab = () => {
  return (
    <section className="flex flex-row gap-3 w-full items-center max-w-6xl mb-5 px-3 mx-auto">
      <Select>
        <SelectTrigger className="w-fit rounded-3xl py-2">
          <p className="mr-3 flex items-center gap-1 text-sm">
            <FiSlack />
            Pilih Bidang Sertifikasi
          </p>
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
          <p className="mr-3 flex items-center gap-1 text-sm">
            <FaPlaceOfWorship />
            Pilih Penyelenggara Sertifikasi
          </p>
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
          <p className="mr-3 flex items-center gap-1 text-sm">
            <FaRupiahSign />
            Harga Sertifikasi
          </p>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Harga Sertifikasi</SelectLabel>
            <SelectItem value="apple">Rp 0 - Rp 100.000</SelectItem>
            <SelectItem value="banana">Rp 100.000 - Rp 500.000</SelectItem>
            <SelectItem value="blueberry">Rp 500.000 - Rp 1.000.000</SelectItem>
            <SelectItem value="blueberry">
              Rp 1.000.000 - Rp 2.000.000
            </SelectItem>
            <SelectItem value="blueberry">{">"} Rp 2.000.000</SelectItem>
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
          placeholder="Cari Sertifikasi"
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

function DialogFormRegistrasi({ children }: { children: ReactElement }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[1225px]">
        <DialogHeader>
          <div className="flex gap-2 items-center">
            <MdVerified className="text-3xl text-blue-500" />
            <div className="flex flex-col">
              <DialogTitle>Form Daftar Pelatihan</DialogTitle>
              <DialogDescription>
                Lengkapi Datamu dan lakukan pembayaran untuk mengikuti pelatihan
                ini!
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="max-h-[500px] flex flex-col gap-2 overflow-y-auto scroll-smooth">
          <SertifikatPage1 />
          <SertifikatPage2 />
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

export default page;
