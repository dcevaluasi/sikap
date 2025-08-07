import React from "react";
import { Ujian } from "@/types/ujian-keahlian-akp";

export const JadwalUjianKeahlianAKP = ({ data, ujian }: { data: Ujian[]; ujian: Ujian }) => {
    if (data.length === 0) return null;

    let scheduleItems;

    if (data[0]?.TypeUjian.includes("Rewarding") || data[0]?.TypeUjian.includes('TRYOUT')) {
        scheduleItems = [
            { label: "F1", time: ujian?.WaktuF1 },
            { label: "F2", time: ujian?.WaktuF2 },
            { label: "F3", time: ujian?.WaktuF3 },
        ];
    } else if (data[0]?.TypeUjian == "ANKAPIN II" || data[0]?.TypeUjian == "ATKAPIN II") {
        scheduleItems = [
            { label: "F1B1", time: ujian?.WaktuF1B1 },
            { label: "F1B2", time: ujian?.WaktuF1B2 },
            { label: "F2", time: ujian?.WaktuF2B1 },
            { label: "F3B1", time: ujian?.WaktuF3B1 },
            { label: "F3B2", time: ujian?.WaktuF3B2 },
        ];
    } else {
        scheduleItems = [
            { label: "F1B1", time: ujian?.WaktuF1B1 },
            { label: "F1B2", time: ujian?.WaktuF1B2 },
            { label: "F1B3", time: ujian?.WaktuF1B3 },
            { label: "F2", time: ujian?.WaktuF2B1 },
            { label: "F3B1", time: ujian?.WaktuF3B1 },
            { label: "F3B2", time: ujian?.WaktuF3B2 },
        ];
    }

    return (
        <div className="w-full text-sm grid grid-cols-3 gap-4">
            {scheduleItems.map(({ label, time }) => (
                <React.Fragment key={label}>
                    <div key={label} className="border border-gray-200 p-2 text-center">
                        <span className="font-bold block border-b border-b-gray-200 py-1 mb-1">
                            {label}
                        </span>
                        {time != "" ? time : "-"}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}