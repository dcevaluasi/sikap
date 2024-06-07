import { PelatihanMasyarakat, UserPelatihan } from "@/types/product";
import Image from "next/image";

export default function SertifikatPage1({
  userPelatihan,
}: {
  userPelatihan: UserPelatihan;
}) {
  return (
    <div className="flex flex-col">
      <div className="w-full border flex flex-col gap-4 border-gray-300 px-10 py-6 rounded-md font-cambria leading-[120%] h-[100vh]">
        <div className="flex flex-row justify-end items-start">
          <p className="text-base">No. Reg. : {userPelatihan?.NoRegistrasi}</p>
        </div>

        <div className="flex flex-col gap-0 w-full items-center justify-center mt-6">
          <h1 className="font-black text-3xl">SERTIFIKAT</h1>
          <p className="text-base mt-1 italic">CERTIFICATE</p>

          <p className="text-xl mt-1 font-black">
            Nomor : B.{userPelatihan?.NoSertifikat}
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
            <h1 className="font-black text-3xl">{userPelatihan?.Nama}</h1>
          </div>
          <div className="text-center">
            <p>Lahir di Bekasi 01 Oktober 2001 </p>
            <p className="text-xs italic">Born in Bekasi, 01 October 2001</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full items-center justify-center mt-3">
          <h1 className="font-black text-3xl">TELAH LULUS</h1>
          <h3 className="font-black text-xl italic">HAS PASSED</h3>
        </div>

        <div className="flex w-full flex-col items-start mt-2 text-center">
          <p>
            Dalam {userPelatihan?.NamaPelatihan} yang diselenggarakan atas kerjasama
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
              <p>Jakarta, 21 Februari 2024</p>
              <p>
                Kepala Badan Penyuluhan dan Pengembangan Sumber Daya Manusia
                Kelautan dan Perikanan
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
      <div className="w-full border flex flex-col gap-4 border-gray-300 px-10 py-6 rounded-md font-cambria leading-[120%] !h-[120vh]">
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-col font-cambria text-center">
              <p className="font-extrabold max-w-md w-full italic">
                Good Aquaculture Practices (GAqP) Training For Students in the
                Marine and Fisheries Education Units
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
          <tr>
            <td className="border border-black-2 p-2 font-black">I</td>
            <td className="border border-black-2 font-black p-2 text-left">
              GENERAL COMPETENCY
            </td>
            <td className="border border-black-2 p-2"></td>
            <td className="border border-black-2 p-2"></td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2">1.</td>
            <td className="border border-black-2 p-2 text-left">
              GAqP Certification Policy
            </td>
            <td className="border border-black-2 p-2">1</td>
            <td className="border border-black-2 p-2">3</td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2 font-black">II</td>
            <td className="border border-black-2 font-black p-2 text-left">
              CORE COMPETENCIES
            </td>
            <td className="border border-black-2 p-2"></td>
            <td className="border border-black-2 p-2"></td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2">2.</td>
            <td className="border border-black-2 p-2 text-left">
              Food Hazards, International and National Requirements
            </td>
            <td className="border border-black-2 p-2">1</td>
            <td className="border border-black-2 p-2">3</td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2">3.</td>
            <td className="border border-black-2 p-2 text-left">
              Indonesian National GAqP Food Safety Standard Requirements
            </td>
            <td className="border border-black-2 p-2">1</td>
            <td className="border border-black-2 p-2">3</td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2">4.</td>
            <td className="border border-black-2 p-2 text-left">
              Aquaculture Quality and Safety Guarantee System Mechanism for
              Fishery Products
            </td>
            <td className="border border-black-2 p-2">1</td>
            <td className="border border-black-2 p-2">3</td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2">4.</td>
            <td className="border border-black-2 p-2 text-left">
              Aquaculture Unit Risk Management
            </td>
            <td className="border border-black-2 p-2">1</td>
            <td className="border border-black-2 p-2">3</td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2">4.</td>
            <td className="border border-black-2 p-2 text-left">
              Fish Health Management and Biosecurity
            </td>
            <td className="border border-black-2 p-2">1</td>
            <td className="border border-black-2 p-2">3</td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2">4.</td>
            <td className="border border-black-2 p-2 text-left">
              Traceability in the Fish Aquaculture Unit
            </td>
            <td className="border border-black-2 p-2">1</td>
            <td className="border border-black-2 p-2">3</td>
          </tr>
          <tr>
            <td className="border border-black-2 p-2">4.</td>
            <td className="border border-black-2 p-2 text-left">
              Aquaculture Process Control Procedures
            </td>
            <td className="border border-black-2 p-2">1</td>
            <td className="border border-black-2 p-2">3</td>
          </tr>
          <tr>
            <td
              colSpan={2}
              className="font-extrabold text-lg border border-black-2 p-2"
            >
              JUMLAH TOTAL
            </td>
            <td className="border border-black-2 p-2 font-extrabold">4</td>
            <td className="border border-black-2 p-2 font-extrabold">12</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
