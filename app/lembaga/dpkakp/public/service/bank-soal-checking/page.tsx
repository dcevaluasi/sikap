import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TableDataTipeUjianKeahlianChecking from "@/components/dashboard/Dashboard/DPKAKP/TableDataTipeUjianKeahlianChecking";

export const metadata: Metadata = {
    title: "Bank Soal Ujian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Page() {
    return (
        <main className="bg-darkDPKAKP w-full h-screen relative">
            <Image
                src={"/dpkakp/image3.jpg"}
                className="absolute w-full h-screen z-10 object-cover duration-1000"
                alt=""
                layout="fill"
                priority
            />
            <div className="absolute bg-blue-950 opacity-80 inset-0 z-20"></div>
            <section className="relative h-fit space-y-6 z-50 pb-8 pt-28 md:h-screen md:pb-12 w-full flex items-center justify-center flex-col">
                <div className="container relative flex max-w-[100rem] flex-col items-center gap-2 text-center">
                    <Link
                        href={"/dpkakp"}
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
                    <h1 className="font-bold  font-calsans text-gray-200 text-4xl -mt-2 leading-none">
                        Cek Duplikasi <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r leading-none pt-0 from-blue-500 to-teal-400">
                            Soal Ujian Keahlian
                        </span>
                    </h1>
                </div>
                <section className="flex-1 flex flex-col h-full overflow-y-scroll">
                    <div className="mt-4 md:mt-6 2xl:mt-7.5 h-full"><TableDataTipeUjianKeahlianChecking /></div>
                </section>
            </section>
        </main>

    );
}
