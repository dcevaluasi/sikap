import React from "react";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import Toast from "@/components/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideUploadCloud, Anchor, Settings } from "lucide-react";
import { TbDatabase } from "react-icons/tb";
import { TypeUjian } from "@/types/ujian-keahlian-akp";
import { replaceProgramName } from "@/utils/dpkakp";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGroup(name: string): "ANKAPIN" | "ATKAPIN" | "OTHER" {
  if (name.includes("ANKAPIN")) return "ANKAPIN";
  if (name.includes("ATKAPIN")) return "ATKAPIN";
  return "OTHER";
}

/**
 * Extract the Roman numeral suffix from a name like "ANKAPIN I", "ATKAPIN III".
 * Falls back to the full name if none found.
 */
function extractRoman(name: string): string {
  const match = name.match(/\b(I{1,3}|IV|VI{0,3}|IX|XI{0,3})\b/);
  return match ? match[1] : name;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const GROUP_CONFIG = {
  ANKAPIN: {
    label: "ANKAPIN",
    fullName: "Ahli Nautika Kapal Penangkap Ikan",
    icon: <Anchor className="w-4 h-4" />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-100 text-blue-700",
    accentBorder: "border-blue-100",
    cardTop: "bg-gradient-to-r from-blue-500 to-blue-700",
    linkClass:
      "hover:bg-blue-500 hover:text-white text-blue-600 border-blue-200 bg-blue-50/60",
    uploadClass: "bg-blue-600 hover:bg-blue-700 text-white",
    tabActive:
      "data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm",
    numBg: "bg-blue-600",
  },
  ATKAPIN: {
    label: "ATKAPIN",
    fullName: "Ahli Teknika Kapal Penangkap Ikan",
    icon: <Settings className="w-4 h-4" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-100 text-emerald-700",
    accentBorder: "border-emerald-100",
    cardTop: "bg-gradient-to-r from-emerald-500 to-emerald-700",
    linkClass:
      "hover:bg-emerald-500 hover:text-white text-emerald-600 border-emerald-200 bg-emerald-50/60",
    uploadClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    tabActive:
      "data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-sm",
    numBg: "bg-emerald-600",
  },
  OTHER: {
    label: "Lainnya",
    fullName: "",
    icon: <TbDatabase className="w-4 h-4" />,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    badgeBg: "bg-gray-100 text-gray-700",
    accentBorder: "border-gray-100",
    cardTop: "bg-gradient-to-r from-gray-500 to-gray-700",
    linkClass: "hover:bg-gray-500 hover:text-white text-gray-600 border-gray-200 bg-gray-50/60",
    uploadClass: "bg-gray-600 hover:bg-gray-700 text-white",
    tabActive:
      "data-[state=active]:bg-gray-600 data-[state=active]:text-white data-[state=active]:shadow-sm",
    numBg: "bg-gray-600",
  },
};

// ─── Skeletons ────────────────────────────────────────────────────────────────

function SkeletonTabs() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Fake tab bar */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
        <div className="h-9 w-32 bg-gray-300 rounded-xl" />
        <div className="h-9 w-32 bg-gray-200 rounded-xl" />
      </div>
      {/* Fake cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border p-5 space-y-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-gray-100 rounded-xl" />
              <div className="h-8 bg-gray-100 rounded-xl" />
            </div>
            <div className="h-9 bg-gray-100 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProgramCard({
  bankSoal,
  cfg,
  onImport,
}: {
  bankSoal: TypeUjian;
  cfg: (typeof GROUP_CONFIG)[keyof typeof GROUP_CONFIG];
  onImport: (id: string) => void;
}) {
  const roman = extractRoman(bankSoal.NamaTypeUjian);
  const totalBagian = bankSoal.Fungsi.reduce((acc, f) => acc + f.Bagian.length, 0);

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm hover:shadow-md
        transition-all duration-300 overflow-hidden group ${cfg.accentBorder}`}
    >
      {/* Accent bar */}
      <div className={`h-1.5 w-full ${cfg.cardTop}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {/* Roman numeral badge */}
          <div
            className={`flex-shrink-0 w-11 h-11 rounded-xl ${cfg.numBg}
              flex items-center justify-center shadow-sm`}
          >
            <span className="text-white font-black text-base leading-none">{roman}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-sm leading-snug">
              {bankSoal.NamaTypeUjian}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 leading-tight truncate">
              {replaceProgramName(bankSoal.NamaTypeUjian)}
            </p>
          </div>

          <span
            className={`flex-shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full ${cfg.badgeBg}`}
          >
            {totalBagian} bagian
          </span>
        </div>

        {/* Fungsi → Bagian */}
        <div className="space-y-3">
          {bankSoal.Fungsi.map((fungsi, fi) => (
            <div key={fi} className="space-y-1.5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {fi + 1}. {fungsi.NamaFungsi}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {fungsi.Bagian.map((bagian, bi) => (
                  <Link
                    key={bi}
                    href={`/lembaga/dpkakp/admin/dashboard/bank-soal/${bankSoal.IdTypeUjian}/${bagian.IdBagian}`}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5
                      text-xs font-medium rounded-xl border
                      transition-all duration-200 shadow-sm hover:shadow
                      ${cfg.linkClass}
                    `}
                  >
                    <TbDatabase className="w-3 h-3 flex-shrink-0" />
                    {bagian.NamaBagian}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Import button */}
        <button
          onClick={() => onImport(bankSoal.IdTypeUjian.toString())}
          className={`
            mt-4 w-full flex items-center justify-center gap-2
            px-4 py-2.5 rounded-xl text-xs font-semibold
            transition-all duration-200 shadow-sm hover:shadow-md
            ${cfg.uploadClass}
          `}
        >
          <LucideUploadCloud className="w-4 h-4" />
          Import Bank Soal
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const TableDataTipeUjianKeahlian: React.FC = () => {
  const [data, setData] = React.useState<TypeUjian[]>([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [fileExcel, setFileExcel] = React.useState<File | null>(null);
  const [selectedIdTypeUjian, setSelectedIdTypeUjian] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"ANKAPIN" | "ATKAPIN" | "OTHER">("ANKAPIN");

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const res: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminPusat/getTypeUjian`,
        { headers: { Authorization: `Bearer ${Cookies.get("XSRF095")}` } }
      );
      setData(res.data.data);
    } catch (e) {
      console.error("Error fetching tipe ujian:", e);
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!fileExcel) return;
    setIsUploading(true);
    const form = new FormData();
    form.append("IdTypeUjian", selectedIdTypeUjian);
    form.append("file", fileExcel);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/importUjian`, form);
      Toast.fire({ icon: "success", title: "Berhasil mengupload bank soal ujian keahlian!" });
    } catch {
      Toast.fire({ icon: "error", title: "Gagal mengupload bank soal ujian keahlian!" });
    } finally {
      setIsUploading(false);
      setIsOpenDialog(false);
      setFileExcel(null);
      fetchData();
    }
  };

  const openImport = (id: string) => {
    setSelectedIdTypeUjian(id);
    setIsOpenDialog(true);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // Group & sort by Roman numeral
  const grouped = React.useMemo(() => {
    const groups: Record<string, TypeUjian[]> = { ANKAPIN: [], ATKAPIN: [], OTHER: [] };
    data.forEach((item) => groups[getGroup(item.NamaTypeUjian)].push(item));
    // Sort each group by roman numeral order
    const romanOrder = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => {
        const ai = romanOrder.indexOf(extractRoman(a.NamaTypeUjian));
        const bi = romanOrder.indexOf(extractRoman(b.NamaTypeUjian));
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
    });
    return groups;
  }, [data]);

  const availableTabs = (["ANKAPIN", "ATKAPIN", "OTHER"] as const).filter(
    (g) => grouped[g].length > 0
  );

  // Auto-select first available tab once data arrives
  React.useEffect(() => {
    if (!isFetching && availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [isFetching]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Upload Dialog ─────────────────────────────────────────────── */}
      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <TbDatabase className="h-4 w-4 text-blue-600" />
              </div>
              Import Bank Soal Ujian
            </AlertDialogTitle>
            <AlertDialogDescription>
              Upload file Excel yang berisi soal ujian. Pastikan format sesuai template.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              File Soal <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFileExcel(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-600
                file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0
                file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 border border-gray-200 rounded-xl p-2 cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              * Download template, isi data, lalu upload file Excel (.xlsx)
            </p>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUploading}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpload}
              disabled={!fileExcel || isUploading}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <LucideUploadCloud className="w-4 h-4" />
              {isUploading ? "Mengupload..." : "Upload"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Content ───────────────────────────────────────────────────── */}
      {isFetching ? (
        <SkeletonTabs />
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <TbDatabase className="w-12 h-12 mb-4 opacity-30" />
          <p className="font-medium">Belum ada data bank soal</p>
          <p className="text-sm mt-1 opacity-70">Data tipe ujian keahlian belum tersedia</p>
        </div>
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as typeof activeTab)}
          className="space-y-6"
        >
          {/* ── Tab bar ─────────────────────────────────────────────── */}
          <TabsList className="flex w-fit gap-1 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200 h-auto">
            {availableTabs.map((tabKey) => {
              const cfg = GROUP_CONFIG[tabKey];
              const count = grouped[tabKey].length;
              return (
                <TabsTrigger
                  key={tabKey}
                  value={tabKey}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                    text-gray-500 transition-all duration-200
                    data-[state=inactive]:hover:bg-white data-[state=inactive]:hover:text-gray-700
                    data-[state=inactive]:hover:shadow-sm
                    ${cfg.tabActive}
                  `}
                >
                  {cfg.icon}
                  {cfg.label}
                  <span
                    className={`
                      text-[10px] font-bold px-1.5 py-0.5 rounded-full
                      data-[active=true]:bg-white/20 data-[active=true]:text-white
                      ${activeTab === tabKey
                        ? "bg-white/25 text-white"
                        : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {count}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* ── Tab content ─────────────────────────────────────────── */}
          {availableTabs.map((tabKey) => {
            const cfg = GROUP_CONFIG[tabKey];
            const items = grouped[tabKey];

            return (
              <TabsContent key={tabKey} value={tabKey} className="mt-0 focus-visible:outline-none">
                {/* Sub-header */}
                <div className="flex items-center gap-3 mb-5">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">{cfg.label}</span>
                    {cfg.fullName && ` — ${cfg.fullName}`}
                  </p>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                    {items.length} program
                  </span>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {items.map((bankSoal) => (
                    <ProgramCard
                      key={bankSoal.IdTypeUjian}
                      bankSoal={bankSoal}
                      cfg={cfg}
                      onImport={openImport}
                    />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </>
  );
};

export default TableDataTipeUjianKeahlian;
