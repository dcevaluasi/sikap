"use client";

import Toast from "@/components/toast";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import Countdown from "react-countdown";
import { TbClock } from "react-icons/tb";

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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdCloseCircle } from "react-icons/io";

function Page() {
  React.useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [doCheating, setDoCheating] = React.useState<boolean>(false);
  const [countDoCheating, setCountDoCheating] = React.useState<number>(0);

  React.useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        alert("Screenshots are disabled.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    const handleBlur = () => {
      const confirmCheat = confirm(
        "JIka kamu membuka tab, kamu melakukan kecurangan dan kamu diskualifikasi secara otomatis!."
      );
      if (confirmCheat) {
        console.log("Setting doCheating to true");
        setDoCheating(true);
        Cookies.set("DOCHEATING", (countDoCheating + 1).toString());
        Toast.fire({
          icon: "error",
          title: `Kamu didiskualifikasi karena telah melanggar aturan membuka tab dan keluar dari browser!`,
        });
        router.replace("/dashboard");
      } else {
        console.log("Setting doCheating to true");
        setDoCheating(true);
        Cookies.set("DOCHEATING", (countDoCheating + 1).toString());
        Toast.fire({
          icon: "error",
          title: `Kamu didiskualifikasi karena telah melanggar aturan membuka tab dan keluar dari browser!`,
        });
        router.replace("/dashboard");
      }
    };

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  React.useEffect(() => {
    console.log("doCheating state updated:", doCheating);
    console.log("countDoCheating state updated:", Cookies.get("DOCHEATING"));
  }, [doCheating]);

  type SoalUser = {
    Soal: Soal[];
    jumlah: number;
  };

  type Soal = {
    CreateAt: string;
    UpdateAt: string;
    IdLemdik: number;
    IdPelatihan: number;
    IdSoalUjian: number;
    Jawaban: Jawaban[];
    Soal: string;
    Status: string;
  };

  type Jawaban = {
    CreateAt: string;
    IdJawaban: number;
    IdSoalUjian: number;
    NameJawaban: string;
    Status: string;
    UpdateAt: string;
  };

  type JawabanUser = {
    id_soal_lemdik: string;
    jawaban_pengguna: string;
  };

  const [soalUser, setSoalUser] = React.useState<SoalUser | null>(null);
  const [selectedIdSoal, setSelectedIdSoal] = React.useState<number>(0);
  const [countSoal, setCountSoal] = React.useState<number>(1);
  const countdownEndTimeRef = React.useRef<number>(Date.now() + 900000);

  const [selectedAnswers, setSelectedAnswers] = React.useState<JawabanUser[]>(
    []
  );

  const handleAnswerChange = (idSoal: string, jawabanPengguna: string) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(
        (answer) => answer.id_soal_lemdik !== idSoal
      );
      updatedAnswers.push({
        id_soal_lemdik: idSoal,
        jawaban_pengguna: jawabanPengguna,
      });
      return updatedAnswers;
    });
  };

  const [isSubmitForm, setIsSubmitForm] = React.useState<boolean>(false);
  const router = useRouter();

  const handleSubmitExam = async (e: any) => {
    console.log(JSON.stringify(selectedAnswers));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/lemdik/SumbitExam`,
        selectedAnswers,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF089999")}`,
          },
        }
      );
      console.log("SUBMIT SOAL USER : ", response);
      Toast.fire({
        icon: "success",
        title: `Berhasil mensubmit jawaban post-test mu, silahkan lihat score pada dashboard pelatihanmu!`,
      });
      router.replace("/dashboard");
    } catch (e) {
      console.log("ERROR SUBMIT SOAL USER : ", e);
      Toast.fire({
        icon: "error",
        title: `Kesalahan di server, gagal mensubmit jawaban post-test mu!`,
      });
    }
  };

  console.log({ selectedAnswers });

  const handleFetchingSoalUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/lemdik/getSoalUsers`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF089999")}`,
          },
        }
      );
      setSoalUser(response.data);
      console.log("FETCH SOAL USER : ", response);
    } catch (e) {
      console.log("ERROR FETCH SOAL USER : ", e);
    }
  };

  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  React.useEffect(() => {
    handleFetchingSoalUsers();
  }, []);

  return (
    <section className="w-full h-screen bg-gray-900 grid items-center justify-center text-white relative">
      {doCheating ? (
        <div className="w-fit flex flex-col items-center justify-center gap-2 max-w-md mx-auto text-center">
          <div className="rounded-full w-fit bg-white shadow-custom p-7">
            <IoMdCloseCircle className="text-rose-500 text-6xl" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-200 text-3xl">Oopsss!</h1>
            <p className="text-gray-200">
              Kamu telah melanggar aturan karena keluar dari tab/browser
              pengerjaan pre-test, kamu otomatis diskualifikasi pada pre-test
              ini!
            </p>
          </div>
          {/* {
                        countDoCheating != 2 && <Button onClick={(e) => setDoCheating(false)} className='bg-white hover:bg-gray-200 text-rose-500'>Lanjutkan Pengerjaan</Button>
                    } */}
        </div>
      ) : (
        <>
          <div className="absolute w-fit flex gap-2 top-5 right-5 text-2xl font-medium text-white items-center">
            <TbClock />

            <Countdown date={countdownEndTimeRef.current} />
          </div>
          <div className="flex w-full h-fit mx-auto items-center justify-center  gap-10">
            <div className="rounded-md h-[400px] w-[450px] px-6 py-10">
              <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-2xl">
                Soal No. {selectedIdSoal + 1}
              </h2>
              <h3 className="text-white leading-[110%] text-2xl font-semibold">
                {soalUser! && soalUser!.Soal[selectedIdSoal]!.Soal} ?
              </h3>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                {soalUser! &&
                  soalUser!.Soal[selectedIdSoal]!.Jawaban!.slice(1).map(
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
                          onChange={() =>
                            handleAnswerChange(
                              soalUser!.Soal[
                                selectedIdSoal
                              ]!.IdSoalUjian.toString(),
                              jawaban.NameJawaban
                            )
                          }
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
                {soalUser! && soalUser!.Soal!.length == countSoal ? (
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
                          Jika kamu mensubmit soal, kamu akan segera mendapatkan
                          nilai dari pengerjaan post-test ini
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={(e) => handleSubmitExam(e)}>
                          Submit
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button
                    className="w-fit text-lg p-4 bg-blue-500 hover:bg-blue-600"
                    onClick={(e) => {
                      setSelectedIdSoal(selectedIdSoal + 1);
                      setCountSoal(countSoal + 1);
                      setIsChecked(!isChecked);
                    }}
                  >
                    Selanjutnya
                  </Button>
                )}
              </div>
            </div>
            <div className="w-1 rounded-full bg-gray-300 h-[100px]"></div>
            <div className="grid grid-cols-3 h-fit gap-3 ml-10 w-fit">
              {soalUser! &&
                soalUser!.Soal.map((soal, index) => (
                  <div
                    key={index + 1}
                    onClick={(e) => setSelectedIdSoal(index)}
                    className="flex cursor-pointer items-center justify-center rounded-full w-14 h-14 bg-transparent border border-white"
                  >
                    {index + 1}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Page;
