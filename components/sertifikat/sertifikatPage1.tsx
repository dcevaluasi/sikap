import Image from "next/image";

export default function SertifikatPage1() {
  return (
    <div className="w-full border flex flex-col gap-4 border-gray-300 px-10 py-6 rounded-md font-cambria leading-[120%] h-[120vh]">
      <div className="flex flex-row justify-end items-start">
        

        <p className="text-base">No. Reg. : C.03.01.001147</p>
      </div>

      <div className="flex flex-col gap-0 w-full items-center justify-center mt-6">
        <h1 className="font-black text-3xl">SERTIFIKAT</h1>
        <p className="text-base mt-1 italic">CERTIFICATE</p>

        <p className="text-xl mt-1 font-black">
          Nomor : 319/BPPSDM.5/RSDM.510/II/2024
        </p>
      </div>

      <div className="flex w-full flex-col items-start -mt-2 text-center">
        <p>
          Badan Penyuluhan dan Pengembangan Sumber Daya Manusia Kelautan dan
          Perikanan berdasarkan Peraturan Pemerintah Nomor.62 Tahun 2014 tentang
          Penyelenggaraan Pendidikan, Pelatihan dan Penyuluhan Perikanan, serta
          ketentuan pelaksanaannya menyatakan bahwa :
        </p>
        <p className="text-xs italic">
          The Agency for Marine and Fisheries Extension and Human Resources
          Development based on Government Regulation Number 62 of 2014
          concerning the Implementation of Fisheries Education, Training and
          Extension as well as its implementing provisions States that :
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full items-center text-center justify-center mt-3">
        <div className="w-fit border-b-black border-b pb-3">
          <h1 className="font-black text-3xl">FARHAN AUGUSTIANSYAH</h1>
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
          Dalam Pelatihan Ahli Pembudidaya Ikan Cara Budidaya Ikan yang Baik
          (APH - CBIB) yang diselenggarakan atas kerjasama Pusat Pelatihan
          Kelautan dan Perikanan – Badan Penyuluhan dan Pengembangan Sumber Daya
          Manusia Kelautan dan Perikanan dengan Direktorat Produksi dan Usaha
          Budidaya – Direktorat Jenderal Perikanan Budidaya pada tanggal 19 - 21
          Februari 2024.
        </p>
        <p className="text-xs italic">
          In the Training on Good Aquaculture Practices held in collaboration
          between the Marine and Fisheries Training Center – the Agency for
          Marine and Fisheries Extension and Human Resources Development and the
          Directorate of Aquaculture Production and Business - Directorate
          General of Aquaculture on 19 - 21 February 2024.
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
          <p className="-mt-1 font-extrabold">
            Dr. I Nyoman Radiarta, S.Pi, M.Sc
          </p>
        </div>
      </div>
    </div>
  );
}
