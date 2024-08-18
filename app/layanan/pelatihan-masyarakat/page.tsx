"use client";

import Hero from "@/components/hero";
import ListBPPP from "@/components/list-bppp";
import MapIndonesia from "@/components/map";
import Footer from "@/components/ui/footer";
import { BALAI_PELATIHAN, BIDANG_PELATIHAN } from "@/constants/pelatihan";
import { elautBaseUrl } from "@/constants/urls";
import { PelatihanMasyarakat } from "@/types/product";
import { createSlug, truncateText } from "@/utils";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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

function page() {
  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleFetchingPublicTrainingData = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/lemdik/getPelatihan`
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

  const handleClearFilter = () => {
    setSelectedBidangPelatihan("");
    setSelectedJenisPelatihan("");
    setSelectedBalaiPelatihan("");
    setSelectedBiayaPelatihan("");
    handleFetchingPublicTrainingData();
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleFetchingPublicTrainingData();
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <section className="mt-44 max-w-6xl mx-10 md:mx-auto flex flex-col gap-24 mb-20">
        <div className="flex flex-col gap-0 relative">
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

        {!showOnlyPelatihan && (
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
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <ListSkeleton key={index} />
                  ))
                : BIDANG_PELATIHAN.map((bidang, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-1 items-center w-full"
                    >
                      <div className="border border-gray-300 p-2 h-14 w-14 items-center justify-center flex rounded-xl">
                        <Image
                          src={bidang.Image}
                          alt={bidang.Name}
                          className="w-9 h-9 object-contain"
                          width={0}
                          height={0}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-calsans text-base">
                          {bidang.Name}
                        </h3>
                        <p className="text-xs text-gray-400 -mt-1">
                          {bidang.Name}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-2">
            <h1 className="text-xl  font-normal leading-[100%] tracking-tighter mb-3 -mt-2 text-[#000] font-calsans">
              Pelatihan Masyarakat
              <br />
            </h1>
            <h2
              onClick={(e) => setShowOnlyPelatihan(!showOnlyPelatihan)}
              className="text-sm  font-normal leading-[100%] tracking-tighter mb-3 -mt-2 text-gray-700 flex gap-2 items-center justify-center cursor-pointer"
            >
              {showOnlyPelatihan ? "Kembali" : "Explore Lebih"}{" "}
              <MdKeyboardArrowRight />
              <br />
            </h2>
          </div>

          <div className="flex flex-row gap-2">
            {!loading && (
              <Select
                value={selectedJenisPelatihan}
                onValueChange={(value) => setSelectedJenisPelatihan(value)}
              >
                <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                  <div className="inline-flex gap-2 px-3 w-full text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
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
            )}

            {selectedJenisPelatihan != "" && (
              <Select
                value={selectedBidangPelatihan}
                onValueChange={(value) => setSelectedBidangPelatihan(value)}
              >
                <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                  <div className="inline-flex gap-2 w-full px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
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
            )}

            {selectedJenisPelatihan != "" && selectedBidangPelatihan != "" && (
              <Select
                value={selectedBalaiPelatihan}
                onValueChange={(value) => setSelectedBalaiPelatihan(value)}
              >
                <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                  <div className="inline-flex gap-2 w-full px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
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
            )}

            {selectedJenisPelatihan != "" &&
              selectedBidangPelatihan != "" &&
              selectedBalaiPelatihan != "" && (
                <Select
                  value={selectedBiayaPelatihan}
                  onValueChange={(value) => setSelectedBiayaPelatihan(value)}
                >
                  <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 w-full px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
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
              )}
            {selectedJenisPelatihan != "" && (
              <div
                onClick={(e) => handleClearFilter()}
                className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer"
              >
                <MdClear />
                Bersihkan Filter
              </div>
            )}
          </div>
          <div className="w-full">
            {loading ? (
              <div className="grid grid-cols-3 w-full gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </div>
            ) : (
              (() => {
                const filteredData = data.filter(
                  (pelatihan) =>
                    (selectedJenisPelatihan === "" ||
                      pelatihan.JenisSertifikat === selectedJenisPelatihan) &&
                    (selectedBidangPelatihan === "" ||
                      pelatihan.BidangPelatihan === selectedBidangPelatihan) &&
                    (selectedBalaiPelatihan === "" ||
                      pelatihan.PenyelenggaraPelatihan ===
                        selectedBalaiPelatihan) &&
                    (selectedBiayaPelatihan === "" ||
                      pelatihan.JenisPelatihan === selectedBiayaPelatihan)
                );

                if (filteredData.length > 0) {
                  return (
                    <div className="grid grid-cols-3 w-full gap-4">
                      {filteredData.map((pelatihan, index) => (
                        <CardPelatihan pelatihan={pelatihan} key={index} />
                      ))}
                    </div>
                  );
                } else {
                  return (
                    <div className="relative flex items-center justify-center w-full px-4 sm:px-6">
                      <div className="pt-12 md:pt-20 flex flex-col items-center">
                        <Image
                          src={"/illustrations/not-found.png"}
                          alt="Not Found"
                          width={0}
                          height={0}
                          className="w-[400px]"
                        />
                        <div className="mx-auto text-center pb-5 md:pb-8 -mt-2">
                          <h1 className="text-2xl font-calsans leading-[110%] text-black">
                            Belum Ada Pelatihan
                          </h1>
                          <div className="text-gray-600 text-sm text-center max-w-md">
                            Pelatihan yang kamu cari atau ingin ikuti belum ada
                            berdasarkan filter yang diterapkan. Harap untuk
                            selalu pantau websitenya ya Sobat ELAUT agar selalu
                            update dengan informasi pelatihan yang tersedia!{" "}
                            <p
                              onClick={handleClearFilter}
                              className="text-blue-600 hover:underline transition duration-150 ease-in-out cursor-pointer"
                            >
                              Bersihkan Filter
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })()
            )}
          </div>
        </div>

        {!showOnlyPelatihan && (
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
        )}

        {!showOnlyPelatihan && <Newsletter />}
      </section>{" "}
      <Footer />
    </>
  );
}

const CardPelatihan = ({ pelatihan }: { pelatihan: PelatihanMasyarakat }) => {
  return (
    <div className="coverflow flex flex-col shadow-custom relative w-[350px] h-fit rounded-3xl">
      <div className="w-fit absolute top-4 right-4 flex gap-1 z-[60]">
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.HargaPelatihan == "0"
            ? "Gratis"
            : "Rp. " + pelatihan.HargaPelatihan}
        </div>
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.BidangPelatihan}
        </div>
      </div>
      <div className="w-full relative h-[240px]">
        <div className="flex w-full absolute h-[240px] bg-gradient-to-r opacity-40 from-blue-500 to-teal-400 bg-opacity-20 rounded-tl-3xl rounded-tr-3xl"></div>
        <Image
          className="w-full rounded-tl-3xl rounded-tr-3xl h-full object-cover"
          alt=""
          src={`${pelatihan.FotoPelatihan}`}
          width={0}
          height={0}
        />
      </div>

      <div className=" py-3 relative ">
        <div className="w-full pb-4 px-6">
          <h2 className="font-calsans text-xl duration-1000 text-black mt-2 leading-[110%]">
            {truncateText(pelatihan?.NamaPelatihan, 50, "...")}
          </h2>
          <div className="flex gap-1 my-1 text-gray-600 text-sm items-center">
            <TbClockHour2 />
            Mulai Pelatihan :<p>{pelatihan.TanggalMulaiPelatihan}</p>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html:
                pelatihan &&
                truncateText(pelatihan?.DetailPelatihan, 150, "..."),
            }}
            className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000"
          />

          <Link
            href={`/pelatihan/${createSlug(pelatihan.NamaPelatihan)}/${
              pelatihan?.KodePelatihan
            }/${pelatihan?.IdPelatihan}`}
            className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
          >
            Registrasi
          </Link>
        </div>
      </div>
    </div>
  );
};

const CardSkeleton = () => (
  <div className="coverflow flex flex-col shadow-custom relative w-[350px] h-fit rounded-3xl animate-pulse">
    <div className="w-fit absolute top-4 right-4 flex gap-1 z-[60]">
      <div className="h-6 w-16 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-3xl"></div>
      <div className="h-6 w-16 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-3xl"></div>
    </div>
    <div className="w-full relative h-[240px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-tl-3xl rounded-tr-3xl"></div>
    <div className="py-3 relative px-6">
      <div className="w-full pb-4">
        <div className="h-6 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-md mb-2"></div>
        <div className="flex gap-1 my-1 text-sm items-center">
          <div className="h-4 w-4 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-full"></div>
          <div className="h-4 w-24 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-md"></div>
        </div>
        <div className="h-24 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-md mb-2"></div>
        <div className="h-8 w-full bg-blue-200 rounded-3xl"></div>
      </div>
    </div>
  </div>
);

const ListSkeleton = () => (
  <div className="grid grid-cols-4 gap-1 items-center w-full animate-pulse">
    <div className="border border-gray-300 p-2 h-14 w-14 items-center justify-center flex rounded-xl  bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
    <div className="flex flex-col gap-1">
      <div className="h-4 w-24  bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-md"></div>
      <div className="h-3 w-16  bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-md"></div>
    </div>
  </div>
);

export default page;
