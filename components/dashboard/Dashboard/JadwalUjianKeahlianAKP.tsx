"use client"

import React from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { FiEdit2 } from "react-icons/fi"
import { Ujian } from "@/types/ujian-keahlian-akp"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Toast from "@/components/toast"
import { dpkakpBaseUrl } from "@/constants/urls"

type ScheduleItem = {
    label: string
    field: keyof Ujian
    bodyKey: string
}

export const JadwalUjianKeahlianAKP = ({
    data,
    ujian,
    onUpdated,
}: {
    data: Ujian[]
    ujian: Ujian
    onUpdated?: () => void
}) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [isSaving, setIsSaving] = React.useState(false)
    const [values, setValues] = React.useState<Record<string, string>>({})

    if (data.length === 0) return null

    let scheduleItems: ScheduleItem[]

    if (
        ujian?.TypeUjian.includes("Rewarding") ||
        ujian?.TypeUjian.toLowerCase().includes("tryout")
    ) {
        scheduleItems = [
            { label: "F1", field: "WaktuF1", bodyKey: "waktu_f1" },
            { label: "F2", field: "WaktuF2", bodyKey: "waktu_f2" },
            { label: "F3", field: "WaktuF3", bodyKey: "waktu_f3" },
        ]
    } else if (
        ujian?.TypeUjian === "ANKAPIN II" ||
        ujian?.TypeUjian === "ATKAPIN II"
    ) {
        scheduleItems = [
            { label: "F1B1", field: "WaktuF1B1", bodyKey: "waktu_f1_b1" },
            { label: "F1B2", field: "WaktuF1B2", bodyKey: "waktu_f1_b2" },
            { label: "F2", field: "WaktuF2B1", bodyKey: "waktu_f2_b1" },
            { label: "F3B1", field: "WaktuF3B1", bodyKey: "waktu_f3_b1" },
            { label: "F3B2", field: "WaktuF3B2", bodyKey: "waktu_f3_b2" },
        ]
    } else {
        scheduleItems = [
            { label: "F1B1", field: "WaktuF1B1", bodyKey: "waktu_f1_b1" },
            { label: "F1B2", field: "WaktuF1B2", bodyKey: "waktu_f1_b2" },
            { label: "F1B3", field: "WaktuF1B3", bodyKey: "waktu_f1_b3" },
            { label: "F2", field: "WaktuF2B1", bodyKey: "waktu_f2_b1" },
            { label: "F3B1", field: "WaktuF3B1", bodyKey: "waktu_f3_b1" },
            { label: "F3B2", field: "WaktuF3B2", bodyKey: "waktu_f3_b2" },
        ]
    }

    const handleStartEdit = () => {
        const initial: Record<string, string> = {}
        scheduleItems.forEach(({ field }) => {
            initial[field as string] = (ujian?.[field] as string) ?? ""
        })
        setValues(initial)
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setValues({})
    }

    const handleChange = (field: keyof Ujian, value: string) => {
        setValues((prev) => ({ ...prev, [field as string]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)

        const body: Record<string, string> = {}
        scheduleItems.forEach(({ field, bodyKey }) => {
            body[bodyKey] = values[field as string] ?? ""
        })

        try {
            await axios.put(
                `${dpkakpBaseUrl}/adminPusat/updateWaktuUjian?id=${ujian.IdUjian}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("XSRF095")}`,
                    },
                }
            )
            Toast.fire({
                icon: "success",
                title: "Berhasil memperbarui waktu ujian!",
            })
            setIsEditing(false)
            onUpdated?.()
        } catch (error) {
            console.error(error)
            Toast.fire({
                icon: "error",
                title: "Gagal memperbarui waktu ujian!",
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                {!isEditing ? (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleStartEdit}
                        className="gap-1"
                    >
                        <FiEdit2 className="h-3.5 w-3.5" /> Edit Waktu
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            disabled={isSaving}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {scheduleItems.map(({ label, field }) => (
                    <div
                        key={label}
                        className="rounded-lg border border-zinc-200 shadow-sm bg-white px-4 py-3 text-center"
                    >
                        <div className="text-xs uppercase tracking-wide text-zinc-500 mb-1">
                            {label}
                        </div>
                        {isEditing ? (
                            <Input
                                type="text"
                                value={values[field as string] ?? ""}
                                onChange={(e) => handleChange(field, e.target.value)}
                                placeholder="YYYY-MM-DD HH:mm:ss +0700 WIB"
                                className="text-sm text-center"
                            />
                        ) : (
                            <div className="text-sm font-medium text-zinc-800">
                                {(ujian?.[field] as string)?.trim()
                                    ? (ujian?.[field] as string)
                                    : "-"}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
