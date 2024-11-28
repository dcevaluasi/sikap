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
import { TbBroadcast } from "react-icons/tb";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { elautBaseUrl } from "@/constants/urls";
import axios from "axios";
import Toast from "@/components/toast";
import Cookies from "js-cookie";
import { HiLockClosed } from "react-icons/hi2";
import { PelatihanMasyarakat } from "@/types/product";

interface CloseButtonProps {
  statusPelatihan: string;
  idPelatihan: string;
  pelatihan: PelatihanMasyarakat;
  handleFetchingData: any;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  statusPelatihan,
  idPelatihan,
  pelatihan,
  handleFetchingData,
}) => {
  const [openFormTutupPelatihan, setOpenFormTutupPelatihan] =
    React.useState(false);
  const [selectedStatus, setSelectedStatus] =
    React.useState<string>(statusPelatihan);

  const handleClosePelatihan = async (id: string, status: string) => {
    const formData = new FormData();
    formData.append("StatusApproval", selectedStatus);
    try {
      const response = await axios.put(
        `${elautBaseUrl}/lemdik/UpdatePelatihan?id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil mempublish informasi pelatihan masyarakat ke laman E-LAUT!`,
      });
      console.log("UPDATE PELATIHAN: ", response);
      handleFetchingData();
      setOpenFormTutupPelatihan(!openFormTutupPelatihan);
    } catch (error) {
      setOpenFormTutupPelatihan(!openFormTutupPelatihan);
      console.error("ERROR UPDATE PELATIHAN: ", error);
      Toast.fire({
        icon: "error",
        title: `Gagal mempublish informasi pelatihan masyarakat ke laman E-LAUT!`,
      });
      handleFetchingData();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <AlertDialog
        open={openFormTutupPelatihan}
        onOpenChange={setOpenFormTutupPelatihan}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pelatihan Telah Selesai?</AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Jika Pelatihan di Lembaga atau Balai Pelatihanmu telah selesai,
              ubah status kelas-mu menjadi selesai, untuk dapat melanjutkan ke
              proses penerbitan sertifikat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off" className="w-fit">
              {statusPelatihan != "Selesai" ? (
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                  <div>
                    <Checkbox
                      id="publish"
                      onCheckedChange={(e) => setSelectedStatus("Selesai")}
                    />
                  </div>
                  <div className="space-y-1 leading-none">
                    <label>Tutup Pelatihan</label>
                    <p className="text-xs leading-[110%] text-gray-600">
                      Dengan ini sebagai pihak lemdiklat saya menyatakan bahwa
                      pelatihan telah selesai dilaksanakan!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                  <RiVerifiedBadgeFill className="h-7 w-7 text-green-500 text-lg" />
                  <div className="space-y-1 leading-none">
                    <label>Pelatihan Selesai</label>
                    <p className="text-xs leading-[110%] text-gray-600">
                      Kelas pelatihanmu telah ditutup atau selesai, kamu dapat
                      melanjutkan ke proses penerbitan sertifikat!
                    </p>
                  </div>
                </div>
              )}
            </form>
          </fieldset>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) =>
                statusPelatihan != "Selesai"
                  ? handleClosePelatihan(idPelatihan, selectedStatus)
                  : null
              }
            >
              {statusPelatihan == "Selesai" ? "OK" : "Tutup"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {pelatihan.TanggalBerakhirPelatihan >= today &&
        pelatihan.StatusApproval != "Selesai" && (
          <Button
            title="Tutup Kelas Pelatihan"
            onClick={() => {
              setSelectedStatus(statusPelatihan);
              setOpenFormTutupPelatihan(!openFormTutupPelatihan);
            }}
            variant="outline"
            className="ml-auto hover:bg-primary bg-primary hover:text-neutral-100 text-neutral-100 duration-700"
          >
            <HiLockClosed className="h-5 w-5" />
          </Button>
        )}
    </>
  );
};

export default CloseButton;
