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

    const getIcon = (status: Status) => {
        const iconClass = "w-5 h-5"; // Slightly bigger
        switch (status) {
            case "All":
                return <ListChecks className={iconClass} />;
            case "Draft":
                return <FileText className={iconClass} />;
            case "Pending":
                return <Clock3 className={iconClass} />;
            case "Pilih Penguji":
                return <Users className={iconClass} />;
            case "Akan Dilaksanakan":
                return <FileClock className={iconClass} />;
            case "Sedang Berlangsung":
                return <Loader2 className={`${iconClass} animate-spin-slow`} />;
            case "Telah Selesai":
                return <CheckCircle className={iconClass} />;
            default:
                return null;
        }
    };

    const renderButton = (status: Status, count: number, label: string) => {
        const isActive = selectedStatusFilter === status;
        return (
            <li key={status} className="flex-1">
                <button
                    onClick={() => setSelectedStatusFilter(status)}
                    className={`w-full flex flex-col items-center justify-center px-2 py-3 border-b-4 transition-all duration-200
            ${isActive
                            ? "border-blue-600 text-blue-600 font-semibold bg-blue-50"
                            : "border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                        }`}
                >
                    <div className="flex items-center gap-1 mb-1">
                        {getIcon(status)}
                        <span className="text-sm">{label}</span>
                    </div>
                    <span className="text-lg font-bold">{count}</span>
                </button>
            </li>
        );
    };

    return (
        <nav className="w-full overflow-x-auto mb-5">
            <section
                aria-labelledby="status-tabs-label"
                className="p-3 bg-white rounded-lg shadow-sm"
            >
                <ul className="flex w-full">
                    {renderButton("All", data.length, "All")}

                    {!isPenguji && (
                        <>
                            {pathname.includes("pukakp") &&
                                renderButton("Draft", countersUjian.draft, "Draft")}
                            {renderButton("Pending", countersUjian.notVerified, "Pending")}
                            {pathname.includes("dpkakp") &&
                                renderButton("Pilih Penguji", countersUjian.pilihPenguji, "Pilih Penguji")}
                            {renderButton("Akan Dilaksanakan", countersUjian.willDo, "Akan Dilaksanakan")}
                            {renderButton("Sedang Berlangsung", countersUjian.doing, "Sedang Berlangsung")}
                            {renderButton("Telah Selesai", countersUjian.finished, "Telah Selesai")}
                        </>
                    )}
                </ul>
            </section>
        </nav>
    );
};

export default StatusUjianKeahlianAKP;
