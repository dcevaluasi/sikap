import React from "react";
import { Ujian, UsersUjian } from "@/types/ujian-keahlian-akp";
import { UserInformationDPKAKP } from "@/types/dpkakp";
import HeaderDPAKP from "./HeaderDPKAKP";

interface Props {
    peserta: UsersUjian;
    dataUjian: Ujian[];
    dataPukakp: UserInformationDPKAKP | null;
    generateTanggalPelatihan: (dateStr: string) => string;
}

const KartuUserUjian: React.FC<Props> = ({
    peserta,
    dataUjian,
    dataPukakp,
    generateTanggalPelatihan,
}) => {
    const type = dataUjian[0]?.TypeUjian || "";
    const isRewarding = type.includes("Rewarding") || type.includes("TRYOUT");
    const isShortType = type === "ANKAPIN II" || type === "ATKAPIN II";

    const aksesBagian = peserta?.CodeAksesUsersBagian || [];

    return (
        <div className="flex w-full gap-2">
            {/* Kartu Kiri */}
            <div className="w-full border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                <HeaderDPAKP />

                <div
                    className={`flex items-center justify-center w-fit rounded-md px-2 py-2 border ${type.includes("ATKAPIN") ? "border-rose-500 bg-rose-500 text-rose-600" : "border-blue-500 bg-blue-500 text-blue-600"
                        } bg-opacity-20 font-medium mt-5 text-lg`}
                >
                    KARTU PESERTA UJIAN {type}
                </div>

                <div className="ml-0 text-left capitalize w-full mt-2">
                    {[
                        { label: "Nama", value: peserta.Nama },
                        { label: "NIK", value: peserta.Nik },
                        {
                            label: "Tempat, Tanggal Lahir",
                            value: `${peserta.TempatLahir}, ${peserta.TanggalLahir}`,
                        },
                        { label: "Asal Sekolah/Instansi", value: peserta.Instansi },
                    ].map((item) => (
                        <p key={item.label} className="text-base font-semibold tracking-tight leading-none border-b py-2 border-b-gray-200">
                            {item.label} : <span className="font-normal">{item.value}</span>
                        </p>
                    ))}
                </div>

                <div className="flex flex-col gap">
                    <div className="flex items-center justify-center w-fit rounded-md px-2 py-2 border border-gray-300 bg-neutral-200 bg-opacity-20 font-medium mt-5 text-base uppercase">
                        <p className="text-sm">Nomor Ujian :</p>
                        <p className="font-semibold ml-2">{peserta?.NomorUjian}</p>
                    </div>
                </div>

                {/* TTD Kiri */}
                <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                    <div className="flex flex-col gap-1 capitalize">
                        <p className="capitalize text-base">
                            {dataUjian[0]?.TempatUjian},{" "}
                            {generateTanggalPelatihan(dataUjian[0]?.TanggalMulaiUjian)}
                        </p>
                        <p className="font-semibold text-base">Ketua PUKAKP</p>
                        <p className="text-xs">{dataUjian[0]?.PUKAKP}</p>

                        <p className="text-base border-b-black border-b mt-14">
                            {dataPukakp?.KetuaPukakp || "Nama"}
                        </p>
                        <p className="text-base ">
                            NIP. {dataPukakp?.NipKetua || ""}
                        </p>
                    </div>
                    <div className="w-35 h-40 rounded-md border border-gray-300"></div>
                </div>
            </div>

            {/* Kartu Kanan */}
            <div className="w-full border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                {aksesBagian.length > 0 && (
                    <div className="flex flex-col w-full border-t border-r border-gray-400 mt-6 rounded-md">
                        {/* Header */}
                        <div className="flex flex-shrink-0 bg-neutral-500 text-white">
                            {(isRewarding ? ["F1", "F2", "F3"] : ["F1B1", "F1B2", ...(isShortType ? [] : ["F1B3"]), "F2B1", "F3B1", "F3B2"]).map(
                                (label, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center ${label === "F1B3" && isShortType ? "hidden" : ""
                                            }`}
                                    >
                                        <span>{label}</span>
                                    </div>
                                )
                            )}
                        </div>
                        {/* Values */}
                        <div className="overflow-auto">
                            <div className="flex flex-shrink-0">
                                {aksesBagian.map((bagian, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center ${(idx === 2 && isShortType) ? "hidden" : ""
                                            }`}
                                    >
                                        <span className="text-2xl">{bagian.KodeAkses}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TTD Kanan */}
                <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                    <div className="flex flex-col gap-1 capitalize">
                        <p className="capitalize text-base">
                            {dataUjian[0]?.TempatUjian},{" "}
                            {generateTanggalPelatihan(dataUjian[0]?.TanggalMulaiUjian)}
                        </p>
                        <p className="font-semibold text-base">Ketua PUKAKP</p>
                        <p className="text-xs">{dataUjian[0]?.PUKAKP}</p>

                        <p className="text-base border-b-black border-b mt-14">
                            {dataPukakp?.KetuaPukakp || "Nama"}
                        </p>
                        <p className="text-base ">
                            NIP. {dataPukakp?.NipKetua || ""}
                        </p>
                    </div>
                    <div className="w-35 h-40 rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default KartuUserUjian;
