import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { ReactElement, useRef } from "react";
import { MdVerified } from "react-icons/md";
import { Button } from "../ui/button";
import { TbCloudDownload } from "react-icons/tb";
import { PelatihanMasyarakat, UserPelatihan } from "@/types/product";
import { getCurrentDate } from "@/utils/sertifikat";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { elautBaseUrl } from "@/constants/urls";
import Cookies from "js-cookie";
import Image from "next/image";

export function DialogSertifikatPelatihan({
  children,
  userPelatihan,
  pelatihan,
}: {
  children: ReactElement;
  userPelatihan: UserPelatihan;
  pelatihan: PelatihanMasyarakat;
}) {
  const componentRef = useRef(null);
  const [show, setShow] = React.useState<boolean>(false);

  const handleDownloadPDF = () => {
    setShow(true); // Set show to true to render the element
  };

  React.useEffect(() => {
    if (show && componentRef.current) {
      const element = componentRef.current;

      const opt = {
        margin: 0,
        filename: `${userPelatihan?.Nama}_${userPelatihan?.NoRegistrasi}_${userPelatihan?.NoSertifikat}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
      };

      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(async (pdfFile: any) => {
          const formData = new FormData();
          formData.append(
            "fileSertifikat",
            pdfFile, // This is already the PDF file
            `${userPelatihan?.Nama}_${userPelatihan?.NoRegistrasi}_${userPelatihan?.NoSertifikat}.pdf`
          );

          console.log("PDF File", pdfFile);

          try {
            const response = await axios.post(
              elautBaseUrl + "/lemdik/saveSertifikat",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("XSRF091")}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (response.status === 200) {
              console.log("File uploaded successfully");
            } else {
              console.error("Failed to upload the file");
            }
          } catch (error) {
            console.error("Error uploading the file:", error);
          }
        });
    }
  }, [show]);

  return (
    <>
      <div onClick={(e) => handleDownloadPDF()}>{children}</div>
      {show && (
        <SertifikatPage1
          ref={componentRef}
          pelatihan={pelatihan}
          userPelatihan={userPelatihan}
        />
      )}
    </>
  );
}

const SertifikatPage1 = React.forwardRef(
  (
    {
      pelatihan,
      userPelatihan,
    }: {
      pelatihan: PelatihanMasyarakat;
      userPelatihan: UserPelatihan;
    },
    ref: any
  ) => {
    const totalJamTeory = pelatihan?.MateriPelatihan?.reduce(
      (total, materi) => {
        return total + parseInt(materi.JamTeory);
      },
      0
    );

    const totalJamPraktek = pelatihan?.MateriPelatihan?.reduce(
      (total, materi) => {
        return total + parseInt(materi.JamPraktek);
      },
      0
    );

    return (
      <div className=" flex-col gap-8 font-bos hidden">
        <div
          ref={ref}
          className="w-full h-full  flex flex-col gap-4 items-center justify-center  px-10 py-14 rounded-md font-bos leading-[120%]"
        >
          <div className="w-full flex flex-col  gap-4 relative h-full items-center justify-center">
            <div className="flex flex-row  absolute top-0 right-0">
              <p className="text-base">
                No. Reg : {userPelatihan?.NoRegistrasi}
              </p>
            </div>

            <div className="w-full flex flex-col gap-4 px-10  mt-5">
              <div className="flex flex-col gap-0 w-full items-center justify-center mt-12">
                <h1 className="font-black text-3xl font-bosBold">SERTIFIKAT</h1>
                <p className="text-lg mt-2 italic">CERTIFICATE</p>

                <p className="text-lg mt-2 font-black">
                  Nomor : B.{userPelatihan?.NoSertifikat}
                </p>
              </div>

              <div className="flex w-full flex-col items-start text-sm -mt-2 text-center font-bos">
                <p>
                  Badan Penyuluhan dan Pengembangan Sumber Daya Manusia Kelautan
                  dan Perikanan berdasarkan Peraturan Pemerintah Nomor.62 Tahun
                  2014 tentang Penyelenggaraan Pendidikan, Pelatihan dan
                  Penyuluhan Perikanan, serta ketentuan pelaksanaannya
                  menyatakan bahwa :
                </p>
                <p className="italic font-bos text-xs">
                  The Agency for Marine and Fisheries Extension and Human
                  Resources Development based on Government Regulation Number 62
                  of 2014 concerning the Implementation of Fisheries Education,
                  Training and Extension as well as its implementing provisions
                  States that :
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full items-center text-center justify-center -mt-2">
                <div className="w-fit border-b-black border-b pb-2">
                  <h1 className="font-black text-xl">{userPelatihan?.Nama}</h1>
                </div>
                <div className="text-center">
                  <p>Lahir di {userPelatihan?.TempatTanggalLahir} </p>
                  <p className="text-xs italic">
                    Born in {userPelatihan?.TempatTanggalLahir}{" "}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full items-center justify-center -mt-2">
                <h1 className="font-black text-xl">TELAH LULUS</h1>
                <h3 className="font-black text-lg italic">HAS PASSED</h3>
              </div>

              <div className="flex w-full flex-col items-start -mt-2 text-center">
                <p className="text-sm">
                  Dalam {pelatihan?.NamaPelatihan} yang diselenggarakan atas
                  kerjasama Pusat Pelatihan Kelautan dan Perikanan – Badan
                  Penyuluhan dan Pengembangan Sumber Daya Manusia Kelautan dan
                  Perikanan pada tanggal 19 - 21 Februari 2024.
                </p>
                <p className="text-xs italic">
                  In the Training on Good Aquaculture Practices held in
                  collaboration between the Marine and Fisheries Training Center
                  – the Agency for Marine and Fisheries Extension and Human
                  Resources Development on 19 - 21 February 2024.
                </p>
              </div>

              <div className="flex gap-2 items-center justify-center -mt-2">
                <div className="flex flex-col font-bos text-center items-center justify-center">
                  <div className="flex w-full flex-col items-cennter mt-2 text-center">
                    <p>Jakarta, {getCurrentDate()}</p>
                    <p>{pelatihan?.TtdSertifikat}</p>
                    <p className="text-xs italic">
                      Chairman of the Agency for Marine and Fisheries Extension
                      and Human Resources Development
                    </p>
                  </div>
                  <Image
                    alt=""
                    width={0}
                    height={0}
                    src={"/ttd-elektronik.png"}
                    className="w-fit h-[100px]"
                  />
                  <p className="mt-20 font-extrabold text-lg">
                    Dr. I Nyoman Radiarta, S.Pi, M.Sc
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="w-full  flex flex-col gap-4  px-10 py-10 rounded-md font-cambria leading-[120%] !h-[120vh]">
              <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex flex-col font-cambria text-center">
                    <p className="font-extrabold max-w-md w-full italic">
                      {pelatihan?.NamaPelatihan}
                    </p>
                    <p className="font-extrabold max-w-3xl">
                      19 – 21 February 2024
                    </p>
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
                    <td className="border border-black-2 p-2">
                      {materi.JamTeory}
                    </td>
                    <td className="border border-black-2 p-2">
                      {materi.JamPraktek}
                    </td>
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
            </div> */}

            <div className="flex flex-row  absolute -bottom-12">
              <p className="text-[0.65rem] leading-[100%] text-center max-w-2xl">
                Dokumen ini telah ditandatangani secara elektronik menggunakan
                sertifikat elektronik yang telah diterbitkan oleh Balai
                Sertifikasi Elektronik (BSrE), Badan Siber dan Sandi Negara
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SertifikatPage1.displayName = "SertifikatPage1";
