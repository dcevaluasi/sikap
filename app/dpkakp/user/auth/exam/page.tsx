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
    <main className="bg-darkDPKAKP w-full h-full relative flex items-center justify-center">
      <Image
        className="absolute top-20 w-[500px] opacity-10 z-10"
        src={"/dpkakp/logo.png"}
        width={0}
        height={0}
        alt="DPKAKP Logo"
      />
      <section className="relative h-full space-y-6 pb-8  md:pb-12 mt-10  w-full flex items-center justify-center flex-col">
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-2 text-center md:px-0 px-10">
          <Link
            href={"/dpkakp"}
            className="rounded-2xl bg-mutedDPKAKP px-4 py-1.5 text-sm text-gray-200 font-medium"
            target="_blank"
          >
            DPKAKP
          </Link>
          <div className="flex flex-row gap-2 items-center justify-center pb-4 border-b border-b-gray-600  md:px-0">
            <Image
              className=" hidden md:block md:w-16 md:h-14 "
              src={"/logo-kkp-white.png"}
              width={0}
              height={0}
              alt="DPKAKP Logo"
            />
            <div className="flex flex-col gap-1 items-center justify-center text-center">
              <h1 className="font-normal text-gray-200 text-sm md:text-xl leading-[110%] mb-5 mt-2">
                KEMENTERIAN KELAUTAN DAN PERIKANAN <br /> BADAN PENYULUHAN DAN
                PENGEMBANGAN SUMBER DAYA MANUSIA <br />
                <span className="font-bold">
                  DEWAN PENGUJI KEAHLIAN AWAK KAPAL PERIKANAN
                </span>
              </h1>
              <p className="font-jakarta max-w-[42rem] leading-[95%] text-mutedForegroundDPKAKP text-xs md:text-sm  -mt-4">
                GEDUNG MINA BAHARI III Lt.5, JALAN MEDAN MERDEKA TIMUR NOMOR 16
                JAKARTA 10110 <br /> KOTAK POS 4130 JKP 10041 TELEPON (021)
                3519070 (LACAK), FAKSIMILE (021) 3513287 <br /> LAMAN
                <Link href={""} className="text-blue-500 underline">
                  https://elaut-bppsdm.go.id/dpkakp
                </Link>{" "}
                SUREL{" "}
                <Link href={""} className="text-blue-500 underline">
                  dpkakp@kkp.go.id
                </Link>
              </p>
            </div>
            <Image
              className="hidden md:block w-14 h-16 "
              src={"/dpkakp/logo.png"}
              width={0}
              height={0}
              alt="DPKAKP Logo"
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-bold text-gray-200 text-sm md:text-xl max-w-xs md:max-w-md leading-[95%] mb-5 mt-2 text-left">
              {data?.Ujian} <br />{" "}
              <span className="font-normal text-xs md:text-base text-mutedForegroundDPKAKP leading-[90%]">
                {data?.Fungsi} {data?.Bagian}
              </span>{" "}
              <br />
              <span className="font-normal text-xs md:text-base text-mutedForegroundDPKAKP leading-[90%]">
                Waktu Pelaksanaan : 120 Menit
              </span>
            </h1>
            <Timer />
          </div>
        </div>
        <section
          className={`w-full max-w-[54rem] container flex items-center justify-center text-white relative z-50`}
        >
          <>
            <div className="flex w-full h-fit mx-auto items-center justify-between gap-10">
              <div className="rounded-md h-[400px] max-w-xl px-6 py-3 flex-1">
                <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-2xl">
                  Soal No. {selectedIdSoal + 1}
                </h2>
                <h3 className="text-white leading-[110%] text-xl font-semibold">
                  {data! && data!.Soal[selectedIdSoal]!.Soal} ?
                </h3>
                <div className="flex flex-col items-start text-mutedForegroundDPKAKP justify-start gap-1 mt-5 ">
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
                            className="ms-2 -mt-1 text-base capitalize font-normal text-white "
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
                {/* <div className="flex w-full items-center justify-end">
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
                </div> */}
              </div>
              {/* <div className="grid grid-cols-8 h-fit gap-3 ml-10 w-fit">
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
              </div> */}
            </div>
          </>
        </section>
      </section>
    </main>
  );
}

interface CountDownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const Timer: React.FC = () => {
  const [countDownTime, setCountDownTime] = React.useState<CountDownTime>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const getTimeDifference = (countDownDate: number) => {
    const currentTime = new Date().getTime();
    const timeDifference = countDownDate - currentTime;

    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000))
      .toString()
      .padStart(2, "0");
    const hours = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (1000 * 60)
    )
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000)
      .toString()
      .padStart(2, "0");

    if (timeDifference < 0) {
      setCountDownTime({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
    } else {
      setCountDownTime({
        days,
        hours,
        minutes,
        seconds,
      });
    }
  };

  const startCountDown = React.useCallback(() => {
    const customDate = new Date();
    const countDownDate = new Date(
      customDate.getFullYear(),
      customDate.getMonth() + 1,
      customDate.getDate() + 6,
      customDate.getHours(),
      customDate.getMinutes(),
      customDate.getSeconds() + 1
    ).getTime();

    const intervalId = setInterval(() => {
      getTimeDifference(countDownDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    const intervalId = startCountDown();
    return () => clearInterval(1000);
  }, [startCountDown]);

  return (
    <div className=" h-fit">
      <div className="flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-16">
        <div className="flex justify-center gap-3 sm:gap-8">
          <div className="flex flex-col gap-2 relative">
            <div className="h-12 w-12 flex justify-between items-center bg-[#343650] rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className="text-2xl font-semibold text-[#a5b4fc]">
                {countDownTime.days}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#8486A9] text-xs text-center capitalize">
              {countDownTime.days === "01" ? "Day" : "Days"}
            </span>
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="h-12 w-12 flex justify-between items-center bg-[#343650] rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className="text-2xl font-semibold text-[#a5b4fc]">
                {countDownTime.hours}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#8486A9] text-xs text-center font-medium">
              {countDownTime.hours === "01" ? "Hour" : "Hours"}
            </span>
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="h-12 w-12 flex justify-between items-center bg-[#343650] rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className="text-2xl font-semibold text-[#a5b4fc]">
                {countDownTime.minutes}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#8486A9] text-xs text-center capitalize">
              {countDownTime.minutes === "01" ? "Minute" : "Minutes"}
            </span>
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="h-12 w-12 flex justify-between items-center bg-[#343650] rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className="text-2xl font-semibold text-[#a5b4fc]">
                {countDownTime.seconds}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#8486A9] text-xs text-center capitalize">
              {countDownTime.seconds === "01" ? "Second" : "Seconds"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
