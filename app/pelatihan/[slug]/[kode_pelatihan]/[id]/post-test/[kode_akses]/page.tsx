'use client'

import Toast from '@/components/toast'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import Countdown from 'react-countdown'
import { TbClock } from 'react-icons/tb'

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
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { useRouter } from 'next/navigation'


function Page() {
    // React.useEffect(() => {
    //     const handleBeforeUnload = (event: any) => {
    //         event.preventDefault();
    //         event.returnValue = '';
    //         return '';
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);

    // React.useEffect(() => {
    //     const handleBlur = () => {
    //         alert('JIka kamu membuka tab, kamu melakukan kecurangan dan akan diskualifikasi secara otomatis!.');
    //     };

    //     window.addEventListener('blur', handleBlur);

    //     return () => {
    //         window.removeEventListener('blur', handleBlur);
    //     };
    // }, []);

    type SoalUser = {
        Soal: Soal[];
        jumlah: number;
    }

    type Soal = {
        CreateAt: string;
        UpdateAt: string;
        IdLemdik: number;
        IdPelatihan: number;
        IdSoalUjian: number;
        Jawaban: Jawaban[];
        Soal: string;
        Status: string;
    }

    type Jawaban = {
        CreateAt: string;
        IdJawaban: number;
        IdSoalUjian: number;
        NameJawaban: string;
        Status: string;
        UpdateAt: string;
    }

    type JawabanUser = {
        id_soal_lemdik: string;
        jawaban_pengguna: string;
    }

    const [soalUser, setSoalUser] = React.useState<SoalUser | null>(null)
    const [selectedIdSoal, setSelectedIdSoal] = React.useState<number>(0)
    const [countSoal, setCountSoal] = React.useState<number>(1)
    const countdownEndTimeRef = React.useRef<number>(Date.now() + (900000))

    const [selectedAnswers, setSelectedAnswers] = React.useState<JawabanUser[]>([]);

    const handleAnswerChange = (idSoal: string, jawabanPengguna: string) => {
        setSelectedAnswers(prevAnswers => {
            const updatedAnswers = prevAnswers.filter(answer => answer.id_soal_lemdik !== idSoal);
            updatedAnswers.push({ id_soal_lemdik: idSoal, jawaban_pengguna: jawabanPengguna });
            return updatedAnswers;
        });


    };

    const [isSubmitForm, setIsSubmitForm] = React.useState<boolean>(false)
    const router = useRouter()

    const handleSubmitExam = async (e: any) => {
        console.log(JSON.stringify(selectedAnswers))
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/lemdik/SumbitExam`, selectedAnswers, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('XSRF089999')}`
                }
            })
            console.log('SUBMIT SOAL USER : ', response)
            Toast.fire({
                icon: "success",
                title: `Berhasil mensubmit jawaban post-test mu, silahkan lihat score pada dashboard pelatihanmu!`,
            });
            router.replace('/dashboard')
        } catch (e) {
            console.log('ERROR SUBMIT SOAL USER : ', e)
            Toast.fire({
                icon: "error",
                title: `Kesalahan di server, gagal mensubmit jawaban post-test mu!`,
            });
        }
    }

    console.log({ selectedAnswers })

    const handleFetchingSoalUsers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/lemdik/getSoalUsers`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('XSRF089999')}`
                }
            })
            setSoalUser(response.data)
            console.log('FETCH SOAL USER : ', response)
        } catch (e) {
            console.log('ERROR FETCH SOAL USER : ', e)
        }
    }

    const [isChecked, setIsChecked] = React.useState<boolean>(false)

    React.useEffect(() => {
        handleFetchingSoalUsers()
    }, [])

    return (
        <section className='w-full h-screen bg-gray-900 grid items-center justify-center text-white relative'>
            {
                <>
                    <div className="absolute w-fit flex gap-2 top-5 right-5 text-2xl font-medium text-white items-center">
                        <TbClock />

                        <Countdown date={countdownEndTimeRef.current} />
                    </div>
                    <div className="rounded-md h-[400px] w-[430px] px-6 py-10">
                        <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-2xl">Soal No. {selectedIdSoal + 1}</h2>
                        <h3 className="text-white leading-[110%] text-2xl font-semibold">
                            {soalUser! && soalUser!.Soal[selectedIdSoal]!.Soal} ?
                        </h3>
                        <div className="flex flex-col items-start justify-start gap-1 mt-5">
                            {
                                soalUser! && soalUser!.Soal[selectedIdSoal]!.Jawaban!.slice(1).map((jawaban: Jawaban, index: number) => (
                                    <div key={index} className="flex items-start w-full mb-4 text-gray-360">
                                        <input id={`radio-${selectedIdSoal}-${index}`} type="radio" value={jawaban.NameJawaban} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 " onChange={() => handleAnswerChange(soalUser!.Soal[selectedIdSoal]!.IdSoalUjian.toString(), jawaban.NameJawaban)} />
                                        <label htmlFor={`radio-${selectedIdSoal}-${index}`} className="ms-2 -mt-1 text-lg font-medium text-white " >{index == 0 ? 'A' : index == 1 ? 'B' : index == 2 ? 'C' : 'D'}. {jawaban!.NameJawaban!}</label>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex w-full items-center justify-end">
                            {soalUser! && soalUser!.Soal!.length == countSoal ? <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className='w-fit text-lg p-4 bg-blue-500 hover:bg-blue-600' >Submit</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Kamu yakin akan mensubmit jawaban?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Jika kamu mensubmit jawaban, kamu akan segera mendapatkan nilai dari pengerjaan post-test ini
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={(e) => handleSubmitExam(e)}>Submit</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog> : <Button className='w-fit text-lg p-4 bg-blue-500 hover:bg-blue-600' onClick={(e) => { setSelectedIdSoal(selectedIdSoal + 1); setCountSoal(countSoal + 1); setIsChecked(!isChecked) }} >Selanjutnya</Button>}

                        </div>
                    </div></>
            }
        </section>
    )
}

export default Page
