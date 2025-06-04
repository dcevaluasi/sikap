import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit3Icon, LucideListChecks, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TbBroadcast,
  TbChartBubble,
  TbChartDonut,
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
  TbDatabase,
  TbDatabaseEdit,
  TbFileCertificate,
  TbFileStack,
  TbRubberStamp,
  TbSchool,
  TbTargetArrow,
  TbTrash,
} from "react-icons/tb";

import { usePathname, useRouter } from "next/navigation";

import axios, { AxiosResponse } from "axios";

import {
  RiFilePaper2Line,
  RiShipLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";
import Link from "next/link";
import Toast from "@/components/toast";

import Cookies from "js-cookie";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import TableData from "../../Tables/TableData";
import {
  getIdUjianKeahlianInBankSoal,
  getIdUjianKeahlianInBankSoal2,
} from "@/components/utils/dpkakp/pathname";
import { dpkakpBaseUrl } from "@/constants/urls";
import Image from "next/image";
import {
  Bagian,
  PaketBagianDetail,
  SoalUjianBagian,
} from "@/types/ujian-keahlian-akp";
import { SelectValue } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { FiEdit2, FiTrash, FiUploadCloud } from "react-icons/fi";
import { countDistinctMateri } from "@/lib/utils";
import { FaBookOpen } from "react-icons/fa6";
import { HashLoader } from "react-spinners";

const TableDataBankSoalUjianKeahlian = () => {
  const pathname = usePathname();
  const [data, setData] = React.useState<SoalUjianBagian[]>([]);
  const [dataBagian, setDataBagian] = React.useState<Bagian | null>(null);
  const [duplicateData, setDuplicateData] = React.useState<SoalUjianBagian[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [countSoalBergambar, setCountSoalBergambar] = React.useState<number>(0);
  const [countSoalDuplikasi, setCountSoalDuplikasi] = React.useState<number>(0);
  const [countReal, setCountReal] = React.useState<number>(0);
  const [countNotClassified, setCountNotClassified] = React.useState<number>(0);

  const handleFetchingBagianUjian = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getBagian?id=${getIdUjianKeahlianInBankSoal(
          pathname!
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);

      const countGambarSoal = response.data!.data[0]!.SoalUjianBagian.filter(
        (soal: any) => soal.GambarSoal && soal.GambarSoal.trim() !== ""
      ).length;

      const countNotClassifiedMateri = response.data!.data[0]!.SoalUjianBagian.filter(
        (soal: any) => soal.Materi == ''
      ).length;



      const tmpSoalFrequency: Record<string, SoalUjianBagian[]> = {};
      response.data!.data[0]!.SoalUjianBagian.forEach((soal: any) => {
        const key = soal.Soal?.trim(); // Ensure trimming for consistency
        if (!tmpSoalFrequency[key]) tmpSoalFrequency[key] = [];
        tmpSoalFrequency[key].push(soal);
      });


      // Count duplicate Soal values
      const soalFrequency = response.data!.data[0]!.SoalUjianBagian.reduce(
        (acc: Record<string, number>, soal: any) => {
          const key = soal.Soal;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        },
        {}
      );

      const countSoalDuplikasi = Object.values(soalFrequency).filter(
        (count: any) => count > 1
      ).length;

      const duplicateSoal = Object.values(tmpSoalFrequency).filter(
        (list) => list.length > 1
      ).flat();


      setCountSoalBergambar(countGambarSoal);
      setCountSoalDuplikasi(duplicateSoal.length / 2);
      setDuplicateData(duplicateSoal!);
      setCountNotClassified(countNotClassifiedMateri)

      setDataBagian(response.data.data[0]!);
      setCountReal(response.data!.data[0]!.SoalUjianBagian!.length)
      setData(response.data!.data[0]!.SoalUjianBagian);
      setIsFetching(false);
    } catch (error) {
      console.error("Error posting tipe ujian:", error);
      setIsFetching(false);
      throw error;
    }
  };

  const handleFetchingBagianUjianGambar = async () => {
    setIsFetching(true);

    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getBagian?id=${getIdUjianKeahlianInBankSoal(pathname!)}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );

      const allData = response.data?.data ?? [];
      const firstGroup = Array.isArray(allData) && allData.length > 0 ? allData[0] : [];

      const filtered = firstGroup.filter((item: SoalUjianBagian) => item.GambarSoal !== '');

      setData(filtered);
    } catch (error) {
      console.error("Error fetching bagian ujian not classified materi:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleFetchingBagianUjianNotClassifiedMateri = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getBagian?id=${getIdUjianKeahlianInBankSoal(
          pathname!
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );


      setData(response.data!.data[0]!.filter((item: SoalUjianBagian) => item.Materi === ''));
      setIsFetching(false);
    } catch (error) {
      console.error("Error posting tipe ujian:", error);
      setIsFetching(false);
      throw error;
    }
  };

  console.log({ duplicateData })

  console.log({ countSoalDuplikasi });
  console.log({ countSoalBergambar });

  console.log({ dataBagian });
  console.log({ data });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  countDistinctMateri(data)

  const handleDeleteBankSoal = async (idBagian: number) => {
    try {
      const response = await axios.delete(
        `${dpkakpBaseUrl}/adminPusat/deleteAllSoalBagian?id=${idBagian}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log({ response });
      Toast.fire({
        icon: "success",
        title: "Berhasil menghapus bank soal ujian!",
      });
      handleFetchingBagianUjian();
    } catch (error) {
      console.error({ error });
      Toast.fire({
        icon: "error",
        title: "Ups, gagal menghapus bank soal ujian!",
      });
      handleFetchingBagianUjian();
    }
  };

  const handleDeleteSoal = async (idSoalUjianBagian: number) => {
    try {
      const response = await axios.delete(
        `${dpkakpBaseUrl}/adminPusat/DeleteSoal?id=${idSoalUjianBagian}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      Toast.fire({
        icon: "success",
        title: "Berhasil menghapus butir soal ujian!",
      });
      handleFetchingBagianUjian();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Ups, gagal menghapus butir soal ujian!",
      });
      handleFetchingBagianUjian();
    }
  };

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<SoalUjianBagian>[] = [
    {
      accessorKey: "KodePelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold w-fit`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`w-full text-center uppercase`}>{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "IdSoalUjianBagian",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold  p-0 flex justify-center w-full items-center`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> Action</p>

            <TbDatabaseEdit className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <>
          <Button
            // onClick={() => {
            //   handleFetchingDataUjianById(ujian!.IdUjian);
            // }}
            variant="outline"
            className="bg-yellow-300 w-full text-neutral-800 hover:text-neutral-800 hover:bg-yellow-300"
          >
            <FiEdit2 className="h-4 w-4 text-neutral-800 mr-1" /> Edit Soal
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                // onClick={() => setSelectedIdUjian(ujian!.IdUjian)}
                variant="outline"
                className="bg-rose-600 w-full text-white hover:text-white hover:bg-rose-600"
              >
                <Trash className="h-4 w-4 text-white mr-1" /> Hapus Soal
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Apakah kamu yakin menghapus soal ini?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Penghapusan data ini akan dilakukan secara permanen, sehingga
                  anda tidak dapat kembali melakukan undo terkait tindakan ini!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    handleDeleteSoal(row.original.IdSoalUjianBagian)
                  }
                  className="bg-rose-600"
                >
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ),
    },
    {
      accessorKey: "Materi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> Materi</p>

            <RiFilePaper2Line className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left flex flex-col gap-1`}>
          <p className="text-base font-semibold tracking-tight leading-none">
            {row.original.Materi}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Soal",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> Soal</p>

            <RiFilePaper2Line className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left flex flex-col gap-1`}>
          {row.original.GambarSoal ? (
            <Image
              src={row.original.GambarSoal!}
              alt={row.original.Soal}
              width={0}
              height={0}
              className="w-48"
            />
          ) : (
            <></>
          )}
          <p className="text-base font-semibold tracking-tight leading-none">
            {row.original.Soal}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "GambarSoal",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-center`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]">Gambar Soal</p>

            <RiVerifiedBadgeFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize w-[200px]`}>
          {
            row.original.GambarSoal != "" ? <Link href={row.original.GambarSoal!} className='text-blue-500 underline'>{row.original.GambarSoal}</Link> : <p>-</p>
          }
        </div>
      ),
    },
    {
      accessorKey: "IdUsers",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> Jawaban Benar</p>

            <RiVerifiedBadgeFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize`}>
          <p className="text-sm text-gray-400 font-normal tracking-tight leading-none">
            {row.original?.JawabanBenar}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Jawaban",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> Pilihan 1</p>

            <TbCircleNumber1 className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize w-1/3`}>
          <p className="text-sm text-gray-400 font-normal tracking-tight leading-none">
            {row.original?.Jawaban[1]?.NameJawaban}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Jawaban2",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> Pilihan 2</p>

            <TbCircleNumber2 className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize`}>
          <p className="text-sm text-gray-400 font-normal tracking-tight leading-none">
            {row.original?.Jawaban[2]?.NameJawaban}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Jawaban3",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> Pilihan 3</p>

            <TbCircleNumber3 className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize`}>
          <p className="text-sm text-gray-400 font-normal tracking-tight leading-none">
            {row.original?.Jawaban[3]?.NameJawaban}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Jawaban4",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> Pilihan 4</p>

            <TbCircleNumber4 className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize`}>
          <p className="text-sm text-gray-400 font-normal tracking-tight leading-none">
            {row.original?.Jawaban[4]?.NameJawaban}
          </p>
        </div>
      ),
    },
  ];

  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [isOpenFormPeserta, setIsOpenFormPeserta] =
    React.useState<boolean>(false);
  const [fileExcelBankSoalPelatihan, setFileExcelBankPelatihan] =
    React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setFileExcelBankPelatihan(e.target.files[0]);
  };
  const handleUploadImportBankSoalPelatihan = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("IdBagian", getIdUjianKeahlianInBankSoal(pathname!));
    if (fileExcelBankSoalPelatihan != null) {
      formData.append("file", fileExcelBankSoalPelatihan);
    }

    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/adminPusat/ImportSoalBagian`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log("FILE UPLOADED BANK SOAL : ", response);
      Toast.fire({
        icon: "success",
        title: `Selamat anda berhasil mengupload bank soal ujian keahlian!`,
      });
      setIsOpenFormPeserta(!isOpenFormPeserta);
      handleFetchingBagianUjian();
    } catch (error) {
      console.log("FILE IMPORT BANK SOAL PELATIHAN : ", error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupload bank soal ujian keahlian!`,
      });
      handleFetchingBagianUjian();
    }
  };

  const [isOpenFormDelete, setIsOpenFormDelete] =
    React.useState<boolean>(false);

  const dataKomposisiSoal = countDistinctMateri(data)
  console.log({ dataKomposisiSoal })

  React.useEffect(() => {
    handleFetchingBagianUjian();

  }, []);

  const handleShowDuplicates = () => {
    setIsFetching(true); // Start loading state

    setTimeout(() => {
      setData(duplicateData); // Set duplicate data after 3 seconds
      setIsFetching(false); // Stop loading state
    }, 3000);
  };

  const handleShowNotClassified = () => {
    setIsFetching(true); // Start loading state
    handleFetchingBagianUjianNotClassifiedMateri()

    setTimeout(() => {

      setIsFetching(false); // Stop loading state
    }, 3000);


  };

  const handleShowImage = () => {
    setIsFetching(true); // Start loading state
    handleFetchingBagianUjianGambar()
    setTimeout(() => {
      setIsFetching(false); // Stop loading state
    }, 3000);


  };




  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      <AlertDialog open={isOpenFormPeserta}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <TbDatabase className="h-4 w-4" />
              Import Bank Soal Ujian
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Import soal yang akan digunakan pada pelaksanaan ujian keahlian
              ini!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Data Soal <span>*</span>
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleFileChange}
                    />
                    <Link
                      target="_blank"
                      href={
                        "https://docs.google.com/spreadsheets/d/1KlEBRcgXLZK6NCL0r4nglKa6XazHgUH7fqvHlrIHmNI/edit?usp=sharing"
                      }
                      className="btn text-white bg-green-600 hover:bg-green-700 py-0 w-[250px] px-0 text-sm"
                    >
                      <PiMicrosoftExcelLogoFill />
                      Unduh Template
                    </Link>
                  </div>
                  <p className="text-gray-700 text-xs mt-1">
                    *Download terlebih dahulu template lalu isi file excel dan
                    upload
                  </p>
                </div>
              </div>

              <AlertDialogFooter className="mt-3 pt-3 border-t border-t-gray-300">
                <AlertDialogCancel
                  onClick={(e) => setIsOpenFormPeserta(!isOpenFormPeserta)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => handleUploadImportBankSoalPelatihan(e)}
                >
                  Upload
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>

      {showFormAjukanPelatihan ? (
        <></>
      ) : (
        <>
          {/* List Data Pelatihan */}
          <div className="flex flex-col gap-2">
            {/* <Select onValueChange={setSelectedPaket} value={selectedPaket}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={
                    selectedPaket != "" ? selectedPaket : "Pilih Paket"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {dataBagian?.PaketBagian.map(
                  (paket: PaketBagianDetail, index: number) => (
                    <SelectItem value={`${index}`} key={index}>
                      Paket {index + 1}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select> */}
            <>
              <div className="flex w-full items-center justify-between">
                <ul className="flex">

                  <li>
                    <button
                      onClick={() => handleFetchingBagianUjian()}
                      className={`focus:outline-none p-2 rounded-l-md border  flex flex-col items-center w-fit ${"bg-white text-black"}`}
                    >
                      <p className="font-semibold text-lg">{countReal}</p>
                      <p className={`uppercase text-sm ${"text-gray-600"}`}>
                        Total Soal
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleShowDuplicates()}
                      className={`focus:outline-none p-2  border  flex flex-col items-center w-fit ${"bg-white text-black"}`}
                    >
                      <p className="font-semibold text-lg">
                        {countSoalDuplikasi}
                      </p>
                      <p className={`uppercase text-sm ${"text-gray-600"}`}>
                        Soal Duplikat
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleShowImage()}
                      className={`focus:outline-none p-2 rounded-r-md border  flex flex-col items-center w-fit ${"bg-white text-black"}`}
                    >
                      <p className="font-semibold text-lg">
                        {countSoalBergambar}
                      </p>
                      <p className={`uppercase text-sm ${"text-gray-600"}`}>
                        Soal Gambar
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleShowNotClassified()}
                      className={`focus:outline-none p-2 rounded-r-md border  flex flex-col items-center w-fit ${"bg-white text-black"}`}
                    >
                      <p className="font-semibold text-lg">
                        {countNotClassified}
                      </p>
                      <p className={`uppercase text-sm ${"text-gray-600"}`}>
                        Belum Diklasifikasi Materi
                      </p>
                    </button>
                  </li>
                </ul>

                <ul className="flex">
                  {
                    dataKomposisiSoal ?
                      <AlertDialog>
                        <AlertDialogTrigger asChild><li>
                          <button
                            className={`focus:outline-none p-2 rounded-l-md border  flex flex-col items-center w-fit ${"bg-white text-black"}`}
                          >
                            <p className="font-semibold text-xl text-gray-600"><FaBookOpen className="h-6 w-6" /></p>
                            <p className={`uppercase text-sm ${"text-gray-600"}`}>
                              Komposisi Soal
                            </p>
                          </button>
                        </li></AlertDialogTrigger>
                        <AlertDialogContent className='max-w-3xl'>
                          <AlertDialogHeader>
                            <div className="flex flex-col gap-2">
                              <AlertDialogTitle className="flex items-center gap-2">
                                {" "}
                                <FaBookOpen className="h-4 w-4" />
                                Komposisi Materi Fungsi Bagian
                              </AlertDialogTitle>
                              <AlertDialogDescription className="-mt-2">
                                Daftarkan komposisi materi ujian keahlian awak kapal perikanan fungsi bagian!
                              </AlertDialogDescription>
                            </div>

                          </AlertDialogHeader>
                          <fieldset>
                            <form autoComplete="off">
                              <div className="overflow-x-auto !text-sm">
                                <table className="min-w-full border border-gray-300">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="border p-1">No</th>
                                      <th className="border p-1">Nama Materi</th>
                                      <th className="border p-1">Jumlah Soal</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dataKomposisiSoal!.map((item: any, index: number) => (
                                      <tr key={index} className="odd:bg-white even:bg-gray-50">
                                        <td className="border p-1 text-center">{index + 1}</td>
                                        <td className="border p-1">{item.name}</td>
                                        <td className="border p-1 capitalize">{item.count}</td>

                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              <AlertDialogFooter className="mt-3">
                                <AlertDialogCancel

                                >
                                  Close
                                </AlertDialogCancel>

                              </AlertDialogFooter>
                            </form>
                          </fieldset>
                        </AlertDialogContent>
                      </AlertDialog> : <></>
                  }


                </ul>
              </div>

              <div className="flex w-full items-center justify-between">
                <div className="flex gap-2 w-full">
                  <Input
                    placeholder="Cari Soal..."
                    value={
                      (table.getColumn("Soal")?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table.getColumn("Soal")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm text-sm"
                  />
                  {
                    dataKomposisiSoal ? <Select onValueChange={(value) => table.getColumn("Materi")?.setFilterValue(value)}>
                      <SelectTrigger className="w-[180px] py-[1.2rem]">
                        <SelectValue placeholder="Filter By Materi Ujian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Materi Ujian</SelectLabel>
                          <SelectItem value={"A"}>Semua Materi</SelectItem>
                          {
                            dataKomposisiSoal.map((item: any, index: number) => (
                              <SelectItem value={item.name} key={index}>{item.name}</SelectItem>
                            ))
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select> : <></>
                  }

                </div>

                <div className="w-full flex justify-end gap-2">

                  {/* <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
                        <FiTrash />
                        Hapus Bank Soal{" "}
                        {dataBagian != null ? dataBagian.NamaBagian : ""}
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Apakah kamu yakin menghapus soal ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Penghapusan data ini akan dilakukan secara permanen,
                          sehingga anda tidak dapat kembali melakukan undo
                          terkait tindakan ini!
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleDeleteBankSoal(dataBagian!.IdBagian)
                          }
                          className="bg-rose-600"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> */}
                </div>
              </div>
              {
                isFetching ? <div className="mt-32 w-full flex items-center justify-center">
                  <HashLoader color="#338CF5" size={50} />
                </div> : <TableData
                  isLoading={false}
                  columns={columns}
                  table={table}
                  type={"short"}
                />
              }

            </>
          </div>
        </>
      )
      }
    </div >
  );
};

export default TableDataBankSoalUjianKeahlian;
