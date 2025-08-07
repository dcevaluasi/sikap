import React from "react"
import { Ujian } from "@/types/ujian-keahlian-akp"

export const JadwalUjianKeahlianAKP = ({
    data,
    ujian,
}: {
    data: Ujian[]
    ujian: Ujian
}) => {
    if (data.length === 0) return null

    let scheduleItems

    if (
        ujian?.TypeUjian.includes("Rewarding") ||
        ujian?.TypeUjian.toLowerCase().includes("tryout")
    ) {
        scheduleItems = [
            { label: "F1", time: ujian?.WaktuF1 },
            { label: "F2", time: ujian?.WaktuF2 },
            { label: "F3", time: ujian?.WaktuF3 },
        ]
    } else if (
        ujian?.TypeUjian === "ANKAPIN II" ||
        ujian?.TypeUjian === "ATKAPIN II"
    ) {
        scheduleItems = [
            { label: "F1B1", time: ujian?.WaktuF1B1 },
            { label: "F1B2", time: ujian?.WaktuF1B2 },
            { label: "F2", time: ujian?.WaktuF2B1 },
            { label: "F3B1", time: ujian?.WaktuF3B1 },
            { label: "F3B2", time: ujian?.WaktuF3B2 },
        ]
    } else {
        scheduleItems = [
            { label: "F1B1", time: ujian?.WaktuF1B1 },
            { label: "F1B2", time: ujian?.WaktuF1B2 },
            { label: "F1B3", time: ujian?.WaktuF1B3 },
            { label: "F2", time: ujian?.WaktuF2B1 },
            { label: "F3B1", time: ujian?.WaktuF3B1 },
            { label: "F3B2", time: ujian?.WaktuF3B2 },
        ]
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {scheduleItems.map(({ label, time }) => (
                <div
                    key={label}
                    className="rounded-lg border border-zinc-200 shadow-sm bg-white px-4 py-3 text-center"
                >
                    <div className="text-xs uppercase tracking-wide text-zinc-500 mb-1">
                        {label}
                    </div>
                    <div className="text-sm font-medium text-zinc-800">
                        {time?.trim() ? time : "-"}
                    </div>
                </div>
            ))}
        </div>
    )
}
