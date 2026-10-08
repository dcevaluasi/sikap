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



// ─── Component for fetching Total Soal per Bagian ────────────────────────────

function BagianSoalCount({ idBagian, cfg }: { idBagian: number; cfg: any }) {
  const [soalCount, setSoalCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    const fetchCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminPusat/getBagian?id=${idBagian}`,
          { headers: { Authorization: `Bearer ${Cookies.get("XSRF095")}` } }
        );
        if (isMounted) {
          const soalList = response.data?.data?.[0]?.SoalUjianBagian || [];
          setSoalCount(soalList.length);
        }
      } catch (error) {
        if (isMounted) setSoalCount(0);
      }
    };
    fetchCount();
    return () => {
      isMounted = false;
    };
  }, [idBagian]);

  if (soalCount === null) {
    return <span className="text-gray-400 text-xs animate-pulse">Memuat...</span>;
  }

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold ${
        soalCount > 0
          ? `${cfg.badgeBg} ring-1 ring-inset ${cfg.accentBorder}`
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {soalCount} Soal
    </span>
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

                {/* Table View */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal border-collapse">
                      <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 w-[25%] border-r border-gray-200">Program (Tipe Ujian)</th>
                          <th className="px-6 py-4 w-[25%] border-r border-gray-200">Fungsi</th>
                          <th className="px-6 py-4 w-[25%] border-r border-gray-200">Bagian</th>
                          <th className="px-6 py-4 text-center border-r border-gray-200">Total Soal</th>
                          <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {items.map((typeUjian) => {
                          const roman = extractRoman(typeUjian.NamaTypeUjian);
                          // Calculate rowSpan for the typeUjian cell
                          const typeUjianRowSpan =
                            typeUjian.Fungsi.reduce(
                              (acc, f) => acc + (f.Bagian.length || 1),
                              0
                            ) || 1;

                          const fungsiList = typeUjian.Fungsi.length > 0 ? typeUjian.Fungsi : [null];

                          return fungsiList.flatMap((fungsi, fIndex) => {
                            const bagianList = fungsi?.Bagian?.length ? fungsi.Bagian : [null];
                            const fungsiRowSpan = bagianList.length;

                            return bagianList.map((bagian, bIndex) => {
                              const isFirstTypeUjianRow = fIndex === 0 && bIndex === 0;
                              const isFirstFungsiRow = bIndex === 0;
                              

                              return (
                                <tr
                                  key={`${typeUjian.IdTypeUjian}-${fungsi?.IdFungsi || fIndex}-${bagian?.IdBagian || bIndex}`}
                                  className="hover:bg-gray-50/40 transition-colors"
                                >
                                  {isFirstTypeUjianRow && (
                                    <td
                                      rowSpan={typeUjianRowSpan}
                                      className="px-6 py-5 align-top border-r border-gray-200"
                                    >
                                      <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                          <div
                                            className={`flex-shrink-0 w-10 h-10 rounded-xl ${cfg.numBg} flex items-center justify-center shadow-sm`}
                                          >
                                            <span className="text-white font-black text-sm">
                                              {roman}
                                            </span>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-sm leading-snug">
                                              {typeUjian.NamaTypeUjian}
                                            </h3>
                                          </div>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                          {replaceProgramName(typeUjian.NamaTypeUjian)}
                                        </p>
                                        <button
                                          onClick={() => openImport(typeUjian.IdTypeUjian.toString())}
                                          className={`mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm w-fit ${cfg.uploadClass}`}
                                        >
                                          <LucideUploadCloud className="w-4 h-4" /> Import Bank Soal
                                        </button>
                                      </div>
                                    </td>
                                  )}

                                  {isFirstFungsiRow && (
                                    <td
                                      rowSpan={fungsiRowSpan}
                                      className="px-6 py-5 align-top border-r border-gray-200"
                                    >
                                      {fungsi ? (
                                        <div className="flex flex-col gap-1.5">
                                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            Fungsi {fIndex + 1}
                                          </span>
                                          <span className="text-sm font-semibold text-gray-700 leading-snug">
                                            {fungsi.NamaFungsi}
                                          </span>
                                        </div>
                                      ) : (
                                        <span className="text-gray-400 italic text-xs">
                                          Belum ada fungsi
                                        </span>
                                      )}
                                    </td>
                                  )}

                                  <td className="px-6 py-4 align-middle border-r border-gray-200">
                                    {bagian ? (
                                      <div className="flex items-center gap-2.5">
                                        <div className={`p-1.5 rounded-lg ${cfg.iconBg}`}>
                                          <TbDatabase className={`w-4 h-4 ${cfg.iconColor}`} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                          {bagian.NamaBagian}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-gray-400 italic text-xs">
                                        Belum ada bagian
                                      </span>
                                    )}
                                  </td>

                                  <td className="px-6 py-4 align-middle text-center border-r border-gray-200">
                                    {bagian ? (
                                      <BagianSoalCount idBagian={bagian.IdBagian} cfg={cfg} />
                                    ) : (
                                      "-"
                                    )}
                                  </td>

                                  <td className="px-6 py-4 align-middle text-right">
                                    {bagian && (
                                      <Link
                                        href={`/lembaga/dpkakp/admin/dashboard/bank-soal/${typeUjian.IdTypeUjian}/${bagian.IdBagian}`}
                                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all hover:shadow-sm ${cfg.linkClass}`}
                                      >
                                        Lihat Soal
                                      </Link>
                                    )}
                                  </td>
                                </tr>
                              );
                            });
                          });
                        })}
                      </tbody>
                    </table>
                  </div>
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
