import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PiKeyFill } from "react-icons/pi";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { Ujian, UsersUjian } from "@/types/ujian-keahlian-akp";


interface CodeAccessActionProps {
    dataUjian: Ujian[] | [];
    row: { original: UsersUjian };
    handleSwitchCodeAccessIsUse: (kode: string, currentState: string) => void;
}

export const CodeAccessAction: React.FC<CodeAccessActionProps> = ({
    dataUjian,
    row,
    handleSwitchCodeAccessIsUse,
}) => {
    const pathname = usePathname();
    const showButton =
        pathname.includes("dpkakp") ||
        Cookies.get("PUKAKP") ===
        "PUKAKP III (Politeknik KP Dumai) - Pelaksan Ujian Keahlian Awak Kapal Perikanan" ||
        Cookies.get("PUKAKP") ===
        "PUKAKP VII (BPPP Banyuwangi) - Pelaksan Ujian Keahlian Awak Kapal Perikanan" ||
        Cookies.get("PUKAKP") ===
        "PUKAKP XII (Poltiteknik KP Bone) - Pelaksan Ujian Keahlian Awak Kapal Perikanan";

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className={`bg-indigo-600 text-white hover:text-white hover:bg-indigo-700 w-full ${showButton ? "flex" : "hidden"
                        }`}
                >
                    <PiKeyFill className="h-4 w-4 mr-2" /> Kode Akses
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-2xl w-full rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Daftar Kode Akses Ujian Keahlian</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-zinc-600">
                        Berikut merupakan kode akses untuk dapat melakukan proses ujian keahlian awak kapal perikanan. Gunakan kode sesuai fungsi yang dikerjakan.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-md">
                        {dataUjian?.length > 0 && (
                            <thead className="bg-zinc-100 text-zinc-700">
                                {
                                    dataUjian[0].TypeUjian.includes("TRYOUT") ? <tr>
                                        <th className="border px-3 py-2">Kode Tryout</th>
                                    </tr> : dataUjian[0].TypeUjian.includes("Rewarding") ? (
                                        <tr>
                                            <th className="border px-3 py-2">F1</th>
                                            <th className="border px-3 py-2">F2</th>
                                            <th className="border px-3 py-2">F3</th>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <th className="border px-3 py-2">F1B1</th>
                                            <th className="border px-3 py-2">F1B2</th>
                                            <th className="border px-3 py-2">F1B3</th>
                                            <th className="border px-3 py-2">F2B1</th>
                                            <th className="border px-3 py-2">F3B1</th>
                                            <th className="border px-3 py-2">F3B2</th>
                                        </tr>
                                    )}
                            </thead>
                        )}

                        <tbody>
                            <tr>
                                {(dataUjian[0].TypeUjian.includes("TRYOUT")
                                    ? row.original.CodeAksesUsersBagian.slice(0, 1) // ✅ Only show first item for TRYOUT
                                    : row.original.CodeAksesUsersBagian
                                ).map((codeAccess, index) => (
                                    <td
                                        key={index}
                                        className="border px-2 py-4 text-center align-top"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <Switch
                                                id={`access-${index}`}
                                                checked={codeAccess.IsUse === "true"}
                                                onCheckedChange={() =>
                                                    handleSwitchCodeAccessIsUse(
                                                        codeAccess.KodeAkses,
                                                        codeAccess.IsUse
                                                    )
                                                }
                                            />
                                            <Label htmlFor={`access-${index}`} className="text-xs">
                                                {codeAccess.KodeAkses}
                                            </Label>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel className="bg-zinc-800 text-white hover:text-white hover:bg-zinc-700 transition">
                        Tutup
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
