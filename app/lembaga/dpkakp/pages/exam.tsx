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
import { dpkakpBaseUrl } from "@/constants/urls";
import {
  JawabanUser,
  SoalBagian,
  SoalUjianBagian,
  Ujian,
} from "@/types/ujian-keahlian-akp";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Exam() {
  const router = useRouter();

  const [selectedUjian, setSelectedUjian] = React.useState<Ujian | null>(null);


  const [data, setData] = React.useState<SoalBagian | null>(null);
  const [selectedAnswers, setSelectedAnswers] = React.useState<JawabanUser[]>(
    []
  );
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
      const initialAnswers = response.data.Soal.map(() => ({
        id_soal_bagian: null,
        jawaban_pengguna: "",
      }));

      setSelectedAnswers(initialAnswers);

      // const shuffledSoal = response.data.Soal.sort(() => Math.random() - 0.5);
      const shuffledSoal = response.data.Soal.map((soal: SoalUjianBagian) => ({
        ...soal,
        Jawaban: soal.Jawaban.sort(() => Math.random() - 0.5),
      })).sort(() => Math.random() - 0.5);
      setData({ ...response.data, Soal: shuffledSoal });
      // setData(response.data);
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  console.log(selectedAnswers);

  const [selectedIdSoal, setSelectedIdSoal] = React.useState<number>(0);

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout duration as needed
  }, []);

  const handleAnswerChange = (idSoal: number, answer: string) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];

      // Update the answer for the current question
      newAnswers[selectedIdSoal] = {
        id_soal_bagian: idSoal.toString(),
        jawaban_pengguna:
          newAnswers[selectedIdSoal]?.jawaban_pengguna === answer
            ? "" // Deselect if the same answer is clicked again
            : answer,
      };

      return newAnswers;
    });
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!data || !data.Soal[selectedIdSoal]) return;

      const currentQuestion = data.Soal[selectedIdSoal];
      const answers = currentQuestion?.Jawaban?.slice(1); // Adjust for slicing

      if (!answers) return;

      const keyMap: any = { A: 0, B: 1, C: 2, D: 3 }; // Map keys to indices
      const key: string = e.key.toUpperCase();

      if (keyMap[key] !== undefined) {
        const selectedAnswer = answers[keyMap[key]];
        if (selectedAnswer) {
          handleAnswerChange(selectedAnswer.IdSoalUjianBagian, selectedAnswer.NameJawaban);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, selectedIdSoal]);


  console.log("SELECTED ANSWERS", selectedAnswers);

  React.useEffect(() => {
    // Load state from local storage on component mount
    const savedSelectedIdSoal = localStorage.getItem("selectedIdSoal");
    const savedAnswers = localStorage.getItem("answers");

    if (savedSelectedIdSoal !== null) {
      setSelectedIdSoal(JSON.parse(savedSelectedIdSoal));
    }
    if (savedAnswers !== null) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  React.useEffect(() => {
    // Save state to local storage whenever it changes
    localStorage.setItem("selectedIdSoal", JSON.stringify(selectedIdSoal));
    localStorage.setItem("answers", JSON.stringify(selectedAnswers));
  }, [selectedIdSoal, selectedAnswers]);

  const [showAlert, setShowAlert] = React.useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = React.useState(false);
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/SumbitExam`,
        selectedAnswers,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF096")}`,
          },
        }
      );
      console.log("Response:", response.data);
      Toast.fire({
        icon: "success",
        title: `Berhasil mensubmit jawabanmu!`,
      });
      Cookies.remove("XSRF096");
      Cookies.remove("XSRF097");
      setTimeout(() => {
        router.replace("/lembaga/dpkakp/user/auth");
      }, 1500); // Adjust the timeout duration as needed
      // Handle the response as needed
    } catch (error) {
      console.error("Error submitting exam:", error);
      // Handle the error as needed
    }
  };
  const handleNextClick = () => {
    setSelectedIdSoal(selectedIdSoal + 1);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use matchMedia to detect desktop
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (isDesktop && e.key === 'Enter') {
        handleNextClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIdSoal]);


  const [isSectionVisible, setIsSectionVisible] = React.useState(false);

  const handleToggleSection = () => {
    setIsSectionVisible(!isSectionVisible);
  };



  React.useEffect(() => {
    // Clear radio button selection when moving to the next question
    const radioButtons = document.querySelectorAll(
      `input[name="radio-${selectedIdSoal}"]`
    );
    radioButtons.forEach((radio: any) => {
      radio.checked = false;
    });

    // Check the selected answer if it exists
    const selected: any = selectedAnswers.find(
      (a: any) => a.id_soal_bagian === selectedIdSoal
    );
    if (selected) {
      const radioButton: any = document.querySelector(
        `input[name="radio-${selectedIdSoal}"][value="${CSS.escape(
          selected.jawaban_pengguna
        )}"]`
      );
      if (radioButton) {
        radioButton.checked = true;
      }
    }
  }, [selectedIdSoal, selectedAnswers]);

  const handlePrevClick = () => {
    setSelectedIdSoal(selectedIdSoal - 1);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use matchMedia to detect desktop
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (isDesktop && e.key === " ") { // Check for space key
        e.preventDefault(); // Prevent default behavior (scrolling) when space is pressed
        handlePrevClick();
      }
    };

    // Add event listener for the keydown event
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIdSoal]);



  React.useEffect(() => {
    handleFetchExamInformation();
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    const handleCopy = (event: ClipboardEvent) => {
      event.preventDefault();
    };

    window.addEventListener("copy", handleCopy);

    // Clean up the event listeners
    return () => {
      window.removeEventListener("copy", handleCopy);
    };
  }, []);


  return (
    <main className="bg-darkDPKAKP w-full h-full relative flex items-center justify-center pb-56 md:pb-0">
      <Image
        className="absolute top-40 md:top-20 w-[600px] opacity-10 z-10"
        src={"/lembaga/logo/logo-sertifikasi-akp.png"}
        width={0}
        height={0}
        alt="DPKAKP Logo"
      />
      <div className="flex flex-row gap-20 w-full items-start justify-between mx-10 md:mx-20 h-full">
        <section className="relative h-full space-y-6 pb-8  md:pb-12 mt-10 flex items-center justify-center flex-col md:w-2/3">
          <div className="md:container w-full relative flex md:max-w-[64rem] flex-col items-center gap-2 text-center md:px-0 px-10">
            <p className="rounded-2xl bg-mutedDPKAKP px-4 py-1.5 text-sm text-gray-200 font-medium">
              DPKAKP
            </p>
            <div className="flex flex-row gap-2 items-center justify-center pb-4 border-b border-b-gray-600  md:px-0 -mt-2">
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
                  GEDUNG MINA BAHARI III Lt.5, JALAN MEDAN MERDEKA TIMUR NOMOR
                  16 JAKARTA 10110 <br /> KOTAK POS 4130 JKP 10041 TELEPON (021)
                  3519070 (LACAK), FAKSIMILE (021) 3513287 <br /> LAMAN
                  <span className="text-blue-500 underline ">
                    https://elaut-bppsdm.go.id/lembaga/dpkakp
                  </span>{" "}
                  SUREL{" "}
                  <span className="text-blue-500 underline">
                    dpkakp@kkp.go.id
                  </span>
                </p>
              </div>
              <Image
                className="hidden md:block w-16 h-16 "
                src={"/lembaga/logo/logo-sertifikasi-akp.png"}
                width={0}
                height={0}
                alt="DPKAKP Logo"
              />
            </div>
          </div>
          {loading ? (
            <SkeletonDataSoal />
          ) : (
            <section className="w-full  container flex items-center justify-center text-white relative z-50 h-full">
              <div className="flex w-full h-fit mx-auto items-center justify-between gap-10">
                <div className="rounded-md h-full  px-6 py-3 flex-1">
                  <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-2xl">
                    Soal No. {selectedIdSoal + 1}
                  </h2>

                  {data?.Soal[selectedIdSoal]?.GambarSoal != "" ? (
                    <div>
                      {/* Image with onClick to show the modal */}
                      {data?.Soal[selectedIdSoal]?.GambarSoal !== "" && (
                        <Image
                          className="hidden md:block w-fit h-50 object-contain my-5 rounded-lg cursor-pointer z-[9999999]"
                          src={data!.Soal[selectedIdSoal]?.GambarSoal!}
                          width={0}
                          height={0}
                          alt="DPKAKP Logo"
                          onClick={handleImageClick} // Trigger modal on image click
                        />
                      )}

                      {/* Modal to show image */}
                      {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999999999]">
                          <div className="bg-white p-5 rounded-lg max-w-4xl max-h-[90%] overflow-auto">
                            <button
                              onClick={handleCloseModal}
                              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 rounded-full p-2"
                            >
                              X
                            </button>
                            <img
                              src={data?.Soal[selectedIdSoal]?.GambarSoal!}
                              alt="Full-size Image"
                              className="w-full h-auto rounded-lg"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}

                  <h3 className="text-white leading-[110%] text-xl font-semibold">
                    {data && data.Soal[selectedIdSoal]?.Soal}
                  </h3>
                  <div className="flex flex-col items-start text-mutedForegroundDPKAKP justify-start gap-1 mt-5">
                    {data &&
                      data.Soal[selectedIdSoal]?.Jawaban?.slice(1).map(
                        (jawaban, index) => (
                          <div
                            key={index}
                            className="flex items-start w-full mb-4 text-gray-360"
                          >
                            <input
                              id={`checkbox-${selectedIdSoal}-${index}`}
                              type="checkbox"
                              value={jawaban.NameJawaban}
                              name={`checkbox-${selectedIdSoal}`}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 rounded-md"
                              checked={
                                selectedAnswers[selectedIdSoal]
                                  ?.jawaban_pengguna === jawaban.NameJawaban
                              }
                              onChange={() =>
                                handleAnswerChange(
                                  jawaban.IdSoalUjianBagian,
                                  jawaban.NameJawaban
                                )
                              }
                            />
                            <label
                              htmlFor={`checkbox-${selectedIdSoal}-${index}`}
                              className="ms-2 -mt-1 text-base capitalize font-normal text-white"
                            >
                              {index === 0
                                ? "A"
                                : index === 1
                                  ? "B"
                                  : index === 2
                                    ? "C"
                                    : "D"}
                              . {jawaban.NameJawaban}
                            </label>
                          </div>
                        )
                      )}
                  </div>

                  <div className="flex w-full items-center justify-end mt-4">
                    {selectedIdSoal !== 0 && (
                      <Button
                        className="w-fit text-lg px-4 py-2 border bg-transparent border-blue-500 hover:bg-blue-600"
                        onClick={handlePrevClick}
                      >
                        Sebelumnya
                      </Button>
                    )}
                    {selectedIdSoal === data?.Soal?.length! - 1 ? (
                      <Button
                        className="w-fit text-base px-4 py-2 bg-blue-500 hover:bg-blue-600 ml-4"
                        onClick={() => setShowSubmitAlert(true)}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        className="w-fit text-base px-4 py-2 bg-blue-500 hover:bg-blue-600 ml-4"
                        onClick={handleNextClick}
                      >
                        Selanjutnya
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <AlertDialog open={showAlert}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Peringatan</AlertDialogTitle>
                    <AlertDialogDescription>
                      Anda harus memilih jawaban sebelum melanjutkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setShowAlert(false)}>
                      OK
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog open={showSubmitAlert}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi</AlertDialogTitle>
                    <AlertDialogDescription>
                      Pastikan semua soal telah terjawab, apakah anda yakin akan
                      mengirimkan jawaban anda?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setShowSubmitAlert(false)}
                    >
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                      Kirim
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </section>
          )}
        </section>
        <section className="h-full text-white w-1/3 py-20 z-0 hidden md:block">
          <div className="flex flex-col gap-3 h-full">
            <div className="flex flex-col  gap-0 items-start">
              <h1 className="font-bold text-gray-200 text-sm md:text-xl max-w-xs md:max-w-md leading-[95%] mb-5 mt-2 text-left">
                {data?.Ujian} <br />{" "}
                <span className="font-normal text-xs md:text-base text-mutedForegroundDPKAKP leading-[90%]">
                  {data?.Fungsi}
                </span>{" "}
                <br />
                <span className="font-normal text-xs md:text-base text-mutedForegroundDPKAKP leading-[90%]">
                  Tipe Soal : {data?.Bagian}
                </span>
                <br />
                <span className="font-normal text-xs md:text-base text-mutedForegroundDPKAKP leading-[90%]">
                  Jumlah Soal : {data?.jumlah} Soal
                </span>
                <br />
                <span className="font-normal text-xs md:text-base text-mutedForegroundDPKAKP leading-[90%]">
                  Waktu Pelaksanaan : {data?.waktu!} Menit
                </span>
              </h1>
              <Timer countdownMinutes={data?.waktu!} />
            </div>
            <div className="grid grid-cols-6 grid-rows-6 space-x-0 space-y-0 gap-2">
              {data?.Soal!.map((soal, index) => (
                <div
                  key={index}
                  onClick={(e) => setSelectedIdSoal(index)}
                  className={`h-12 w-12 flex justify-between items-center cursor-pointer hover:scale-105 ${selectedAnswers[index]!.jawaban_pengguna! != ""
                    ? "bg-blue-500 text-white"
                    : "bg-[#343650]"
                    } rounded-lg duration-700 bg-opacity-70`}
                >
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
                  <span
                    className={`text-2xl font-semibold  ${selectedAnswers[index] != null
                      ? " text-white"
                      : "text-[#a5b4fc]"
                      }`}
                  >
                    {index + 1}
                  </span>
                  <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const SkeletonDataSoal = () => {
  return (
    <section className="w-full max-w-[54rem] container flex items-center justify-center text-white relative z-50">
      <div className="flex w-full h-fit mx-auto items-center justify-between gap-10">
        <div className="rounded-md h-[400px] max-w-xl px-6 py-3 flex-1  animate-pulse">
          <div className="h-8 bg-gray-600 rounded mb-4 w-20"></div>
          <div className="h-6 bg-gray-600 rounded mb-4"></div>
          <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                <div className="h-6 bg-gray-600 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface CountDownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface TimerProps {
  countdownMinutes: number; // Custom countdown in minutes
}

const Timer: React.FC<TimerProps> = ({ countdownMinutes }) => {
  const [countDownTime, setCountDownTime] = React.useState<CountDownTime>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const router = useRouter();

  const getTimeDifference = (countDownDate: number) => {
    const currentTime = new Date().getTime();
    const timeDifference = countDownDate - currentTime;

    if (timeDifference < 0) {
      setCountDownTime({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      localStorage.removeItem("countDownDate");
      Cookies.remove("XSRF096");
      Cookies.remove("XSRF097");
      router.push("/lembaga/dpkakp/user/auth");
    } else {
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

      setCountDownTime({ days, hours, minutes, seconds });
    }
  };

  const startCountDown = React.useCallback(() => {
    const storedDate = localStorage.getItem("countDownDate");
    let countDownDate: number;

    if (storedDate && !isNaN(parseInt(storedDate, 10))) {
      countDownDate = parseInt(storedDate, 10);
    } else {
      const currentTime = new Date().getTime();
      countDownDate = currentTime + countdownMinutes * 60 * 1000; // Set countdown based on the input minutes
      localStorage.setItem("countDownDate", countDownDate.toString());
    }

    const intervalId = setInterval(() => {
      getTimeDifference(countDownDate);
    }, 1000);

    return intervalId;
  }, [countdownMinutes]);

  React.useEffect(() => {
    const intervalId = startCountDown();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [startCountDown]);

  return (
    <div className="h-fit">
      <div className="flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-16">
        <div className="flex justify-center gap-3 sm:gap-8">
          {["days", "hours", "minutes", "seconds"].map((unit, index) => (
            <div key={index} className="flex flex-col gap-2 relative">
              <div className="h-12 w-12 flex justify-between items-center bg-[#343650] rounded-lg">
                <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
                <span className="text-2xl font-semibold text-[#a5b4fc]">
                  {countDownTime[unit as keyof CountDownTime]}
                </span>
                <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
              </div>
              <span className="text-[#8486A9] text-xs text-center capitalize">
                {countDownTime[unit as keyof CountDownTime] === "01"
                  ? unit.slice(0, -1)
                  : unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exam;
