'use client'

import Image from "next/image";
import React from "react";
import { Ujian, UsersUjian } from "@/types/ujian-keahlian-akp";
import { UserInformationDPKAKP } from "@/types/dpkakp";

/* ------------------------------------------------------------------ */
/*  Kop surat (logo + nama lengkap Kementerian), ukuran bisa diatur     */
/* ------------------------------------------------------------------ */

export interface KopSize {
    /** Logo width/height in mm. */
    logo?: number;
    /** Ministry name font size in pt. */
    title?: number;
    /** Address font size in pt. */
    address?: number;
    /** Show the address / contact lines. */
    showAddress?: boolean;
}

const DEFAULT_KOP: Required<KopSize> = {
    logo: 13,
    title: 7.5,
    address: 5.5,
    showAddress: true,
};

export const KopKartu: React.FC<{ size?: KopSize }> = ({ size }) => {
    const { logo, title, address, showAddress } = { ...DEFAULT_KOP, ...size };
    const logoStyle = { width: `${logo}mm`, height: `${logo}mm` };

    return (
        <div className="flex w-full items-center justify-center gap-[3mm] border-b border-gray-600 pb-[1.5mm]">
            <Image
                className="block shrink-0 object-contain"
                style={logoStyle}
                src="/logo-kkp.png"
                width={0}
                height={0}
                alt="KKP Logo"
                unoptimized
            />
            <div className="flex flex-col items-center text-center">
                <h1 className="font-normal text-gray-800 leading-[115%]" style={{ fontSize: `${title}pt` }}>
                    KEMENTERIAN KELAUTAN DAN PERIKANAN <br />
                    BADAN PENYULUHAN DAN PENGEMBANGAN <br />
                    SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN <br />
                    <span className="font-bold">DEWAN PENGUJI KEAHLIAN AWAK KAPAL PERIKANAN</span>
                </h1>
                {showAddress ? (
                    <p className="mt-[0.8mm] leading-[115%] text-gray-600" style={{ fontSize: `${address}pt` }}>
                        GEDUNG MINA BAHARI III Lt.5, JALAN MEDAN MERDEKA TIMUR NOMOR 16 JAKARTA 10110 <br />
                        KOTAK POS 4130 JKP 10041 TELEPON (021) 3519070 (LACAK), FAKSIMILE (021) 3513287 <br />
                        LAMAN <span className="text-blue-600 underline">https://dpkakp.kkp.go.id</span> SUREL{" "}
                        <span className="text-blue-600 underline">dpkakp@kkp.go.id</span>
                    </p>
                ) : null}
            </div>
            <Image
                className="block shrink-0 object-contain"
                style={logoStyle}
                src="/lembaga/logo/logo-sertifikasi-akp.png"
                width={0}
                height={0}
                alt="DPKAKP Logo"
                unoptimized
            />
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Rewarding, Updating and TRYOUT exams have a single bagian per function. */
const isSingleBagianExam = (type = "") =>
    ["Rewarding", "Updating", "TRYOUT"].some((t) => type.includes(t));

/** Only ATKAPIN I (Updating) has a fourth function (F4). */
const hasF4Exam = (type = "") => type === "ATKAPIN I (Updating)";

/** Level II exams (ANKAPIN II / ATKAPIN II) have no F1B3. */
const isLevelTwoExam = (type = "") => type === "ANKAPIN II" || type === "ATKAPIN II";

/** Bagian labels shown on the card, in order. They match CodeAksesUsersBagian.NamaBagian. */
const getBagianLabels = (type: string): string[] => {
    if (isSingleBagianExam(type)) {
        return ["F1", "F2", "F3", ...(hasF4Exam(type) ? ["F4"] : [])];
    }
    return [
        "F1B1",
        "F1B2",
        ...(isLevelTwoExam(type) ? [] : ["F1B3"]),
        "F2B1",
        "F3B1",
        "F3B2",
    ];
};

const normalize = (s = "") => s.trim().toUpperCase();

/** Keeps background colours when printing / saving as PDF. */
const PRINT_EXACT = "[print-color-adjust:exact] [-webkit-print-color-adjust:exact]";

/* A4 portrait: 297mm - 2 x 10mm margin - 2 x 4mm gap = 269mm -> 3 cards of 89mm. */
const CARD_HEIGHT = "h-[89mm]";
const CARDS_PER_PAGE = 3;

/* ------------------------------------------------------------------ */
/*  Kartu peserta                                                       */
/* ------------------------------------------------------------------ */

interface CardProps {
    peserta: UsersUjian;
    dataUjian: Ujian[];
    dataPukakp: UserInformationDPKAKP | null;
    generateTanggalPelatihan: (dateStr: string) => string;
    /** Customize the kop surat size. */
    kop?: KopSize;
}

export const KartuUserUjian: React.FC<CardProps> = ({
    peserta,
    dataUjian,
    dataPukakp,
    generateTanggalPelatihan,
    kop,
}) => {
    const ujian = dataUjian[0];
    const type = ujian?.TypeUjian || "";
    const isAtkapin = type.includes("ATKAPIN");
    const labels = getBagianLabels(type);

    const aksesBagian = peserta?.CodeAksesUsersBagian || [];

    // Match each label to its access code by NamaBagian; fall back to order if names don't match.
    const byName = new Map(aksesBagian.map((a) => [normalize(a.NamaBagian), a.KodeAkses]));
    const anyNameMatches = labels.some((l) => byName.has(normalize(l)));
    const kodeFor = (label: string, idx: number) =>
        (anyNameMatches ? byName.get(normalize(label)) : aksesBagian[idx]?.KodeAkses) || "-";

    const accent = isAtkapin
        ? { badge: "bg-rose-50 text-rose-700 border-rose-300", head: "bg-rose-600", bar: "bg-rose-600" }
        : { badge: "bg-blue-50 text-blue-700 border-blue-300", head: "bg-blue-600", bar: "bg-blue-600" };

    const biodata = [
        { label: "Nama", value: peserta?.Nama },
        { label: "NIK", value: peserta?.Nik },
        {
            label: "Tempat, Tgl Lahir",
            value: `${peserta?.TempatLahir || "-"}, ${peserta?.TanggalLahir || "-"}`,
        },
        { label: "Instansi", value: peserta?.Instansi },
    ];

    return (
        <div
            className={`${CARD_HEIGHT} w-full flex overflow-hidden rounded-md border border-gray-400 bg-white text-[8.5pt] leading-tight break-inside-avoid ${PRINT_EXACT}`}
        >
            <div className={`w-[2mm] shrink-0 ${accent.bar}`} />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Kop surat, lebar penuh */}
                <div className="flex flex-col items-center px-[4mm] pt-[2.5mm]">
                    <KopKartu size={kop} />
                    <div
                        className={`mt-[1.5mm] rounded border px-[3mm] py-[0.5mm] text-[8pt] font-bold uppercase tracking-wide text-center ${accent.badge}`}
                    >
                        Kartu Peserta Ujian {type}
                    </div>
                </div>

                <div className="flex flex-1 min-h-0">
                    {/* Kiri: identitas peserta */}
                    <div className="flex-1 flex gap-[3mm] p-[3mm] border-r border-dashed border-gray-300 min-w-0">
                        <div className="flex-1 min-w-0 flex flex-col">
                            <dl className="divide-y divide-gray-200">
                                {biodata.map((item) => (
                                    <div key={item.label} className="grid grid-cols-[24mm_2mm_1fr] py-[0.7mm]">
                                        <dt className="font-semibold text-gray-600">{item.label}</dt>
                                        <dt>:</dt>
                                        <dd className="capitalize text-gray-900 truncate">{item.value || "-"}</dd>
                                    </div>
                                ))}
                            </dl>

                            <div className="mt-auto self-start flex items-baseline gap-[2mm] rounded border border-gray-300 bg-gray-50 px-[2mm] py-[0.7mm]">
                                <span className="text-[7pt] uppercase text-gray-500">No. Ujian</span>
                                <span className="font-mono text-[11pt] font-bold tracking-wider">
                                    {peserta?.NomorUjian || "-"}
                                </span>
                            </div>
                        </div>

                        <div className="w-[20mm] h-[26mm] shrink-0 self-end rounded border border-dashed border-gray-400 flex items-center justify-center text-[7pt] text-gray-400">
                            Pas Foto 3x4
                        </div>
                    </div>

                    {/* Kanan: kode akses + tanda tangan */}
                    <div className="w-[80mm] shrink-0 flex flex-col p-[3mm]">
                        <p className="text-[8pt] font-bold uppercase tracking-wide text-gray-700">Kode Akses Ujian</p>

                        {aksesBagian.length > 0 ? (
                            <div
                                className="mt-[1mm] grid overflow-hidden rounded border border-gray-400"
                                style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
                            >
                                {labels.map((label) => (
                                    <div
                                        key={`h-${label}`}
                                        className={`${accent.head} text-white text-[7.5pt] font-semibold h-[5mm] flex items-center justify-center border-l border-white/40 first:border-l-0`}
                                    >
                                        {label}
                                    </div>
                                ))}
                                {labels.map((label, idx) => (
                                    <div
                                        key={`v-${label}`}
                                        className="h-[7.5mm] flex items-center justify-center border-l border-gray-300 first:border-l-0 font-mono text-[11pt] font-bold tracking-wide"
                                    >
                                        {kodeFor(label, idx)}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-[1mm] rounded border border-dashed border-gray-300 py-[3mm] text-center text-[7.5pt] text-gray-400">
                                Kode akses belum tersedia
                            </div>
                        )}

                        {/* Tanda tangan */}
                        <div className="mt-auto flex flex-col items-start">
                            <p className="capitalize text-gray-700">
                                {ujian?.TempatUjian}, {generateTanggalPelatihan(ujian?.TanggalMulaiUjian)}
                            </p>
                            <p className="font-semibold">
                                Ketua PUKAKP{" "}
                                <span className="font-normal text-[7pt] text-gray-500">{ujian?.PUKAKP}</span>
                            </p>
                            <p className="mt-[7mm] min-w-[50mm] border-b border-black pb-[0.3mm] font-semibold">
                                {dataPukakp?.KetuaPukakp || "Nama"}
                            </p>
                            <p className="text-gray-700">NIP. {dataPukakp?.NipKetua || "-"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Lembar A4: 3 kartu per halaman                                      */
/* ------------------------------------------------------------------ */

interface SheetProps extends Omit<CardProps, "peserta"> {
    pesertas: UsersUjian[];
}

/** Lays the cards out on A4 portrait pages, 3 cards per page, ready for print / Save as PDF. */
export const KartuUjianSheet: React.FC<SheetProps> = ({ pesertas, ...rest }) => {
    const pages: UsersUjian[][] = [];
    for (let i = 0; i < pesertas.length; i += CARDS_PER_PAGE) {
        pages.push(pesertas.slice(i, i + CARDS_PER_PAGE));
    }

    return (
        <>
            <style>{`@page { size: A4 portrait; margin: 0; }`}</style>
            <div className="flex flex-col items-center gap-4 print:gap-0">
                {pages.map((group, pageIdx) => (
                    <div
                        key={pageIdx}
                        className={`w-[210mm] h-[297mm] p-[10mm] flex flex-col gap-[4mm] bg-white shadow print:shadow-none overflow-hidden ${pageIdx < pages.length - 1 ? "break-after-page" : ""
                            }`}
                    >
                        {group.map((peserta) => (
                            <KartuUserUjian key={peserta.IdUserUjian} peserta={peserta} {...rest} />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default KartuUserUjian;