import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TbBroadcast, TbEditCircle } from "react-icons/tb";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { elautBaseUrl } from "@/constants/urls";
import axios from "axios";
import Toast from "@/components/toast";
import Cookies from "js-cookie";
import { LucideFileCheck2 } from "lucide-react";
import Link from "next/link";
import { FiUploadCloud } from "react-icons/fi";
import { PelatihanMasyarakat, UserPelatihan } from "@/types/product";
import Image from "next/image";
import { User } from "@/types/user";
import { MdClose, MdOutlineClose } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";

interface ValidasiPesertaButtonProps {
  idUser: string;
  peserta: UserPelatihan;
  handleFetchingData: any;
}

const ValidasiPesertaButton: React.FC<ValidasiPesertaButtonProps> = ({
  idUser,
  peserta,
  handleFetchingData,
}) => {
  const [openFormSertifikat, setOpenFormSertifikat] =
    React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string>("");
  const [catatan, setCatatan] = React.useState<string>("");

  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  const handleValidDataPesertaPelatihan = async () => {
    const formData = new FormData();
    formData.append("Keterangan", status);
    formData.append("StatusPembayaran", catatan);
    try {
      const response = await axios.put(
        `${elautBaseUrl}/lemdik/updatePelatihanUsers?id=${idUser}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil memvalidasi data pesereta pelatihan!`,
      });
      console.log("VALIDASI PESERTA PELATIHAN: ", response);
      handleFetchingData();
      setOpenFormSertifikat(!openFormSertifikat);
      setCatatan("");
    } catch (error) {
      console.error("ERROR UPDATE PELATIHAN: ", error);
      Toast.fire({
        icon: "success",
        title: `Gagal menyisipkan no sertifikat ke akun pesereta pelatihan!`,
      });
      handleFetchingData();
      setCatatan("");
    }
  };

  return (
    <>
      <AlertDialog
        open={openFormSertifikat}
        onOpenChange={setOpenFormSertifikat}
      >
        <AlertDialogContent>
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Validasi Data Peserta</AlertDialogTitle>
              <AlertDialogDescription className="-mt-2">
                Proses validasi diperlukan untuk melihat kelengkapan atau
                persyaratan pendaftar sudah terpenuhi atau belum untuk dapat
                mengikuti rangkaian pelatihan
              </AlertDialogDescription>
            </AlertDialogHeader>
            <fieldset>
              <div className="flex flex-wrap  mb-1 w-full">
                <div className="w-full">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="noSertifikat"
                  >
                    Status Pendaftaran <span className="text-red-600">*</span>
                  </label>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full overflow-hidden rounded-lg border border-gray-300"
                  >
                    <option value={""}>Pilih Status</option>
                    <option onClick={(e) => setStatus("Valid")} value={"Valid"}>
                      Valid
                    </option>
                    <option
                      onClick={(e) => setStatus("Tidak Valid")}
                      value={"Tidak Valid"}
                    >
                      Tidak Valid
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label
                  className="block text-gray-800 text-sm font-medium"
                  htmlFor="name"
                >
                  Catatan <span className="text-red-600">*</span>
                </label>

                <Textarea
                  onChange={(e) => setCatatan(e.target.value)}
                  value={catatan}
                  placeholder="Masukkan catatan"
                />
              </div>
            </fieldset>

            <p className="text-gray-700 text-xs mt-1">
              *Catatan perlu diberikan untuk memberitahu kepada calon peserta
              terkait kesalahan pada kelengkapan data maupun dokumen
            </p>
          </>
          <AlertDialogFooter>
            {!isUploading && (
              <AlertDialogCancel
                onClick={(e) => setOpenFormSertifikat(!openFormSertifikat)}
              >
                Cancel
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              onClick={(e) => handleValidDataPesertaPelatihan()}
              disabled={isUploading}
              className={`${isUploading && "px-6"}`}
            >
              {isUploading ? <span>Validating...</span> : <span>Validasi</span>}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {peserta.Keterangan == "Valid" ? (
              <Button
                variant="outline"
                className="ml-auto border  border-blue-600 rounded-full hover:bg-blue-600 duration-700 hover:text-white text-blue-600"
              >
                <RiVerifiedBadgeFill className="h-4 w-4 " /> Valid
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="ml-auto border border-rose-600 rounded-full hover:bg-rose-600 duration-700 hover:text-white text-rose-600"
                >
                  <MdOutlineClose className="h-4 w-4 " />
                  Tidak Valid
                </Button>
                <Button
                  onClick={(e) => {
                    setOpenFormSertifikat(true);
                  }}
                  variant="outline"
                  className="ml-auto border border-gray-600 rounded-full hover:bg-gray-600 duration-700 hover:text-white text-gray-600"
                >
                  <TbEditCircle className="h-4 w-4 " />
                  Validasi
                </Button>
              </>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>Validasi Data Peserta</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ValidasiPesertaButton;
