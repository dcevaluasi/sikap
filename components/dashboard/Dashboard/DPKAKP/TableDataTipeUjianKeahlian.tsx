import React, { ReactElement, useState } from "react";

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
import { PiBookOpen, PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { dpkakpBaseUrl } from "@/constants/urls";
import { replaceProgramName } from "@/utils/dpkakp";
import { TbDatabase } from "react-icons/tb";
import { TypeUjian } from "@/types/ujian-keahlian-akp";

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

  const [isOpenFormMateri, setIsOpenFormMateri] =
    React.useState<boolean>(false);

  const [selectedIdTypeUjian, setSelectedIdTypeUjian] =
    React.useState<string>("");

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

  const [isOpenFormPeserta, setIsOpenFormPeserta] =
    React.useState<boolean>(false);
  const [fileExcelBankSoalPelatihan, setFileExcelBankPelatihan] =
    React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setFileExcelBankPelatihan(e.target.files[0]);
  };
  const handleUploadBankSoal = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("IdTypeUjian", selectedIdTypeUjian);
    if (fileExcelBankSoalPelatihan != null) {
      formData.append("file", fileExcelBankSoalPelatihan);
    }

    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/importUjian`,
        formData
      );
      console.log("FILE UPLOADED BANK SOAL : ", response);
      Toast.fire({
        icon: "success",
        title: `Selamat anda berhasil mengupload bank soal ujian keahlian!`,
      });
      setIsOpenFormPeserta(false);
      handleFetchingTypeUjian();
    } catch (error) {
      console.log("FILE IMPORT BANK SOAL PELATIHAN : ", error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupload bank soal ujian keahlian!`,
      });
      setIsOpenFormPeserta(false);
      handleFetchingTypeUjian();
    }
  };

  const [selectedNoPaket, setSelectedNoPaket] = React.useState<string>("");

  return (
    <div className="">
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
                <AlertDialogAction onClick={(e) => handleUploadBankSoal(e)}>
                  Upload
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>

      <main className="flex-grow flex min-h-0 border-t -mt-6">
        {/* section update to tickets */}
        <section className="flex flex-col p-4 w-full flex-none bg-gray-100 h-full">
          <ul className="w-full grid grid-cols-2 gap-2">
            {data.map((bankSoal, index) => (
              <li key={index}>
                <article
                  tabIndex={0}
                  className="cursor-pointer border rounded-md py-5 px-8 bg-white flex text-gray-700 mb-2 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                >
                  {/* <span className="flex-none pt-1 pr-2">
                    <img
                      className="h-8 w-8 rounded-md"
                      src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/avatar.png"
                    />
                  </span> */}
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
                      <span className="flex flex-row gap-1">
                        {[1, 2, 3, 4, 5].map((bagian, index) => (
                          <div
                            onClick={() => {
                              setSelectedIdTypeUjian(
                                bankSoal.IdTypeUjian.toString()
                              );
                              setSelectedNoPaket(bagian.toString());
                            }}
                            className={`flex gap-2 px-3 my-2 text-xs items-center rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 duration-700 p-1.5  cursor-pointer w-fit`}
                            key={index}
                          >
                            <PiBookOpen />
                            Paket {bagian}
                          </div>
                        ))}
                      </span>
                    </div> */}

                    <div className="w-full flex flex-col  border-b border-b-gray-300 mt-2">
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
                          </div>
                        </p>
                      ))}
                    </div>

                    <div
                      onClick={() => {
                        setIsOpenFormPeserta(true);
                        setSelectedIdTypeUjian(bankSoal.IdTypeUjian.toString());
                      }}
                      className="flex gap-2 px-3 my-2 text-xs items-center rounded-md border border-green-400 hover:bg-green-400 hover:text-white text-green-400 duration-700 p-1.5  cursor-pointer w-full text-center justify-center"
                      key={index}
                    >
                      <LucideUploadCloud className="text-xs w-4" />
                      Import Bank Soal
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default TableDataTipeUjianKeahlian;
