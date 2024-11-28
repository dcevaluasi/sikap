import React, { ReactElement, useState } from "react";
import { RiInformationFill, RiVerifiedBadgeFill } from "react-icons/ri";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HiUserGroup } from "react-icons/hi2";
import { TbCalendarCheck, TbTargetArrow } from "react-icons/tb";

import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { PelatihanMasyarakat } from "@/types/product";
import Cookies from "js-cookie";
import Link from "next/link";
import { generateTanggalPelatihan } from "@/utils/text";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const TableDataPenerbitanSertifikat: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  // COUNTER
  const [countOnProgress, setCountOnProgress] = React.useState<number>(0);
  const [countDone, setCountDone] = React.useState<number>(0);

  const handleFetchingPublicTrainingData = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/lemdik/getPelatihanAdmin`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );
      console.log("PELATIHAN BY LEMDIK: ", response);

      // Filter data where SuratPemberitahuan is not an empty string
      const filteredData = response.data.data.filter(
        (item: any) => item.TtdSertifikat == Cookies.get("Eselon")
      );

      // Count statuses
      const onProgressCount = filteredData.filter(
        (item: any) => item.StatusPenerbitan === "On Progress"
      ).length;
      const doneCount = filteredData.filter(
        (item: any) => item.StatusPenerbitan === "Done"
      ).length;

      // Update state with counts
      setCountOnProgress(onProgressCount);
      setCountDone(doneCount);

      setData(filteredData);
      setIsFetching(false);
    } catch (error) {
      console.error("Error posting training data:", error);
      setIsFetching(false);
      throw error;
    }
  };

  console.log(Cookies.get("Eselon"));

  const publishedData = data.filter(
    (item: PelatihanMasyarakat) => item.Status === "Publish"
  ).length;

  /* ================================= HANDLING PENERBITAN SERTIFIKAT ====================================== */
  const [beritaAcara, setBeritaAcara] = React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setBeritaAcara(e.target.files[0]);
  };
  console.log({ beritaAcara });

  const [isOpenFormMateri, setIsOpenFormMateri] =
    React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<number>(0);

  const [sertifikatUntukPelatihan, setSertifikatUntukPelatihan] =
    React.useState("");
  const [ttdSertifikat, setTtdSertifikat] = React.useState("");

  const router = useRouter();

  React.useEffect(() => {
    handleFetchingPublicTrainingData();
  }, []);

  // STATUS FILTER
  const [selectedStatusFilter, setSelectedStatusFilter] =
    React.useState<string>("All");

  // SEARCHING
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const filteredData = data.filter((pelatihan) => {
    const matchesSearchQuery =
      pelatihan.NamaPelatihan.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      pelatihan.BidangPelatihan.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      pelatihan.PenyelenggaraPelatihan.toLowerCase().includes(
        searchQuery.toLowerCase()
      );

    var matchesStatus;

    if (selectedStatusFilter == "Proses Tandatangan") {
      matchesStatus = pelatihan!.StatusPenerbitan === "On Progress";
    } else if (selectedStatusFilter == "Sudah Di TTD") {
      matchesStatus = pelatihan!.StatusPenerbitan === "Done";
    } else {
      matchesStatus =
        selectedStatusFilter === "All" ||
        pelatihan!.StatusPenerbitan === selectedStatusFilter;
    }

    return matchesSearchQuery && matchesStatus;
  });

  return (
    <div className="w-full">
      {showFormAjukanPelatihan ? (
        <></>
      ) : (
        <>
          <nav className="bg-gray-100 flex p-4">
            <section
              aria-labelledby="ticket-statistics-tabs-label"
              className="pb-2"
            >
              <ul className="flex">
                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("All")}
                    className={`focus:outline-none p-2 rounded-l-md border border-r-0 flex flex-col items-center w-24 ${
                      selectedStatusFilter === "All"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold text-lg">{data!.length}</p>
                    <p
                      className={`uppercase text-sm ${
                        selectedStatusFilter === "All"
                          ? "text-white font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      All
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setSelectedStatusFilter("Proses Tandatangan")
                    }
                    className={`focus:outline-none p-2 border border-r-0 flex flex-col items-center w-fit ${
                      selectedStatusFilter === "Proses Tandatangan"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold text-lg">{countOnProgress}</p>
                    <p
                      className={`uppercase text-sm ${
                        selectedStatusFilter === "Proses Tandatangan"
                          ? "text-white font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      Proses Tandatangan
                    </p>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("Sudah Di TTD")}
                    className={`focus:outline-none p-2 rounded-r-md border border-r-1 flex flex-col items-center w-fit ${
                      selectedStatusFilter === "Sudah Di TTD"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold text-lg">{countDone}</p>
                    <p
                      className={`uppercase text-sm ${
                        selectedStatusFilter === "Sudah Di TTD"
                          ? "text-white font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      Sudah Di TTD
                    </p>
                  </button>
                </li>
              </ul>
            </section>
          </nav>
          <section className="px-4 -mt-4 w-full">
            <Tabs defaultValue="account" className="w-full">
              <TabsContent value="account">
                <div className="flex flex-col gap-1">
                  <div className="mb-1">
                    <Input
                      type="text"
                      placeholder="Cari berdasarkan Nama, Bidang, dan Penyelenggara Pelatihan"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-sm"
                    />
                  </div>
                  {filteredData.length == 0 ? (
                    <div className="pt-12 md:pt-20 flex flex-col items-center">
                      <Image
                        src={"/illustrations/not-found.png"}
                        alt="Not Found"
                        width={0}
                        height={0}
                        className="w-[400px]"
                      />
                      <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 -mt-2">
                        <h1 className="text-3xl font-calsans leading-[110%] text-black">
                          Belum Pengajuan Penerbitan
                        </h1>
                        <div className="text-gray-600 text-sm text-center  max-w-md">
                          Pengajuan penerbitan sertifikat pelatihan/bimbingan
                          teknis yang ditandatangani oleh Kepala Pusat Pelatihan
                          KP belum ada!
                        </div>
                      </div>
                    </div>
                  ) : (
                    filteredData.map((pengajuanPenerbitanSertifikat, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>
                            {pengajuanPenerbitanSertifikat!.NamaPelatihan}
                          </CardTitle>
                          <CardDescription>
                            {" "}
                            {pengajuanPenerbitanSertifikat!.Program} •{" "}
                            {
                              pengajuanPenerbitanSertifikat!
                                .PenyelenggaraPelatihan
                            }
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="ml-0 text-left capitalize -mt-6">
                            <div className="ml-0 text-left mt-1 text-neutral-500 ">
                              <p className="text-sm ">
                                <span className="flex items-center gap-1 leading-[105%]">
                                  <TbTargetArrow className="text-lg" />
                                  <span>
                                    Lokasi Pelatihan :{" "}
                                    {
                                      pengajuanPenerbitanSertifikat!
                                        .LokasiPelatihan
                                    }
                                  </span>
                                </span>
                                <span className="flex items-center gap-1 leading-[105%]">
                                  <TbCalendarCheck className="text-lg" />
                                  <span>
                                    Waktu Pelaksanaan :{" "}
                                    {generateTanggalPelatihan(
                                      pengajuanPenerbitanSertifikat!
                                        .TanggalMulaiPelatihan
                                    )}{" "}
                                    s.d{" "}
                                    {generateTanggalPelatihan(
                                      pengajuanPenerbitanSertifikat!
                                        .TanggalBerakhirPelatihan
                                    )}
                                  </span>
                                </span>

                                <span className="flex items-center gap-1 leading-[105%]">
                                  <HiUserGroup className="text-base" />
                                  <span>
                                    Jumlah peserta pelatihan :{" "}
                                    {
                                      pengajuanPenerbitanSertifikat!
                                        .UserPelatihan.length
                                    }
                                    /
                                    {
                                      pengajuanPenerbitanSertifikat!
                                        .KoutaPelatihan
                                    }
                                  </span>
                                </span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="flex items-center justify-center gap-1 flex-wrap  -mt-2">
                            <Link
                              title={
                                pengajuanPenerbitanSertifikat!
                                  .StatusPenerbitan != "Done"
                                  ? "Review"
                                  : "Lihat Detail"
                              }
                              href={`/admin/pusat/pelatihan/penerbitan-sertifikat/detail-pelatihan/${pengajuanPenerbitanSertifikat.KodePelatihan}/${pengajuanPenerbitanSertifikat.IdPelatihan}`}
                              className="border border-neutral-200  shadow-sm  inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-gray-400 hover:bg-gray-400 hover:text-white text-white rounded-md"
                            >
                              <RiInformationFill className="h-5 w-5" />
                            </Link>

                            <Link
                              href={`/admin/pusat/pelatihan/${pengajuanPenerbitanSertifikat.KodePelatihan}/peserta-pelatihan/${pengajuanPenerbitanSertifikat.IdPelatihan}`}
                              className="border border-neutral-200  shadow-sm bg-teal-600 hover:bg-teal-600 text-neutral-100  hover:text-neutral-200 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
                            >
                              <HiUserGroup className="h-5 w-5" />
                            </Link>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </>
      )}
    </div>
  );
};

export default TableDataPenerbitanSertifikat;
