import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { FiFile } from "react-icons/fi";

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
import { dpkakpBaseUrl } from "@/constants/urls";
import Toast from "@/components/toast";

interface VerifikasiActionProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedId: number;
    setSelectedId: (id: number) => void;
    selectedSuratPermohonan: string;
    setSelectedSuratPermohonan: (url: string) => void;
    refetchUjian: () => void;
}

const VerifikasiAction: React.FC<VerifikasiActionProps> = ({
    open,
    setOpen,
    selectedId,
    setSelectedId,
    selectedSuratPermohonan,
    setSelectedSuratPermohonan,
    refetchUjian,
}) => {
    const [status, setStatus] = React.useState("");
    const [isValidating, setIsValidating] = React.useState(false);

    const handleValidasi = async () => {
        setIsValidating(true);
        try {
            const response = await axios.put(
                `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${selectedId}`,
                { status: status },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("XSRF095")}`,
                    },
                }
            );

            console.log(response);

            Toast.fire({
                icon: "success",
                title: `Berhasil memvalidasi pelaksanaan ujian keahlian!`,
            });

            refetchUjian();
            setStatus("Tidak Aktif");
            setSelectedId(0);
            setSelectedSuratPermohonan("");
            setOpen(false);
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: `Gagal memvalidasi pelaksanaan ujian keahlian!`,
            });

            refetchUjian();
            setOpen(false);
        } finally {
            setIsValidating(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-md">
                <>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Verifikasi Pelaksanaan Ujian</AlertDialogTitle>
                        <AlertDialogDescription className="-mt-2">
                            Proses verifikasi diperlukan untuk melihat permohonan pelaksanaan serta
                            membuat akses PUKAKP melakukan import data peserta pada aplikasi
                            untuk persiapan ujian.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <fieldset>
                        <div className="flex gap-2 mb-1 w-full">
                            <div className="w-full">
                                <label
                                    className="block text-gray-800 text-sm font-medium mb-1"
                                    htmlFor="statusPelaksanaan"
                                >
                                    Status Pelaksanaan <span className="text-red-600">*</span>
                                </label>
                                <div className="flex w-full gap-2">
                                    <select
                                        id="statusPelaksanaan"
                                        onChange={(e) => setStatus(e.target.value)}
                                        value={status}
                                        className="w-full overflow-hidden rounded-lg border border-gray-300"
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="Aktif">Valid</option>
                                        <option value="Tidak Aktif">Tidak Valid</option>
                                    </select>

                                    <Link
                                        target="_blank"
                                        href={selectedSuratPermohonan}
                                        className="border border-gray-300 rounded-md bg-white shadow-sm w-14 flex items-center justify-center h-12"
                                    >
                                        <FiFile className="h-4 w-4 text-gray-800 text-xl" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <p className="text-gray-700 text-xs mt-1">
                        *Periksa terlebih dahulu surat permohonan pada tombol surat sebelum
                        melakukan verifikasi.
                    </p>
                </>
                <AlertDialogFooter>
                    {!isValidating && (
                        <AlertDialogCancel onClick={() => setOpen(false)}>
                            Cancel
                        </AlertDialogCancel>
                    )}
                    <AlertDialogAction onClick={handleValidasi}>
                        {isValidating ? "Memverifikasi..." : "Verifikasi"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default VerifikasiAction;
