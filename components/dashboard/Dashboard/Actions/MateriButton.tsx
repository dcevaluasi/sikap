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
import { FaBookOpen } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { elautBaseUrl } from "@/constants/urls";
import Cookies from "js-cookie";
import Toast from "@/components/toast";
import Link from "next/link";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { urlTemplateMateriPelatihan } from "@/constants/templates";

interface MateriButtonProps {
  idPelatihan: string;
  handleFetchingData: any;
}

const MateriButton: React.FC<MateriButtonProps> = ({
  idPelatihan,
  handleFetchingData,
}) => {
  const [isOpenFormMateri, setIsOpenFormMateri] =
    React.useState<boolean>(false);
  const [materiPelatihan, setMateriPelatihan] = React.useState<File | null>(
    null
  );
  const handleFileMateriChange = (e: any) => {
    setMateriPelatihan(e.target.files[0]);
  };

  const handleUploadMateriPelatihan = async (id: string) => {
    const data = new FormData();
    data.append("IdPelatihan", id);
    if (materiPelatihan != null) {
      data.append("file", materiPelatihan);
    }

    try {
      const response = await axios.post(
        `${elautBaseUrl}/lemdik/exportModulePelatihan`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil menambahkan materi pelatihan!`,
      });
      handleFetchingData();
      console.log("MATERI PELATIHAN: ", response);
      setIsOpenFormMateri(!isOpenFormMateri);
    } catch (error) {
      console.error("ERROR GENERATE SERTIFIKAT: ", error);
      Toast.fire({
        icon: "success",
        title: `Gagal menambahkan materi pelatihan!`,
      });
      handleFetchingData();
      setIsOpenFormMateri(!isOpenFormMateri);
    }
  };

  return (
    <>
      <AlertDialog open={isOpenFormMateri}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <FaBookOpen className="h-4 w-4" />
              Tambah Materi Pelatihan
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Daftarkan materi pelatihan yang diselenggarakan yang nantinya akan
              tercantum pada sertifikat peserta pelatihan!
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
                    Upload File Excel Materi{" "}
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleFileMateriChange}
                    />
                    <Link
                      target="_blank"
                      href={urlTemplateMateriPelatihan}
                      className="btn text-white bg-green-600 hover:bg-green-700 py-0 w-[250px] px-0 text-sm"
                    >
                      <PiMicrosoftExcelLogoFill />
                      Unduh Template
                    </Link>
                  </div>
                  <p className="text-gray-700 text-xs mt-1">
                    *Download template, input data sesuai format template lalu
                    upload
                  </p>
                </div>
              </div>

              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel
                  onClick={(e) => setIsOpenFormMateri(!isOpenFormMateri)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => handleUploadMateriPelatihan(idPelatihan)}
                >
                  Upload
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant="outline"
        onClick={(e) => {
          setIsOpenFormMateri(!isOpenFormMateri);
        }}
        className="ml-auto border rounded-full border-[#000000] hover:bg-[#000] hover:text-white duration-700"
      >
        <FaBookOpen className="h-4 w-4" />
      </Button>
    </>
  );
};

export default MateriButton;
