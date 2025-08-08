'use client'

import Image from "next/image"
import React from "react"

const HeaderDPAKP: React.FC = () => {
    return (
        <div className="flex flex-row gap-2 items-center justify-center pb-4 border-b border-b-gray-600 md:px-0 -mt-2 w-full">
            <Image
                className="block w-16 h-16"
                src="/logo-kkp.png"
                width={0}
                height={0}
                alt="KKP Logo"
                unoptimized
            />
            <div className="flex flex-col gap-1 items-center justify-center text-center">
                <h1 className="font-normal text-gray-800 text-sm md:text-lg leading-[110%] mb-5 mt-2">
                    KEMENTERIAN KELAUTAN DAN PERIKANAN <br />
                    BADAN PENYULUHAN DAN PENGEMBANGAN <br />
                    SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN <br />
                    <span className="font-bold">
                        DEWAN PENGUJI KEAHLIAN AWAK KAPAL PERIKANAN
                    </span>
                </h1>
                <p className="font-jakarta max-w-[42rem] leading-[95%] text-gray-600 text-sm -mt-5">
                    GEDUNG MINA BAHARI III Lt.5, JALAN MEDAN MERDEKA TIMUR NOMOR 16 JAKARTA 10110 <br />
                    KOTAK POS 4130 JKP 10041 TELEPON (021) 3519070 (LACAK), FAKSIMILE (021) 3513287 <br />
                    LAMAN{" "}
                    <a href="https://dpkakp.kkp.go.id" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        https://dpkakp.kkp.go.id
                    </a>{" "}
                    SUREL{" "}
                    <a href="mailto:dpkakp@kkp.go.id" className="text-blue-500 underline">
                        dpkakp@kkp.go.id
                    </a>
                </p>
            </div>
            <Image
                className="block w-16 h-16"
                src="/lembaga/logo/logo-sertifikasi-akp.png"
                width={0}
                height={0}
                alt="DPKAKP Logo"
                unoptimized
            />
        </div>
    )
}

export default HeaderDPAKP
