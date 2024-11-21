"use client";

import Toast from "@/components/toast";
import { SoalBagian } from "@/types/ujian-keahlian-akp";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [data, setData] = React.useState<SoalBagian | null>(null);
  const handleFetchExamInformation = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/getSoalBagian`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF096")}`,
          },
        }
      );
      setData(response.data);
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  React.useEffect(() => {
    handleFetchExamInformation();
  }, []);

  return (
    <main className="bg-darkDPKAKP w-full h-screen overflow-y-scroll">
      <section className="relative h-fit px-7 md:px-0 space-y-6 pb-8 pt-20 md:h-screen md:pb-12 md:pt-20 lg:py-44 w-full flex items-center justify-center flex-col">
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-2 text-center">
          <Link
            href={"/dpkakp"}
            className="rounded-2xl bg-mutedDPKAKP px-4 py-1.5 text-sm text-gray-200 font-medium"
            target="_blank"
          >
            DPKAKP
          </Link>
          <h1 className="font-bold text-gray-200 text-3xl leading-[110%] mb-5 mt-2">
            {data?.Ujian} - {data?.Fungsi} {data?.Bagian}
          </h1>
          <p className="font-jakarta max-w-[42rem] leading-[95%] text-mutedForegroundDPKAKP  sm:text-lg sm:leading-8 -mt-4">
            Harap membaca dengan teliti dan saksama panduan pengerjaan ujian
            keahlian awak kapal perikanan.
          </p>
          <Image
            className="absolute top-16 md:-top-28 w-[500px] opacity-10 z-10"
            src={"/dpkakp/logo.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
        </div>
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto z-50 -mt-20">
          <div className="flex flex-col gap-1">
            <p className="font-jakarta  leading-[100%] text-mutedForegroundDPKAKP   sm:text-sm sm:leading-8 ">
              Panduan Pengerjaan
            </p>
            <div className="border rounded-xl text-mutedForegroundDPKAKP border-mutedDPKAKP bg-transparent w-full p-4">
              <span>
                {" "}
                1.Pilih salah satu jawaban yang Saudara anggap paling
                tepat/benar!
              </span>{" "}
              <br />
              <span>
                {" "}
                2. Dalam menjawab soal, gunakan gadget yang mumpuni!
              </span>{" "}
              <br />
              <span>
                {" "}
                3. Waktu yang disediakan untuk mengerjakan soal adalah 15 menit!
              </span>{" "}
              <br />
              <span> 4. Tidak diperbolehkan membuka buku, handphone dll!</span>
            </div>
          </div>
          <button
            onClick={(e) => router.push("/lembaga/dpkakp/user/auth/exam")}
            className="text-white w-full bg-blue-950 rounded-xl bg-opacity-100 py-2"
          >
            Lanjutkan
          </button>
        </div>
      </section>
    </main>
  );
}

export default page;
