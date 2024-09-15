"use client";

import Image from "next/image";
import React from "react";
import Hero from "@/components/hero";
import ListBPPP from "@/components/list-bppp";
import MapIndonesia from "@/components/map";
import Footer from "@/components/ui/footer";
import { BALAI_PELATIHAN, BIDANG_PELATIHAN } from "@/constants/pelatihan";
import { elautBaseUrl } from "@/constants/urls";
import { PelatihanMasyarakat } from "@/types/product";
import { convertDate, createSlug, truncateText } from "@/utils";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { Bounce, Slide } from "react-awesome-reveal";
import { MdClear, MdKeyboardArrowRight } from "react-icons/md";
import { TbClockHour2, TbLayoutGrid } from "react-icons/tb";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { RiSchoolLine, RiShipLine } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { LucideSchool } from "lucide-react";
import { FaRupiahSign } from "react-icons/fa6";
import LogoIntegrated from "@/components/logoIntegrated";
import Newsletter from "@/components/newsletter";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

function PencarianPelatihan() {
  const [data, setData] = React.useState<PelatihanMasyarakat[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleFetchingPublicTrainingData = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/lemdik/getPelatihan?penyelenggara_pelatihan=${selectedBalaiPelatihan}&bidang_pelatihan=${selectedBidangPelatihan}&jenis_sertifikat=${selectedJenisPelatihan}`
      );
      console.log({ response });
      setData(response.data.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  const [selectedJenisPelatihan, setSelectedJenisPelatihan] =
    React.useState<string>("");
  const [selectedBidangPelatihan, setSelectedBidangPelatihan] =
    React.useState<string>("");
  const [selectedBalaiPelatihan, setSelectedBalaiPelatihan] =
    React.useState<string>("");
  const [selectedBiayaPelatihan, setSelectedBiayaPelatihan] =
    React.useState<string>("");

  const [showOnlyPelatihan, setShowOnlyPelatihan] =
    React.useState<boolean>(false);

  const [showResult, setShowResult] = React.useState<boolean>(false);

  const handleClearFilter = () => {
    setSelectedBidangPelatihan("");
    setSelectedJenisPelatihan("");
    setSelectedBalaiPelatihan("");
    setSelectedBiayaPelatihan("");
    setShowResult(false);
  };

  const [selectedDate, setSelectedDate] = React.useState("15 September 2024");

  const handleDateClick = (date: any) => {
    setSelectedDate(date);
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleFetchingPublicTrainingData();
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="bg-white w-full py-10 mt-20">
      <div className="py-4 mx-auto max-w-7xl sm:py-4  flex flex-col gap-4">
        <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-white h-auto md:h-[50vh] flex flex-col relative shadow-custom rounded-3xl overflow-hidden">
          <Image
            width={0}
            height={0}
            src="/illustrations/searching.png"
            alt=""
            className=" absolute right-0 bottom-0  group-hover:scale-105 transition-transform duration-500 ease-in-out w-[350px]"
          />
          <div className="group relative flex flex-col overflow-hidden justify-center rounded-3xl px-14  flex-grow group">
            <div className="flex flex-col gap-1  ">
              <h3 className="z-10 text-3xl font-medium text-black xs:text-xl md:text-4xl font-calsans leading-none ">
                Cari serta Ikuti <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  Pelatihan dan Sertifikasi
                </span>{" "}
              </h3>
              <p className="text-gray-500 text-base leading-[110%] ">
                Temukan dan ikuti ragam pelatihan dan sertifikasi uji kompetensi
                yang tersedia dalam <br /> aplikasi ELAUT dengan cepat dan
                mudah, hidup satset!
              </p>

              <div className="grid grid-cols-4 w-fit gap-2 mt-5 ">
                <Select
                  value={selectedJenisPelatihan}
                  onValueChange={(value) => setSelectedJenisPelatihan(value)}
                >
                  <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 px-3 w-full text-sm items-center rounded-md bg-white p-1.5  cursor-pointer border border-gray-300">
                      <RiShipLine />
                      {selectedJenisPelatihan == ""
                        ? "Jenis Pelatihan"
                        : selectedJenisPelatihan}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    <SelectGroup>
                      <SelectLabel>Jenis Pelatihan</SelectLabel>
                      <SelectItem value="Kepelautan">Kepelautan</SelectItem>
                      <SelectItem value="Non-Kepelautan">
                        Non-Kepelautan
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedBidangPelatihan}
                  onValueChange={(value) => setSelectedBidangPelatihan(value)}
                >
                  <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 w-full px-3 text-sm items-center rounded-md bg-white p-1.5  cursor-pointer border border-gray-300">
                      <TbLayoutGrid />
                      {selectedBidangPelatihan == ""
                        ? "Bidang Pelatihan"
                        : selectedBidangPelatihan}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    <SelectGroup>
                      <SelectLabel>Bidang Pelatihan</SelectLabel>
                      {BIDANG_PELATIHAN.map((bidangPelatihan, index) => (
                        <SelectItem key={index} value={bidangPelatihan.Name}>
                          {bidangPelatihan.Name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedBalaiPelatihan}
                  onValueChange={(value) => setSelectedBalaiPelatihan(value)}
                >
                  <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 w-full px-3 text-sm items-center rounded-md bg-white p-1.5  cursor-pointer border border-gray-300">
                      <RiSchoolLine />
                      {selectedBalaiPelatihan == ""
                        ? "Balai Pelatihan"
                        : selectedBalaiPelatihan}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    <SelectGroup>
                      <SelectLabel>Balai Pelatihan</SelectLabel>
                      {BALAI_PELATIHAN.map((balaiPelatihan, index) => (
                        <SelectItem key={index} value={balaiPelatihan.Name}>
                          {balaiPelatihan.Name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedBiayaPelatihan}
                  onValueChange={(value) => setSelectedBiayaPelatihan(value)}
                >
                  <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 w-full px-3 text-sm items-center rounded-md bg-white p-1.5  cursor-pointer border border-gray-300">
                      <FaRupiahSign />
                      {selectedBiayaPelatihan == ""
                        ? "Biaya Pelatihan"
                        : selectedBiayaPelatihan == "Aspirasi"
                        ? "Gratis"
                        : "Berbayar"}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    <SelectGroup>
                      <SelectLabel>Biaya Pelatihan</SelectLabel>
                      <SelectItem value={"Aspirasi"}>Gratis</SelectItem>
                      <SelectItem value={"PNBP/BLU"}>Berbayar</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {(selectedJenisPelatihan !== "" ||
                  selectedBalaiPelatihan !== "" ||
                  selectedBiayaPelatihan !== "" ||
                  selectedBidangPelatihan !== "") && (
                  <div
                    onClick={() => handleClearFilter()}
                    className="inline-flex gap-2 w-fit px-3 text-sm items-center rounded-md bg-white p-1.5 cursor-pointer border border-gray-300"
                  >
                    <MdClear />
                    Bersihkan Filter
                  </div>
                )}
              </div>

              <div className="flex mt-5">
                <div
                  onClick={(e) => {
                    handleFetchingPublicTrainingData();
                    setShowResult(true);
                  }}
                  className="btn-sm text-sm text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
                >
                  <span>Cari dan Daftar</span>
                  <svg
                    className="w-3 h-3 fill-current text-white shrink-0 ml-2 -mr-1"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showResult && (
          <div className="w-full max-w-7xl mx-auto pb-4">
            {/* Header */}
            <div className="bg-white shadow-custom rounded-xl p-3 text-xl text-center font-calsans">
              <span className="font-bold">SEPTEMBER 2024</span>
            </div>

            {/* Table */}
            <div className="bg-white shadow-custom text-black text-center grid grid-cols-5 gap-2 p-4 rounded-xl font-calsans text-lg mt-4">
              <div>Pelatihan</div>
              <div>Penyelenggara</div>
              <div></div>
              <div>Pelaksanaan</div>
              <div>Harga</div>
            </div>

            <div className="flex-col gap-4 flex w-full mt-4">
              {data == null ? (
                <></>
              ) : (
                data!.map((data, index) => (
                  <CardPelatihan key={index} pelatihan={data} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const CardPelatihan = ({ pelatihan }: { pelatihan: PelatihanMasyarakat }) => {
  return (
    <div className="bg-white shadow-custom text-black p-4 rounded-xl grid grid-cols-5 items-center">
      {/* Train Info */}
      <div className="max-w-xs leading-[115%]">
        <h3 className="text-xl font-bold">{pelatihan.NamaPelatihan}</h3>
        <p className="text-sm">{pelatihan.BidangPelatihan} (S)</p>
      </div>

      {/* Departure Info */}
      <div className="text-center">
        <p className="font-bold">{pelatihan.PenyelenggaraPelatihan}</p>
        <p className="text-sm leading-[100%]">{pelatihan.LokasiPelatihan}</p>
      </div>

      {/* Arrow and Duration */}
      <div className="flex flex-col items-center">
        <div className="bg-blue-500 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#000"
            className="w-6 h-6 text-white stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M5 12h14"
              className="text-white"
            />
          </svg>
        </div>
      </div>

      {/* Arrival Info */}
      <div className="text-center">
        <p className="font-bold">{pelatihan.PelaksanaanPelatihan}</p>
        <p className="text-sm leading-[100%]">
          {convertDate(pelatihan.TanggalMulaiPelatihan)} -{" "}
          {convertDate(pelatihan.TanggalBerakhirPelatihan)}
        </p>
      </div>

      {/* Price and Button */}
      <div className="text-center flex items-center justify-center flex-col">
        <p className="text-blue-500 text-xl font-bold">
          Rp {pelatihan.HargaPelatihan},-
        </p>
        {!Cookies.get("XSRF081") ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="bg-blue-500 text-white px-4 py-2 text-base rounded-md my-1 w-fit block cursor-pointer">
                Registrasi
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Ups! Kamu belum login ke akun ELAUT.
                  <Link
                    href={"/registrasi"}
                    className="text-blue-500 underline"
                  >
                    Registrasi disini
                  </Link>{" "}
                  jika belum mempunyai akun
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    NIK/No Telepon
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                    type="password"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Login</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Link
            href={`/layanan/pelatihan/${createSlug(pelatihan.NamaPelatihan)}/${
              pelatihan?.KodePelatihan
            }/${pelatihan?.IdPelatihan}`}
            className="bg-blue-500 text-white px-4 py-2 text-base rounded-md my-1 w-fit block"
          >
            Registrasi
          </Link>
        )}

        <p className="text-sm">Tersedia</p>
      </div>
    </div>
  );
};

export default PencarianPelatihan;
