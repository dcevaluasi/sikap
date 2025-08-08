import React from "react";
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
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import Link from "next/link";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (e: React.FormEvent) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImportAction: React.FC<Props> = ({
    isOpen,
    onClose,
    onUpload,
    onFileChange,
}) => {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <HiMiniUserGroup className="h-4 w-4" />
                        Import Peserta Ujian
                    </AlertDialogTitle>
                    <AlertDialogDescription className="-mt-2">
                        Import peserta yang akan mengikuti ujian keahlian!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <fieldset>
                    <form autoComplete="off">
                        <div className="flex flex-wrap -mx-3 mb-1">
                            <div className="w-full px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1">
                                    Data By Name By Address <span>*</span>
                                </label>
                                <div className="flex gap-1">
                                    <input
                                        type="file"
                                        className="text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                                        required
                                        onChange={onFileChange}
                                    />
                                    <Link
                                        target="_blank"
                                        href="https://docs.google.com/spreadsheets/d/1lhIr6CeFYx-szSYPATb2aHsi9xNaxFhy/edit?usp=sharing&ouid=112666838213779179844&rtpof=true&sd=true"
                                        className="btn text-white bg-green-600 hover:bg-green-700 py-0 w-[250px] px-0 text-sm flex items-center gap-2 justify-center"
                                    >
                                        <PiMicrosoftExcelLogoFill />
                                        Unduh Template
                                    </Link>
                                </div>
                                <p className="text-gray-700 text-xs mt-1">
                                    *Download terlebih dahulu template lalu isi file excel dan upload
                                </p>
                            </div>
                        </div>

                        <AlertDialogFooter className="mt-3 pt-3 border-t border-t-gray-300">
                            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onUpload}>Upload</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </fieldset>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ImportAction;
