"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDashed,
  Clock,
  CloudOff,
  Flag,
  LayoutGrid,
  Loader2,
  Minus,
  PartyPopper,
  Plus,
  RefreshCw,
  Send,
  ShieldAlert,
  ShieldCheck,
  WifiOff,
  X,
  ZoomIn,
} from "lucide-react";

import Toast from "@/components/toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { backupBaseUrl, dpkakpBaseUrl } from "@/constants/urls";
import {
  JawabanUser,
  JawabanUserStore,
  SoalBagian,
  SoalUjianBagian,
  UserExamInfo,
} from "@/types/ujian-keahlian-akp";
import addData from "@/firebase/firestore/addData";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants & types                                                   */
/* ------------------------------------------------------------------ */
const AUTH_ROUTE = "/lembaga/dpkakp/user/auth";
const LETTERS = ["A", "B", "C", "D"];
/** Minutes left at which a one-time warning toast is shown. */
const WARN_MINUTES = [1, 5, 10];
const STORAGE_KEYS = [
  "selectedIdSoal",
  "answer",
  "answers",
  "countDownDate",
  "flagged",
  "examViolations",
  "XSRF098_ANS",
  "XSRF098_FLAG",
];
/** Answers & flags survive a refresh in cookies, keyed by question id (order-independent). */
const ANSWER_COOKIE = "XSRF098_ANS";
const FLAG_COOKIE = "XSRF098_FLAG";
const COOKIE_OPTS = { expires: 1, sameSite: "strict" as const };
/** Reading-size preference, kept across exams on this device. */
const FONT_KEY = "examFontScale";
const QUESTION_TEXT = ["text-base sm:text-lg", "text-lg sm:text-xl", "text-xl sm:text-2xl"];
const OPTION_TEXT = ["text-sm", "text-base", "text-lg"];
/** Minimum horizontal travel (px) for a swipe to change question. */
const SWIPE_PX = 70;
/** How long the screen stays blank after a screenshot shortcut. */
const SHIELD_MS = 1500;

type Option = NonNullable<SoalUjianBagian["Jawaban"]>[number];
type LoadState = "loading" | "ready" | "error";
type SaveState = "idle" | "saving" | "saved" | "error";
type NavFilter = "all" | "unanswered" | "flagged";

interface BackupPayload {
  initial: SoalBagian | null;
  answers: JawabanUser[];
  store: JawabanUserStore[];
}

const isCodeExist = async (code?: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${backupBaseUrl}/api/verify/${code}`);
    return Boolean(response.data.exists);
  } catch (e) {
    console.log(e);
    return false;
  }
};

/** Mouse clicks shouldn't leave focus on a button, otherwise Enter shortcuts get swallowed. */
const keepFocus = (e: React.MouseEvent) => e.preventDefault();

const formatTime = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600);
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

/** Question id, taken from any option that carries it. */
const soalId = (q: SoalUjianBagian) =>
  q.Jawaban?.find((j) => j.IdSoalUjianBagian != null)?.IdSoalUjianBagian?.toString() ?? "";
/** Key used to save answers/flags; falls back to the position when there is no id. */
const qkey = (q: SoalUjianBagian, i: number) => soalId(q) || `#${i}`;

const buildEntry = (q: SoalUjianBagian, value: string) => {
  const idSoal = soalId(q);
  const answer: JawabanUser = { id_soal_bagian: idSoal, jawaban_pengguna: value };
  const store: JawabanUserStore = {
    id_soal: idSoal,
    soal: q.Soal,
    gambarSoal: q.GambarSoal!,
    jawaban_benar: q.JawabanBenar,
    jawaban_pengguna: value,
    isCorrect: value !== "" && q.JawabanBenar == value,
  };
  return { answer, store };
};

/** Saved value is `<access code>|<entries joined by ~>` so data from another session is ignored. */
const parseSaved = (raw: string | null | undefined, code: string): string[] | null => {
  if (!raw) return null;
  const sep = raw.indexOf("|");
  if (sep === -1 || raw.slice(0, sep) !== code) return null;
  return raw.slice(sep + 1).split("~").filter(Boolean);
};

const readSaved = (key: string, code: string) => {
  let local: string | null = null;
  try {
    local = localStorage.getItem(key);
  } catch {
    /* storage unavailable */
  }
  return parseSaved(Cookies.get(key), code) ?? parseSaved(local, code);
};

/** Browsers silently drop cookies over ~4KB, so localStorage mirrors the same value. */
const writeSaved = (key: string, code: string, entries: string[]) => {
  const value = `${code}|${entries.join("~")}`;
  if (encodeURIComponent(value).length < 3800) Cookies.set(key, value, COOKIE_OPTS);
  else Cookies.remove(key);
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
};

/** Writes answers (`<key>.<option index>`) and flags (`<key>`) for this device. */
const saveLocal = (
  soal: SoalUjianBagian[],
  answers: JawabanUser[],
  flags: number[],
  code: string
) => {
  writeSaved(
    ANSWER_COOKIE,
    code,
    soal.flatMap((q, i) => {
      const value = answers[i]?.jawaban_pengguna;
      const k = value ? q.Jawaban.slice(1).findIndex((o) => o.NameJawaban === value) : -1;
      return k >= 0 ? [`${qkey(q, i)}.${k}`] : [];
    })
  );
  writeSaved(
    FLAG_COOKIE,
    code,
    flags.filter((i) => i < soal.length).map((i) => qkey(soal[i], i))
  );
};

/** Device copy is always the newest, so it wins over the API backup. */
const mergeSaved = (
  soal: SoalUjianBagian[],
  answers: JawabanUser[],
  store: JawabanUserStore[],
  code: string
) => {
  const nextAnswers = [...answers];
  const nextStore = [...store];
  let changed = false;

  const savedAnswers = readSaved(ANSWER_COOKIE, code);
  if (savedAnswers) {
    const picked = new Map(
      savedAnswers.map((entry) => {
        const dot = entry.lastIndexOf(".");
        return [entry.slice(0, dot), Number(entry.slice(dot + 1))] as const;
      })
    );
    soal.forEach((q, i) => {
      const k = picked.get(qkey(q, i));
      const value = k === undefined ? "" : q.Jawaban.slice(1)[k]?.NameJawaban ?? "";
      if ((answers[i]?.jawaban_pengguna ?? "") === value) return;
      const entry = buildEntry(q, value);
      nextAnswers[i] = entry.answer;
      nextStore[i] = entry.store;
      changed = true;
    });
  }

  const savedFlags = readSaved(FLAG_COOKIE, code) ?? [];
  const flags = soal.flatMap((q, i) => (savedFlags.includes(qkey(q, i)) ? [i] : []));

  return { answers: nextAnswers, store: nextStore, flags, changed };
};

/* ------------------------------------------------------------------ */
/*  Countdown (one timer for the whole page, always calls the latest    */
/*  onExpire so the newest answers are submitted when time runs out)    */
/* ------------------------------------------------------------------ */
function useCountdown(minutes: number | undefined, onExpire: () => void) {
  const [remaining, setRemaining] = React.useState<number | null>(null);
  const expireRef = React.useRef(onExpire);
  expireRef.current = onExpire;

  React.useEffect(() => {
    const mins = Number(minutes);
    if (!mins) return;

    let end = parseInt(localStorage.getItem("countDownDate") ?? "", 10);
    if (isNaN(end)) {
      end = Date.now() + mins * 60 * 1000;
      localStorage.setItem("countDownDate", String(end));
    }

    let fired = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const tick = () => {
      const left = end - Date.now();
      if (left <= 0) {
        setRemaining(0);
        if (timer) clearInterval(timer);
        if (!fired) {
          fired = true;
          expireRef.current();
        }
        return;
      }
      setRemaining(left);
    };
    tick();
    timer = setInterval(tick, 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [minutes]);

  return { remaining, totalMs: (Number(minutes) || 0) * 60 * 1000 };
}

/* ------------------------------------------------------------------ */
/*  Small presentational components                                     */
/* ------------------------------------------------------------------ */
/** Glass card with the soft pointer spotlight used on the other pages. */
function GlassCard({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };
  return (
    <div
      {...rest}
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-blue-950/50 backdrop-blur-xl",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(380px_circle_at_var(--x,50%)_var(--y,0%),rgba(147,197,253,0.22),transparent_65%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function TimerBadge({
  remaining,
  totalMs,
  compact,
}: {
  remaining: number | null;
  totalMs: number;
  compact?: boolean;
}) {
  const minutesLeft = remaining == null ? Infinity : remaining / 60000;
  const tone = minutesLeft <= 5 ? "danger" : minutesLeft <= 10 ? "warn" : "ok";
  const toneCls = {
    ok: "border-white/15 bg-white/10 text-white",
    warn: "border-amber-300/40 bg-amber-400/15 text-amber-100",
    danger: "border-rose-400/50 bg-rose-500/20 text-rose-100",
  }[tone];
  const text = remaining == null ? "--:--" : formatTime(remaining);
  const pct = remaining != null && totalMs ? Math.min(100, (remaining / totalMs) * 100) : 100;

  if (compact) {
    return (
      <div
        role="timer"
        aria-label="Sisa waktu ujian"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 font-mono text-sm font-semibold tabular-nums",
          toneCls,
          tone === "danger" && "animate-pulse motion-reduce:animate-none"
        )}
      >
        <Clock className="h-4 w-4" aria-hidden="true" />
        {text}
      </div>
    );
  }

  return (
    <div role="timer" aria-label="Sisa waktu ujian" className={cn("rounded-xl border p-3", toneCls)}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 font-jakarta text-xs font-medium">
          <Clock className="h-4 w-4" aria-hidden="true" />
          Sisa waktu
        </span>
        <span className="font-mono text-2xl font-semibold tabular-nums">{text}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-1000 ease-linear motion-reduce:transition-none",
            tone === "danger" ? "bg-rose-400" : tone === "warn" ? "bg-amber-400" : "bg-blue-400"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SaveStatus({ state, onRetry }: { state: SaveState; onRetry: () => void }) {
  if (state === "idle") return null;
  if (state === "saving") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-blue-100/70" aria-live="polite">
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        <span className="hidden sm:inline">Menyimpan</span>
      </span>
    );
  }
  if (state === "saved") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300" aria-live="polite">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Tersimpan</span>
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex items-center gap-1.5 rounded-md text-xs text-rose-300 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <CloudOff className="h-3.5 w-3.5" aria-hidden="true" />
      Gagal menyimpan, coba lagi
    </button>
  );
}

/** A− / A+ control so participants can enlarge the question text. */
function FontSizeControl({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const btn =
    "flex h-8 w-8 items-center justify-center rounded-md text-blue-100 transition-colors hover:bg-white/10 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
  return (
    <div
      role="group"
      aria-label="Ukuran teks"
      className="inline-flex items-center rounded-lg border border-white/15 bg-white/5"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        onMouseDown={keepFocus}
        disabled={value <= 0}
        aria-label="Perkecil teks"
        className={btn}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span className="px-0.5 font-jakarta text-xs font-semibold text-blue-100/80" aria-hidden="true">
        Aa
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        onMouseDown={keepFocus}
        disabled={value >= QUESTION_TEXT.length - 1}
        aria-label="Perbesar teks"
        className={btn}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

function Navigator({
  total,
  current,
  isAnswered,
  flagged,
  onSelect,
  columns,
}: {
  total: number;
  current: number;
  isAnswered: (i: number) => boolean;
  flagged: number[];
  onSelect: (i: number) => void;
  columns: string;
}) {
  const [filter, setFilter] = React.useState<NavFilter>("all");
  const all = Array.from({ length: total }, (_, i) => i);
  const unansweredCount = all.filter((i) => !isAnswered(i)).length;
  const visible =
    filter === "unanswered"
      ? all.filter((i) => !isAnswered(i))
      : filter === "flagged"
        ? flagged
        : all;

  const tabs: { key: NavFilter; label: string; count: number }[] = [
    { key: "all", label: "Semua", count: total },
    { key: "unanswered", label: "Belum", count: unansweredCount },
    { key: "flagged", label: "Ragu", count: flagged.length },
  ];

  return (
    <div className="space-y-3">
      <div role="tablist" aria-label="Saring nomor soal" className="grid grid-cols-3 gap-1 rounded-xl bg-white/5 p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={filter === t.key}
            onClick={() => setFilter(t.key)}
            onMouseDown={keepFocus}
            className={cn(
              "rounded-lg px-2 py-1.5 font-jakarta text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
              filter === t.key ? "bg-white/15 text-white" : "text-blue-100/70 hover:text-white"
            )}
          >
            {t.label} <span className="tabular-nums opacity-70">{t.count}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl bg-white/5 px-3 py-4 text-center font-jakarta text-xs text-blue-100/70">
          {filter === "unanswered" ? "Semua soal sudah dijawab." : "Belum ada soal yang ditandai ragu-ragu."}
        </p>
      ) : (
        <div className="-m-1 max-h-[40vh] overflow-y-auto p-1 lg:max-h-[min(22rem,38vh)]">
          <div className={cn("grid gap-2", columns)}>
            {visible.map((i) => {
              const answered = isAnswered(i);
              const isFlagged = flagged.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelect(i)}
                  onMouseDown={keepFocus}
                  aria-current={i === current ? "step" : undefined}
                  aria-label={`Soal ${i + 1}, ${answered ? "sudah dijawab" : "belum dijawab"}${isFlagged ? ", ditandai ragu-ragu" : ""}`}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-lg text-sm font-semibold tabular-nums transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none",
                    answered
                      ? "bg-emerald-500/70 text-white hover:bg-emerald-500/90"
                      : "border border-dashed border-blue-300/30 bg-blue-500/15 text-blue-100 hover:bg-blue-500/30",
                    isFlagged && "ring-2 ring-amber-400/80",
                    i === current && "scale-105 bg-white text-blue-950 ring-2 ring-white ring-offset-2 ring-offset-blue-950 hover:bg-white"
                  )}
                >
                  {i + 1}
                  {isFlagged && (
                    <Flag
                      aria-hidden="true"
                      className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-blue-950 fill-amber-400 p-0.5 text-amber-400"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-jakarta text-[11px] text-blue-100/70">
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-emerald-500/70" aria-hidden="true" />
          Terjawab
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-dashed border-blue-300/40 bg-blue-500/15" aria-hidden="true" />
          Belum
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded ring-2 ring-amber-400/80" aria-hidden="true" />
          Ragu-ragu
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-white" aria-hidden="true" />
          Sedang dibuka
        </li>
      </ul>
    </div>
  );
}

function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gambar soal diperbesar"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200 motion-reduce:animate-none"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup gambar"
        className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X className="h-5 w-5" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Gambar soal diperbesar"
        draggable={false}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-full rounded-xl bg-white object-contain"
      />
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80">
        Ketuk di luar gambar atau tekan Esc untuk menutup
      </p>
    </div>
  );
}

function ExamSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]" aria-busy="true" aria-label="Memuat soal">
      <GlassCard className="p-5 sm:p-7">
        <div className="animate-pulse space-y-5">
          <div className="h-7 w-32 rounded-full bg-white/10" />
          <div className="h-6 w-full rounded bg-white/10" />
          <div className="h-6 w-3/4 rounded bg-white/10" />
          <div className="space-y-3 pt-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-white/10" />
            ))}
          </div>
        </div>
        <p className="mt-6 text-center font-jakarta text-sm text-blue-100/70">Menyiapkan soal ujianmu…</p>
      </GlassCard>
      <GlassCard className="hidden p-5 lg:block">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-3/4 rounded bg-white/10" />
          <div className="h-16 rounded-xl bg-white/10" />
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-white/10" />
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function ReviewDialog({
  open,
  onOpenChange,
  total,
  isAnswered,
  unanswered,
  flagged,
  remaining,
  submitting,
  onJump,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  isAnswered: (i: number) => boolean;
  unanswered: number[];
  flagged: number[];
  remaining: number | null;
  submitting: boolean;
  onJump: (i: number) => void;
  onConfirm: () => void;
}) {
  const [confirmed, setConfirmed] = React.useState(false);
  React.useEffect(() => {
    if (!open) setConfirmed(false);
  }, [open]);

  const answered = total - unanswered.length;
  const pct = total ? Math.round((answered / total) * 100) : 0;
  const incomplete = unanswered.length > 0;

  const stats = [
    { label: "Terjawab", value: answered, dot: "bg-emerald-400", text: "text-emerald-300" },
    { label: "Belum", value: unanswered.length, dot: "bg-rose-400", text: incomplete ? "text-rose-300" : "text-blue-100/60" },
    { label: "Ragu-ragu", value: flagged.length, dot: "bg-amber-400", text: "text-amber-300" },
  ];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[92vh] gap-0 overflow-y-auto border-white/10 bg-white/5 p-0 text-white backdrop-blur-2xl sm:max-w-lg">
        <div className="space-y-5 p-5 sm:p-6">
          <AlertDialogHeader className="flex-row items-start gap-4 space-y-0 text-left">
            <span
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                incomplete ? "bg-amber-400/15 text-amber-300" : "bg-emerald-500/15 text-emerald-300"
              )}
              aria-hidden="true"
            >
              {incomplete ? <AlertTriangle className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
            </span>
            <div className="space-y-1">
              <AlertDialogTitle className="font-calsans text-2xl font-normal leading-tight">
                {incomplete ? "Masih ada yang terlewat" : "Siap mengirim jawaban?"}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-blue-100/80">
                {incomplete
                  ? `${unanswered.length} soal belum dijawab. Semua soal wajib dijawab sebelum dikirim.`
                  : "Semua soal sudah terjawab. Jawaban tidak dapat diubah setelah dikirim."}
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          {/* Progress summary */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-blue-100/70">Progres pengerjaan</p>
                <p className="font-mono text-3xl font-semibold tabular-nums">
                  {answered}
                  <span className="text-lg text-blue-100/50">/{total}</span>
                </p>
              </div>
              <div className="text-right">
                <p className={cn("font-mono text-xl font-semibold tabular-nums", incomplete ? "text-amber-300" : "text-emerald-300")}>
                  {pct}%
                </p>
                {remaining != null && (
                  <p className="inline-flex items-center gap-1 text-xs tabular-nums text-blue-100/70">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Sisa {formatTime(remaining)}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none",
                  incomplete ? "bg-amber-400" : "bg-emerald-400"
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-2">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/5 px-3 py-2">
                  <dt className="flex items-center gap-1.5 text-[11px] text-blue-100/70">
                    <span className={cn("h-2 w-2 rounded-full", s.dot)} aria-hidden="true" />
                    {s.label}
                  </dt>
                  <dd className={cn("font-mono text-lg font-semibold tabular-nums", s.text)}>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Answer map */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-blue-100/80">Peta jawaban, ketuk nomor untuk membuka soal</p>
            <div className="-m-1 max-h-44 overflow-y-auto p-1">
              <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10">
                {Array.from({ length: total }, (_, i) => {
                  const done = isAnswered(i);
                  const flag = flagged.includes(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onJump(i)}
                      aria-label={`Soal ${i + 1}, ${done ? "sudah dijawab" : "belum dijawab"}${flag ? ", ragu-ragu" : ""}`}
                      className={cn(
                        "relative flex aspect-square items-center justify-center rounded-md text-xs font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                        done
                          ? "bg-emerald-500/60 text-white hover:bg-emerald-500/80"
                          : "bg-rose-500/25 text-rose-100 ring-1 ring-rose-400/50 hover:bg-rose-500/40",
                        flag && "ring-2 ring-amber-400"
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {!incomplete && flagged.length > 0 && (
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100">
              <Flag className="mt-0.5 h-4 w-4 shrink-0 fill-amber-300 text-amber-300" aria-hidden="true" />
              <span>
                Ada {flagged.length} soal yang kamu tandai ragu-ragu. Ketuk nomor bercincin kuning
                di atas untuk mengeceknya lagi.
              </span>
            </div>
          )}

          {!incomplete && (
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-blue-50 transition-colors hover:bg-white/10">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                disabled={submitting}
                className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-500"
              />
              Saya sudah memeriksa jawaban dan yakin ingin mengirimkannya.
            </label>
          )}
        </div>

        <AlertDialogFooter className="sticky bottom-0 gap-2 border-t border-white/10 bg-blue-950/70 p-4 backdrop-blur-xl sm:space-x-0">
          <AlertDialogCancel
            disabled={submitting}
            className="mt-0 h-11 rounded-xl border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Kembali mengerjakan
          </AlertDialogCancel>
          {incomplete ? (
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                onJump(unanswered[0]);
              }}
              className="h-11 gap-2 rounded-xl bg-blue-500 text-white hover:bg-blue-400"
            >
              Ke soal no. {unanswered[0] + 1}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              disabled={!confirmed || submitting}
              onClick={(e) => {
                e.preventDefault(); // keep the dialog open while sending
                onConfirm();
              }}
              className="h-11 gap-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Mengirim
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Kirim jawaban
                </>
              )}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function Exam() {
  const router = useRouter();

  const [data, setData] = React.useState<SoalBagian | null>(null);
  const [dataUserExam, setDataUserExam] = React.useState<UserExamInfo | null>(null);
  const [loadState, setLoadState] = React.useState<LoadState>("loading");
  const [current, setCurrent] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<JawabanUser[]>([]);
  const [selectedAnswersStore, setSelectedAnswersStore] = React.useState<JawabanUserStore[]>([]);
  const [flagged, setFlagged] = React.useState<number[]>([]);
  const [restored, setRestored] = React.useState(false);
  const [saveState, setSaveState] = React.useState<SaveState>("idle");
  const [online, setOnline] = React.useState(true);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [zoomed, setZoomed] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [expired, setExpired] = React.useState(false);
  const [fontScale, setFontScale] = React.useState(1);
  const [shield, setShield] = React.useState(false);
  const [violations, setViolations] = React.useState(0);
  const [leaveWarning, setLeaveWarning] = React.useState(false);

  const inFlight = React.useRef(false);
  /** Only the latest loadExam call may apply its result (StrictMode mounts twice). */
  const loadSeq = React.useRef(0);
  const submitted = React.useRef(false);
  const backupRunning = React.useRef(false);
  const pendingBackup = React.useRef<BackupPayload | null>(null);
  const lastBackup = React.useRef<BackupPayload | null>(null);
  const direction = React.useRef(1);
  const warned = React.useRef(new Set<number>());
  const celebrated = React.useRef(false);
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const away = React.useRef(false);
  const shieldTimer = React.useRef<ReturnType<typeof setTimeout>>();

  /* ---------------------------------------------------------------- */
  /*  Derived values                                                    */
  /* ---------------------------------------------------------------- */
  const total = data?.Soal?.length ?? 0;
  const idx = Math.min(Math.max(current, 0), Math.max(total - 1, 0));
  const question = data?.Soal?.[idx];
  const options: Option[] = (question?.Jawaban ?? []).slice(1);
  const isAnswered = (i: number) => Boolean(selectedAnswers[i]?.jawaban_pengguna);
  const unanswered = data ? data.Soal.map((_, i) => i).filter((i) => !isAnswered(i)) : [];
  const answeredCount = total - unanswered.length;
  const allAnswered = total > 0 && answeredCount === total;
  const progress = total ? (answeredCount / total) * 100 : 0;
  const flaggedList = flagged.filter((i) => i < total).sort((a, b) => a - b);
  const isFlagged = flagged.includes(idx);
  /** Next unanswered question after the current one, wrapping around. */
  const nextUnanswered = unanswered.find((i) => i > idx) ?? unanswered.find((i) => i !== idx);

  /* ---------------------------------------------------------------- */
  /*  Backup (coalesced so an older request can never overwrite a       */
  /*  newer one)                                                        */
  /* ---------------------------------------------------------------- */
  const flushBackup = async () => {
    if (backupRunning.current) return;
    backupRunning.current = true;
    setSaveState("saving");
    try {
      while (pendingBackup.current) {
        const { initial, answers, store } = pendingBackup.current;
        pendingBackup.current = null;
        await axios.post(`${backupBaseUrl}/api/backup`, {
          kode_akses: Cookies.get("XSRF097_CODE"),
          backup: JSON.stringify({
            initialBackUpData: initial,
            selectedAnswers: answers,
            selectedAnswersStore: store,
          }),
        });
      }
      setSaveState("saved");
    } catch (error) {
      console.error("Error saving backup:", error);
      setSaveState("error");
    } finally {
      backupRunning.current = false;
    }
  };

  const queueBackup = (payload: BackupPayload) => {
    if (submitted.current) return;
    pendingBackup.current = payload;
    lastBackup.current = payload;
    flushBackup();
  };

  const retryBackup = () => {
    if (lastBackup.current) queueBackup(lastBackup.current);
  };

  const handleDeleteBackupData = async (code?: string) => {
    if (!code) return;
    try {
      await axios.delete(`${backupBaseUrl}/api/backup/${code}`);
    } catch (error: any) {
      console.error("Error deleting backup:", error.response?.data || error.message);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Loading the exam                                                  */
  /* ---------------------------------------------------------------- */
  const fetchBackup = async (code: string): Promise<BackupPayload | null> => {
    if (!(await isCodeExist(code))) return null;
    const response = await axios.get(`${backupBaseUrl}/api/backup/${code}`);
    const raw = response.data?.backup;
    if (!raw) return null;

    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!parsed?.initialBackUpData?.Soal?.length) return null;
    return {
      initial: parsed.initialBackUpData as SoalBagian,
      answers: (parsed.selectedAnswers ?? []) as JawabanUser[],
      store: (parsed.selectedAnswersStore ?? []) as JawabanUserStore[],
    };
  };

  const loadExam = async () => {
    const seq = ++loadSeq.current;
    setLoadState("loading");
    const code = Cookies.get("XSRF097_CODE") ?? "";
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/getSoalBagian`,
        { headers: { Authorization: `Bearer ${Cookies.get("XSRF096")}` } }
      );
      const soal: SoalUjianBagian[] = response.data.Soal;
      const backup = await fetchBackup(code);
      if (seq !== loadSeq.current) return; // a newer load took over

      let base = backup;
      if (!base) {
        const initialAnswers = soal.map(() => ({
          id_soal_bagian: null,
          jawaban_pengguna: "",
        })) as unknown as JawabanUser[];
        const initialStore = soal.map(() => ({
          id_soal: null,
          soal: "",
          jawaban_benar: "",
          jawaban_pengguna: "",
        })) as unknown as JawabanUserStore[];
        const shuffled = soal
          .map((q) => ({
            ...q,
            Jawaban: [...q.Jawaban].sort((a, b) => a.IdJawaban - b.IdJawaban),
          }))
          .sort(() => Math.random() - 0.5);
        const fresh: SoalBagian = { ...response.data, Soal: shuffled };
        base = { initial: fresh, answers: initialAnswers, store: initialStore };
      }

      const exam = base.initial!;
      const merged = mergeSaved(exam.Soal, base.answers, base.store, code);
      setData(exam);
      setSelectedAnswers(merged.answers);
      setSelectedAnswersStore(merged.store);
      setFlagged(merged.flags);
      saveLocal(exam.Soal, merged.answers, merged.flags, code);
      if (!backup || merged.changed) {
        queueBackup({ initial: exam, answers: merged.answers, store: merged.store });
      }
      setLoadState("ready");
    } catch (error) {
      console.log({ error });
      if (seq === loadSeq.current) setLoadState("error");
    }
  };

  const loadUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/getInfoUsers`,
        { headers: { Authorization: `Bearer ${Cookies.get("XSRF096")}` } }
      );
      setDataUserExam(response.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  React.useEffect(() => {
    loadExam();
    loadUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Persist position, text size and violations on this device         */
  /* ---------------------------------------------------------------- */
  React.useEffect(() => {
    try {
      const savedId = localStorage.getItem("selectedIdSoal");
      const savedFont = localStorage.getItem(FONT_KEY);
      const savedViolations = localStorage.getItem("examViolations");
      if (savedId !== null) setCurrent(JSON.parse(savedId));
      if (savedFont !== null) setFontScale(Number(savedFont) || 0);
      if (savedViolations !== null) setViolations(Number(savedViolations) || 0);
    } catch {
      /* ignore corrupted storage */
    }
    setRestored(true);
  }, []);

  React.useEffect(() => {
    if (!restored) return; // don't overwrite saved data before it was read
    localStorage.setItem("selectedIdSoal", JSON.stringify(current));
    localStorage.setItem(FONT_KEY, String(fontScale));
    localStorage.setItem("examViolations", String(violations));
  }, [restored, current, fontScale, violations]);

  /* ---------------------------------------------------------------- */
  /*  Connection status, leave-page guard                               */
  /* ---------------------------------------------------------------- */
  React.useEffect(() => {
    setOnline(navigator.onLine);
    const goOnline = () => {
      setOnline(true);
      if (lastBackup.current) queueBackup(lastBackup.current); // sync the latest answers
    };
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (loadState !== "ready") return;
    const warnLeave = (e: BeforeUnloadEvent) => {
      if (submitted.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warnLeave);
    return () => window.removeEventListener("beforeunload", warnLeave);
  }, [loadState]);

  /* ---------------------------------------------------------------- */
  /*  Anti-cheat: no copy/paste/context menu/devtools shortcuts, blank  */
  /*  screen on screenshot shortcuts, warning when leaving the tab.     */
  /*  Browsers cannot fully block OS/phone screenshots; this is a       */
  /*  best-effort deterrent.                                            */
  /* ---------------------------------------------------------------- */
  React.useEffect(() => {
    const block = (e: Event) => e.preventDefault();
    const blockedEvents = ["copy", "cut", "paste", "contextmenu", "dragstart", "selectstart"];
    blockedEvents.forEach((name) => document.addEventListener(name, block));

    const flashShield = () => {
      setShield(true);
      navigator.clipboard?.writeText("").catch(() => { });
      if (shieldTimer.current) clearTimeout(shieldTimer.current);
      shieldTimer.current = setTimeout(() => {
        if (!away.current) setShield(false);
      }, SHIELD_MS);
    };

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      const screenshot =
        e.key === "PrintScreen" || (mod && e.shiftKey && ["3", "4", "5", "s"].includes(key));
      const forbidden =
        (mod && ["c", "x", "v", "a", "p", "s", "u"].includes(key)) ||
        (mod && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        e.key === "F12";

      if (screenshot) flashShield();
      if (screenshot || forbidden) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("keydown", blockKeys, true);
    document.addEventListener("keyup", blockKeys, true); // PrintScreen often only fires keyup
    return () => {
      blockedEvents.forEach((name) => document.removeEventListener(name, block));
      document.removeEventListener("keydown", blockKeys, true);
      document.removeEventListener("keyup", blockKeys, true);
      if (shieldTimer.current) clearTimeout(shieldTimer.current);
    };
  }, []);

  React.useEffect(() => {
    if (loadState !== "ready") return;
    const leave = () => {
      if (submitted.current || away.current) return;
      away.current = true;
      setShield(true);
    };
    const back = () => {
      if (!away.current || submitted.current) return;
      away.current = false;
      setShield(false);
      setViolations((v) => v + 1);
      setLeaveWarning(true);
    };
    const onVisibility = () => (document.visibilityState === "hidden" ? leave() : back());

    window.addEventListener("blur", leave);
    window.addEventListener("focus", back);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("blur", leave);
      window.removeEventListener("focus", back);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [loadState]);

  /* ---------------------------------------------------------------- */
  /*  Actions                                                           */
  /* ---------------------------------------------------------------- */
  const goTo = (target: number) => {
    if (!total) return;
    const next = Math.min(Math.max(target, 0), total - 1);
    if (next === idx) return;
    direction.current = next > idx ? 1 : -1;
    setCurrent(next);
  };

  const pickFromPanel = (i: number) => {
    goTo(i);
    setSheetOpen(false);
  };

  const jumpFromDialog = (i: number) => {
    setShowSubmit(false);
    goTo(i);
  };

  const openReview = () => {
    setSheetOpen(false);
    setShowSubmit(true);
  };

  const selectAnswer = (jawaban: Option) => {
    if (!data || !question || submitted.current) return;

    const value =
      selectedAnswers[idx]?.jawaban_pengguna === jawaban.NameJawaban ? "" : jawaban.NameJawaban;
    const { answer, store } = buildEntry(question, value);

    const nextAnswers = [...selectedAnswers];
    nextAnswers[idx] = answer;
    const nextStore = [...selectedAnswersStore];
    nextStore[idx] = store;

    setSelectedAnswers(nextAnswers);
    setSelectedAnswersStore(nextStore);
    saveLocal(data.Soal, nextAnswers, flagged, Cookies.get("XSRF097_CODE") ?? "");
    queueBackup({ initial: data, answers: nextAnswers, store: nextStore });
  };

  const clearAnswer = () => {
    const chosen = options.find((o) => o.NameJawaban === selectedAnswers[idx]?.jawaban_pengguna);
    if (chosen) selectAnswer(chosen); // selecting the same option again clears it
  };

  const toggleFlag = () => {
    if (!data || submitted.current) return;
    const next = flagged.includes(idx) ? flagged.filter((i) => i !== idx) : [...flagged, idx];
    setFlagged(next);
    saveLocal(data.Soal, selectedAnswers, next, Cookies.get("XSRF097_CODE") ?? "");
  };

  const changeFont = (v: number) =>
    setFontScale(Math.min(Math.max(v, 0), QUESTION_TEXT.length - 1));

  const storeAnswersToFirestore = async () => {
    if (!dataUserExam || !data) return;
    try {
      const { error } = await addData(
        "answers",
        `${dataUserExam.id_user_ujian}_${data.Bagian}`,
        { selectedAnswersStore }
      );
      if (error) console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  /** `auto` = time ran out: send whatever has been answered. */
  const submitExam = async (auto = false) => {
    if (inFlight.current || submitted.current) return;

    if (!auto && (unanswered.length > 0 || selectedAnswers.length === 0)) {
      Toast.fire({
        icon: "error",
        title: "Oopsss!",
        text: "Pastikan semua jawaban telah diisi sebelum submit!",
      });
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    try {
      await axios.post(`${dpkakpBaseUrl}/SumbitExam`, selectedAnswers, {
        headers: { Authorization: `Bearer ${Cookies.get("XSRF096")}` },
      });
    } catch (error) {
      console.error("Error submitting exam:", error);
      inFlight.current = false;
      setSubmitting(false);
      Toast.fire({
        icon: "error",
        title: "Oopsss!",
        text: "Terjadi kesalahan saat submit, coba lagi nanti!",
      });
      return;
    }

    submitted.current = true;
    Toast.fire({
      icon: "success",
      title: "Yeayyy!",
      text: `Berhasil mensubmit jawabanmu, semoga hasilnya memuaskan ya sobat!`,
    });

    // Housekeeping must never turn a successful submit into an error.
    storeAnswersToFirestore();
    handleDeleteBackupData(Cookies.get("XSRF097_CODE"));
    ["XSRF096", "XSRF097", "XSRF097_CODE", ANSWER_COOKIE, FLAG_COOKIE].forEach((key) =>
      Cookies.remove(key)
    );
    STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));

    router.replace(AUTH_ROUTE);
  };

  /* ---------------------------------------------------------------- */
  /*  Timer                                                             */
  /* ---------------------------------------------------------------- */
  const { remaining, totalMs } = useCountdown(data?.waktu, () => {
    setExpired(true);
    submitExam(true);
  });

  React.useEffect(() => {
    if (remaining == null || remaining <= 0) return;
    const crossed = WARN_MINUTES.filter((m) => remaining <= m * 60000);
    if (!crossed.length || warned.current.has(crossed[0])) return;
    crossed.forEach((m) => warned.current.add(m));
    Toast.fire({
      icon: "warning",
      title: "Waktu hampir habis",
      text: `Sisa waktu sekitar ${Math.ceil(remaining / 60000)} menit.`,
    });
  }, [remaining]);

  /** Nudge once when the last question gets answered. */
  React.useEffect(() => {
    if (!allAnswered || celebrated.current || loadState !== "ready") return;
    celebrated.current = true;
    Toast.fire({
      icon: "success",
      title: "Semua soal terjawab!",
      text: "Periksa kembali jawabanmu, lalu kirim jika sudah yakin.",
    });
  }, [allAnswered, loadState]);

  /* ---------------------------------------------------------------- */
  /*  Keyboard: A-D / 1-4 answer, F flag, Enter/Right next, Left back   */
  /* ---------------------------------------------------------------- */
  const handleKey = (e: KeyboardEvent) => {
    if (!data || zoomed || showSubmit || expired || submitting || sheetOpen || leaveWarning) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key.length === 1) {
      const key = e.key.toUpperCase();
      const pick = LETTERS.includes(key) ? LETTERS.indexOf(key) : ["1", "2", "3", "4"].indexOf(key);
      if (pick !== -1) {
        if (options[pick]) selectAnswer(options[pick]);
        return;
      }
      if (key === "F") {
        toggleFlag();
        return;
      }
    }

    const onControl = (e.target as HTMLElement | null)?.closest(
      "button, a, input, textarea, select, [role=dialog]"
    );

    if (e.key === "Enter" && !onControl) {
      e.preventDefault();
      if (idx === total - 1) setShowSubmit(true);
      else goTo(idx + 1);
    } else if (e.key === "ArrowRight") {
      goTo(idx + 1);
    } else if (e.key === "ArrowLeft") {
      goTo(idx - 1);
    }
  };
  const keyRef = React.useRef(handleKey);
  keyRef.current = handleKey;

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => keyRef.current(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [idx]);

  /* ---------------------------------------------------------------- */
  /*  Swipe left/right on touch screens to change question              */
  /* ---------------------------------------------------------------- */
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || zoomed) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    goTo(dx < 0 ? idx + 1 : idx - 1);
  };

  /* ---------------------------------------------------------------- */
  /*  Shared pieces                                                     */
  /* ---------------------------------------------------------------- */
  const isLast = idx === total - 1;
  const chosen = selectedAnswers[idx]?.jawaban_pengguna;

  const flagButton = (compact?: boolean) => (
    <button
      type="button"
      onClick={toggleFlag}
      onMouseDown={keepFocus}
      aria-pressed={isFlagged}
      aria-label={compact ? (isFlagged ? "Hapus tanda ragu-ragu" : "Tandai ragu-ragu") : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        compact ? "h-11 w-11" : "h-9 px-3 text-xs",
        isFlagged
          ? "border-amber-300/50 bg-amber-400/15 text-amber-100"
          : "border-white/15 bg-white/5 text-blue-100/80 hover:bg-white/10"
      )}
    >
      <Flag
        className={cn("h-4 w-4", isFlagged && "fill-amber-300 text-amber-300")}
        aria-hidden="true"
      />
      {!compact && (isFlagged ? "Ditandai ragu" : "Ragu-ragu")}
    </button>
  );

  const controls = (
    <div className="flex w-full items-center gap-2 sm:gap-3 lg:w-auto">
      <div className="lg:hidden">{flagButton(true)}</div>
      <Button
        type="button"
        variant="outline"
        onClick={() => goTo(idx - 1)}
        onMouseDown={keepFocus}
        disabled={idx === 0}
        aria-label="Soal sebelumnya"
        className="h-11 gap-2 rounded-xl border-white/20 bg-transparent px-3 text-white hover:bg-white/10 hover:text-white disabled:opacity-40 sm:flex-1 sm:px-5 lg:flex-none"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Sebelumnya</span>
      </Button>
      {isLast ? (
        <Button
          type="button"
          onClick={() => setShowSubmit(true)}
          onMouseDown={keepFocus}
          className="h-11 flex-1 gap-2 rounded-xl bg-emerald-500 px-5 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 lg:flex-none"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Periksa &amp; kirim
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => goTo(idx + 1)}
          onMouseDown={keepFocus}
          className="h-11 flex-1 gap-2 rounded-xl bg-blue-500 px-5 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-400 lg:flex-none"
        >
          Selanjutnya
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );

  const kbd =
    "rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-blue-100";

  const panel = data && (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="font-calsans text-xl leading-tight text-white">{data.Ujian}</h2>
        <p className="font-jakarta text-xs text-blue-100/80">
          {data.Fungsi} • {data.Bagian}
        </p>
        <p className="font-jakarta text-xs text-blue-100/60">
          {data.jumlah} soal • {data.waktu} menit
        </p>
      </div>

      <TimerBadge remaining={remaining} totalMs={totalMs} />

      <div className="space-y-2">
        <div className="flex items-baseline justify-between text-xs">
          <span className="font-jakarta font-medium text-blue-50">Progres</span>
          <span className="tabular-nums text-blue-100/70">
            {answeredCount}/{total} terjawab
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Soal yang sudah dijawab"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={answeredCount}
          className="h-1.5 overflow-hidden rounded-full bg-white/10"
        >
          <div
            className={cn(
              "h-full rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
              allAnswered ? "bg-emerald-400" : "bg-blue-400"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        {nextUnanswered !== undefined && (
          <button
            type="button"
            onClick={() => pickFromPanel(nextUnanswered)}
            onMouseDown={keepFocus}
            className="inline-flex items-center gap-1.5 rounded-md font-jakarta text-xs font-medium text-blue-200 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <CircleDashed className="h-3.5 w-3.5" aria-hidden="true" />
            Ke soal belum dijawab berikutnya (no. {nextUnanswered + 1})
          </button>
        )}
      </div>

      <Navigator
        total={total}
        current={idx}
        isAnswered={isAnswered}
        flagged={flaggedList}
        onSelect={pickFromPanel}
        columns={sheetOpen ? "grid-cols-5" : "grid-cols-6"}
      />

      <Button
        type="button"
        onClick={openReview}
        disabled={submitting}
        className={cn(
          "h-11 w-full gap-2 rounded-xl text-white shadow-lg",
          allAnswered
            ? "bg-emerald-500 shadow-emerald-500/30 hover:bg-emerald-400"
            : "bg-blue-500 shadow-blue-500/30 hover:bg-blue-400"
        )}
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Periksa dan kirim jawaban
      </Button>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <main className="relative min-h-screen w-full select-none bg-darkDPKAKP [-webkit-touch-callout:none]">
      {/* Printing the page gives a blank sheet */}
      <style>{"@media print { body { display: none !important; } }"}</style>

      <div className="fixed inset-0" aria-hidden="true">
        <Image src="/dpkakp/image3.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/80 to-blue-950/90" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 pb-28 pt-4 lg:pb-8 lg:pt-6">
        <h1 className="sr-only">Ujian Keahlian Awak Kapal Perikanan</h1>

        {/* Institution header (desktop) */}
        <header className="hidden items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl lg:flex">
          <div className="flex items-center gap-3">
            <Image src="/logo-kkp-white.png" width={56} height={56} alt="Logo KKP" className="h-12 w-auto" />
            <p className="font-jakarta text-xs leading-snug text-blue-100/90">
              KEMENTERIAN KELAUTAN DAN PERIKANAN
              <br />
              BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA
              <br />
              <span className="font-bold text-white">
                DEWAN PENGUJI KEAHLIAN AWAK KAPAL PERIKANAN
              </span>
            </p>
          </div>
          <Image
            src="/lembaga/logo/logo-sertifikasi-akp.png"
            width={56}
            height={56}
            alt="DPKAKP Logo"
            className="h-12 w-auto"
          />
        </header>

        {/* Top bar (mobile / tablet) */}
        {data && (
          <div className="sticky top-3 z-30 flex items-center gap-2 rounded-2xl border border-white/15 bg-blue-950/80 p-2 shadow-lg shadow-blue-950/40 backdrop-blur-xl lg:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  aria-label="Buka daftar soal"
                  className="h-10 gap-2 rounded-xl bg-blue-500 px-3 text-sm text-white hover:bg-blue-400"
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  <span className="tabular-nums">
                    {idx + 1}/{total}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[22rem] max-w-[90vw] overflow-y-auto border-white/10 bg-darkDPKAKP text-white"
              >
                <SheetHeader className="items-center space-y-2 text-center">
                  <Image
                    src="/lembaga/logo/logo-sertifikasi-akp.png"
                    width={64}
                    height={64}
                    alt="DPKAKP Logo"
                    className="h-14 w-auto"
                  />
                  <SheetTitle className="sr-only">Daftar soal</SheetTitle>
                  <SheetDescription className="sr-only">
                    Pilih nomor soal, lihat sisa waktu, atau kirim jawaban.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">{panel}</div>
              </SheetContent>
            </Sheet>

            <div className="min-w-0 flex-1 px-1">
              <p className="truncate text-xs tabular-nums text-blue-100/80">
                {allAnswered ? "Semua terjawab" : `${answeredCount}/${total} terjawab`}
              </p>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div
                  className={cn(
                    "h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none",
                    allAnswered ? "bg-emerald-400" : "bg-blue-400"
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <TimerBadge remaining={remaining} totalMs={totalMs} compact />
          </div>
        )}

        {!online && (
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100"
          >
            <WifiOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Tidak ada koneksi internet. Jawabanmu tetap tersimpan di perangkat dan akan
              disinkronkan saat tersambung kembali.
            </span>
          </div>
        )}

        {loadState === "loading" && <ExamSkeleton />}

        {loadState === "error" && (
          <GlassCard className="mx-auto w-full max-w-md p-6 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-rose-300" aria-hidden="true" />
            <h2 className="mt-3 font-calsans text-2xl text-white">Soal gagal dimuat</h2>
            <p className="mt-1 font-jakarta text-sm text-blue-100/80">
              Periksa koneksi internetmu lalu coba lagi. Jawaban yang sudah tersimpan tidak akan hilang.
            </p>
            <Button
              type="button"
              onClick={loadExam}
              className="mt-4 h-11 gap-2 rounded-xl bg-blue-500 px-5 text-white hover:bg-blue-400"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Coba lagi
            </Button>
          </GlassCard>
        )}

        {loadState === "ready" && data && question && (
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]">
            {/* Question */}
            <GlassCard className="p-5 sm:p-7" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="min-w-0 truncate font-jakarta text-xs text-blue-100/70">
                  {data.Ujian} • {data.Fungsi} {data.Bagian}
                </p>
                <div className="flex shrink-0 items-center gap-3">
                  <SaveStatus state={saveState} onRetry={retryBackup} />
                  <FontSizeControl value={fontScale} onChange={changeFont} />
                </div>
              </div>

              {allAnswered && (
                <div className="mb-4 flex flex-col gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 font-jakarta text-sm text-emerald-100">
                    <PartyPopper className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    Semua soal sudah terjawab. Kirim jika sudah yakin.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    onClick={openReview}
                    onMouseDown={keepFocus}
                    className="h-9 gap-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    Kirim sekarang
                  </Button>
                </div>
              )}

              <div
                key={idx}
                className={cn(
                  "animate-in fade-in-0 duration-300 motion-reduce:animate-none",
                  direction.current > 0 ? "slide-in-from-right-3" : "slide-in-from-left-3"
                )}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-blue-300/30 bg-blue-400/10 px-3 py-1 font-jakarta text-xs font-semibold text-blue-100">
                      Soal <span className="tabular-nums">{idx + 1}</span> dari{" "}
                      <span className="tabular-nums">{total}</span>
                    </span>
                    {isAnswered(idx) ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        Terjawab
                      </span>
                    ) : (
                      <span className="text-xs text-blue-100/50">Belum dijawab</span>
                    )}
                  </div>
                  <div className="hidden lg:block">{flagButton()}</div>
                </div>

                {question.GambarSoal ? (
                  <button
                    type="button"
                    onClick={() => setZoomed(true)}
                    onMouseDown={keepFocus}
                    aria-label="Perbesar gambar soal"
                    className="group/img relative mb-5 block w-full overflow-hidden rounded-xl border border-white/15 bg-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={question.GambarSoal}
                      alt={`Gambar soal nomor ${idx + 1}`}
                      draggable={false}
                      className="mx-auto max-h-72 w-auto max-w-full object-contain transition-transform duration-300 group-hover/img:scale-[1.02] motion-reduce:transition-none"
                    />
                    <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-lg bg-blue-950/80 px-2 py-1 text-xs text-white">
                      <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                      Perbesar
                    </span>
                  </button>
                ) : null}

                <h2
                  className={cn(
                    "whitespace-pre-line font-jakarta font-semibold leading-relaxed text-white",
                    QUESTION_TEXT[fontScale]
                  )}
                >
                  {question.Soal}
                </h2>

                <div role="radiogroup" aria-label="Pilihan jawaban" className="mt-5 space-y-2.5">
                  {options.map((jawaban, i) => {
                    const selected = chosen === jawaban.NameJawaban;
                    return (
                      <button
                        key={`${idx}-${i}`}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => selectAnswer(jawaban)}
                        onMouseDown={keepFocus}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none sm:p-4",
                          selected
                            ? "border-blue-400 bg-blue-500/25 shadow-lg shadow-blue-500/10"
                            : chosen
                              ? "border-white/10 bg-white/[0.03] opacity-80 hover:border-white/30 hover:bg-white/10 hover:opacity-100"
                              : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10 active:scale-[0.99]"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-semibold transition-colors",
                            selected ? "bg-blue-500 text-white" : "bg-white/10 text-blue-100"
                          )}
                        >
                          {LETTERS[i] ?? i + 1}
                        </span>
                        <span
                          className={cn(
                            "min-w-0 flex-1 pt-1.5 font-jakarta leading-snug text-white",
                            OPTION_TEXT[fontScale]
                          )}
                        >
                          {jawaban.NameJawaban}
                        </span>
                        {selected && (
                          <Check
                            className="mt-2 h-5 w-5 shrink-0 text-blue-300 animate-in zoom-in-50 duration-200 motion-reduce:animate-none"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 flex min-h-6 items-center justify-between gap-3">
                  {chosen ? (
                    <button
                      type="button"
                      onClick={clearAnswer}
                      onMouseDown={keepFocus}
                      className="inline-flex items-center gap-1 rounded-md font-jakarta text-xs text-blue-100/70 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                      Hapus jawaban
                    </button>
                  ) : (
                    <span />
                  )}
                  <p className="font-jakarta text-[11px] text-blue-100/50 lg:hidden">
                    Geser kiri/kanan untuk pindah soal
                  </p>
                </div>
              </div>

              {/* Desktop footer */}
              <div className="mt-5 hidden items-center justify-between gap-4 border-t border-white/10 pt-5 lg:flex">
                <p className="flex flex-wrap items-center gap-1.5 font-jakarta text-xs text-blue-100/70">
                  <kbd className={kbd}>A</kbd>–<kbd className={kbd}>D</kbd> pilih
                  <span className="mx-1 text-white/20">•</span>
                  <kbd className={kbd}>F</kbd> ragu
                  <span className="mx-1 text-white/20">•</span>
                  <kbd className={kbd}>←</kbd>
                  <kbd className={kbd}>→</kbd> pindah
                </p>
                {controls}
              </div>
            </GlassCard>

            {/* Sidebar (desktop) */}
            <aside className="hidden lg:sticky lg:top-6 lg:block">
              <GlassCard className="p-5">{panel}</GlassCard>
            </aside>
          </div>
        )}
      </div>

      {/* Bottom action bar (mobile / tablet) */}
      {loadState === "ready" && data && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-blue-950/85 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
          {controls}
        </div>
      )}

      {zoomed && question?.GambarSoal && (
        <ImageLightbox src={question.GambarSoal} onClose={() => setZoomed(false)} />
      )}

      <ReviewDialog
        open={showSubmit && !expired}
        onOpenChange={(open) => !submitting && setShowSubmit(open)}
        total={total}
        isAnswered={isAnswered}
        unanswered={unanswered}
        flagged={flaggedList}
        remaining={remaining}
        submitting={submitting}
        onJump={jumpFromDialog}
        onConfirm={() => submitExam()}
      />

      {/* Left the tab / app */}
      <AlertDialog open={leaveWarning && !expired}>
        <AlertDialogContent className="border-rose-400/30 bg-blue-950 text-white sm:max-w-md">
          <AlertDialogHeader className="items-center text-center sm:text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300" aria-hidden="true">
              <ShieldAlert className="h-7 w-7" />
            </span>
            <AlertDialogTitle className="font-calsans text-2xl font-normal">
              Kamu tidak boleh meninggalkan ujian
            </AlertDialogTitle>
            <AlertDialogDescription className="text-blue-100/80">
              Terdeteksi berpindah tab, jendela, atau aplikasi. Selama ujian berlangsung kamu
              harus tetap berada di halaman ini. Aktivitas ini tercatat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <p className="mx-auto rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-medium tabular-nums text-rose-200">
            Pelanggaran tercatat: {violations} kali
          </p>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setLeaveWarning(false)}
              className="h-11 w-full rounded-xl bg-blue-500 text-white hover:bg-blue-400"
            >
              Saya mengerti, kembali ke ujian
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time is up: answers are sent automatically */}
      <AlertDialog open={expired}>
        <AlertDialogContent className="border-white/15 bg-blue-950 text-white sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-calsans text-2xl font-normal">
              Waktu ujian habis
            </AlertDialogTitle>
            <AlertDialogDescription className="text-blue-100/80">
              {submitting
                ? "Jawabanmu sedang dikirim otomatis. Mohon jangan menutup halaman ini."
                : "Jawabanmu belum terkirim. Pastikan koneksi internet stabil lalu coba kirim lagi."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {submitting ? (
            <div className="flex justify-center py-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-300" aria-hidden="true" />
            </div>
          ) : (
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  submitExam(true);
                }}
                className="h-11 gap-2 rounded-xl bg-blue-500 text-white hover:bg-blue-400"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Kirim ulang
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>

      {/* Blank screen while away or right after a screenshot shortcut */}
      {shield && <div aria-hidden="true" className="fixed inset-0 z-[9999] bg-black" />}
    </main>
  );
}
