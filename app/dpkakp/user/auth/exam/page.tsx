"use client";

import Toast from "@/components/toast";
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
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Countdown from "react-countdown";
import { IoMdCloseCircle } from "react-icons/io";
import { TbClock } from "react-icons/tb";

function page() {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleClearFormLoginAdminDPKAKP = async () => {
    setEmail("");
    setPassword("");
  };

  const [answers, setAnswers] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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

  const [selectedIdSoal, setSelectedIdSoal] = React.useState<number>(0);
  const [countSoal, setCountSoal] = React.useState<number>(1);
  const countdownEndTimeRef = React.useRef<number>(Date.now() + 900000);

  const [selectedAnswers, setSelectedAnswers] = React.useState<Jawaban[]>([]);

  React.useEffect(() => {
    handleFetchExamInformation();
  }, []);

  return (
    <main className="bg-darkDPKAKP w-full h-screen">
      <section className="relative h-fit space-y-6 pb-8 pt-36 md:h-screen md:pb-12 md:pt-20 lg:py-44 w-full flex items-center justify-center flex-col">
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-2 text-center">
          <Link
            href={"/dpkakp"}
            className="rounded-2xl bg-mutedDPKAKP px-4 py-1.5 text-sm text-gray-200 font-medium"
            target="_blank"
          >
            DPKAKP
          </Link>
          <h1 className="font-bold text-gray-200 text-4xl -mt-2">
            {data?.Ujian} - {data?.Bagian}
          </h1>
          <p className="font-jakarta max-w-[42rem] leading-[100%] text-mutedForegroundDPKAKP  sm:text-lg sm:leading-8 -mt-4">
            Harap membaca dengan teliti dan saksama panduan pengerjaan ujian
            keahlian awak kapal perikanan.
          </p>
          <Image
            className="absolute -top-3 w-[500px] opacity-10 z-10"
            src={"/dpkakp/logo.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
        </div>
        <section
          className={`w-full h-screen grid items-center justify-center text-white relative z-50`}
        >
          <>
            <div className="flex w-full h-fit mx-auto items-center justify-between  gap-10">
              <div className="rounded-md h-[400px] max-w-3xl px-6 py-10 flex-1">
                <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-2xl">
                  Soal No. {selectedIdSoal + 1}
                </h2>
                <h3 className="text-white leading-[110%] text-2xl font-semibold">
                  {data! && data!.Soal[selectedIdSoal]!.Soal} ?
                </h3>
                <div className="flex flex-col items-start justify-start gap-1 mt-5 ">
                  {data! &&
                    data!.Soal[selectedIdSoal]!.Jawaban!.slice(1).map(
                      (jawaban: Jawaban, index: number) => (
                        <div
                          key={index}
                          className="flex items-start w-full mb-4 text-gray-360"
                        >
                          <input
                            id={`radio-${selectedIdSoal}-${index}`}
                            type="radio"
                            value={jawaban.NameJawaban}
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 "
                            onChange={() => null}
                          />
                          <label
                            htmlFor={`radio-${selectedIdSoal}-${index}`}
                            className="ms-2 -mt-1 text-lg font-medium text-white "
                          >
                            {index == 0
                              ? "A"
                              : index == 1
                              ? "B"
                              : index == 2
                              ? "C"
                              : "D"}
                            . {jawaban!.NameJawaban!}
                          </label>
                        </div>
                      )
                    )}
                </div>
                <div className="flex w-full items-center justify-end">
                  {data! && data!.Soal!.length == countSoal ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-fit text-lg p-4 bg-blue-500 hover:bg-blue-600">
                          Submit
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Kamu yakin akan mensubmit soal?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Jika kamu mensubmit soal, kamu akan segera
                            mendapatkan nilai dari pengerjaan pre-test ini
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Submit</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <div className="flex gap-2">
                      {selectedIdSoal != 0 && (
                        <Button
                          className="w-fit text-lg px-4 py-2 bg-mutedForegroundDPKAKP hover:bg-gray-600"
                          onClick={(e) => {
                            setSelectedIdSoal(selectedIdSoal - 1);
                            setCountSoal(countSoal - 1);
                          }}
                        >
                          Sebelumnya
                        </Button>
                      )}
                      <Button
                        className="w-fit text-lg p-4 bg-mutedForegroundDPKAKP hover:bg-gray-600"
                        onClick={(e) => {
                          setSelectedIdSoal(selectedIdSoal + 1);
                          setCountSoal(countSoal + 1);
                        }}
                      >
                        Selanjutnya
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-1 rounded-full bg-gray-300 h-[100px]"></div>
              <div className="grid grid-cols-5 h-fit gap-3 ml-10 w-fit">
                {data! &&
                  data!.Soal.map((soal, index) => (
                    <div
                      key={index + 1}
                      onClick={(e) => setSelectedIdSoal(index)}
                      className={`flex cursor-pointer items-center justify-center rounded-lg w-14 h-14  border border-white ${
                        answers[index] == ""
                          ? "bg-rose-700 bg-opacity-20 border border-rose-700"
                          : "bg-green-500 bg-opacity-20 border-green-500 border"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
              </div>
            </div>
          </>
        </section>
      </section>
    </main>
  );
}

export default page;
