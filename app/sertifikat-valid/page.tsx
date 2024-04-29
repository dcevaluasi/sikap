import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="flex items-center justify-center mt-28 mx-10">
      <Sertif />
    </div>
  );
}

export function Sertif() {
  return (
    <div className="w-full border flex flex-col gap-4 border-gray-300 px-10 py-6 rounded-md font-cambria leading-[120%] h-[120vh]">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row gap-2 items-center">
          <Image
            className="w-20"
            width={0}
            height={0}
            alt="Logo Kementrian Kelautan dan Perikanan RI"
            src={"/logo-kkp.png"}
          />
          <div className="flex flex-col font-cambria">
            <p>KEMENTERIAN KELAUTAN DAN PERIKANAN</p>
            <p className="-mt-1">
              BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA KELAUTAN DAN
              PERIKANAN
            </p>
            <p className="-mt-1">PUSAT PELATIHAN KELAUTAN DAN PERIKANAN</p>
            <p className="font-extrabold -mt-1">
              BALAI PELATIHAN DAN PENYULUHAN PERIKANAN TEGAL
            </p>
          </div>
        </div>

        <p className="text-base">No. Reg. : C.03.01.001147</p>
      </div>

      <div className="flex flex-col gap-0 w-full items-center justify-center mt-6">
        <h1 className="font-black text-3xl">SERTIFIKAT</h1>
        <p className="text-base mt-1">No. B.45/BPPP.BYW/RSDM.510/I/2024</p>
      </div>

      <div className="flex w-full items-start mt-6">
        <p>
          Kepala Balai Pelatihan dan Penyuluhan Perikanan Banyuwangi berdasarkan
          Peraturan Menteri Kelautan dan Perikanan Nomor : 6/PERMEN-KP/2017
          tanggal 30 Januari 2017 menyatakan bahwa:
        </p>
      </div>

      <div className="flex w-full items-center justify-center mt-6 font-cambria">
        <table>
          <tr>
            <td width={30}>Nama </td>
            <td width={30}>: </td>
            <td className="font-black">Farhan Augustiansyah</td>
          </tr>
          <tr>
            <td width={30}>Pekerjaan</td>
            <td width={30}>: </td>
            <td>IT Engineer</td>
          </tr>
          <tr>
            <td width={30}>Alamat</td>
            <td width={30}>: </td>
            <td className="text-bold">California, United State of America</td>
          </tr>
        </table>
      </div>

      <div className="flex flex-col gap-0 w-full items-center justify-center mt-6">
        <h1 className="font-black text-lg">Sebagai Pesereta</h1>
      </div>

      <div className="flex w-full items-start mt-6">
        <p>
          Telah mengikuti pelatihan teknis perikanan{" "}
          <span className="font-extrabold">
            Pelatihan Olahan dan Diversifikasi Produk Perikanan / Rumput Laut di
            Kabupaten Alor, Provinsi Nusa Tenggara Timur
          </span>{" "}
          yang diselenggarakan oleh Balai Pelatihan dan Penyuluhan Perikanan
          Banyuwangi, mulai tanggal 26 – 27 Januari 2024, selama 16 (enam belas)
          jam pelatihan dengan hasil baik. Materi pelatihan sebagaimana
          terlampir
        </p>
      </div>

      <div className="flex gap-2 items-center justify-end mt-5">
        <div className="flex flex-col font-cambria text-center items-center justify-center">
          <p>Banyuwangi, 27 Januari 2024</p>
          <p className="-mt-1">
            Kepala Balai Pelatihan dan Penyuluhan Perikanan Banyuwangi
          </p>
          <Image
            className="w-[200px] my-3"
            width={0}
            height={0}
            alt="Logo Kementrian Kelautan dan Perikanan RI"
            src={"/ttd-elektronik.png"}
          />
          <p className="-mt-1 font-extrabold">MOCH. MUCHLISIN, A.Pi, M.P</p>
          <p className="font-extrabold -mt-1">NIP. 197509161999031003</p>
        </div>
      </div>
    </div>
  );
}

export function SertifPenilaian() {
  return (
    <div className="w-full border flex flex-col gap-4 border-gray-300 px-10 py-6 rounded-md font-cambria leading-[120%] !h-[120vh]">
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-col font-cambria text-center">
            <p className="font-extrabold">Materi Pelatihan</p>
            <p className="-mt-1 font-extrabold">
              Pelatihan Olahan dan Diversifikasi Produk Perikanan/Rumput Laut
            </p>
            <p className="-mt-1 font-extrabold">
              Kabupaten Alor, Provinsi Nusa Tenggara Timur
            </p>
            <p className="mt-2">Tanggal 26 – 27 Januari 2024</p>
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
            MATERI PELATIHAN
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
            TEORI
          </td>
          <td className="border border-black-2 p-2 font-extrabold text-lg">
            PRAKTEK
          </td>
          <td className="border border-black-2 p-2 font-extrabold text-lg">
            TOTAL
          </td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">1.</td>
          <td className="border border-black-2 p-2 text-left">
            Teknik Pembuatan Ikan Asap
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
          <td className="border border-black-2 p-2">4</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">2.</td>
          <td className="border border-black-2 p-2 text-left">
            Teknik Pembuatan Abon Ikan
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
          <td className="border border-black-2 p-2">4</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">3.</td>
          <td className="border border-black-2 p-2 text-left">
            Teknik Pembuatan Dodol Rumput Laut
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
          <td className="border border-black-2 p-2">4</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">4.</td>
          <td className="border border-black-2 p-2 text-left">
            Pengemasan Produk Olahan Ikan
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
          <td className="border border-black-2 p-2">4</td>
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
          <td className="border border-black-2 p-2 font-extrabold">16</td>
        </tr>
      </table>

      <div className="flex gap-2 items-center justify-end mt-5">
        <div className="flex flex-col font-cambria text-center items-center justify-center">
          <p>Ketua Pokja Pelatihan</p>
          <Image
            className="w-[200px] my-3"
            width={0}
            height={0}
            alt="Logo Kementrian Kelautan dan Perikanan RI"
            src={"/ttd-elektronik.png"}
          />
          <p className="-mt-1 font-extrabold">
            YANUAR RUSTRIANTO B, S.St.Pi., M.Si
          </p>
          <p className="font-extrabold -mt-1">NIP. 198402102008011005</p>
        </div>
      </div>
    </div>
  );
}

export default page;
