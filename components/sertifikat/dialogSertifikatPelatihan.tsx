import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement } from "react";
import { MdVerified } from "react-icons/md";
import SertifikatPage1 from "./sertifikatPage1";
import SertifikatPage2 from "./sertifikatPage2";
import { Button } from "../ui/button";
import { TbCloudDownload, TbLink } from "react-icons/tb";
import { PelatihanMasyarakat, UserPelatihan } from "@/types/product";

export function DialogSertifikatPelatihan({
  children,
  userPelatihan,
}: {
  children: ReactElement;
  userPelatihan: UserPelatihan;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[1225px]">
        <DialogHeader>
          <div className="flex gap-2 items-center">
            <MdVerified className="text-3xl text-blue-500" />
            <div className="flex flex-col">
              <DialogTitle>B.{userPelatihan?.NoSertifikat}</DialogTitle>
              <DialogDescription>
                No. Sertifikasi terdaftar dan dinyatakan valid telah mengikuti
                pelatihan!
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="max-h-[500px] flex flex-col gap-2 overflow-y-auto scroll-smooth">
          <SertifikatPage1 userPelatihan={userPelatihan} />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-500"
          >
            <TbLink />
            Salin Tautan
          </Button>
          <Button type="submit" className="flex items-center gap-1">
            <TbCloudDownload />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
