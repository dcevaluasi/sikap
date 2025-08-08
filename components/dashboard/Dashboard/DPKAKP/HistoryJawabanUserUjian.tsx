'use client'

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { HashLoader } from "react-spinners"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React from "react"
import EmptyData from "@/components/micro-components/EmptyData"

interface DataAnswer {
    soal: string
    jawaban_benar: string
    jawaban_pengguna: string
    isCorrect: boolean
}

interface HistoryJawabanuserUjianProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    dataAnswer: DataAnswer[]
    trueCount: number
    falseCount: number
    isFetching: boolean
}

const HistoryJawabanuserUjian: React.FC<HistoryJawabanuserUjianProps> = ({
    isOpen,
    onOpenChange,
    dataAnswer,
    trueCount,
    falseCount,
    isFetching
}) => {
    const pathname = usePathname()

    return (
        <Sheet onOpenChange={onOpenChange} open={isOpen}>
            <SheetContent className="overflow-y-scroll h-full w-[700px] !sm:max-w-4xl">
                <SheetHeader>
                    <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex flex-col gap-0">
                            <SheetTitle className="leading-none">History Jawaban</SheetTitle>
                            <SheetDescription>
                                Lihat history jawaban peserta ujian berapa soal yang berhasil dijawab!
                            </SheetDescription>
                        </div>
                        {dataAnswer.length !== 0 && (
                            <Button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="mt-2 bg-white hover:bg-gray-300 border-gray-300 border text-black"
                            >
                                Close
                            </Button>
                        )}
                    </div>
                </SheetHeader>

                {isFetching ? (
                    <div className="mt-32 w-full flex items-center justify-center">
                        <HashLoader color="#338CF5" size={50} />
                    </div>
                ) : dataAnswer.length === 0 ? (
                    <EmptyData type="soal" />
                ) : (
                    <>
                        <ul className="flex mb-2 w-full">
                            <li className="w-full">
                                <button className="focus:outline-none p-2 rounded-l-md border flex flex-col items-center w-full bg-white text-black">
                                    <p className="font-semibold text-lg text-green-500">{trueCount}</p>
                                    <p className="uppercase text-sm text-gray-600">Total Jawaban Benar</p>
                                </button>
                            </li>
                            <li className="w-full">
                                <button className="focus:outline-none p-2 border flex flex-col items-center w-full bg-white text-black">
                                    <p className="font-semibold text-lg text-rose-500">{falseCount}</p>
                                    <p className="uppercase text-sm text-gray-600">Total Jawaban Salah</p>
                                </button>
                            </li>
                        </ul>

                        {!pathname.includes("pukakp") ? (
                            <div className="grid grid-cols-4 gap-0">
                                <div className="border border-gray-300 font-bold text-black h-fit w-full text-center">No</div>
                                <div className="border border-gray-300 font-bold text-black h-fit w-full text-center">Soal</div>
                                <div className="border border-gray-300 font-bold text-black h-fit w-full text-center">Jawaban Benar</div>
                                <div className="border border-gray-300 font-bold text-black h-fit w-full text-center">Jawaban User</div>

                                {dataAnswer.map((data, index) => (
                                    <React.Fragment key={index}>
                                        <SheetDescription className="text-black font-semibold w-full border border-gray-300 p-2 text-center">
                                            {index + 1}
                                        </SheetDescription>
                                        <SheetDescription className="text-black font-semibold border border-gray-300 p-2">
                                            {data.soal}
                                        </SheetDescription>
                                        <SheetDescription className="border border-gray-300 p-2">
                                            <span>{data.jawaban_benar}</span>
                                        </SheetDescription>
                                        <SheetDescription className={`border border-gray-300 p-2 ${data.isCorrect ? "text-green-500" : "text-rose-500"}`}>
                                            {data.jawaban_pengguna}
                                        </SheetDescription>
                                    </React.Fragment>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full flex items-center justify-center my-32">
                                <div className="pt-12 md:pt-20 flex flex-col items-center">
                                    <Image
                                        src="/illustrations/not-found.png"
                                        alt="Not Found"
                                        width={400}
                                        height={400}
                                        className="w-[400px]"
                                    />
                                    <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 -mt-2">
                                        <h1 className="text-3xl font-calsans leading-[110%] text-black">Akses Ditutup</h1>
                                        <div className="text-gray-600 text-sm text-center max-w-md">
                                            Oopssss Akses Rincian Jawaban dan Soal Peserta Hanya Dapat Diakses oleh Tim Sekretariat DPKAKP
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {!isFetching && (
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="button" onClick={() => onOpenChange(false)} className="mt-2">
                                Close
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default HistoryJawabanuserUjian
