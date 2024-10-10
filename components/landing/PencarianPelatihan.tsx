"use client";

import Image from "next/image";
import React, { FormEvent } from "react";
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

import { HiViewGrid } from "react-icons/hi";

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
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { HashLoader } from "react-spinners";
import { formatToRupiah, getMonthName } from "@/lib/utils";
import { FiCalendar, FiSearch } from "react-icons/fi";
import Toast from "../toast";
import ReCAPTCHA from "react-google-recaptcha";

function PencarianPelatihan() {
  const [data, setData] = React.useState<PelatihanMasyarakat[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const jenisProgram =
    usePathname() == "/layanan/program/akp"
      ? "Awak Kapal Perikanan"
      : usePathname() == "/layanan/program/perikanan"
      ? "Perikanan"
      : "Kelautan";

  console.log(jenisProgram);

  const [sortedData, setSortedData] = React.useState([]);

  const handleFetchingPublicTrainingData = async () => {
    setLoading(true);
    let bulanMulaiPelatihan = "";
    if (selectedBulanPelatihan != "") {
      bulanMulaiPelatihan = `${new Date().getFullYear()}-${selectedBulanPelatihan}`;
    }
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/lemdik/getPelatihan?${jenisProgram}&penyelenggara_pelatihan=${selectedBalaiPelatihan}&bidang_pelatihan=${selectedBidangPelatihan}&jenis_sertifikat=${selectedJenisPelatihan}&tanggal_mulai_pelatihan=${bulanMulaiPelatihan}&program=${selectedProgramPelatihan}`
      );
      setLoading(false);
      setShowResult(true);
      console.log({ response });

      if (response.data.data != null) {
        const filteredAndSortedData = response.data.data
          .filter(
            (item: PelatihanMasyarakat) => item.JenisProgram === jenisProgram
          )
          .sort((a: PelatihanMasyarakat, b: PelatihanMasyarakat) => {
            const dateA = new Date(a.TanggalMulaiPelatihan);
            const dateB = new Date(b.TanggalMulaiPelatihan);
            return dateB.getTime() - dateA.getTime(); // Ascending order
          });

        setData(filteredAndSortedData);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error posting training data:", error);
      setLoading(false);
      setShowResult(false);
      throw error;
    }
  };

  const akpSelections = [
    "ANKAPIN Tingkat I",
    "ATKAPIN Tingkat I",
    "ANKAPIN Tingkat II",
    "ATKAPIN Tingkat II",
    "ANKAPIN Tingkat III",
    "ATKAPIN Tingkat III",
    "BSTF I",
    "BSTF II",
    "Rating",
    "SKN",
    "SKPI",
    "SOPI",
    "Fishing Master",
  ];

  const perikananSelection = [
    "CPIB",
    "CBIB",
    "CPPIB",
    "HACCP",
    "SPI",
    "API",
    "Budidaya",
    "Pengolahan dan Pemasaran",
    "Mesin Perikanan",
    "Penangkapan",
    "SD Perikanan",
    "Wisata Bahari",
  ];

  const kelautanSection = ["BCL", "Pengelolaan Sampah", "Mitigasi Bencana"];

  const [selectedJenisPelatihan, setSelectedJenisPelatihan] =
    React.useState<string>("");
  const [selectedProgramPelatihan, setSelectedProgramPelatihan] =
    React.useState<string>("");
  const [selectedBidangPelatihan, setSelectedBidangPelatihan] =
    React.useState<string>("");
  const [selectedBalaiPelatihan, setSelectedBalaiPelatihan] =
    React.useState<string>("");
  const [selectedBiayaPelatihan, setSelectedBiayaPelatihan] =
    React.useState<string>("");
  const [selectedBulanPelatihan, setSelectedBulanPelatihan] =
    React.useState<string>("");

  const [showOnlyPelatihan, setShowOnlyPelatihan] =
    React.useState<boolean>(false);

  const [showResult, setShowResult] = React.useState<boolean>(false);

  const handleClearFilter = () => {
    setSelectedBidangPelatihan("");
    setSelectedJenisPelatihan("");
    setSelectedBalaiPelatihan("");
    setSelectedBiayaPelatihan("");
    setSelectedBulanPelatihan("");
    setSelectedProgramPelatihan("");
    handleFetchingPublicTrainingData();
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
    <section className="-mt-20 w-full">
      <div className=" mx-auto max-w-7xl py-5 flex flex-col gap-4">
        <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-white h-auto w-fit mx-auto items-center justify-center flex flex-col relative shadow-custom rounded-3xl overflow-hidden">
          <div className="group relative flex flex-col overflow-hidden justify-center rounded-3xl px-6  flex-grow group">
            <div className="flex flex-col gap-1  ">
              <div className="flex w-fit gap-2 py-5 items-center justify-center">
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
                  value={selectedProgramPelatihan}
                  onValueChange={(value) => setSelectedProgramPelatihan(value)}
                >
                  <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 px-3 w-full text-sm items-center rounded-md bg-white p-1.5  cursor-pointer border border-gray-300">
                      <RiShipLine />
                      {selectedProgramPelatihan == ""
                        ? "Program Pelatihan"
                        : selectedProgramPelatihan}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    <SelectGroup>
                      <SelectLabel>Pilih Program Pelatihan</SelectLabel>
                      {usePathname().includes("akp") && (
                        <>
                          {akpSelections.map((akp, index) => (
                            <SelectItem key={index} value={akp}>
                              {akp}
                            </SelectItem>
                          ))}
                        </>
                      )}

                      {usePathname().includes("perikanan") && (
                        <>
                          {perikananSelection.map((akp, index) => (
                            <SelectItem key={index} value={akp}>
                              {akp}
                            </SelectItem>
                          ))}
                        </>
                      )}

                      {usePathname().includes("kelautan") && (
                        <>
                          {kelautanSection.map((akp, index) => (
                            <SelectItem key={index} value={akp}>
                              {akp}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedJenisPelatihan}
                  onValueChange={(value) => setSelectedJenisPelatihan(value)}
                >
                  <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 px-3 w-full text-sm items-center rounded-md bg-white p-1.5  cursor-pointer border border-gray-300">
                      <HiViewGrid />
                      {selectedJenisPelatihan == ""
                        ? "Jenis Pelatihan"
                        : selectedJenisPelatihan}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    <SelectGroup>
                      <SelectLabel>Pilih Jenis Pelatihan</SelectLabel>
                      <SelectItem value={"Aspirasi"}>Aspirasi</SelectItem>
                      <SelectItem value={"PNBP/BLU"}>PNBP/BLU</SelectItem>
                      <SelectItem value={"Reguler"}>Reguler</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedBulanPelatihan}
                  onValueChange={(value) => setSelectedBulanPelatihan(value)}
                >
                  <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 w-full px-3 text-sm items-center rounded-md bg-white p-1.5  cursor-pointer border border-gray-300">
                      <FiCalendar />
                      {selectedBulanPelatihan == ""
                        ? "Pilih Waktu"
                        : getMonthName(selectedBulanPelatihan)}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    <SelectGroup>
                      <SelectLabel>Bulan Pelatihan</SelectLabel>
                      <SelectItem value={"01"}>Januari</SelectItem>
                      <SelectItem value={"02"}>Februari</SelectItem>
                      <SelectItem value={"03"}>Maret</SelectItem>
                      <SelectItem value={"04"}>April</SelectItem>
                      <SelectItem value={"05"}>Mei</SelectItem>
                      <SelectItem value={"06"}>Juni</SelectItem>
                      <SelectItem value={"07"}>Juli</SelectItem>
                      <SelectItem value={"08"}>Agustus</SelectItem>
                      <SelectItem value={"09"}>September</SelectItem>
                      <SelectItem value={"10"}>Oktober</SelectItem>
                      <SelectItem value={"11"}>November</SelectItem>
                      <SelectItem value={"12"}>Desember</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {(selectedJenisPelatihan !== "" ||
                  selectedBalaiPelatihan !== "" ||
                  selectedBiayaPelatihan !== "" ||
                  selectedBidangPelatihan !== "" ||
                  selectedProgramPelatihan !== "" ||
                  selectedBulanPelatihan != "") && (
                  <div
                    onClick={() => handleClearFilter()}
                    className="inline-flex gap-2 w-fit px-3 text-sm items-center rounded-md bg-white p-1.5 cursor-pointer border border-gray-300"
                  >
                    <MdClear />
                    Bersihkan Filter
                  </div>
                )}

                <div className="flex">
                  <Button
                    onClick={(e) => handleFetchingPublicTrainingData()}
                    className="btn-sm text-sm text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  >
                    <span className="mr-2">Cari</span>
                    <FiSearch />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="w-full flex h-[50vh] items-center justify-center">
            <HashLoader color="#338CF5" size={50} />
          </div>
        ) : (
          showResult && (
            <div className="w-full max-w-7xl mx-auto pb-4">
              {/* Header */}
              {selectedBulanPelatihan != "" && (
                <div className="bg-white shadow-custom rounded-xl p-3 text-xl text-center font-calsans">
                  <span className="font-bold">
                    {getMonthName(selectedBulanPelatihan)}{" "}
                    {new Date().getFullYear()}
                  </span>
                </div>
              )}

              {/* Table */}
              <div className="bg-white shadow-custom text-black text-center grid grid-cols-5 gap-2 p-4 rounded-xl font-calsans text-lg mt-4">
                <div>Pelatihan</div>
                <div>Penyelenggara</div>
                <div></div>
                <div>Pelaksanaan</div>
                <div>Harga</div>
              </div>

              <div className="flex-col gap-4 flex w-full mt-4">
                {data == null || data.length === 0 ? (
                  <div className="flex flex-col w-full items-center justify-center h-fit">
                    <Image
                      src={"/illustrations/not-found.png"}
                      alt="Not Found"
                      width={0}
                      height={0}
                      className="w-[400px]"
                    />
                    <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 -mt-2">
                      <h1 className="text-3xl font-calsans leading-[110%] text-black">
                        Belum Ada Pelatihan
                      </h1>
                      <div className="text-gray-600 text-center  max-w-md">
                        Belum ada pelatihan yang tersedia saat ini, harap terus
                        cek berkala ya websitenya Sobat E-LAUT!
                      </div>
                    </div>
                  </div>
                ) : (
                  data.map((pelatihan, index) => (
                    <CardPelatihan key={index} pelatihan={pelatihan} />
                  ))
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

const CardPelatihan = ({ pelatihan }: { pelatihan: PelatihanMasyarakat }) => {
  const [nik, setNik] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [captcha, setCaptcha] = React.useState<string | null>();
  const recaptchaRef = React.createRef();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const handleLoginAkun = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (nik == "" || password == "") {
      setErrorMsg("Tolong lengkapi data login!");
      setLoading(false);
    } else {
      if (captcha) {
        try {
          const response: AxiosResponse = await axios.post(
            `${elautBaseUrl}/users/loginNotelpon`,
            JSON.stringify({
              no_number: nik,
              password: password,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log({ response });

          Cookies.set("XSRF081", response.data.t, { expires: 1 });
          Cookies.set("XSRF082", "true", { expires: 1 });

          if (Cookies.get("XSRF085")) {
            Toast.fire({
              icon: "success",
              title: "Berhasil login.",
              text: `Berhasil melakukan login, ayo segera daftarkan dirimu!`,
            });
            router.push(Cookies.get("XSRF085")!);
          } else {
            Toast.fire({
              icon: "success",
              title: "Berhasil login.",
              text: `Berhasil melakukan login kedalam ELAUT!`,
            });
            if (Cookies.get("XSRF083")) {
              // router.push("/dashboard/complete-profile");
              router.push("/layanan/program/akp");
            } else {
              router.push("/layanan/program/akp");
            }
          }
        } catch (error: any) {
          console.error({ error });
          if (
            error.response &&
            error.response.data &&
            error.response.data.pesan
          ) {
            const errorMsg = error.response.data.pesan;

            Toast.fire({
              icon: "error",
              title: "Gagal mencoba login.",
              text: `Gagal melakukan login, ${errorMsg}!`,
            });
          } else {
            const errorMsg = error.response.data.pesan;
            Toast.fire({
              icon: "error",
              title: "Gagal mencoba login.",
              text: `Gagal melakukan login. ${errorMsg}!`,
            });
          }
        }
      }
    }
  };

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
          {formatToRupiah(pelatihan.HargaPelatihan)}
        </p>

        <Link
          href={`/layanan/pelatihan/${createSlug(pelatihan.NamaPelatihan)}/${
            pelatihan?.KodePelatihan
          }/${pelatihan?.IdPelatihan}`}
          className="bg-blue-500 text-white px-4 py-2 text-base rounded-md my-1 w-fit block"
        >
          Lihat Detail
        </Link>

        <p className="text-sm">Tersedia</p>
      </div>
    </div>
  );
};

export default PencarianPelatihan;
