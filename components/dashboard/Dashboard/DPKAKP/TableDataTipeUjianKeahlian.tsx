import React, { ReactElement, useState } from "react";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ArrowUpDown,
  Edit3Icon,
  Fullscreen,
  LucideClipboardEdit,
  LucideNewspaper,
  LucidePrinter,
  LucideUploadCloud,
  Trash,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";

import {
  IoIosBook,
  IoIosInformationCircle,
  IoMdBook,
  IoMdGlobe,
} from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";
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
import { useRouter } from "next/navigation";
import Toast from "@/components/toast";
import axios, { AxiosResponse } from "axios";
import { FaBookOpen, FaRupiahSign } from "react-icons/fa6";
import Cookies from "js-cookie";
import Link from "next/link";
import TableData from "../../Tables/TableData";
import { PiBookOpen } from "react-icons/pi";
import { dpkakpBaseUrl } from "@/constants/urls";
import { replaceProgramName } from "@/utils/dpkakp";

const TableDataTipeUjianKeahlian: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);

  const [data, setData] = React.useState<TypeUjian[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleFetchingTypeUjian = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminPusat/getTypeUjian`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      setData(response.data.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error posting tipe ujian:", error);
      setIsFetching(false);
      throw error;
    }
  };

  const [namaMateri, setNamaMateri] = React.useState<string>("");
  const [jamTeori, setJamTeori] = React.useState<string>("");
  const [jamPraktek, setJamPraktek] = React.useState<string>("");

  const [isOpenFormMateri, setIsOpenFormMateri] =
    React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<number>(0);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [sertifikatUntukPelatihan, setSertifikatUntukPelatihan] =
    React.useState("");
  const [ttdSertifikat, setTtdSertifikat] = React.useState("");
  const [openFormSertifikat, setOpenFormSertifikat] = React.useState(false);

  const [isOpenFormPublishedPelatihan, setIsOpenFormPublishedPelatihan] =
    React.useState<boolean>(false);

  const router = useRouter();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<TypeUjian>[] = [
    {
      accessorKey: "IdTypeUjian",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold w-full`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "NamaTypeUjian",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 text-left mx-0 px-0 font-semibold w-fit`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ujian Keahlian
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col gap-2 w-fit">
          <div
            className={`text-center uppercase w-fit font-semibold text-base`}
          >
            {row.original.NamaTypeUjian}
          </div>
          <div className={`text-left capitalize flex-wrap w-full -mt-2`}>
            <div
              className={`text-left w-full capitalize font-semibold text-xs`}
            >
              Fungsi Ujian :
            </div>
            <div className="w-full flex flex-col">
              {row.original.Fungsi.map((fungsi, index) => (
                <p className="text-xs font-normal" key={index}>
                  {index + 1}. {fungsi.NamaFungsi}{" "}
                  <div className="flex flex-row gap-1">
                    <span className="flex flex-row gap-1">
                      {fungsi.Bagian.map((bagian, index) => (
                        <Link
                          href={`/lembaga/dpkakp/admin/dashboard/bank-soal/${row.original.IdTypeUjian}/${bagian.IdBagian}`}
                          className="flex gap-2 px-3 my-2 text-xs items-center rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 duration-700 p-1.5  cursor-pointer w-fit"
                          key={index}
                        >
                          <PiBookOpen />
                          {bagian.NamaBagian}
                        </Link>
                      ))}
                    </span>
                    {fungsi.Bagian.length < 3 && (
                      <span className="flex flex-row gap-1 my-2">
                        <div
                          onClick={(e) => {
                            setIsOpenFormMateri(!isOpenFormMateri);
                            setIdFungsiSelected(fungsi.IdFungsi.toString());
                          }}
                          className="flex gap-2 px-3 text-xs items-center rounded-md border border-gray-600 hover:bg-gray-600 hover:text-white text-gray-600 duration-700 p-1.5  cursor-pointer w-fit"
                        >
                          <FiUploadCloud />
                          Tambah Bagian Fungsi
                        </div>
                      </span>
                    )}
                  </div>
                </p>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "CreateAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold w-full`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>{row.original.CreateAt}</div>
      ),
    },
    {
      accessorKey: "UpdateAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold w-full`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated At
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>{row.original.UpdateAt}</div>
      ),
    },
  ];

  const [namaBagian, setNamaBagian] = React.useState<string>("");
  const [idFungsiSelected, setIdFungsiSelected] = React.useState<string>("");
  const handlePostNewBagianUjianKeahlian = async (e: any) => {
    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/adminPusat/createBagian`,
        {
          idFungsi: idFungsiSelected,
          namaBagian: namaBagian,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      Toast.fire({
        icon: "success",
        title: `Berhasil menambahkan data bagian ujian keahlian baru!`,
      });
      handleFetchingTypeUjian();
      setIsOpenFormMateri(!isOpenFormMateri);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal menambahkan data bagian ujian keahlian baru!`,
      });
      handleFetchingTypeUjian();
      setIsOpenFormMateri(!isOpenFormMateri);
    }
  };

  React.useEffect(() => {
    handleFetchingTypeUjian();
  }, []);

  return (
    <div className="">
      <AlertDialog open={isOpenFormMateri}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <FaBookOpen className="h-4 w-4" />
              Tambah Bagian Fungsi Ujian Keahlian
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Sebelum melakukan storing bank soal per bagian dan per fungsi
              ujian keahlian awak kapal perikanan, tambahkan terlebih dahulu
              bagian dari fungsi tersebut!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex flex-wrap mb-1 w-full">
                <div className="w-full">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Nama Bagian <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="name"
                    className="form-input w-full text-black text-sm border-gray-300 rounded-md"
                    placeholder="Tipe Blanko"
                    required
                    value={namaBagian}
                    onChange={(e) => setNamaBagian(e.target.value)}
                  >
                    <option value="0">Pilih Tipe Ujian</option>
                    <option value="Bagian 1">Bagian 1</option>
                    <option value="Bagian 2">Bagian 2</option>
                    <option value="Bagian 3">Bagian 3</option>
                  </select>
                </div>
              </div>

              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel
                  onClick={(e) => setIsOpenFormMateri(!isOpenFormMateri)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => handlePostNewBagianUjianKeahlian(e)}
                >
                  Upload
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>

      <main className="flex-grow flex min-h-0 border-t  h-full overflow-y-scroll overflow-x-scroll">
        {/* section update to tickets */}
        <section className="flex flex-col p-4 w-full max-w-sm flex-none bg-gray-100 min-h-0 overflow-auto">
          <h1 className="font-semibold leading-[120%] -mb-3">
            Jenis Program <br /> Keahlian Awak Kapal Perikanan
          </h1>
          <ul className="w-full flex flex-col gap-2">
            {data.map((bankSoal, index) => (
              <li key={index}>
                <article
                  tabIndex={0}
                  className="cursor-pointer border rounded-md p-3 bg-white flex text-gray-700 mb-2 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                >
                  <span className="flex-none pt-1 pr-2">
                    <img
                      className="h-8 w-8 rounded-md"
                      src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/avatar.png"
                    />
                  </span>
                  <div className="flex-1">
                    <header className="mb-1">
                      <span className="font-semibold text-sm">
                        {bankSoal.NamaTypeUjian}
                      </span>
                      <br />
                      <span className="text-xs leading-none block">
                        {replaceProgramName(bankSoal.NamaTypeUjian!)}{" "}
                      </span>
                    </header>

                    {/* <div className="w-full flex flex-col  border-b border-b-gray-300">
                  {bankSoal.Fungsi.map((fungsi, index) => (
                    <p className="text-xs font-normal" key={index}>
                      {index + 1}. {fungsi.NamaFungsi}{" "}
                      <div className="flex flex-row gap-1">
                        <span className="flex flex-row gap-1">
                          {fungsi.Bagian.map((bagian, index) => (
                            <Link
                              href={`/lembaga/dpkakp/admin/dashboard/bank-soal/${bankSoal.IdTypeUjian}/${bagian.IdBagian}`}
                              className="flex gap-2 px-3 my-2 text-xs items-center rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 duration-700 p-1.5  cursor-pointer w-fit"
                              key={index}
                            >
                              <PiBookOpen />
                              {bagian.NamaBagian}
                            </Link>
                          ))}
                        </span>
                        {fungsi.Bagian.length < 3 && (
                          <span className="flex flex-row gap-1 my-2">
                            <div
                              onClick={(e) => {
                                setIsOpenFormMateri(!isOpenFormMateri);
                                setIdFungsiSelected(fungsi.IdFungsi.toString());
                              }}
                              className="flex gap-2 px-3 text-xs items-center rounded-md border border-gray-600 hover:bg-gray-600 hover:text-white text-gray-600 duration-700 p-1.5  cursor-pointer w-fit"
                            >
                              <FiUploadCloud />
                              Tambah Bagian Fungsi
                            </div>
                          </span>
                        )}
                      </div>
                    </p>
                  ))}
                </div>

                <Link
                  href={``}
                  className="flex gap-2 px-3 my-2 text-xs items-center rounded-md border border-green-400 hover:bg-green-400 hover:text-white text-green-400 duration-700 p-1.5  cursor-pointer w-full text-center justify-center"
                  key={index}
                >
                  <LucideUploadCloud className="text-xs" />
                  Import Bank Soal
                </Link> */}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* section content */}
        <section
          aria-label="main content"
          className="flex min-h-0 flex-col flex-auto border-l"
        >
          {/* content navigation */}
          <nav className="bg-gray-100 flex p-4">
            {/* open tickets nav */}
            <section
              aria-labelledby="open-tickets-tabs-label"
              className="mr-4 focus:outline-none"
            >
              <label
                id="open-tickets-tabs-label"
                className="font-semibold block mb-1 text-sm"
              >
                Ujian Berlangsung
                <span className="font-normal text-gray-700">(current)</span>
              </label>
              <ul className="flex">
                <li>
                  <button className="focus:outline-none focus:bg-yellow-200 p-2 rounded-l-md border border-r-0 bg-white flex flex-col items-center w-24">
                    <p className="font-semibold text-lg">6</p>
                    <p className="text-sm uppercase text-gray-600">You</p>
                  </button>
                </li>
                <li>
                  <button className="focus:outline-none focus:bg-yellow-200 p-2 border rounded-r-md bg-white flex flex-col items-center w-24 cursor-pointer">
                    <p className="font-semibold text-lg">23</p>
                    <p className="text-sm uppercase text-gray-600">Groups</p>
                  </button>
                </li>
              </ul>
            </section>
            {/* stats nav */}
            <section
              aria-labelledby="ticket-statistics-tabs-label"
              className="pb-2"
            >
              <label
                id="ticket-statistics-tabs-label"
                className="font-semibold block mb-1 text-sm"
              >
                Statistik Ujian
                <span className="font-normal text-gray-700">(this week)</span>
              </label>
              <ul className="flex">
                <li>
                  <button className="focus:outline-none focus:bg-yellow-200 p-2 rounded-l-md border border-r-0 bg-white flex flex-col items-center w-24">
                    <p className="font-semibold text-lg">16</p>
                    <p className="uppercase text-gray-600 text-sm">good</p>
                  </button>
                </li>
                <li>
                  <button className="focus:outline-none focus:bg-yellow-200 p-2 border border-r-0 bg-white flex flex-col items-center w-24">
                    <p className="font-semibold text-lg">2</p>
                    <p className="uppercase text-gray-600 text-sm">bad</p>
                  </button>
                </li>
                <li>
                  <button className="focus:outline-none focus:bg-yellow-200 p-2 border rounded-r-md bg-white flex flex-col items-center w-24">
                    <p className="font-semibold text-lg">32</p>
                    <p className="uppercase text-gray-600 text-sm">solved</p>
                  </button>
                </li>
              </ul>
            </section>
          </nav>
          {/* content caption */}
          <header className="bg-white border-t flex items-center py-1 px-4">
            <div className="flex">
              <h2 id="content-caption" className="font-semibold">
                Tickets requiring your attention (6)
              </h2>
              <span className="ml-3 group relative">
                <button
                  role="details"
                  aria-controls="info-popup"
                  className="text-blue-700 border-b border-dotted border-blue-700 focus:outline-none text-sm"
                >
                  What is this?
                </button>
                <div
                  role="tooltip"
                  id="info-popup"
                  className="absolute pt-1 rounded-md rounded-t-lg right-0 transform translate-x-40 mx-auto hidden group-hover:block z-50"
                >
                  <div className="border rounded-md rounded-t-lg shadow-lg bg-white w-full max-w-xs w-screen">
                    <header className="font-semibold rounded-t-lg bg-gray-300 px-4 py-2">
                      People are waiting for replies!
                    </header>
                    <div className="p-4 border-t">
                      <p className="mb-4">
                        These are new or open tickets that are assigned to you,
                        unassinged in your group(s) or not assigned to any
                        group.
                      </p>
                      <p className="mb-1">
                        They are ordered by priority and requester update date
                        (oldest first).
                      </p>
                    </div>
                  </div>
                </div>
              </span>
            </div>
            <div className="ml-auto">
              <button
                title="See available tickets in this view"
                aria-label="play"
                className="border rounded-md px-3 py-2 leading-none"
              >
                Play
              </button>
            </div>
          </header>
          {/* content overflow section 
          remove table and thead but keep tbody and change tbody to section, in order
          to have scrollable overflow section */}
          <div className="px-4 mt-2">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {/* <TipeUjianKeahlian /> */}
                  </CardContent>
                  <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* content footer, currently hidden */}
          <footer
            aria-label="content footer"
            className="flex p-3 bg-white border-t hidden"
          >
            footer
          </footer>
        </section>
      </main>
    </div>
  );
};

export default TableDataTipeUjianKeahlian;
