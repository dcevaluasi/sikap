import React from "react";
import { RiInformationFill } from "react-icons/ri";

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

import FormPelatihan from "../admin/formPelatihan";

import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { PelatihanMasyarakat } from "@/types/product";

import Cookies from "js-cookie";

import Link from "next/link";
import { elautBaseUrl } from "@/constants/urls";

import { Input } from "@/components/ui/input";
import { generateTanggalPelatihan } from "@/utils/text";
import DeleteButton from "../Dashboard/Actions/DeleteButton";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { BiEditAlt, BiFilter, BiFilterAlt } from "react-icons/bi";
import { PublishButton } from "../Dashboard/Actions";
import {
  PROGRAM_AKP,
  PROGRAM_KELAUTAN,
  PROGRAM_PERIKANAN,
} from "@/constants/pelatihan";
import { MdClear } from "react-icons/md";
import UploadSuratButton from "../Dashboard/Actions/UploadSuratButton";
import { GrSend } from "react-icons/gr";
import { FiEdit2 } from "react-icons/fi";
import GenerateNoSertifikatButton from "../Dashboard/Actions/GenerateNoSertifikatButton";

const TableDataPelatihan: React.FC = () => {
  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  // COUNTER
  const [countOnProgress, setCountOnProgress] = React.useState<number>(0);
  const [countDone, setCountDone] = React.useState<number>(0);
  const [countNotPublished, setCountNotPublished] = React.useState<number>(0);

  const handleFetchingPublicTrainingData = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/lemdik/getPelatihanAdmin?id_lemdik=${Cookies.get(
          "IDLemdik"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );

      // Count statuses
      const onProgressCount = response?.data!.data!.filter(
        (item: any) => item.StatusPenerbitan === "On Progress"
      ).length;
      const doneCount = response?.data!.data!.filter(
        (item: any) => item.StatusPenerbitan === "Done"
      ).length;
      const notPublished = response?.data!.data!.filter(
        (item: any) => item.Status !== "Publish"
      ).length;

      // Update state with counts
      setCountOnProgress(onProgressCount);
      setCountDone(doneCount);
      setCountNotPublished(notPublished);

      // Sort data in descending order by its index
      const sortedData = [...response.data.data].reverse();

      console.log("PELATIHAN BY LEMDIK: ", response);
      setData(sortedData);

      setIsFetching(false);
    } catch (error) {
      console.error("Error posting training data:", error);
      setIsFetching(false);
      throw error;
    }
  };

  React.useEffect(() => {
    handleFetchingPublicTrainingData();
  }, []);

  // STATUS FILTER
  const [selectedStatusFilter, setSelectedStatusFilter] =
    React.useState<string>("All");
  const [filterCategory, setFilterCategory] = React.useState<string>("");

  // SEARCHING
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const filteredData = data.filter((pelatihan) => {
    // Check if it matches the category filter
    const matchesCategory =
      !filterCategory ||
      pelatihan.Program.toLowerCase() === filterCategory.toLowerCase();

    // Check if it matches the search query
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

    // Check if it matches the status filter
    let matchesStatus = true;
    if (selectedStatusFilter === "Belum Dipublish") {
      matchesStatus = pelatihan.Status !== "Publish";
    } else if (selectedStatusFilter !== "All") {
      matchesStatus = pelatihan.Status === selectedStatusFilter;
    }

    // Apply filters in order: category -> search -> status
    return matchesCategory && matchesSearchQuery && matchesStatus;
  });

  return (
    <div className="shadow-default -mt-10">
      <nav className="bg-gray-100 flex p-4">
        <section
          aria-labelledby="ticket-statistics-tabs-label "
          className="pb-2"
        >
          <ul className="flex">
            <StatusButton
              label="Total Pelatihan"
              count={data.length}
              isSelected={selectedStatusFilter === "All"}
              onClick={() => setSelectedStatusFilter("All")}
            />
            <StatusButton
              label="Belum Dipublish"
              count={countNotPublished}
              isSelected={selectedStatusFilter === "Belum Dipublish"}
              onClick={() => setSelectedStatusFilter("Belum Dipublish")}
            />
            <StatusButton
              label="Perlu Di TTD"
              count={countOnProgress}
              isSelected={selectedStatusFilter === "Perlu Di TTD"}
              onClick={() => setSelectedStatusFilter("Perlu Di TTD")}
            />
            <StatusButton
              label="Sudah Di TTD"
              count={countDone}
              isSelected={selectedStatusFilter === "Sudah Di TTD"}
              onClick={() => setSelectedStatusFilter("Sudah Di TTD")}
            />
          </ul>
        </section>
      </nav>
      <section className="px-4 -mt-4 w-full">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className={`grid w-full grid-cols-2`}>
            <TabsTrigger
              value="account"
              onClick={() => handleFetchingPublicTrainingData()}
            >
              Daftar Pelatihan
            </TabsTrigger>
            <TabsTrigger value="password">Buat Pelatihan Baru</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="flex flex-col gap-1">
              <div className="mb-1 flex items-center w-full gap-2">
                <select
                  className="text-sm p-2 border border-neutral-200 bg-transparent rounded-md bg-white  w-1/4"
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="" selected={filterCategory == ""}>
                    Program Pelatihan
                  </option>
                  <optgroup label="AKP">
                    {PROGRAM_AKP.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Perikanan">
                    {PROGRAM_PERIKANAN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Kelautan">
                    {PROGRAM_KELAUTAN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {filterCategory != "" && (
                  <Button
                    onClick={(e) => setFilterCategory("")}
                    className="border border-neutral-200  shadow-sm  inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-3 bg-neutral-800 hover:bg-neutral-800 hover:text-white text-white rounded-md"
                  >
                    <MdClear className="h-5 w-5 mr-1" />
                    Bersihkan Filter
                  </Button>
                )}

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
                      Belum Ada Pelatihan
                    </h1>
                    <div className="text-gray-600 text-sm text-center  max-w-md">
                      Buka kelas pelatihan segera untuk dapat melihat berbagai
                      macam pelatihan berdasarkan programnya!
                    </div>
                  </div>
                </div>
              ) : (
                filteredData.map((pelatihan, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{pelatihan!.NamaPelatihan}</CardTitle>
                      <CardDescription>
                        {" "}
                        {pelatihan!.Program} •{" "}
                        {pelatihan!.PenyelenggaraPelatihan}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="ml-0 text-left capitalize -mt-6">
                        <div className="ml-0 text-left mt-1 text-neutral-500 ">
                          <p className="text-sm ">
                            <span className="flex items-center gap-1 leading-[105%]">
                              <TbTargetArrow className="text-lg" />
                              <span>
                                Lokasi Pelatihan : {pelatihan!.LokasiPelatihan}
                              </span>
                            </span>
                            <span className="flex items-center gap-1 leading-[105%]">
                              <GrSend className="text-lg" />
                              <span>
                                Waktu Pendaftaran :{" "}
                                {generateTanggalPelatihan(
                                  pelatihan!.TanggalMulaiPendaftaran
                                )}{" "}
                                <span className="lowercase">s.d</span>{" "}
                                {generateTanggalPelatihan(
                                  pelatihan!.TanggalBerakhirPelatihan
                                )}
                              </span>
                            </span>
                            <span className="flex items-center gap-1 leading-[105%]">
                              <TbCalendarCheck className="text-lg" />
                              {pelatihan!.TanggalMulaiPelatihan != "" ? (
                                <span>
                                  Waktu Pelaksanaan :{" "}
                                  {generateTanggalPelatihan(
                                    pelatihan!.TanggalMulaiPelatihan
                                  )}{" "}
                                  <span className="lowercase">s.d</span>{" "}
                                  {generateTanggalPelatihan(
                                    pelatihan!.TanggalBerakhirPelatihan
                                  )}
                                </span>
                              ) : (
                                <>-</>
                              )}
                            </span>

                            <span className="flex items-center gap-1 leading-[105%]">
                              <HiUserGroup className="text-base" />
                              <span>
                                Jumlah peserta pelatihan :{" "}
                                {pelatihan!.UserPelatihan.length}/
                                {pelatihan!.KoutaPelatihan}
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full flex items-end justify-between">
                        <div className="flex items-center justify-center gap-1 flex-wrap  -mt-2">
                          <Link
                            title="Detail Pelatihan"
                            href={`/admin/lemdiklat/pelatihan/detail/${pelatihan.KodePelatihan}/${pelatihan.IdPelatihan}`}
                            className="border border-neutral-200  shadow-sm  inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-gray-400 hover:bg-gray-400 hover:text-white text-white rounded-md"
                          >
                            <RiInformationFill className="h-5 w-5" />
                          </Link>
                          <Link
                            title="Peserta Pelatihan"
                            href={`/admin/pusat/pelatihan/${pelatihan.KodePelatihan}/peserta-pelatihan/${pelatihan.IdPelatihan}`}
                            className="  shadow-sm bg-green-500 hover:bg-green-500 text-neutral-100  hover:text-neutral-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
                          >
                            <HiUserGroup className="h-5 w-5 " />
                          </Link>
                          {pelatihan!.NoSertifikat == "" && (
                            <Button
                              title="Edit Pelatihan"
                              variant="outline"
                              className="ml-auto  hover:bg-yellow-300 bg-yellow-300 hover:text-neutral-700 text-neutral-700 duration-700"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </Button>
                          )}

                          <GenerateNoSertifikatButton
                            idPelatihan={pelatihan!.IdPelatihan.toString()}
                            pelatihan={pelatihan!}
                            handleFetchingData={
                              handleFetchingPublicTrainingData
                            }
                          />

                          {pelatihan!.Status != "Publish" && (
                            <>
                              <DeleteButton
                                idPelatihan={pelatihan!.IdPelatihan.toString()}
                                pelatihan={pelatihan}
                                handleFetchingData={
                                  handleFetchingPublicTrainingData
                                }
                              />
                            </>
                          )}
                          {pelatihan!.Status == "Publish" ? (
                            pelatihan!.UserPelatihan.length == 0 ? (
                              <PublishButton
                                title="Take Down"
                                statusPelatihan={pelatihan?.Status ?? ""}
                                idPelatihan={pelatihan!.IdPelatihan.toString()}
                                handleFetchingData={
                                  handleFetchingPublicTrainingData
                                }
                              />
                            ) : (
                              <></>
                            )
                          ) : (
                            <PublishButton
                              title="Publish"
                              statusPelatihan={pelatihan?.Status ?? ""}
                              idPelatihan={pelatihan!.IdPelatihan.toString()}
                              handleFetchingData={
                                handleFetchingPublicTrainingData
                              }
                            />
                          )}
                          {new Date() >
                            new Date(pelatihan.TanggalBerakhirPendaftaran) && (
                            <UploadSuratButton
                              idPelatihan={pelatihan!.IdPelatihan.toString()}
                              handleFetchingData={
                                handleFetchingPublicTrainingData
                              }
                              suratPemberitahuan={pelatihan?.SuratPemberitahuan}
                            />
                          )}
                        </div>
                        <p className="italic text-neutral-400 text-[0.6rem]">
                          Created at {pelatihan!.CreateAt} | Updated at{" "}
                          {pelatihan!.UpdateAt}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardContent>
                <FormPelatihan edit={false} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

const StatusButton = ({
  label,
  count,
  isSelected,
  onClick,
}: {
  label: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`focus:outline-none p-2 border ${
      isSelected ? "bg-blue-500 text-white" : "bg-white text-black"
    }`}
  >
    <p className="font-semibold text-lg">{count}</p>
    <p
      className={`uppercase text-sm ${
        isSelected ? "font-bold" : "text-gray-600"
      }`}
    >
      {label}
    </p>
  </button>
);

export default TableDataPelatihan;
