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
import { Button } from "../ui/button";
import { TbCloudDownload, TbLink } from "react-icons/tb";
import { Pelatihan, PelatihanMasyarakat, UserPelatihan } from "@/types/product";
import { getCurrentDate } from "@/utils/sertifikat";
import Image from "next/image";

export function DialogTemplateSertifikatPelatihan({
  children,
  pelatihan,
}: {
  children: ReactElement;
  pelatihan: PelatihanMasyarakat;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[1225px]">
        <DialogHeader>
          <div className="flex gap-2 items-center">
            <MdVerified className="text-3xl text-blue-500" />
            <div className="flex flex-col">
              <DialogTitle>B.{pelatihan?.NoSertifikat}</DialogTitle>
              <DialogDescription>
                Template/Blanko Sertifikat Pelatihan {pelatihan?.NamaPelatihan}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="max-h-[500px] flex flex-col gap-2 overflow-y-auto scroll-smooth">
          <SertifikatPage1 pelatihan={pelatihan} />
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

function SertifikatPage1({ pelatihan }: { pelatihan: PelatihanMasyarakat }) {
  const totalJamTeory = pelatihan?.MateriPelatihan?.reduce((total, materi) => {
    return total + parseInt(materi.JamTeory);
  }, 0);

  const totalJamPraktek = pelatihan?.MateriPelatihan?.reduce(
    (total, materi) => {
      return total + parseInt(materi.JamPraktek);
    },
    0
  );
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full border flex flex-col gap-4 border-gray-300 px-10 py-6 rounded-md font-cambria leading-[120%] h-[100vh]">
        <div className="flex flex-row justify-end items-start">
          <p className="text-base">No. Reg. : XXXXXXXXX</p>
        </div>

        <div className="flex flex-col gap-0 w-full items-center justify-center mt-6">
          <h1 className="font-black text-3xl">SERTIFIKAT</h1>
          <p className="text-base mt-1 italic">CERTIFICATE</p>

          <p className="text-xl mt-1 font-black">
            Nomor : B.{pelatihan?.NoSertifikat}
          </p>
        </div>

        <div className="flex w-full flex-col items-start -mt-2 text-center font-cambria">
          <p>
            Badan Penyuluhan dan Pengembangan Sumber Daya Manusia Kelautan dan
            Perikanan berdasarkan Peraturan Pemerintah Nomor.62 Tahun 2014
            tentang Penyelenggaraan Pendidikan, Pelatihan dan Penyuluhan
            Perikanan, serta ketentuan pelaksanaannya menyatakan bahwa :
          </p>
          <p className="text-xs italic font-cambria">
            The Agency for Marine and Fisheries Extension and Human Resources
            Development based on Government Regulation Number 62 of 2014
            concerning the Implementation of Fisheries Education, Training and
            Extension as well as its implementing provisions States that :
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full items-center text-center justify-center mt-3">
          <div className="w-fit border-b-black border-b pb-3">
            <h1 className="font-black text-3xl">XXXXXXXXXXX</h1>
          </div>
          <div className="text-center">
            <p>Lahir di XXXXXXXXXXX </p>
            <p className="text-xs italic">Born in Bekasi, 01 October 2001</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full items-center justify-center mt-3">
          <h1 className="font-black text-3xl">TELAH LULUS</h1>
          <h3 className="font-black text-xl italic">HAS PASSED</h3>
        </div>

        <div className="flex w-full flex-col items-start mt-2 text-center">
          <p>
            Dalam {pelatihan?.NamaPelatihan} yang diselenggarakan atas kerjasama
            Pusat Pelatihan Kelautan dan Perikanan – Badan Penyuluhan dan
            Pengembangan Sumber Daya Manusia Kelautan dan Perikanan pada tanggal
            19 - 21 Februari 2024.
          </p>
          <p className="text-xs italic">
            In the Training on Good Aquaculture Practices held in collaboration
            between the Marine and Fisheries Training Center – the Agency for
            Marine and Fisheries Extension and Human Resources Development on 19
            - 21 February 2024.
          </p>
        </div>

        <div className="flex gap-2 items-center justify-center mt-5">
          <div className="flex flex-col font-cambria text-center items-center justify-center">
            <div className="flex w-full flex-col items-cennter mt-2 text-center">
              <p>Jakarta, {getCurrentDate()}</p>
              <p>
                {pelatihan?.TtdSertifikat === "Kepala BPPSDM"
                  ? "Kepala Badan Penyuluhan dan Pengembangan Sumber Daya Manusia Kelautan dan Perikanan"
                  : "Kepala Balai Pelatihan dan Penyuluhan"}
              </p>
              <p className="text-xs italic">
                Chairman of the Agency for Marine and Fisheries Extension and
                Human Resources Development
              </p>
            </div>
            <Image
              className="w-[200px] my-3"
              width={0}
              height={0}
              alt="Logo Kementrian Kelautan dan Perikanan RI"
              src={"/ttd-elektronik.png"}
            />
            <p className="-mt-1 font-extrabold text-xl">
              Dr. I Nyoman Radiarta, S.Pi, M.Sc
            </p>
          </div>
        </div>
      </div>

      <div className="w-full border flex flex-col gap-4 border-gray-300 px-10 py-10 rounded-md font-cambria leading-[120%] !h-[120vh]">
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-col font-cambria text-center">
              <p className="font-extrabold max-w-md w-full italic">
                {pelatihan?.NamaPelatihan}
              </p>
              <p className="font-extrabold max-w-3xl">19 – 21 February 2024</p>
            </div>
          </div>
        </div>

        <table
          border={1}
          className="text-center border border-black-2 p-2 rounded-md"
        >
          <tr>
            <td
              rowSpan={2}
              className="border border-black-2 p-2 font-extrabold text-lg"
            >
              NO.
            </td>
            <td
              rowSpan={2}
              className="border border-black-2 p-2 font-extrabold text-lg"
            >
              COURSES
            </td>
            <td
              colSpan={3}
              className="border border-black-2 p-2 font-extrabold text-lg"
            >
              JAM PELATIHAN
            </td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2 font-extrabold text-lg">
              T
            </td>
            <td className="border border-black-2 p-2 font-extrabold text-lg">
              P
            </td>
          </tr>
          {pelatihan?.MateriPelatihan?.map((materi, index) => (
            <tr key={index}>
              <td className="border border-black-2 p-2">{index + 1}.</td>
              <td className="border border-black-2 p-2 text-left">
                {materi.NamaMateri}
              </td>
              <td className="border border-black-2 p-2">{materi.JamTeory}</td>
              <td className="border border-black-2 p-2">{materi.JamPraktek}</td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={2}
              className="font-extrabold text-lg border border-black-2 p-2"
            >
              JUMLAH TOTAL
            </td>
            <td className="border border-black-2 p-2 font-extrabold">
              {totalJamTeory}
            </td>
            <td className="border border-black-2 p-2 font-extrabold">
              {totalJamPraktek}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
