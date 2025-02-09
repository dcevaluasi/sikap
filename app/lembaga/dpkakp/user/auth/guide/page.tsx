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
    <main className="bg-darkDPKAKP w-full h-full relative">
      <Image
        src={"/dpkakp/image4.jpg"}
        className="absolute w-full h-screen z-10 object-cover duration-1000"
        alt=""
        layout="fill"
        priority
      />
      <div className="absolute bg-blue-950 opacity-80 inset-0 z-20"></div>
      <section className="relative h-fit space-y-6 z-50 pb-8 pt-36 md:h-screen md:pb-12 md:pt-20 lg:py-44 w-full flex items-center justify-center flex-col">
        <div className=" relative flex max-w-[64rem] flex-col items-center gap-2 text-center">
          <Link
            href={"#"}
            className="rounded-2xl bg-blue-500 px-4 py-1.5 text-sm text-gray-200 font-medium"
            target="_blank"
          >
            DPKAKP
          </Link>
          <Image
            className=" w-[100px] my-1 z-10"
            src={"/lembaga/logo/logo-sertifikasi-akp.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <h1 className="font-bold  font-calsans leading-none text-gray-200 text-4xl -mt-4">
            {" "}
            {data?.Ujian} <br />
            <span className=" bg-clip-text text-transparent bg-gradient-to-r leading-none pt-0 from-blue-500 to-teal-400">
              {data?.Fungsi} {data?.Bagian}
            </span>
          </h1>
          <p className="font-jakarta max-w-[42rem] leading-[120%] text-gray-200  sm:text-base ">
            Harap membaca dengan teliti dan saksama panduan pengerjaan ujian
            keahlian awak kapal perikanan.
          </p>
        </div>
        <div className="flex flex-col w-full max-w-xl px-10 md:px-0 mx-auto z-50">
          <div className="flex flex-col gap-3 w-full mx-auto z-50">
            <div className="flex flex-col gap-1">
              <p className="font-jakarta  leading-[100%] text-white   sm:text-sm sm:leading-8 ">
                Panduan Pengerjaan
              </p>
              <div className="active:ring-blue-500 focus:ring-blue-500 active:outline-blue-500 border rounded-xl text-white border-blue-500 bg-transparent w-full placeholder:text-white  p-4">
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
                  3. Waktu yang disediakan untuk mengerjakan soal adalah 120
                  menit!
                </span>{" "}
                <br />
                <span> 4. Tidak diperbolehkan membuka buku, dll!</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              router.push("/lembaga/dpkakp/user/auth/exam");
            }}
            className="text-white w-full bg-blue-500 rounded-xl bg-opacity-100 py-2 mt-2"
          >
            Lanjutkan
          </button>
        </div>
      </section>
    </main>
  );
}

export default page;
