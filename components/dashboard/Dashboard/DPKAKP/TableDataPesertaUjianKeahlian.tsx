import React from "react";
import * as XLSX from "xlsx";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  CreditCard,
  FileDown,
  FileSpreadsheet,
  Hash,
  Loader2,
  MapPin,
  PencilLine,
  Printer,
  RefreshCw,
  Search,
  Send,
  UploadCloud,
  UserCheck,
  Users,
  X,
} from "lucide-react";

import Toast from "@/components/toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { dpkakpBaseUrl } from "@/constants/urls";
import { extractSecondLastSegment } from "@/utils";
import { generateTanggalPelatihan } from "@/utils/text";
import { getIdUjianKeahlianInPathPesertaUjian } from "@/components/utils/dpkakp/pathname";
import { exportToExcelFinalScoring } from "@/components/utils/dpkakp/scoring";
import getDocument from "@/firebase/firestore/getData";
import { JawabanUserStore, Ujian, UsersUjian } from "@/types/ujian-keahlian-akp";
import { UserInformationDPKAKP } from "@/types/dpkakp";
import { cn } from "@/lib/utils";

import TableData from "../../Tables/TableData";
import { CodeAccessAction } from "../Actions/CodeAccessAction";
import ImportAction from "../Actions/ImportAction";
import HistoryJawabanuserUjian from "./HistoryJawabanUserUjian";
import KartuUserUjian, { KartuUjianSheet } from "./KartuUserUjian";
import RekapitulasiNilai from "./RekapitulasiNilai";
import NilaiKomprehensifDialog from "./NilaiKomprehensifDialog";

/* ------------------------------------------------------------------ */
/*  Constants & helpers                                                 */
/* ------------------------------------------------------------------ */
type View = "peserta" | "kartu" | "rekap";

const DPKAKP_COOKIE_VALUE = "DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan";

const authHeaders = () => ({ Authorization: `Bearer ${Cookies.get("XSRF095")}` });

const hasNilaiKompre = (p: UsersUjian) => p.NilaiKomprensifF1 !== 0;

/* ------------------------------------------------------------------ */
/*  Small UI pieces                                                     */
/* ------------------------------------------------------------------ */
function ToolbarButton({
  icon: Icon,
  children,
  onClick,
  primary,
  loading,
  disabled,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 text-xs font-semibold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60",
        primary
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "border border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      )}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "blue",
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  hint?: string;
  tone?: "blue" | "emerald" | "amber" | "gray";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    gray: "bg-gray-100 text-gray-500",
  };
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", tones[tone])}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="truncate text-lg font-bold leading-tight text-gray-900">{value}</p>
        {hint && <p className="truncate text-[11px] text-gray-400">{hint}</p>}
      </div>
    </div>
  );
}

function SortableHeader({
  label,
  onSort,
  className,
}: {
  label: string;
  onSort: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSort}
      className={cn(
        "inline-flex h-8 items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900",
        className
      )}
    >
      {label}
      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */
const TableDataPesertaUjianKeahlian = () => {
  const pathname = usePathname() ?? "";
  const idUjianKeahlian = getIdUjianKeahlianInPathPesertaUjian(pathname);
  const idUjianForImport = extractSecondLastSegment(pathname);
  const isPenguji = Cookies.get("IsPUKAKP") == "penguji";

  /* -------------------------- Data -------------------------- */
  const [dataUjian, setDataUjian] = React.useState<Ujian[]>([]);
  const [data, setData] = React.useState<UsersUjian[]>([]);
  const [dataPukakp, setDataPukakp] = React.useState<UserInformationDPKAKP | null>(null);
  const [isFetching, setIsFetching] = React.useState(false);

  /* --------------------------- UI --------------------------- */
  const [view, setView] = React.useState<View>("peserta");
  const [nilaiTarget, setNilaiTarget] = React.useState<UsersUjian | null>(null);
  const [isImportOpen, setIsImportOpen] = React.useState(false);
  const [importFile, setImportFile] = React.useState<File | null>(null);
  const [isDistributeOpen, setIsDistributeOpen] = React.useState(false);
  const [isDistributing, setIsDistributing] = React.useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = React.useState(false);

  /* ---------------------- Answer history -------------------- */
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [historyLoading, setHistoryLoading] = React.useState(false);
  const [historyAnswers, setHistoryAnswers] = React.useState<JawabanUserStore[]>([]);

  /* ------------------------ Table state --------------------- */
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const printKartuRef = React.useRef<HTMLDivElement>(null);
  const rekapRef = React.useRef<HTMLDivElement>(null);

  /* ------------------------ Derived ------------------------- */
  const ujian = dataUjian[0];
  const hasPeserta = data.length > 0;
  const isSelesai = ujian?.IsSelesai === "1";
  const soalDistributed = (data[0]?.CodeAksesUsersBagian?.length ?? 0) > 0;
  const gradedCount = data.filter(hasNilaiKompre).length;

  const canManage = pathname.includes("dpkakp") && !isPenguji;
  const canImport =
    !!ujian &&
    !hasPeserta &&
    (pathname.includes("pukakp") || Cookies.get("PUKAKP") === DPKAKP_COOKIE_VALUE);
  const canDistribute = canManage && hasPeserta && !soalDistributed;

  /* ======================== API ============================ */
  const fetchUjian = React.useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/GetUjian?id=${idUjianKeahlian}`,
        { headers: authHeaders() }
      );
      const list: Ujian[] = response.data.data ?? [];
      setDataUjian(list);
      setData(list[0]?.UsersUjian ?? []);
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: "error", title: "Oopsss!", text: "Gagal memuat data peserta ujian." });
    } finally {
      setIsFetching(false);
    }
  }, [idUjianKeahlian]);

  const fetchInformasiPukakp = React.useCallback(async () => {
    try {
      const response = await axios.get(`${dpkakpBaseUrl}/adminPusat/getAdminPusat`, {
        headers: authHeaders(),
      });
      setDataPukakp(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    fetchUjian();
    fetchInformasiPukakp();
  }, [fetchUjian, fetchInformasiPukakp]);

  const handleSwitchCodeAccessIsUse = async (kodeAkses: string, isUseCode: string) => {
    const isUse = isUseCode == "true" ? "false" : "true";
    try {
      await axios.put(
        `${dpkakpBaseUrl}/updateIsUse?kode_akses=${kodeAkses}`,
        { is_use: isUse },
        { headers: authHeaders() }
      );
      Toast.fire({ icon: "success", title: "Yeayyy!", text: "Status kode akses berhasil diperbarui!" });
      fetchUjian();
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: "error", title: "Oopsss!", text: "Gagal memperbarui status kode akses!" });
      throw error;
    }
  };

  const handleImportPeserta = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasPeserta) {
      Toast.fire({
        icon: "error",
        title: "Import peserta hanya dapat dilakukan sekali. Peserta tidak bisa ditambah lagi setelah diimport.",
      });
      setIsImportOpen(false);
      fetchUjian();
      return;
    }
    if (!importFile) {
      Toast.fire({ icon: "error", title: "Pilih file Excel peserta terlebih dahulu." });
      return;
    }

    const formData = new FormData();
    formData.append("IdUjian", idUjianForImport);
    formData.append("file", importFile);

    try {
      await axios.post(`${dpkakpBaseUrl}/exportPesertaPelatihan`, formData, { headers: authHeaders() });
      Toast.fire({ icon: "success", title: "Peserta ujian keahlian berhasil diupload!" });
    } catch (error) {
      console.error("IMPORT PESERTA", error);
      const tooMany = error instanceof AxiosError && error.response?.status == 400;
      Toast.fire({
        icon: "error",
        title: "Ups, gagal!",
        text: tooMany
          ? "Jumlah peserta yang kamu import melebihi jumlah yang diajukan pada saat permohonan!"
          : "Gagal mengupload peserta ujian keahlian!",
      });
    } finally {
      setIsImportOpen(false);
      setImportFile(null);
      fetchUjian();
    }
  };

  const handleDistribusiSoal = async () => {
    if (soalDistributed) {
      Toast.fire({
        icon: "error",
        title: "Oopsss!",
        text: "Soal hanya dapat didistribusikan sekali dan sudah pernah didistribusikan.",
      });
      setIsDistributeOpen(false);
      fetchUjian();
      return;
    }

    setIsDistributing(true);
    try {
      await axios.post(
        `${dpkakpBaseUrl}/adminPusat/AddSoalToUsers`,
        { id_ujian: idUjianKeahlian },
        { headers: authHeaders() }
      );
      Toast.fire({
        icon: "success",
        title: "Yeayyy!",
        text: "Soal ujian berhasil didistribusikan ke seluruh peserta!",
      });
      fetchUjian();
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: "error", title: "Oopsss!", text: "Gagal mendistribusikan soal ujian ke peserta." });
    } finally {
      setIsDistributing(false);
      setIsDistributeOpen(false);
    }
  };

  const showHistory = async (idUserUjian: number, bagian: string) => {
    setHistoryOpen(true);
    setHistoryLoading(true);
    try {
      const result = await getDocument("answers", `${idUserUjian}_${bagian}`);
      setHistoryAnswers((result?.data?.selectedAnswersStore as JawabanUserStore[]) ?? []);
    } catch (error) {
      console.error(error);
      setHistoryAnswers([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  /* ======================== Exports ======================== */
  const handlePrintKartu = useReactToPrint({
    content: () => printKartuRef.current,
    documentTitle: "Kartu Peserta Ujian",
  });

  const exportKodeAkses = () => {
    if (!hasPeserta) return;
    const rows = data.map((user) => {
      const row: Record<string, string> = {
        Nama: user.Nama,
        NIK: user.Nik,
        Instansi: user.Instansi,
        "Nomor Ujian": user.NomorUjian,
      };
      user.CodeAksesUsersBagian.forEach((bagian) => {
        row[bagian.NamaBagian] = bagian.KodeAkses;
      });
      return row;
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), "Kode Akses");
    const date = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `Kode_Akses_${ujian?.TypeUjian ?? "Ujian"}_${date}.xlsx`);
  };

  const downloadRekapPdf = async () => {
    if (!rekapRef.current) return;
    setIsDownloadingPdf(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .from(rekapRef.current)
        .set({
          margin: [7, 7, 7, 7],
          filename: "Rekapitulasi Nilai Ujian Keahlian AKP.pdf",
          pagebreak: { mode: ["avoid-all", "css"] },
          html2canvas: { scale: 1.5, useCORS: true, logging: false, backgroundColor: "#fff" },
          jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        })
        .save();
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: "error", title: "Gagal membuat PDF rekapitulasi." });
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  /* Warn when a screenshot of participant data is taken. */
  React.useEffect(() => {
    const onKeyUp = async (e: KeyboardEvent) => {
      if (e.key !== "PrintScreen") return;
      try {
        const items = await navigator.clipboard.read();
        const hasImage = items.some(
          (item) => item.types.includes("image/png") || item.types.includes("image/jpeg")
        );
        if (hasImage) {
          Toast.fire({
            icon: "warning",
            title: "Tangkapan layar terdeteksi",
            text: "Data peserta bersifat rahasia, mohon tidak disebarluaskan.",
          });
        }
      } catch {
        /* clipboard permission denied */
      }
    };
    document.addEventListener("keyup", onKeyUp);
    return () => document.removeEventListener("keyup", onKeyUp);
  }, []);

  /* ======================== Table ========================== */
  const columns: ColumnDef<UsersUjian>[] = [
    {
      accessorKey: "IdUserUjian",
      header: ({ column }) => (
        <SortableHeader label="No" onSort={() => column.toggleSorting(column.getIsSorted() === "asc")} />
      ),
      cell: ({ row }) => (
        <div className="text-center text-xs font-medium text-gray-500">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "Nama",
      header: ({ column }) => (
        <SortableHeader
          label="Nama & Identitas"
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="flex max-w-[450px] flex-col py-1">
            <p className="truncate text-[13px] font-bold capitalize leading-tight text-gray-900">{p.Nama}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] leading-none text-gray-500">
              <span className="inline-flex items-center gap-1">
                <Hash className="h-3 w-3 text-gray-400" aria-hidden="true" />
                {p.Nik}
              </span>
              <span className="inline-flex items-center gap-1 capitalize">
                <MapPin className="h-3 w-3 text-gray-400" aria-hidden="true" />
                {p.TempatLahir}, {p.TanggalLahir}
              </span>
              <span className="inline-flex max-w-[180px] items-center gap-1 capitalize">
                <Building2 className="h-3 w-3 shrink-0 text-gray-400" aria-hidden="true" />
                <span className="truncate">{p.Instansi}</span>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "NomorUjian",
      header: ({ column }) => (
        <div className="flex justify-center">
          <SortableHeader
            label="Nomor Ujian"
            onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700">
            {row.original.NomorUjian}
          </span>
        </div>
      ),
    },
    {
      id: "nilaiKompre",
      header: () => (
        <div className="text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          Nilai Kompre
        </div>
      ),
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="flex justify-center">
            {hasNilaiKompre(p) ? (
              <span
                title={`F1 ${p.NilaiKomprensifF1} · F2 ${p.NilaiKomprensifF2} · F3 ${p.NilaiKomprensifF3}`}
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"
              >
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Sudah dinilai
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Belum dinilai
              </span>
            )}
          </div>
        );
      },
    },
    // Actions are hidden once the exam is finished.
    ...(isSelesai
      ? []
      : [
        {
          accessorKey: "Nik",
          header: () => (
            <div className="text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Aksi
            </div>
          ),
          cell: ({ row }) => (
            <div className="flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setNilaiTarget(row.original)}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <PencilLine className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />
                {hasNilaiKompre(row.original) ? "Edit Nilai" : "Input Nilai"}
              </button>
              <CodeAccessAction
                dataUjian={dataUjian}
                row={row}
                handleSwitchCodeAccessIsUse={handleSwitchCodeAccessIsUse}
              />
            </div>
          ),
        } as ColumnDef<UsersUjian>,
      ]),
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  const search = (table.getColumn("Nama")?.getFilterValue() as string) ?? "";
  const visibleCount = table.getFilteredRowModel().rows.length;

  /* ======================== Render ========================= */
  const tabs: { key: View; label: string; icon: React.ElementType; show: boolean }[] = [
    { key: "peserta", label: "Daftar Peserta", icon: Users, show: true },
    { key: "kartu", label: "Kartu Ujian", icon: CreditCard, show: hasPeserta },
    { key: "rekap", label: "Rekapitulasi Nilai", icon: ClipboardList, show: canManage && hasPeserta },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Exam summary */}
      {ujian && (
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">{ujian.TypeUjian}</h2>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                    isSelesai ? "bg-gray-100 text-gray-600" : "bg-emerald-50 text-emerald-700"
                  )}
                >
                  {isSelesai ? "Selesai" : "Berlangsung"}
                </span>
              </div>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs capitalize text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {ujian.TempatUjian}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {generateTanggalPelatihan(ujian.TanggalMulaiUjian)} –{" "}
                  {generateTanggalPelatihan(ujian.TanggalBerakhirUjian)}
                </span>
              </p>
            </div>
            <ToolbarButton icon={RefreshCw} onClick={fetchUjian} loading={isFetching}>
              Refresh
            </ToolbarButton>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard icon={Users} label="Total peserta" value={`${data.length} orang`} />
            <StatCard
              icon={UserCheck}
              label="Nilai komprehensif"
              value={`${gradedCount}/${data.length}`}
              hint={gradedCount === data.length && hasPeserta ? "Semua sudah dinilai" : "Peserta sudah dinilai"}
              tone={gradedCount === data.length && hasPeserta ? "emerald" : "amber"}
            />
            <StatCard
              icon={Send}
              label="Distribusi soal"
              value={soalDistributed ? "Sudah" : "Belum"}
              tone={soalDistributed ? "emerald" : "gray"}
            />
            <StatCard icon={ClipboardList} label="Tingkat sertifikat" value={ujian.TypeUjian} tone="blue" />
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        {/* View tabs + contextual actions */}
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" className="inline-flex w-full gap-1 overflow-x-auto rounded-xl bg-gray-100 p-1 lg:w-auto">
            {tabs
              .filter((t) => t.show)
              .map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={view === key}
                  onClick={() => setView(key)}
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition-all lg:flex-none",
                    view === key ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </button>
              ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {view === "peserta" && (
              <>
                {canDistribute && (
                  <ToolbarButton icon={Send} primary onClick={() => setIsDistributeOpen(true)}>
                    Distribusikan Soal
                  </ToolbarButton>
                )}
                {canImport && (
                  <ToolbarButton icon={UploadCloud} primary onClick={() => setIsImportOpen(true)}>
                    Tambah Peserta Ujian
                  </ToolbarButton>
                )}
              </>
            )}
            {view === "kartu" && (
              <>
                <ToolbarButton icon={FileSpreadsheet} onClick={exportKodeAkses}>
                  Export Kode Akses
                </ToolbarButton>
                <ToolbarButton icon={Printer} primary onClick={() => handlePrintKartu?.()}>
                  Print Kartu Ujian
                </ToolbarButton>
              </>
            )}
            {view === "rekap" && (
              <>
                <ToolbarButton icon={FileSpreadsheet} onClick={() => exportToExcelFinalScoring({ dataUjian, data })}>
                  Export Excel
                </ToolbarButton>
                <ToolbarButton icon={FileDown} primary loading={isDownloadingPdf} onClick={downloadRekapPdf}>
                  Download PDF
                </ToolbarButton>
              </>
            )}
          </div>
        </div>

        {/* View: participant list */}
        {view === "peserta" &&
          (hasPeserta || isFetching ? (
            <>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => table.getColumn("Nama")?.setFilterValue(e.target.value)}
                    placeholder="Cari nama peserta…"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-9 text-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => table.getColumn("Nama")?.setFilterValue("")}
                      aria-label="Hapus pencarian"
                      className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Menampilkan <span className="font-semibold text-gray-700">{visibleCount}</span> dari{" "}
                  {data.length} peserta
                </p>
              </div>
              <TableData isLoading={isFetching && !hasPeserta} columns={columns} table={table} type="long" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Users className="h-7 w-7" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-gray-900">Belum ada peserta ujian</p>
                <p className="mt-1 text-sm text-gray-500">
                  {canImport
                    ? "Import data peserta dari file Excel untuk mulai mengelola ujian ini."
                    : "Peserta akan muncul di sini setelah diimport oleh penyelenggara."}
                </p>
              </div>
              {canImport && (
                <ToolbarButton icon={UploadCloud} primary onClick={() => setIsImportOpen(true)}>
                  Import peserta
                </ToolbarButton>
              )}
            </div>
          ))}

        {/* View: exam cards */}
        {view === "kartu" && (
          <div ref={printKartuRef} className="grid grid-cols-1 gap-2">
            {data.map((peserta) => (
              <KartuUjianSheet
                pesertas={dataUjian[0]?.UsersUjian || []}
                dataUjian={dataUjian}
                dataPukakp={dataPukakp}
                generateTanggalPelatihan={generateTanggalPelatihan}
                kop={{ logo: 11, title: 7, showAddress: true }}
              />
            ))}
          </div>
        )}

        {/* View: score recap */}
        {view === "rekap" && ujian && (
          <>
            <p className="mb-3 rounded-xl bg-blue-50 px-4 py-2.5 text-xs text-blue-800">
              Klik nilai pada kolom F1–F3 untuk melihat riwayat jawaban peserta. Sel merah berarti
              nilai di bawah batas kelulusan atau belum ada nilai.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <RekapitulasiNilai
                ref={rekapRef}
                ujian={ujian}
                peserta={data}
                dataPukakp={dataPukakp}
                onShowHistory={showHistory}
              />
            </div>
          </>
        )}
      </div>

      {/* Dialogs */}
      <NilaiKomprehensifDialog peserta={nilaiTarget} onClose={() => setNilaiTarget(null)} onSaved={fetchUjian} />

      <HistoryJawabanuserUjian
        isOpen={historyOpen}
        onOpenChange={setHistoryOpen}
        dataAnswer={historyAnswers}
        trueCount={historyAnswers.filter((a) => a.isCorrect === true).length}
        falseCount={historyAnswers.filter((a) => a.isCorrect === false).length}
        isFetching={historyLoading}
      />

      <AlertDialog open={isDistributeOpen} onOpenChange={(open) => !isDistributing && setIsDistributeOpen(open)}>
        <AlertDialogContent className="rounded-2xl sm:max-w-lg">
          <AlertDialogHeader className="text-left">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Send className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="space-y-1.5">
                <AlertDialogTitle>Distribusikan soal ke {data.length} peserta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Distribusi hanya dapat dilakukan <strong>sekali</strong>. Pastikan data peserta sudah
                  sesuai dan seluruhnya tercantum dalam Surat Keputusan Dewan sebagai peserta ujian
                  keahlian awak kapal perikanan.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:space-x-0">
            <button
              type="button"
              disabled={isDistributing}
              onClick={() => setIsDistributeOpen(false)}
              className="h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isDistributing}
              onClick={handleDistribusiSoal}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-70"
            >
              {isDistributing && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isDistributing ? "Mendistribusikan…" : "Ya, distribusikan"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ImportAction
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onUpload={handleImportPeserta}
        onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => setImportFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
};

export default TableDataPesertaUjianKeahlian;
