import { 
    AlertDialog, 
    AlertDialogTrigger, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogCancel 
} from "@/components/ui/alert-dialog";
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
        Cookies.get("PUKAKP") === "PUKAKP III (Politeknik KP Dumai) - Pelaksan Ujian Keahlian Awak Kapal Perikanan" ||
        Cookies.get("PUKAKP") === "PUKAKP VII (BPPP Banyuwangi) - Pelaksan Ujian Keahlian Awak Kapal Perikanan" ||
        Cookies.get("PUKAKP") === "PUKAKP XII (Poltiteknik KP Bone) - Pelaksan Ujian Keahlian Awak Kapal Perikanan";

    const getLabels = () => {
        if (!dataUjian || dataUjian.length === 0) return [];
        const type = dataUjian[0].TypeUjian;
        if (type.includes("TRYOUT")) return ["Kode Tryout"];
        if (type.includes("Rewarding")) return ["F1", "F2", "F3"];
        return ["F1B1", "F1B2", "F1B3", "F2B1", "F3B1", "F3B2"];
    };
    
    const labels = getLabels();
    const codes = dataUjian?.length > 0 && dataUjian[0].TypeUjian.includes("TRYOUT")
        ? row.original.CodeAksesUsersBagian.slice(0, 1)
        : row.original.CodeAksesUsersBagian;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 transition-all shadow-sm ${showButton ? "flex" : "hidden"}`}
                >
                    <PiKeyFill className="h-3.5 w-3.5" /> Kode Akses
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-3xl w-full rounded-2xl border border-gray-100 p-0 overflow-hidden shadow-2xl">
                {/* Header Section */}
                <div className="bg-gray-50/80 px-6 py-6 border-b border-gray-100">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                <PiKeyFill className="w-5 h-5" />
                            </div>
                            Daftar Kode Akses Ujian
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
                            Kelola kode akses ujian keahlian untuk peserta ini. Aktifkan atau nonaktifkan kode akses sesuai dengan fungsi yang sedang dikerjakan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>

                {/* Content Section */}
                <div className="p-6 bg-white">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {codes.map((codeAccess, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col items-center justify-between p-5 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all gap-5 relative overflow-hidden group"
                            >
                                {/* Top Status Indicator Bar */}
                                <div className={`absolute top-0 left-0 w-full h-1.5 transition-colors ${codeAccess.IsUse === "true" ? "bg-green-500" : "bg-gray-200"}`} />
                                
                                <div className="flex flex-col items-center gap-2 mt-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                        {labels[index] || `Bagian ${index + 1}`}
                                    </span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <PiKeyFill className={`h-5 w-5 ${codeAccess.IsUse === "true" ? "text-green-500 drop-shadow-sm" : "text-gray-300"}`} />
                                        <span className="font-mono text-lg font-bold text-gray-800 tracking-wider">
                                            {codeAccess.KodeAkses}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-center gap-2 w-full pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            id={`access-${index}`}
                                            checked={codeAccess.IsUse === "true"}
                                            onCheckedChange={() => handleSwitchCodeAccessIsUse(codeAccess.KodeAkses, codeAccess.IsUse)}
                                            className={codeAccess.IsUse === "true" ? "data-[state=checked]:bg-green-500" : ""}
                                        />
                                        <Label 
                                            htmlFor={`access-${index}`} 
                                            className={`text-xs font-bold uppercase tracking-wide cursor-pointer ${codeAccess.IsUse === "true" ? "text-green-600" : "text-gray-400"}`}
                                        >
                                            {codeAccess.IsUse === "true" ? "Aktif" : "Nonaktif"}
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end">
                    <AlertDialogCancel className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-semibold px-6 shadow-sm transition-all">
                        Tutup
                    </AlertDialogCancel>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};
