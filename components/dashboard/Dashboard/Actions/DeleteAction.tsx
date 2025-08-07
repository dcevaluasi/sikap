"use client";

import React from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Trash } from "lucide-react";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Toast from "@/components/toast";
import { dpkakpBaseUrl } from "@/constants/urls";

interface Props {
    idUjian: string;
    status: string;
    refetchUjian: () => void;
}

const DeleteAction: React.FC<Props> = ({
    idUjian,
    status,
    refetchUjian,
}) => {
    const pathname = usePathname();
    const isVisible = pathname.includes("pukakp") && status === "Draft";

    const handleDeleteUjian = async () => {
        try {
            const response = await axios.delete(
                `${dpkakpBaseUrl}/adminPusat/deleteUjians?id=${idUjian}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("XSRF095")}`,
                    },
                }
            );

            console.log(response);
            Toast.fire({
                icon: "success",
                title:
                    "Berhasil menghapus draft pengajuan permohonan pelaksanaan ujian!",
            });
            refetchUjian();
        } catch (error) {
            Toast.fire({
                icon: "error",
                title:
                    "Ups, gagal menghapus draft pengajuan permohonan pelaksanaan ujian!",
            });
            refetchUjian();
        }
    };

    if (!isVisible) return null;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-rose-600 text-white hover:text-white hover:bg-rose-600"
                >
                    <Trash className="h-4 w-4 text-white mr-1" />
                    Hapus Ujian
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah kamu yakin menghapus ujian ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Penghapusan data ini akan dilakukan secara permanen, sehingga anda
                        tidak dapat kembali melakukan undo terkait tindakan ini!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteUjian}
                        className="bg-rose-600"
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAction
