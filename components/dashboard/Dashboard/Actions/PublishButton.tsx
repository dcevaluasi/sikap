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

interface PublishButtonProps {
  statusPelatihan: string;
  idPelatihan: string;
  handleFetchingData: any;
}

const PublishButton: React.FC<PublishButtonProps> = ({
  statusPelatihan,
  idPelatihan,
  handleFetchingData,
}) => {
  const [isOpenFormPublishedPelatihan, setIsOpenFormPublishedPelatihan] =
    React.useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] =
    React.useState<string>(statusPelatihan);

  const handlePublish = async (id: string, status: string) => {
    const formData = new FormData();
    formData.append("Status", status);
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
      setIsOpenFormPublishedPelatihan(!isOpenFormPublishedPelatihan);
    } catch (error) {
      setIsOpenFormPublishedPelatihan(!isOpenFormPublishedPelatihan);
      console.error("ERROR UPDATE PELATIHAN: ", error);
      Toast.fire({
        icon: "error",
        title: `Gagal mempublish informasi pelatihan masyarakat ke laman E-LAUT!`,
      });
      handleFetchingData();
    }
  };

  return (
    <>
      <AlertDialog
        open={isOpenFormPublishedPelatihan}
        onOpenChange={setIsOpenFormPublishedPelatihan}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publikasi ke Web E-LAUT</AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Agar pelatihan di balai/lemdiklat-mu dapat dilihat oleh masyarakat
              umum lakukan checklist agar tampil di website E-LAUT!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              {statusPelatihan == "Belum Publish" ? (
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                  <div>
                    <Checkbox
                      id="publish"
                      onCheckedChange={(e) => setSelectedStatus("Publish")}
                    />
                  </div>
                  <div className="space-y-1 leading-none">
                    <label>Publish Website E-LAUT</label>
                    <p className="text-xs leading-[110%] text-gray-600">
                      Dengan ini sebagai pihak lemdiklat saya mempublish
                      informasi pelatihan terbuka untuk masyarakat umum!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                  <RiVerifiedBadgeFill className="h-7 w-7 text-green-500 text-lg" />
                  <div className="space-y-1 leading-none">
                    <label>Published Website E-LAUT</label>
                    <p className="text-xs leading-[110%] text-gray-600">
                      Informasi Kelas Pelatihanmu telah dipublikasikan melalui
                      laman Website E-LAUT balai mu!
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
                statusPelatihan == "Belum Publish"
                  ? handlePublish(idPelatihan, selectedStatus)
                  : handlePublish(idPelatihan, "Belum Publish")
              }
            >
              {statusPelatihan == "Publish" ? "Unpublish" : "Publish"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                setSelectedStatus(statusPelatihan);
                setIsOpenFormPublishedPelatihan(!isOpenFormPublishedPelatihan);
              }}
              variant="outline"
              className="ml-auto border rounded-full border-purple-600 hover:bg-purple-600 hover:text-white text-purple-600 duration-700"
            >
              <TbBroadcast className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Publish</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default PublishButton;
