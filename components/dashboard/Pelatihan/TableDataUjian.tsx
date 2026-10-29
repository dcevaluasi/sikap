"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import {
  Building2,
  CalendarClock,
  CalendarDays,
  Check,
  ChevronLeft,
  ClipboardPlus,
  FileText,
  Loader2,
  Lock,
  MapPin,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  SearchX,
  Send,
  ShieldCheck,
  UploadCloud,
  UserCog,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import Toast from "@/components/toast";
import EmptyData from "@/components/micro-components/EmptyData";
import Pagination from "@/components/Pagination";
import { dpkakpBaseUrl } from "@/constants/urls";
import { generateTanggalPelatihan } from "@/utils/text";
import { generatedYears } from "@/utils/globals";
import { Ujian } from "@/types/ujian-keahlian-akp";
import {
  cn,
  isTodayAfter,
  isTodayBefore,
  isTodayBetween,
} from "@/lib/utils";

import { useFetchTypeUjianKeahlianAKP } from "@/hooks/ujian/useFetchTypeUjianKeahlianAKP";
import { useFetchPengujiKeahlianAKP } from "@/hooks/penguji/useFetchPengujiKeahlianAKP";
import { useFetchUjianKeahlianAKP } from "@/hooks/ujian/useFetchUjianKeahlianAKP";

import { JadwalUjianKeahlianAKP } from "../Dashboard/JadwalUjianKeahlianAKP";
import StatusUjianKeahlianAKP from "../Dashboard/StatusUjianKeahlianAKP";
import RemedialAction from "../Dashboard/Actions/RemedialAction";
import VerifikasiAction from "../Dashboard/Actions/VerifikasiAction";
import DeleteAction from "../Dashboard/Actions/DeleteAction";
import { InformationAction } from "../Dashboard/Actions/InformationAction";

/* ========================================================================== */
/*  Types & constants                                                          */
/* ========================================================================== */

type UjianHook = ReturnType<typeof useFetchUjianKeahlianAKP>;
type DataUjian = UjianHook["data"];
type RefetchUjian = UjianHook["refetch"];

type Jenis = "" | "Klasikal" | "Rewarding/Updating";

interface CreateForm {
  typeUjian: string; // "Nama,Id"
  namaUjian: string;
  tempatUjian: string;
  tanggalMulai: string;
  tanggalBerakhir: string;
  jumlahPeserta: string;
  jenis: Jenis;
}

const INITIAL_FORM: CreateForm = {
  typeUjian: "",
  namaUjian: "",
  tempatUjian: "",
  tanggalMulai: "",
  tanggalBerakhir: "",
  jumlahPeserta: "",
  jenis: "",
};

const INITIAL_EDIT = {
  typeUjian: "",
  namaUjian: "",
  tempatUjian: "",
  tanggalMulai: "",
  tanggalBerakhir: "",
};
type EditForm = typeof INITIAL_EDIT;

const ZONES = { WIB: "+0700", WITA: "+0800", WIT: "+0900" } as const;
type Zone = keyof typeof ZONES;

type WaktuKey =
  | "F1"
  | "F2"
  | "F3"
  | "F1B1"
  | "F1B2"
  | "F1B3"
  | "F2B1"
  | "F3B1"
  | "F3B2";
type WaktuState = Record<WaktuKey, string>;

const WAKTU_KEYS: WaktuKey[] = [
  "F1",
  "F2",
  "F3",
  "F1B1",
  "F1B2",
  "F1B3",
  "F2B1",
  "F3B1",
  "F3B2",
];

const emptyWaktu = (value = ""): WaktuState =>
  Object.fromEntries(WAKTU_KEYS.map((k) => [k, value])) as WaktuState;

const KLASIKAL_FIELDS: { key: WaktuKey; label: string }[] = [
  { key: "F1B1", label: "Fungsi 1, Bagian 1" },
  { key: "F1B2", label: "Fungsi 1, Bagian 2" },
  { key: "F1B3", label: "Fungsi 1, Bagian 3" },
  { key: "F2B1", label: "Fungsi 2, Bagian 1" },
  { key: "F3B1", label: "Fungsi 3, Bagian 1" },
  { key: "F3B2", label: "Fungsi 3, Bagian 2" },
];

const REWARDING_FIELDS: { key: WaktuKey; label: string }[] = [
  { key: "F1", label: "Fungsi 1" },
  { key: "F2", label: "Fungsi 2" },
  { key: "F3", label: "Fungsi 3" },
];

const JENIS_OPTIONS: { value: Exclude<Jenis, "">; title: string; desc: string }[] =
  [
    {
      value: "Klasikal",
      title: "Klasikal",
      desc: "Waktu diatur terpisah untuk tiap fungsi dan bagian (F1B1 sampai F3B2).",
    },
    {
      value: "Rewarding/Updating",
      title: "Rewarding/Updating",
      desc: "Waktu diatur per fungsi (F1, F2, dan F3).",
    },
  ];

const STEPS = [
  { title: "Informasi", desc: "Data dasar ujian" },
  { title: "Jadwal", desc: "Tanggal dan waktu" },
  { title: "Lampiran", desc: "Surat dan ringkasan" },
];

/* Button presets so every action in the app reads as primary / secondary / destructive */
const btnBase = "h-8 gap-1.5 rounded-lg px-3 text-xs font-medium shadow-sm";
const btnPrimary = `${btnBase} bg-blue-600 text-white hover:bg-blue-700`;
const btnDanger = `${btnBase} bg-rose-600 text-white hover:bg-rose-700`;
const btnSoft = `${btnBase} bg-background hover:bg-muted`;
const inputCls = "h-10 rounded-lg";

/* ========================================================================== */
/*  Pure helpers                                                               */
/* ========================================================================== */

const pad = (n: number) => String(n).padStart(2, "0");

/** "2025-01-09 10:15:00 +0700 WIB" for the current moment (default for time fields). */
const getFormattedDateTime = () => {
  const now = new Date();
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const offset = now.getTimezoneOffset();
  const tz =
    offset === -480 ? "+0800 WITA" : offset === -540 ? "+0900 WIT" : "+0700 WIB";
  return `${date} ${time} ${tz}`;
};

const WAKTU_REGEX =
  /^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})(?::\d{2})?\s+[+-]\d{4}\s+(WIB|WITA|WIT)$/;

const parseWaktu = (value: string) => {
  const m = WAKTU_REGEX.exec((value || "").trim());
  return m
    ? { date: m[1], time: m[2], zone: m[3] as Zone }
    : { date: "", time: "", zone: "WIB" as Zone };
};

const composeWaktu = (date: string, time: string, zone: Zone) =>
  date && time ? `${date} ${time}:00 ${ZONES[zone]} ${zone}` : "";

const todayLocal = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const parseDateOnly = (value: string): Date | null => {
  const [y, m, d] = String(value ?? "")
    .slice(0, 10)
    .split("-")
    .map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const dayCount = (start: string, end: string) => {
  const a = parseDateOnly(start);
  const b = parseDateOnly(end);
  if (!a || !b) return 0;
  return Math.round((b.getTime() - a.getTime()) / 86400000) + 1;
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

type Tone = "slate" | "amber" | "blue" | "indigo" | "emerald" | "rose";

const TONE: Record<Tone, { badge: string; dot: string; tile: string }> = {
  slate: {
    badge:
      "bg-slate-100 text-slate-700 ring-slate-500/20 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-400/20",
    dot: "bg-slate-400",
    tile: "bg-slate-500",
  },
  amber: {
    badge:
      "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
    dot: "bg-amber-500",
    tile: "bg-amber-500",
  },
  blue: {
    badge:
      "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20",
    dot: "bg-blue-500",
    tile: "bg-blue-600",
  },
  indigo: {
    badge:
      "bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20",
    dot: "bg-indigo-500",
    tile: "bg-indigo-600",
  },
  emerald: {
    badge:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    dot: "bg-emerald-500",
    tile: "bg-emerald-600",
  },
  rose: {
    badge:
      "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20",
    dot: "bg-rose-500",
    tile: "bg-rose-600",
  },
};

/** One human-readable state per exam, derived from Status + dates + IsSelesai. */
const getExamState = (u: Ujian): { label: string; tone: Tone; live?: boolean } => {
  if (u.Status === "Draft") return { label: "Draft", tone: "slate" };
  if (u.Status === "Pending")
    return { label: "Menunggu verifikasi", tone: "amber" };
  if (u.Status === "Aktif") {
    if (u.IsSelesai === "1") return { label: "Selesai", tone: "emerald" };
    if (isTodayBetween(u.TanggalMulaiUjian, u.TanggalBerakhirUjian))
      return { label: "Sedang berlangsung", tone: "blue", live: true };
    if (isTodayAfter(u.TanggalBerakhirUjian))
      return { label: "Perlu ditutup", tone: "rose" };
    return { label: "Akan dilaksanakan", tone: "indigo" };
  }
  return { label: u.Status, tone: "slate" };
};

/* ========================================================================== */
/*  Small presentational components                                            */
/* ========================================================================== */

function StatusBadge({ label, tone, live }: { label: string; tone: Tone; live?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        TONE[tone].badge
      )}
    >
      <span className="relative flex h-2 w-2">
        {live && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none",
              TONE[tone].dot
            )}
          />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", TONE[tone].dot)} />
      </span>
      {label}
    </span>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function TypeUjianSelect({
  id,
  value,
  onChange,
  options,
  contentClassName,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: { IdTypeUjian: string | number; NamaTypeUjian: string }[];
  contentClassName?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className={cn(inputCls, "w-full")}>
        <SelectValue placeholder="Pilih tipe ujian" />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        {options.map((t) => (
          <SelectItem
            key={t.IdTypeUjian}
            value={`${t.NamaTypeUjian},${t.IdTypeUjian}`}
            className="capitalize"
          >
            {t.NamaTypeUjian}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/**
 * Date + time + zone picker that outputs the exact string the API expects
 * ("2025-01-09 10:15:00 +0700 WIB"), so nobody has to type it by hand.
 */
function WaktuField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [draft, setDraft] = React.useState(() => parseWaktu(value));

  // Sync when the parent sets a full value (defaults, reset, "samakan semua")
  React.useEffect(() => {
    if (value) setDraft(parseWaktu(value));
  }, [value]);

  const update = (patch: Partial<typeof draft>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    onChange(composeWaktu(next.date, next.time, next.zone));
  };

  return (
    <div className="space-y-2 rounded-xl border bg-background p-3.5">
      <Label htmlFor={`${id}-date`} className="text-sm font-medium">
        {label}
      </Label>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
        <Input
          id={`${id}-date`}
          type="date"
          className={inputCls}
          value={draft.date}
          onChange={(e) => update({ date: e.target.value })}
        />
        <Input
          id={`${id}-time`}
          type="time"
          aria-label={`${label}, jam`}
          className={cn(inputCls, "w-[7.5rem]")}
          value={draft.time}
          onChange={(e) => update({ time: e.target.value })}
        />
        <Select value={draft.zone} onValueChange={(z) => update({ zone: z as Zone })}>
          <SelectTrigger aria-label={`${label}, zona waktu`} className={cn(inputCls, "w-[5.5rem]")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(ZONES) as Zone[]).map((z) => (
              <SelectItem key={z} value={z}>
                {z}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function FileDropzone({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  const [dragging, setDragging] = React.useState(false);

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border bg-background p-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
          <FileText className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-rose-600"
          aria-label="Hapus file"
          onClick={() => onChange(null)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <label
      htmlFor="surat-permohonan"
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        onChange(e.dataTransfer.files?.[0] ?? null);
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors focus-within:ring-2 focus-within:ring-blue-500",
        dragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
          : "hover:border-blue-400 hover:bg-muted/40"
      )}
    >
      <UploadCloud className="h-8 w-8 text-muted-foreground" />
      <span className="text-sm font-medium">
        Pilih file atau seret ke sini
      </span>
      <span className="text-xs text-muted-foreground">
        Unggah surat permohonan dari lemdiklat
      </span>
      <input
        id="surat-permohonan"
        type="file"
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="mt-5 flex items-center" aria-label="Langkah pengisian">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={s.title}
            className={cn("flex items-center", i < STEPS.length - 1 && "flex-1")}
            aria-current={active ? "step" : undefined}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  done && "bg-blue-600 text-white",
                  active && "bg-blue-600 text-white ring-4 ring-blue-600/20",
                  !done && !active && "bg-muted text-muted-foreground"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className="hidden sm:block">
                <span
                  className={cn(
                    "block text-sm font-medium leading-tight",
                    !active && !done && "text-muted-foreground"
                  )}
                >
                  {s.title}
                </span>
                <span className="block text-xs text-muted-foreground">{s.desc}</span>
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "mx-3 h-px flex-1 transition-colors",
                  done ? "bg-blue-600" : "bg-border"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  tone = "primary",
  loading,
  icon,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  tone?: "primary" | "danger";
  loading?: boolean;
  icon: React.ReactNode;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={(o) => !loading && onOpenChange(o)}>
      <AlertDialogContent className="max-w-md rounded-2xl">
        <AlertDialogHeader>
          <div
            className={cn(
              "mx-auto mb-1 flex h-11 w-11 items-center justify-center rounded-full sm:mx-0",
              tone === "danger"
                ? "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300"
                : "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300"
            )}
          >
            {icon}
          </div>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault(); // keep the dialog open while the request runs
              onConfirm();
            }}
            className={cn(
              "text-white",
              tone === "danger"
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DialogHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <AlertDialogHeader className="flex-row items-start gap-3 space-y-0 text-left">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
        {icon}
      </div>
      <div className="space-y-1">
        <AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </div>
    </AlertDialogHeader>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Memuat data ujian">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border bg-card p-5 motion-reduce:animate-none">
          <div className="flex gap-4">
            <div className="hidden h-16 w-16 rounded-xl bg-muted sm:block" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-24 rounded-full bg-muted" />
              <div className="h-5 w-2/3 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
            <div className="hidden h-16 w-48 rounded-xl bg-muted lg:block" />
          </div>
          <div className="mt-5 flex gap-2 border-t pt-4">
            <div className="h-8 w-24 rounded-lg bg-muted" />
            <div className="h-8 w-20 rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========================================================================== */
/*  Exam card (one row of the list)                                            */
/* ========================================================================== */

interface ExamCardProps {
  ujian: Ujian;
  dataUjian: DataUjian;
  refetchUjian: RefetchUjian;
  pathKey: "pukakp" | "dpkakp";
  isPukakpPath: boolean;
  isDpkakpPath: boolean;
  editLoading: boolean;
  onSend: (u: Ujian) => void;
  onEdit: (u: Ujian) => void;
  onVerify: (u: Ujian) => void;
  onAssign: (u: Ujian) => void;
  onSchedule: (u: Ujian) => void;
  onRemedial: (u: Ujian) => void;
  onClose: (u: Ujian) => void;
}

function ExamCard({
  ujian,
  dataUjian,
  refetchUjian,
  pathKey,
  isPukakpPath,
  isDpkakpPath,
  editLoading,
  onSend,
  onEdit,
  onVerify,
  onAssign,
  onSchedule,
  onRemedial,
  onClose,
}: ExamCardProps) {
  const state = getExamState(ujian);
  const start = parseDateOnly(ujian.TanggalMulaiUjian);

  const isAktif = ujian.Status === "Aktif";
  const isDraft = ujian.Status === "Draft";
  const isDone = ujian.IsSelesai === "1";
  const isLive =
    isAktif && !isDone && isTodayBetween(ujian.TanggalMulaiUjian, ujian.TanggalBerakhirUjian);
  const needsClose = isAktif && !isDone && isTodayAfter(ujian.TanggalBerakhirUjian);
  const needsPenguji = isDpkakpPath && isAktif && !ujian.NamaPengawasUjian;

  const capacity = Math.max(Number(ujian.JumlahPesertaUjian) - 1, 0);
  const filled = ujian.UsersUjian?.length ?? 0;
  const pct = capacity > 0 ? Math.min(100, Math.round((filled / capacity) * 100)) : 0;
  const isFull = capacity > 0 && filled >= capacity;

  const penguji = String(ujian.NamaPengawasUjian ?? "")
    .split("|")
    .filter(Boolean);

  const sameDay =
    String(ujian.TanggalMulaiUjian).slice(0, 10) ===
    String(ujian.TanggalBerakhirUjian).slice(0, 10);

  return (
    <article className="rounded-2xl border bg-card p-4 shadow-sm transition-colors hover:border-blue-300 dark:hover:border-blue-500/50 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* Start-date tile: the quickest way to scan the list by time */}
        <div
          className={cn(
            "hidden h-[4.5rem] w-16 shrink-0 flex-col items-center justify-center rounded-xl text-white sm:flex",
            TONE[state.tone].tile
          )}
          aria-hidden="true"
        >
          <span className="text-xs font-medium capitalize opacity-90">
            {start ? start.toLocaleDateString("id-ID", { month: "short" }) : "-"}
          </span>
          <span className="text-2xl font-bold leading-none tabular-nums">
            {start ? start.getDate() : "-"}
          </span>
          <span className="mt-0.5 text-[10px] tabular-nums opacity-80">
            {start ? start.getFullYear() : ""}
          </span>
        </div>

        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge label={state.label} tone={state.tone} live={state.live} />
            <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
              {ujian.TypeUjian}
            </span>
          </div>

          <h3 className="text-base font-semibold leading-snug text-foreground">
            {ujian.NamaUjian}
          </h3>

          <ul className="grid gap-x-6 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <Building2 className="h-4 w-4 shrink-0" />
              <span className="truncate">{ujian.PUKAKP}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{ujian.TempatUjian}</span>
            </li>
            <li className="flex items-center gap-2 sm:col-span-2">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <span>
                {generateTanggalPelatihan(ujian.TanggalMulaiUjian)}
                {!sameDay && <> s.d {generateTanggalPelatihan(ujian.TanggalBerakhirUjian)}</>}
              </span>
            </li>
            {isAktif && (
              <li className="flex items-center gap-2 sm:col-span-2">
                <UserCog className="h-4 w-4 shrink-0" />
                {penguji.length > 0 ? (
                  <span>Penguji: {penguji.join(", ")}</span>
                ) : (
                  <span className="text-amber-700 dark:text-amber-400">
                    Penguji belum ditetapkan
                  </span>
                )}
              </li>
            )}
          </ul>
        </div>

        {/* Participants */}
        <div className="w-full shrink-0 rounded-xl bg-muted/50 p-3 lg:w-52">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              Peserta
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {filled} / {capacity}
            </span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={filled}
            aria-valuemin={0}
            aria-valuemax={capacity}
            aria-label="Jumlah peserta terdaftar"
          >
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isFull ? "bg-emerald-500" : "bg-blue-500"
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
          {capacity > 0 && (
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              {isFull ? "Kuota terpenuhi" : `${capacity - filled} slot tersisa`}
            </p>
          )}
        </div>
      </div>

      {/* Actions: solid = next step, outline = secondary, right side = utilities */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
        {isAktif && (
          <Button asChild size="sm" className={btnPrimary}>
            <Link
              href={`/lembaga/${pathKey}/admin/dashboard/ujian/peserta-ujian/${ujian.IdUjian}/${ujian.IdTypeUjian}`}
            >
              <Users className="h-4 w-4" />
              Peserta
            </Link>
          </Button>
        )}

        {isDraft && !isDpkakpPath && (
          <Button size="sm" className={btnPrimary} onClick={() => onSend(ujian)}>
            <Send className="h-4 w-4" />
            Kirim permohonan
          </Button>
        )}

        {isDpkakpPath && ujian.Status === "Pending" && (
          <Button size="sm" className={btnPrimary} onClick={() => onVerify(ujian)}>
            <ShieldCheck className="h-4 w-4" />
            Verifikasi
          </Button>
        )}

        {isPukakpPath && isDraft && (
          <Button
            size="sm"
            variant="outline"
            className={btnSoft}
            disabled={editLoading}
            onClick={() => onEdit(ujian)}
          >
            {editLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Pencil className="h-4 w-4" />
            )}
            Edit
          </Button>
        )}

        {needsPenguji && (
          <Button size="sm" variant="outline" className={btnSoft} onClick={() => onAssign(ujian)}>
            <UserCog className="h-4 w-4" />
            Tetapkan penguji
          </Button>
        )}

        {isAktif && (
          <Button size="sm" variant="outline" className={btnSoft} onClick={() => onSchedule(ujian)}>
            <CalendarClock className="h-4 w-4" />
            Waktu
          </Button>
        )}

        {isLive && (
          <Button size="sm" variant="outline" className={btnSoft} onClick={() => onRemedial(ujian)}>
            <RotateCcw className="h-4 w-4" />
            Remedial
          </Button>
        )}

        {needsClose && (
          <Button size="sm" className={btnDanger} onClick={() => onClose(ujian)}>
            <Lock className="h-4 w-4" />
            Tutup ujian
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <InformationAction ujian={ujian} data={dataUjian} onUpdated={refetchUjian} />
          <DeleteAction
            idUjian={ujian.IdUjian.toString()}
            status={ujian.Status}
            refetchUjian={refetchUjian}
          />
        </div>
      </div>
    </article>
  );
}

/* ========================================================================== */
/*  Main component                                                             */
/* ========================================================================== */

const TableDataUjian: React.FC = () => {
  /* ---------- Data ---------- */
  const {
    data: dataUjian,
    isFetching: isFetchingDataUjian,
    counters: countersUjian,
    refetch: refetchUjian,
  } = useFetchUjianKeahlianAKP("admin", true, { includeTryout: false });
  const { dataTypeUjian } = useFetchTypeUjianKeahlianAKP();
  const { dataPenguji } = useFetchPengujiKeahlianAKP();

  /* ---------- Route & role (read once, never inside loops) ---------- */
  const pathname = usePathname() ?? "";
  const isPukakpPath = pathname.includes("pukakp");
  const isDpkakpPath = pathname.includes("dpkakp");
  const pathKey: "pukakp" | "dpkakp" = isPukakpPath ? "pukakp" : "dpkakp";
  const isPenguji = Cookies.get("IsPUKAKP") == "penguji";
  const canCreate = isPukakpPath && !isPenguji;

  const [pukakpName, setPukakpName] = React.useState("");
  const isTryout = pukakpName === "Tryout Center";

  /* ---------- View, filters, paging ---------- */
  const [view, setView] = React.useState<"list" | "create">("list");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = React.useState("All");
  const [selectedTahun, setSelectedTahun] = React.useState("all");
  const years = generatedYears();

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  /* ---------- Create form (wizard) ---------- */
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState<CreateForm>(INITIAL_FORM);
  const [waktu, setWaktu] = React.useState<WaktuState>(emptyWaktu());
  const [filePermohonan, setFilePermohonan] = React.useState<File | null>(null);
  const [isPosting, setIsPosting] = React.useState(false);

  const setField = <K extends keyof CreateForm>(key: K, value: CreateForm[K]) =>
    setForm((p) => ({ ...p, [key]: value }));
  const setWaktuKey = (key: WaktuKey, value: string) =>
    setWaktu((p) => ({ ...p, [key]: value }));

  /* ---------- Edit dialog (PUKAKP, Draft only) ---------- */
  const [editOpen, setEditOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(0);
  const [editLoadingId, setEditLoadingId] = React.useState<number | null>(null);
  const [editForm, setEditForm] = React.useState<EditForm>(INITIAL_EDIT);
  const setEdit = <K extends keyof EditForm>(key: K, value: string) =>
    setEditForm((p) => ({ ...p, [key]: value }));

  /* ---------- Assign examiners dialog (DPKAKP) ---------- */
  const [assignOpen, setAssignOpen] = React.useState(false);
  const [assignId, setAssignId] = React.useState(0);
  const [jumlahPenguji, setJumlahPenguji] = React.useState(1);
  const [pengujiData, setPengujiData] = React.useState(
    Array.from({ length: 3 }, () => ({ nama: "", id: "" }))
  );
  const [namaVasilitator, setNamaVasilitator] = React.useState("");

  /* ---------- Other dialogs ---------- */
  const [sendTargetId, setSendTargetId] = React.useState<number | null>(null);
  const [isSending, setIsSending] = React.useState(false);
  const [closeTargetId, setCloseTargetId] = React.useState<number | null>(null);
  const [isClosing, setIsClosing] = React.useState(false);
  const [timeTargetId, setTimeTargetId] = React.useState<number | null>(null);

  const [openFormValidasiPelaksanaanUjian, setOpenFormValidasiPelaksanaanUjian] =
    React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);
  const [selectedSuratPermohonan, setSelectedSuratPermohonan] = React.useState("");

  const [openFormRemedial, setOpenFormRemedial] = React.useState(false);
  const [selectedIdUjian, setSelectedIdUjian] = React.useState(0);

  const authHeaders = () => ({ Authorization: `Bearer ${Cookies.get("XSRF095")}` });

  /* ---------- Effects ---------- */
  React.useEffect(() => {
    setPukakpName(Cookies.get("PUKAKP") ?? "");
    setWaktu(emptyWaktu(getFormattedDateTime()));
  }, []);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatusFilter, selectedTahun]);

  /* ---------- Derived data ---------- */
  const filteredData = React.useMemo(
    () =>
      dataUjian.filter((ujian: Ujian) => {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          ujian.TypeUjian.toLowerCase().includes(q) ||
          ujian.NamaUjian.toLowerCase().includes(q);

        const matchesYear =
          selectedTahun === "all" ||
          String(ujian.TanggalMulaiUjian).slice(0, 4) === selectedTahun;

        let matchesStatus: boolean;
        if (selectedStatusFilter == "Pilih Penguji") {
          matchesStatus = ujian.NamaPengawasUjian === "";
        } else if (selectedStatusFilter == "Telah Selesai") {
          matchesStatus = ujian.IsSelesai === "1";
        } else if (selectedStatusFilter == "Akan Dilaksanakan") {
          matchesStatus = isTodayBefore(ujian.TanggalMulaiUjian) && ujian.IsSelesai == "";
        } else if (selectedStatusFilter == "Sedang Berlangsung") {
          matchesStatus =
            isTodayBetween(ujian.TanggalMulaiUjian, ujian.TanggalBerakhirUjian) &&
            ujian.IsSelesai !== "1";
        } else {
          matchesStatus =
            selectedStatusFilter === "All" || ujian.Status === selectedStatusFilter;
        }

        return matchesSearch && matchesYear && matchesStatus;
      }),
    [dataUjian, searchQuery, selectedStatusFilter, selectedTahun]
  );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const page = Math.min(currentPage, totalPages);
  const indexOfFirstItem = (page - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(
    indexOfFirstItem,
    indexOfFirstItem + itemsPerPage
  );

  const hasActiveFilter =
    searchQuery.trim() !== "" || selectedStatusFilter !== "All" || selectedTahun !== "all";
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatusFilter("All");
    setSelectedTahun("all");
  };

  const sendTarget = dataUjian.find((u: Ujian) => u.IdUjian === sendTargetId);
  const closeTarget = dataUjian.find((u: Ujian) => u.IdUjian === closeTargetId);
  const timeTarget = dataUjian.find((u: Ujian) => u.IdUjian === timeTargetId);

  /* ---------- Helpers that need component data ---------- */
  const resolveTypeUjian = (value: string) => {
    const [name, id] = value.split(",");
    if (id) return { name, id };
    const found = dataTypeUjian.find((t) => t.NamaTypeUjian === name);
    return { name, id: found ? String(found.IdTypeUjian) : "" };
  };

  const resetCreateForm = () => {
    setForm(INITIAL_FORM);
    setWaktu(emptyWaktu(getFormattedDateTime()));
    setFilePermohonan(null);
    setStep(0);
  };

  /* ---------- Create: validation per step ---------- */
  const waktuKeysNeeded: WaktuKey[] =
    form.jenis === "Klasikal"
      ? KLASIKAL_FIELDS.map((f) => f.key)
      : REWARDING_FIELDS.map((f) => f.key);

  const participants = Number(form.jumlahPeserta);
  const missingByStep: string[][] = [
    [
      !form.typeUjian && "Tipe ujian",
      !form.namaUjian.trim() && "Nama ujian",
      !form.tempatUjian.trim() && "Tempat ujian",
      !(Number.isInteger(participants) && participants >= 1) && "Jumlah peserta",
    ].filter(Boolean) as string[],
    [
      !form.tanggalMulai && "Tanggal mulai",
      !form.tanggalBerakhir && "Tanggal berakhir",
      waktuKeysNeeded.some((k) => !waktu[k]) && "Waktu pelaksanaan",
    ].filter(Boolean) as string[],
    [],
  ];
  const missing = missingByStep[step];
  const durasi = dayCount(form.tanggalMulai, form.tanggalBerakhir);

  /* ---------- Create: submit ---------- */
  const handlePostNewUjianKeahlian = async () => {
    if (isPosting) return;
    setIsPosting(true);
    const { name, id } = resolveTypeUjian(form.typeUjian);

    const formData = new FormData();
    formData.append("IdTypeUjian", id);
    formData.append("TypeUjian", name);
    formData.append("NamaUjian", form.namaUjian.trim());
    formData.append("TempatUjian", form.tempatUjian.trim());
    formData.append("PUKAKP", Cookies.get("PUKAKP") ?? "");
    formData.append("NamaPengawas", "");
    formData.append("NamaVasilitator", "");
    formData.append("TanggalMulaiUjian", form.tanggalMulai);
    formData.append("TanggalBerakhirUjian", form.tanggalBerakhir);
    formData.append("WaktuUjian", "");
    formData.append("JumlahPesertaUjian", (parseInt(form.jumlahPeserta, 10) + 1).toString());
    formData.append("Status", "Draft");
    if (filePermohonan != null) formData.append("filePermohonan", filePermohonan);

    if (form.jenis === "Klasikal") {
      formData.append("WaktuF1B1", waktu.F1B1);
      formData.append("WaktuF1B2", waktu.F1B2);
      formData.append("WaktuF1B3", waktu.F1B3);
      formData.append("WaktuF2B1", waktu.F2B1);
      formData.append("WaktuF3B1", waktu.F3B1);
      formData.append("WaktuF3B2", waktu.F3B2);
    } else {
      formData.append("waktuF1", waktu.F1);
      formData.append("waktuF2", waktu.F2);
      formData.append("waktuF3", waktu.F3);
    }

    try {
      await axios.post(`${dpkakpBaseUrl}/adminPusat/createUjian`, formData, {
        headers: { ...authHeaders(), "Content-Type": "multipart/form-data" },
      });
      Toast.fire({
        icon: "success",
        title: `Berhasil menambahkan data pelaksanaan ujian keahlian baru!`,
      });
      refetchUjian();
      resetCreateForm();
      setView("list");
    } catch (error) {
      console.error(error);
      // Keep what the user typed so they can fix it and try again.
      Toast.fire({
        icon: "error",
        title: `Gagal menambahkan data pelaksanaan ujian keahlian baru!`,
      });
    } finally {
      setIsPosting(false);
    }
  };

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (missing.length > 0 || isPosting) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else handlePostNewUjianKeahlian();
  };

  /* ---------- Edit ---------- */
  const handleOpenEdit = async (u: Ujian) => {
    setEditLoadingId(u.IdUjian);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/GetUjian?id=${u.IdUjian}`,
        { headers: authHeaders() }
      );
      const d = response.data.data[0];
      const found = dataTypeUjian.find((t) => t.NamaTypeUjian === d.TypeUjian);
      setEditId(u.IdUjian);
      setEditForm({
        typeUjian: `${d.TypeUjian},${found?.IdTypeUjian ?? d.IdTypeUjian ?? ""}`,
        namaUjian: d.NamaUjian ?? "",
        tempatUjian: d.TempatUjian ?? "",
        tanggalMulai: String(d.TanggalMulaiUjian ?? "").slice(0, 10),
        tanggalBerakhir: String(d.TanggalBerakhirUjian ?? "").slice(0, 10),
      });
      setEditOpen(true);
    } catch (error) {
      console.error("ERROR FETCHING UJIAN : ", error);
      Toast.fire({ icon: "error", title: "Gagal memuat data ujian, coba lagi." });
    } finally {
      setEditLoadingId(null);
    }
  };

  const editValid =
    !!editForm.typeUjian &&
    !!editForm.namaUjian.trim() &&
    !!editForm.tempatUjian.trim() &&
    !!editForm.tanggalMulai &&
    !!editForm.tanggalBerakhir;

  const handleEditUjianKeahlian = async () => {
    if (!editValid || isPosting) return;
    setIsPosting(true);
    const { name, id } = resolveTypeUjian(editForm.typeUjian);
    try {
      await axios.put(
        `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${editId}`,
        {
          nama_ujian: editForm.namaUjian.trim(),
          tempat_ujian: editForm.tempatUjian.trim(),
          pukakp: Cookies.get("PUKAKP") ?? "",
          tanggal_mulai_ujian: editForm.tanggalMulai,
          tanggal_berakhir_ujian: editForm.tanggalBerakhir,
          status: "Draft",
          type_ujian: name,
          id_type_ujian: id,
        },
        { headers: authHeaders() }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil mengupdate data pelaksanaan ujian keahlian baru!`,
      });
      refetchUjian();
      setEditOpen(false);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupdate data pelaksanaan ujian keahlian baru!`,
      });
    } finally {
      setIsPosting(false);
    }
  };

  /* ---------- Assign examiners ---------- */
  const activePenguji = pengujiData.slice(0, jumlahPenguji);
  const assignValid = activePenguji.every((p) => p.id) && !!namaVasilitator.trim();

  const handlePengujiChange = (index: number, value: string) => {
    const [nama, id] = value.split("|");
    setPengujiData((prev) => prev.map((p, i) => (i === index ? { nama, id } : p)));
  };

  const resetAssignForm = () => {
    setJumlahPenguji(1);
    setPengujiData(Array.from({ length: 3 }, () => ({ nama: "", id: "" })));
    setNamaVasilitator("");
  };

  const handleAssignPenguji = async () => {
    if (!assignValid || isPosting) return;
    setIsPosting(true);
    try {
      await axios.put(
        `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${assignId}`,
        {
          nama_pengawas_ujian: activePenguji.map((p) => p.nama).filter(Boolean).join("|"),
          id_users_dpkakp: activePenguji.map((p) => p.id).filter(Boolean).join(","),
          nama_vasilitator_ujian: namaVasilitator.trim(),
        },
        { headers: authHeaders() }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil mengupdate data pelaksanaan ujian keahlian baru!`,
      });
      refetchUjian();
      setAssignOpen(false);
      resetAssignForm();
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupdate data pelaksanaan ujian keahlian baru!`,
      });
    } finally {
      setIsPosting(false);
    }
  };

  /* ---------- Send request / close exam ---------- */
  const handleKirimPermohonan = async () => {
    if (!sendTarget) return;
    setIsSending(true);
    try {
      await axios.put(
        `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${sendTarget.IdUjian}`,
        { status: "Pending" },
        { headers: authHeaders() }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil mengirimkan permohonan pelaksanaan ujian keahlian!`,
      });
      refetchUjian();
      setSendTargetId(null);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengirimkan permohonan pelaksanaan ujian keahlian!`,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseExam = async () => {
    if (!closeTarget) return;
    setIsClosing(true);
    try {
      await axios.put(
        `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${closeTarget.IdUjian}`,
        { is_selesai: "1" },
        { headers: authHeaders() }
      );
      Toast.fire({
        icon: "success",
        title: "Yeayyy!",
        text: `Berhasil menutup ujian!`,
      });
      refetchUjian();
      setCloseTargetId(null);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal menutup ujian, harap cek internet atau admin pusat!`,
      });
    } finally {
      setIsClosing(false);
    }
  };

  /* ---------- Card callbacks ---------- */
  const onVerify = (u: Ujian) => {
    setSelectedId(u.IdUjian);
    setSelectedSuratPermohonan(u.FilePermohonan);
    setOpenFormValidasiPelaksanaanUjian(true);
  };
  const onAssign = (u: Ujian) => {
    setAssignId(u.IdUjian);
    setAssignOpen(true);
  };
  const onRemedial = (u: Ujian) => {
    setSelectedIdUjian(u.IdUjian);
    setOpenFormRemedial(true);
  };

  /* ====================================================================== */
  /*  Render                                                                 */
  /* ====================================================================== */
  return (
    <section className="h-full w-full">
      <div className="flex h-full w-full flex-col">
        {view === "list" && (
          <StatusUjianKeahlianAKP
            isPenguji={isPenguji}
            selectedStatusFilter={selectedStatusFilter}
            setSelectedStatusFilter={setSelectedStatusFilter}
            data={dataUjian}
            countersUjian={countersUjian}
          />
        )}

        <div className="space-y-5 px-4 pb-10 pt-2">
          {view === "list" ? (
            <>
              {/* Header */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Pelaksanaan Ujian Keahlian
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pantau jadwal, peserta, dan status setiap pelaksanaan ujian.
                  </p>
                </div>
                {canCreate && (
                  <Button
                    onClick={() => setView("create")}
                    className="h-10 gap-2 rounded-xl bg-blue-600 px-4 text-white shadow-sm hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Ajukan ujian baru
                  </Button>
                )}
              </div>

              {/* Toolbar */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari berdasarkan program ujian atau nama ujian"
                    aria-label="Cari ujian"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 rounded-xl pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      aria-label="Hapus pencarian"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <Select value={selectedTahun} onValueChange={setSelectedTahun}>
                  <SelectTrigger
                    aria-label="Tahun pelaksanaan"
                    className="h-10 w-full rounded-xl bg-background sm:w-44"
                  >
                    <SelectValue placeholder="Tahun pelaksanaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua tahun</SelectItem>
                    {years.map((year: number | string) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Result summary + active filters */}
              {!(isFetchingDataUjian && dataUjian.length === 0) && (
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    <span className="font-semibold tabular-nums text-foreground">
                      {filteredData.length}
                    </span>{" "}
                    ujian ditemukan
                  </span>
                  {selectedStatusFilter !== "All" && (
                    <button
                      type="button"
                      onClick={() => setSelectedStatusFilter("All")}
                      className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                      aria-label={`Hapus filter ${selectedStatusFilter}`}
                    >
                      {selectedStatusFilter}
                      <X className="h-3 w-3" />
                    </button>
                  )}
                  {isFetchingDataUjian && (
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Memperbarui
                    </span>
                  )}
                </div>
              )}

              {/* List */}
              {isFetchingDataUjian && dataUjian.length === 0 ? (
                <ListSkeleton />
              ) : dataUjian.length === 0 ? (
                <EmptyData />
              ) : filteredData.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl border border-dashed bg-card/50 px-6 py-14 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <SearchX className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">Tidak ada ujian yang cocok</h3>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Ubah kata kunci, tahun, atau status untuk melihat ujian lainnya.
                  </p>
                  {hasActiveFilter && (
                    <Button variant="outline" className="mt-5 rounded-lg" onClick={resetFilters}>
                      Atur ulang filter
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div
                    className={cn(
                      "space-y-3 transition-opacity",
                      isFetchingDataUjian && "opacity-60"
                    )}
                  >
                    {currentPageData.map((ujian: Ujian) => (
                      <ExamCard
                        key={ujian.IdUjian}
                        ujian={ujian}
                        dataUjian={dataUjian}
                        refetchUjian={refetchUjian}
                        pathKey={pathKey}
                        isPukakpPath={isPukakpPath}
                        isDpkakpPath={isDpkakpPath}
                        editLoading={editLoadingId === ujian.IdUjian}
                        onSend={(u) => setSendTargetId(u.IdUjian)}
                        onEdit={handleOpenEdit}
                        onVerify={onVerify}
                        onAssign={onAssign}
                        onSchedule={(u) => setTimeTargetId(u.IdUjian)}
                        onRemedial={onRemedial}
                        onClose={(u) => setCloseTargetId(u.IdUjian)}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                      Menampilkan{" "}
                      <span className="font-medium tabular-nums text-foreground">
                        {indexOfFirstItem + 1} sampai{" "}
                        {indexOfFirstItem + currentPageData.length}
                      </span>{" "}
                      dari {filteredData.length} ujian
                    </p>
                    <Pagination
                      totalItems={filteredData.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={page}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            /* ------------------------- Create wizard ------------------------- */
            <div className="mx-auto w-full max-w-3xl space-y-5">
              <button
                type="button"
                onClick={() => setView("list")}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Kembali ke daftar ujian
              </button>

              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <div className="border-b p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <ClipboardPlus className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {isTryout ? "Ajukan Permohonan Try Out" : "Ajukan Permohonan Ujian AKP"}
                      </h2>
                      <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                        Untuk ujian keahlian di PUKAKP dari permohonan lemdiklat, ajukan
                        permohonan pelaksanaan kepada tim sekretariat agar dapat
                        diketahui.
                      </p>
                    </div>
                  </div>
                  <Stepper current={step} />
                </div>

                <form autoComplete="off" onSubmit={handleWizardSubmit}>
                  <div className="min-h-[18rem] space-y-5 p-5 sm:p-6">
                    {/* Step 1: information */}
                    {step === 0 && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="PUKAKP" htmlFor="pukakp" className="sm:col-span-2">
                          <div className="relative">
                            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="pukakp"
                              readOnly
                              value={pukakpName}
                              className={cn(inputCls, "bg-muted/50 pl-9")}
                            />
                          </div>
                        </Field>

                        <Field label="Tipe ujian" htmlFor="type-ujian" required>
                          <TypeUjianSelect
                            id="type-ujian"
                            value={form.typeUjian}
                            onChange={(v) => setField("typeUjian", v)}
                            options={dataTypeUjian}
                          />
                        </Field>

                        <Field label="Nama ujian" htmlFor="nama-ujian" required>
                          <Input
                            id="nama-ujian"
                            className={inputCls}
                            value={form.namaUjian}
                            onChange={(e) => setField("namaUjian", e.target.value)}
                          />
                        </Field>

                        <Field label="Tempat ujian" htmlFor="tempat-ujian" required>
                          <Input
                            id="tempat-ujian"
                            className={inputCls}
                            value={form.tempatUjian}
                            onChange={(e) => setField("tempatUjian", e.target.value)}
                          />
                        </Field>

                        <Field label="Jumlah peserta" htmlFor="jumlah-peserta" required>
                          <Input
                            id="jumlah-peserta"
                            type="number"
                            inputMode="numeric"
                            min={1}
                            className={inputCls}
                            value={form.jumlahPeserta}
                            onChange={(e) => setField("jumlahPeserta", e.target.value)}
                          />
                        </Field>
                      </div>
                    )}

                    {/* Step 2: schedule */}
                    {step === 1 && (
                      <>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Tanggal mulai" htmlFor="tanggal-mulai" required>
                            <Input
                              id="tanggal-mulai"
                              type="date"
                              className={inputCls}
                              min={todayLocal()}
                              value={form.tanggalMulai}
                              onChange={(e) => {
                                const v = e.target.value;
                                setForm((p) => ({
                                  ...p,
                                  tanggalMulai: v,
                                  tanggalBerakhir:
                                    p.tanggalBerakhir && v > p.tanggalBerakhir
                                      ? ""
                                      : p.tanggalBerakhir,
                                }));
                              }}
                            />
                          </Field>
                          <Field
                            label="Tanggal berakhir"
                            htmlFor="tanggal-berakhir"
                            required
                            hint={durasi > 0 ? `Durasi ${durasi} hari` : undefined}
                          >
                            <Input
                              id="tanggal-berakhir"
                              type="date"
                              className={inputCls}
                              min={form.tanggalMulai || todayLocal()}
                              value={form.tanggalBerakhir}
                              onChange={(e) => setField("tanggalBerakhir", e.target.value)}
                            />
                          </Field>
                        </div>

                        {!isTryout && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Jenis pelaksanaan</Label>
                            <div role="radiogroup" aria-label="Jenis pelaksanaan" className="grid gap-3 sm:grid-cols-2">
                              {JENIS_OPTIONS.map((o) => {
                                const active = form.jenis === o.value;
                                return (
                                  <button
                                    key={o.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => setField("jenis", active ? "" : o.value)}
                                    className={cn(
                                      "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                                      active
                                        ? "border-blue-500 bg-blue-50/60 ring-1 ring-blue-500 dark:bg-blue-500/10"
                                        : "hover:border-blue-300 hover:bg-muted/40"
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                                        active
                                          ? "border-blue-600 bg-blue-600 text-white"
                                          : "border-muted-foreground/40"
                                      )}
                                    >
                                      {active && <Check className="h-3 w-3" />}
                                    </span>
                                    <span>
                                      <span className="block text-sm font-semibold">{o.title}</span>
                                      <span className="mt-0.5 block text-xs text-muted-foreground">
                                        {o.desc}
                                      </span>
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                            {!form.jenis && (
                              <p className="text-xs text-muted-foreground">
                                Belum memilih? Satu waktu yang sama dipakai untuk semua fungsi.
                              </p>
                            )}
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="flex flex-wrap items-end justify-between gap-2">
                            <div>
                              <h3 className="text-sm font-semibold">Waktu pelaksanaan</h3>
                              <p className="text-xs text-muted-foreground">
                                Pilih tanggal, jam, dan zona waktu. Format penulisan disusun otomatis.
                              </p>
                            </div>
                            {form.jenis !== "" && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:text-blue-300 dark:hover:bg-blue-500/10"
                                onClick={() =>
                                  form.jenis === "Klasikal"
                                    ? setWaktu(emptyWaktu(waktu.F1B1))
                                    : setWaktu((p) => ({ ...p, F2: p.F1, F3: p.F1 }))
                                }
                              >
                                Samakan dengan waktu pertama
                              </Button>
                            )}
                          </div>

                          {form.jenis === "Klasikal" ? (
                            <div className="grid gap-3 sm:grid-cols-2">
                              {KLASIKAL_FIELDS.map((f) => (
                                <WaktuField
                                  key={f.key}
                                  id={`waktu-${f.key}`}
                                  label={f.label}
                                  value={waktu[f.key]}
                                  onChange={(v) => setWaktuKey(f.key, v)}
                                />
                              ))}
                            </div>
                          ) : form.jenis === "Rewarding/Updating" ? (
                            <div className="grid gap-3 sm:grid-cols-2">
                              {REWARDING_FIELDS.map((f) => (
                                <WaktuField
                                  key={f.key}
                                  id={`waktu-${f.key}`}
                                  label={f.label}
                                  value={waktu[f.key]}
                                  onChange={(v) => setWaktuKey(f.key, v)}
                                />
                              ))}
                            </div>
                          ) : (
                            <WaktuField
                              id="waktu-semua"
                              label="Waktu semua fungsi"
                              value={waktu.F1}
                              onChange={(v) => setWaktu((p) => ({ ...p, F1: v, F2: v, F3: v }))}
                            />
                          )}
                        </div>
                      </>
                    )}

                    {/* Step 3: attachment + review */}
                    {step === 2 && (
                      <>
                        <Field
                          label="Surat permohonan"
                          hint="Disarankan dilampirkan agar proses verifikasi lebih cepat."
                        >
                          <FileDropzone file={filePermohonan} onChange={setFilePermohonan} />
                        </Field>

                        <div className="rounded-xl border bg-muted/30 p-4">
                          <h3 className="text-sm font-semibold">Periksa kembali sebelum disimpan</h3>
                          <dl className="mt-3 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                            {(
                              [
                                ["PUKAKP", pukakpName || "-"],
                                ["Tipe ujian", form.typeUjian.split(",")[0] || "-"],
                                ["Nama ujian", form.namaUjian || "-"],
                                ["Tempat ujian", form.tempatUjian || "-"],
                                ["Jumlah peserta", form.jumlahPeserta || "-"],
                                [
                                  "Tanggal",
                                  form.tanggalMulai
                                    ? `${generateTanggalPelatihan(form.tanggalMulai)}${form.tanggalBerakhir &&
                                      form.tanggalBerakhir !== form.tanggalMulai
                                      ? ` s.d ${generateTanggalPelatihan(form.tanggalBerakhir)}`
                                      : ""
                                    }`
                                    : "-",
                                ],
                                ["Jenis pelaksanaan", form.jenis || "Satu waktu untuk semua fungsi"],
                                [
                                  "Surat permohonan",
                                  filePermohonan ? filePermohonan.name : "Belum dilampirkan",
                                ],
                              ] as [string, string][]
                            ).map(([k, v]) => (
                              <div key={k} className="min-w-0">
                                <dt className="text-xs text-muted-foreground">{k}</dt>
                                <dd className="truncate font-medium text-foreground" title={v}>
                                  {v}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-3 border-t bg-muted/30 px-5 py-4 sm:px-6">
                    {missing.length > 0 && (
                      <p className="text-xs text-amber-700 dark:text-amber-400" role="status">
                        Lengkapi dulu: {missing.join(", ")}
                      </p>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      {step === 0 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            resetCreateForm();
                            setView("list");
                          }}
                        >
                          Batal
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isPosting}
                          onClick={() => setStep(step - 1)}
                        >
                          Kembali
                        </Button>
                      )}

                      <Button
                        type="submit"
                        disabled={missing.length > 0 || isPosting}
                        className="min-w-36 bg-blue-600 text-white hover:bg-blue-700"
                      >
                        {isPosting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {step < STEPS.length - 1 ? "Lanjut" : "Simpan sebagai draft"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------------------- Shared dialogs ---------------------------- */}
      <VerifikasiAction
        open={openFormValidasiPelaksanaanUjian}
        setOpen={setOpenFormValidasiPelaksanaanUjian}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        selectedSuratPermohonan={selectedSuratPermohonan}
        setSelectedSuratPermohonan={setSelectedSuratPermohonan}
        refetchUjian={refetchUjian}
      />

      <RemedialAction
        open={openFormRemedial}
        setOpen={setOpenFormRemedial}
        selectedIdUjian={selectedIdUjian}
        setSelectedIdUjian={setSelectedIdUjian}
        refetchUjian={refetchUjian}
      />

      {/* Send request */}
      <ConfirmDialog
        open={sendTargetId !== null}
        onOpenChange={(o) => !o && setSendTargetId(null)}
        icon={<Send className="h-5 w-5" />}
        title="Kirim permohonan ke sekretariat?"
        description={
          <>
            Permohonan <span className="font-medium text-foreground">{sendTarget?.NamaUjian}</span>{" "}
            akan dikirim untuk diverifikasi. Pastikan data dan surat permohonan sudah benar,
            karena data tidak dapat diedit selama menunggu verifikasi.
          </>
        }
        confirmLabel="Kirim permohonan"
        loading={isSending}
        onConfirm={handleKirimPermohonan}
      />

      {/* Close exam */}
      <ConfirmDialog
        open={closeTargetId !== null}
        onOpenChange={(o) => !o && setCloseTargetId(null)}
        icon={<Lock className="h-5 w-5" />}
        tone="danger"
        title="Tutup ujian ini?"
        description={
          <>
            Menutup <span className="font-medium text-foreground">{closeTarget?.NamaUjian}</span>{" "}
            berarti seluruh rangkaian pelaksanaan ujian sudah selesai. Periksa kembali nilai
            peserta sebelum menutup.
          </>
        }
        confirmLabel="Tutup ujian"
        loading={isClosing}
        onConfirm={handleCloseExam}
      />

      {/* Exam schedule */}
      <AlertDialog open={timeTargetId !== null} onOpenChange={(o) => !o && setTimeTargetId(null)}>
        <AlertDialogContent className="max-w-2xl rounded-2xl">
          <AlertDialogHeader className="items-center text-center">
            <AlertDialogTitle className="leading-snug">
              Daftar waktu pelaksanaan{" "}
              <span className="text-blue-600 dark:text-blue-400">{timeTarget?.TypeUjian}</span>{" "}
              di {timeTarget?.PUKAKP}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Waktu pelaksanaan setiap fungsi dan bagian.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {timeTarget && (
            <JadwalUjianKeahlianAKP data={dataUjian} ujian={timeTarget} onUpdated={refetchUjian} />
          )}
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full bg-slate-900 text-white hover:bg-slate-800 hover:text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:hover:text-slate-900">
              Tutup
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit exam (PUKAKP) */}
      <AlertDialog open={editOpen} onOpenChange={(o) => !isPosting && setEditOpen(o)}>
        <AlertDialogContent className="max-w-xl rounded-2xl">
          <DialogHeading
            icon={<Pencil className="h-5 w-5" />}
            title="Edit pelaksanaan ujian"
            description="Perbarui data pelaksanaan ujian keahlian awak kapal perikanan sebelum permohonan dikirim."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tipe ujian" htmlFor="edit-type-ujian" required>
              <TypeUjianSelect
                id="edit-type-ujian"
                value={editForm.typeUjian}
                onChange={(v) => setEdit("typeUjian", v)}
                options={dataTypeUjian}
                contentClassName="z-[999999]"
              />
            </Field>
            <Field label="Nama ujian" htmlFor="edit-nama-ujian" required>
              <Input
                id="edit-nama-ujian"
                className={inputCls}
                value={editForm.namaUjian}
                onChange={(e) => setEdit("namaUjian", e.target.value)}
              />
            </Field>
            <Field label="Tempat ujian" htmlFor="edit-tempat-ujian" required>
              <Input
                id="edit-tempat-ujian"
                className={inputCls}
                value={editForm.tempatUjian}
                onChange={(e) => setEdit("tempatUjian", e.target.value)}
              />
            </Field>
            <Field label="PUKAKP" htmlFor="edit-pukakp">
              <Input
                id="edit-pukakp"
                readOnly
                className={cn(inputCls, "bg-muted/50")}
                value={pukakpName}
              />
            </Field>
            <Field label="Tanggal mulai" htmlFor="edit-tanggal-mulai" required>
              <Input
                id="edit-tanggal-mulai"
                type="date"
                className={inputCls}
                value={editForm.tanggalMulai}
                onChange={(e) => {
                  const v = e.target.value;
                  setEditForm((p) => ({
                    ...p,
                    tanggalMulai: v,
                    tanggalBerakhir: p.tanggalBerakhir && v > p.tanggalBerakhir ? "" : p.tanggalBerakhir,
                  }));
                }}
              />
            </Field>
            <Field label="Tanggal berakhir" htmlFor="edit-tanggal-berakhir" required>
              <Input
                id="edit-tanggal-berakhir"
                type="date"
                className={inputCls}
                min={editForm.tanggalMulai}
                value={editForm.tanggalBerakhir}
                onChange={(e) => setEdit("tanggalBerakhir", e.target.value)}
              />
            </Field>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPosting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              disabled={!editValid || isPosting}
              onClick={(e) => {
                e.preventDefault();
                handleEditUjianKeahlian();
              }}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isPosting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan perubahan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Assign examiners (DPKAKP) */}
      <AlertDialog
        open={assignOpen}
        onOpenChange={(o) => {
          if (isPosting) return;
          setAssignOpen(o);
          if (!o) resetAssignForm();
        }}
      >
        <AlertDialogContent className="max-w-xl rounded-2xl">
          <DialogHeading
            icon={<UserCog className="h-5 w-5" />}
            title="Tetapkan penguji dan fasilitator"
            description="Tugaskan penguji dan fasilitator pusat dalam pelaksanaan ujian keahlian awak kapal perikanan untuk ANKAPIN dan ATKAPIN tingkat I, II, atau tingkat III."
          />
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Jumlah penguji<span className="ml-0.5 text-rose-500">*</span>
              </Label>
              <div
                role="radiogroup"
                aria-label="Jumlah penguji"
                className="flex w-fit rounded-lg border bg-muted/40 p-1"
              >
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={jumlahPenguji === n}
                    onClick={() => setJumlahPenguji(n)}
                    className={cn(
                      "h-8 w-14 rounded-md text-sm font-medium transition-colors",
                      jumlahPenguji === n
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {activePenguji.map((p, index) => {
              const takenByOthers = activePenguji
                .filter((_, i) => i !== index)
                .map((o) => o.id);
              return (
                <Field
                  key={index}
                  label={`Nama penguji ${index + 1}`}
                  htmlFor={`penguji-${index}`}
                  required
                >
                  <Select
                    value={p.id ? `${p.nama}|${p.id}` : ""}
                    onValueChange={(value) => handlePengujiChange(index, value)}
                  >
                    <SelectTrigger id={`penguji-${index}`} className={cn(inputCls, "w-full")}>
                      <SelectValue placeholder="Pilih penguji" />
                    </SelectTrigger>
                    <SelectContent side="bottom" className="z-[999999]">
                      {(dataPenguji ?? [])
                        .filter((x) => !takenByOthers.includes(String(x.IdUsersDpkakp)))
                        .map((x) => (
                          <SelectItem
                            key={x.IdUsersDpkakp}
                            value={`${x.NamaUsersDpkakp}|${x.IdUsersDpkakp}`}
                            className="capitalize"
                          >
                            {x.NamaUsersDpkakp}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </Field>
              );
            })}

            <Field label="Nama fasilitator" htmlFor="fasilitator" required>
              <Input
                id="fasilitator"
                className={inputCls}
                placeholder="Nama fasilitator"
                value={namaVasilitator}
                onChange={(e) => setNamaVasilitator(e.target.value)}
              />
            </Field>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPosting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              disabled={!assignValid || isPosting}
              onClick={(e) => {
                e.preventDefault();
                handleAssignPenguji();
              }}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isPosting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan penugasan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default TableDataUjian;