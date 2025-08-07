"use client"

import React from "react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FaEye } from "react-icons/fa"
import {
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    UserIcon,
    FileTextIcon,
    X,
} from "lucide-react"
import { Ujian } from "@/types/ujian-keahlian-akp"
import { generateTanggalPelatihan } from "@/utils/text"
import { JadwalUjianKeahlianAKP } from "../JadwalUjianKeahlianAKP"
import dayjs from "dayjs"
import { IoInformation } from "react-icons/io5"

interface InformationActionProps {
    ujian: Ujian
    data: Ujian[]
}

export function InformationAction({ ujian, data }: InformationActionProps) {
    const pengawas = ujian.NamaPengawasUjian?.split("|") || []
    const fasilitator = ujian.NamaVasilitatorUjian?.split("|") || []
    const [open, setOpen] = React.useState(false)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>

                <Button
                    variant="outline"
                    className="bg-gray-800 hover:bg-gray-800 hover:text-white text-white rounded-md w-full"
                >
                    <IoInformation className="h-4 w-4 mr-1" /> Informasi Ujian
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-4xl w-full rounded-xl bg-white shadow-2xl border border-zinc-200 p-0 overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-zinc-100 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div>
                        <AlertDialogTitle className="text-2xl font-semibold text-blue-900">
                            Detail Ujian
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-zinc-500 mt-1">
                            Tinjau informasi lengkap ujian keahlian
                        </AlertDialogDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(false)}
                        className="text-zinc-500 hover:text-zinc-800"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 bg-white">
                    <CardSection title="Informasi Umum">
                        <TwoColumn label="Nama Ujian" value={ujian.NamaUjian} />
                        <TwoColumn label="Jenis Ujian" value={ujian.TypeUjian} />
                        <TwoColumn
                            label="Tanggal"
                            value={`${generateTanggalPelatihan(ujian.TanggalMulaiUjian)} s.d ${generateTanggalPelatihan(
                                ujian.TanggalBerakhirUjian
                            )}`}
                            icon={<CalendarIcon className="w-4 h-4 text-purple-400" />}
                        />

                        <TwoColumn label="Tempat Ujian" value={ujian.TempatUjian || "-"} icon={<MapPinIcon className="w-4 h-4 text-blue-400" />} />
                        <TwoColumn label="Jumlah Peserta" value={ujian.JumlahPesertaUjian.toString()} />
                    </CardSection>

                    <CardSection title="Penguji & Fasilitator">
                        <LabelGroup label="Penguji" values={pengawas} icon={<UserIcon className="w-3 h-3 mr-1" />} />
                        <LabelGroup label="Fasilitator" values={fasilitator} icon={<UserIcon className="w-3 h-3 mr-1" />} />
                    </CardSection>

                    <CardSection title="Jadwal Ujian">
                        <JadwalUjianKeahlianAKP data={data} ujian={ujian} />
                    </CardSection>

                    <CardSection title="Status & Berkas">
                        <TwoColumn
                            label="Status Verifikasi"
                            value={<Badge variant="outline">{ujian.Status || "Belum Diverifikasi"}</Badge>}
                        />
                        <TwoColumn
                            label="Berkas Permohonan"
                            value={
                                ujian.FilePermohonan ? (
                                    <a
                                        href={ujian.FilePermohonan}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline hover:text-blue-800 flex items-center gap-1"
                                    >
                                        <FileTextIcon className="w-4 h-4" />
                                        Lihat File
                                    </a>
                                ) : (
                                    "-"
                                )
                            }
                        />
                    </CardSection>

                    <CardSection title="Meta Data">
                        <TwoColumn
                            label="Dibuat Pada"
                            value={dayjs(ujian.CreateAt).format("DD MMM YYYY HH:mm")}
                        />
                        <TwoColumn
                            label="Diperbarui Pada"
                            value={dayjs(ujian.UpdateAt).format("DD MMM YYYY HH:mm")}
                        />
                        <TwoColumn label="Selesai?" value={ujian.IsSelesai === "true" ? "✅ Ya" : "❌ Belum"} />
                    </CardSection>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

// Section with border
function CardSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="bg-zinc-50 border border-zinc-200 rounded-md p-4 shadow-sm">
            <h3 className="text-sm font-bold text-blue-500 mb-3 uppercase tracking-wide">
                {title}
            </h3>
            <div className="space-y-2">{children}</div>
        </section>
    )
}

// Row with icon and value
function TwoColumn({
    label,
    value,
    icon,
}: {
    label: string
    value: React.ReactNode
    icon?: React.ReactNode
}) {
    return (
        <div className="flex items-center justify-between text-sm text-zinc-700 border-b border-dashed border-zinc-200 py-1">
            <span className="flex items-center gap-2 text-zinc-500">
                {icon}
                {label}
            </span>
            <span className="font-medium text-zinc-800">{value}</span>
        </div>
    )
}

// Badge group for pengawas/fasilitator
function LabelGroup({
    label,
    values,
    icon,
}: {
    label: string
    values: string[]
    icon: React.ReactNode
}) {
    return (
        <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-600">{label}</p>
            {values.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {values.map((val, idx) => (
                        <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs px-2 py-1 flex items-center bg-blue-50 border text-blue-500 border-blue-200 hover:bg-blue-100 transition"
                        >
                            {icon}
                            {val.trim()}
                        </Badge>
                    ))}
                </div>
            ) : (
                <p className="text-zinc-400">Belum ada data</p>
            )}
        </div>
    )
}
