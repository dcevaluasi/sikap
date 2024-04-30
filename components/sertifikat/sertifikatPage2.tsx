import Image from "next/image";

export default function SertifikatPage2() {
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
