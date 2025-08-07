'use client'

import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { dpkakpBaseUrl } from "@/constants/urls";
import Toast from "@/components/toast";

interface RemedialActionProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedIdUjian: number;
    setSelectedIdUjian: (id: number) => void;
    refetchUjian: () => void;
}

const RemedialAction: React.FC<RemedialActionProps> = ({
    open,
    setOpen,
    selectedIdUjian,
    setSelectedIdUjian,
    refetchUjian,
}) => {
    const [waktuRemedial, setWaktuRemedial] = React.useState("");
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleRemedial = async () => {
        setIsProcessing(true);
        try {
            const response = await axios.post(
                `${dpkakpBaseUrl}/adminPusat/getRemedial`,
                {
                    id_ujian: selectedIdUjian.toString(),
                    waktu_code_ujian: waktuRemedial,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("XSRF095")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response);

            Toast.fire({
                icon: "success",
                title: "Yeayyy!",
                text: `Berhasil mengatur jadwal remedial!`,
            });

            refetchUjian();
            setSelectedIdUjian(0);
            setOpen(false);
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: "Oopsss!",
                text: `Gagal mengatur jadwal remedial!`,
            });
            refetchUjian();
            setSelectedIdUjian(0);
            setOpen(false);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-md">
                <>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remedial Pelaksaan Ujian</AlertDialogTitle>
                        <AlertDialogDescription className="-mt-2">
                            Proses ini mengharuskan PUKAKP untuk menginput waktu pelaksanaan
                            remedial. Kode akses peserta ujian sebelumnya dapat diakses kembali
                            jika memang peserta bersangkutan mendapatkan remedial.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <fieldset>
                        <div className="flex gap-2 mb-1 w-full">
                            <div className="w-full">
                                <label
                                    htmlFor="waktuRemedial"
                                    className="block text-gray-800 text-sm font-medium mb-1"
                                >
                                    Waktu Remedial <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    id="waktuRemedial"
                                    type="text"
                                    required
                                    value={waktuRemedial}
                                    onChange={(e) => setWaktuRemedial(e.target.value)}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <p className="text-gray-700 text-xs">
                        *Hanya mengganti tanggal dan waktu saja!
                    </p>
                    <p className="text-rose-500 text-xs -mt-3">
                        *Pastikan rekapitulasi penilaian sebelumnya telah didownload karena
                        nilai remedi ini akan menimpa nilai awal.
                    </p>
                </>
                <AlertDialogFooter>
                    {!isProcessing && (
                        <AlertDialogCancel onClick={() => setOpen(false)}>
                            Cancel
                        </AlertDialogCancel>
                    )}
                    <AlertDialogAction onClick={handleRemedial}>
                        {isProcessing ? "Processing..." : "Lakukan Remedial"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default RemedialAction;
