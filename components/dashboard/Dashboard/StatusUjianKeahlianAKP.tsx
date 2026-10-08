import React from "react";
import { usePathname } from "next/navigation";
import {
    ListChecks,
    FileText,
    Clock3,
    Users,
    FileClock,
    Loader2,
    CheckCircle,
} from "lucide-react";

type Status =
    | "All"
    | "Draft"
    | "Pending"
    | "Pilih Penguji"
    | "Akan Dilaksanakan"
    | "Sedang Berlangsung"
    | "Telah Selesai"
    | string;

interface Counters {
    draft: number;
    notVerified: number;
    pilihPenguji: number;
    willDo: number;
    doing: number;
    finished: number;
}

interface Props {
    isPenguji: boolean;
    selectedStatusFilter: Status;
    setSelectedStatusFilter: (status: Status) => void;
    data: any[];
    countersUjian: Counters;
}

const StatusUjianKeahlianAKP: React.FC<Props> = ({
    isPenguji,
    selectedStatusFilter,
    setSelectedStatusFilter,
    data,
    countersUjian,
}) => {
    const pathname = usePathname();

    const getIcon = (status: Status, isActive: boolean) => {
        const iconClass = `w-4 h-4 transition-transform duration-300 ${isActive ? "scale-110" : "scale-100 opacity-70"}`;
        switch (status) {
            case "All": return <ListChecks className={iconClass} />;
            case "Draft": return <FileText className={iconClass} />;
            case "Pending": return <Clock3 className={iconClass} />;
            case "Pilih Penguji": return <Users className={iconClass} />;
            case "Akan Dilaksanakan": return <FileClock className={iconClass} />;
            case "Sedang Berlangsung": return <Loader2 className={`${iconClass} animate-spin-slow`} />;
            case "Telah Selesai": return <CheckCircle className={iconClass} />;
            default: return null;
        }
    };

    const renderButton = (status: Status, count: number, label: string) => {
        const isActive = selectedStatusFilter === status;
        return (
            <button
                key={status}
                onClick={() => setSelectedStatusFilter(status)}
                className={`
                    relative flex items-center justify-between gap-3 min-w-fit
                    px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                    border overflow-hidden group
                    ${isActive
                        ? "bg-white text-blue-600 border-blue-200 shadow-sm ring-1 ring-blue-500/10"
                        : "bg-gray-50/50 text-gray-500 border-transparent hover:bg-white hover:border-gray-200 hover:text-gray-700 hover:shadow-sm"
                    }
                `}
            >
                {isActive && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-l-xl" />
                )}
                
                <div className="flex items-center gap-2">
                    {getIcon(status, isActive)}
                    <span className="whitespace-nowrap">{label}</span>
                </div>
                
                <span className={`
                    flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full text-xs font-bold
                    ${isActive 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-gray-200/80 text-gray-600 group-hover:bg-gray-200"
                    }
                `}>
                    {count}
                </span>
            </button>
        );
    };

    return (
        <nav className="w-full mb-6">
            <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-3">
                {renderButton("All", data.length, "Semua")}

                {!isPenguji && (
                    <>
                        {pathname.includes("pukakp") &&
                            renderButton("Draft", countersUjian.draft, "Draft")}
                        {
                            !pathname.includes('tryout') && <>
                                {renderButton("Pending", countersUjian.notVerified, "Menunggu")}
                                {pathname.includes("dpkakp") &&
                                    renderButton("Pilih Penguji", countersUjian.pilihPenguji, "Pilih Penguji")}
                            </>
                        }

                        {renderButton("Akan Dilaksanakan", countersUjian.willDo, "Akan Datang")}
                        {renderButton("Sedang Berlangsung", countersUjian.doing, "Berlangsung")}
                        {renderButton("Telah Selesai", countersUjian.finished, "Selesai")}
                    </>
                )}
            </div>
        </nav>
    );
};

export default StatusUjianKeahlianAKP;
