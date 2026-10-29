"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Ban,
  BookOpenCheck,
  Check,
  Clock,
  ListChecks,
  Loader2,
  MousePointerClick,
  RefreshCw,
  ShieldAlert,
  Smartphone,
  Timer,
  WifiOff,
} from "lucide-react";

import { SoalBagian } from "@/types/ujian-keahlian-akp";
import { cn } from "@/lib/utils";

type LoadState = "loading" | "ready" | "error";

const EXAM_ROUTE = "/lembaga/dpkakp/user/auth/exam";
const AUTH_ROUTE = "/lembaga/dpkakp/user/auth";

/** Set to false if participants may continue without ticking every rule. */
const REQUIRE_ACKNOWLEDGE = true;

const RULES = [
  {
    icon: MousePointerClick,
    title: "Pilih satu jawaban",
    text: "Pilih salah satu jawaban yang Saudara anggap paling tepat/benar!",
  },
  {
    icon: Smartphone,
    title: "Gunakan gadget yang mumpuni",
    text: "Dalam menjawab soal, gunakan gadget yang mumpuni!",
  },
  {
    icon: Ban,
    title: "Tanpa buku atau catatan",
    text: "Tidak diperbolehkan membuka buku, dll!",
  },
  {
    icon: ShieldAlert,
    title: "Tetap di halaman ujian",
    text: "Berpindah tab, aplikasi, atau mengambil tangkapan layar akan tercatat sebagai pelanggaran.",
  },
  {
    icon: Timer,
    title: "Waktu berjalan otomatis",
    text: "Jawaban tersimpan otomatis dan dikirim saat waktu habis, meski halaman dimuat ulang.",
  },
];

const ghostBtn =
  "inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-blue-100/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

/** Staggered entrance, same as the landing hero. */
const enter = (delay: number, className?: string) => ({
  className: cn(
    "animate-in fade-in-0 slide-in-from-bottom-6 duration-700 fill-mode-both motion-reduce:animate-none",
    className
  ),
  style: { animationDelay: `${delay}ms` },
});

const getErrorMessage = (e: unknown): string => {
  if (e instanceof AxiosError) {
    if (!e.response) {
      return "Tidak dapat terhubung ke server. Periksa koneksi internetmu lalu coba lagi.";
    }
    if (e.response.status === 401) {
      return "Sesi ujianmu tidak valid atau sudah berakhir. Kembali dan masukkan kode akses lagi.";
    }
    const data = e.response.data;
    return data?.pesan ?? data?.Pesan ?? e.message;
  }
  return "Terjadi kesalahan saat memuat informasi ujian.";
};

export default function GuidePage() {
  const router = useRouter();
  const listRef = React.useRef<HTMLUListElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  const [data, setData] = React.useState<SoalBagian | null>(null);
  const [load, setLoad] = React.useState<LoadState>("loading");
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [checked, setChecked] = React.useState<boolean[]>(() => RULES.map(() => false));
  const [showHint, setShowHint] = React.useState(false);
  const [navigating, setNavigating] = React.useState(false);
  const [online, setOnline] = React.useState(true);

  const done = checked.filter(Boolean).length;
  const ready = done === RULES.length;
  const remaining = RULES.length - done;

  /* ---------------------------------------------------------------- */
  /*  Data                                                              */
  /* ---------------------------------------------------------------- */
  const fetchExamInformation = React.useCallback(async () => {
    setLoad("loading");
    setLoadError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/getSoalBagian`,
        { headers: { Authorization: `Bearer ${Cookies.get("XSRF096")}` } }
      );
      setData(response.data);
      setLoad("ready");
    } catch (err) {
      setLoadError(getErrorMessage(err));
      setLoad("error");
    }
  }, []);

  React.useEffect(() => {
    fetchExamInformation();
    router.prefetch(EXAM_ROUTE);
  }, [fetchExamInformation, router]);

  React.useEffect(() => {
    setOnline(navigator.onLine);
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Pointer parallax on background & glow (DOM only, no re-renders)   */
  /* ---------------------------------------------------------------- */
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let mx = 0;
    let my = 0;
    const render = () => {
      frame = 0;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${mx * -16}px, ${my * -16}px, 0) scale(1.08)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mx * 40}px, ${my * 40}px, 0)`;
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("pointermove", onPointer);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Actions                                                           */
  /* ---------------------------------------------------------------- */
  const shake = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    listRef.current?.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(5px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 380, easing: "ease-out" }
    );
  };

  const toggle = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
    setShowHint(false);
  };

  const toggleAll = () => {
    setChecked(RULES.map(() => !ready));
    setShowHint(false);
  };

  const handleContinue = () => {
    if (navigating) return;

    if (REQUIRE_ACKNOWLEDGE && !ready) {
      setShowHint(true);
      shake();
      listRef.current
        ?.querySelector<HTMLButtonElement>('[aria-checked="false"]')
        ?.focus();
      return;
    }

    setNavigating(true);
    router.push(EXAM_ROUTE);
  };

  /** Soft spotlight that follows the pointer across the card (set via CSS vars, no re-render). */
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const stats = data
    ? [
      { icon: ListChecks, label: "Jumlah soal", value: `${data.jumlah ?? data.Soal?.length ?? "-"} soal` },
      { icon: Clock, label: "Durasi", value: `${data.waktu} menit` },
      { icon: BookOpenCheck, label: "Bagian", value: `${data.Fungsi} ${data.Bagian}` },
    ]
    : [];

  /* ---------------------------------------------------------------- */
  /*  Render                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <main className="relative isolate min-h-[100svh] w-full overflow-hidden bg-darkDPKAKP">
      {/* Background: photo with pointer parallax, tint, grid, glow (same as landing hero) */}
      <div ref={bgRef} className="absolute inset-0 -z-20 will-change-transform" aria-hidden="true">
        <Image src="/dpkakp/image8.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/90 via-blue-950/75 to-darkDPKAKP"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div ref={glowRef} className="pointer-events-none absolute inset-0 -z-10 will-change-transform" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[120px]" />
        <div className="absolute bottom-10 right-[10%] h-64 w-64 rounded-full bg-teal-400/15 blur-[100px]" />
      </div>



      <section className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 pb-12 pt-20">
        <div className="w-full max-w-3xl space-y-7">
          {/* Header */}
          <header className="flex flex-col items-center gap-4 text-center">
            <div {...enter(80)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-blue-50 backdrop-blur-md">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
                </span>
                Langkah 2 dari 3 · Panduan ujian
              </span>
            </div>

            <div {...enter(160, "group relative")}>
              <div
                className="absolute inset-0 rounded-full bg-blue-400/40 blur-2xl transition-all duration-500 group-hover:bg-teal-300/50"
                aria-hidden="true"
              />
              <Image
                className="relative h-20 w-auto drop-shadow-2xl transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105 sm:h-24"
                src="/lembaga/logo/logo-sertifikasi-akp.png"
                width={100}
                height={100}
                alt="DPKAKP Logo"
                priority
              />
            </div>

            {load === "loading" ? (
              <div className="flex w-full flex-col items-center gap-3" aria-hidden="true">
                <div className="h-10 w-4/5 animate-pulse rounded-xl bg-white/10" />
                <div className="h-5 w-2/3 animate-pulse rounded-lg bg-white/10" />
              </div>
            ) : (
              <h1 {...enter(240, "font-calsans text-3xl leading-tight text-white sm:text-4xl")}>
                {load === "ready" && data ? (
                  data.Ujian
                ) : (
                  <>
                    Panduan Pengerjaan{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-[length:200%_auto] bg-clip-text text-transparent [animation:shine_6s_linear_infinite] motion-reduce:[animation:none]">
                      Ujian
                    </span>
                  </>
                )}
              </h1>
            )}

            <p {...enter(320, "max-w-lg font-jakarta text-sm leading-relaxed text-blue-100/90 sm:text-base")}>
              Harap membaca dengan teliti dan saksama panduan pengerjaan ujian keahlian awak
              kapal perikanan.
            </p>
          </header>

          {/* Exam info */}
          {load === "ready" && data && (
            <dl {...enter(380, "grid grid-cols-3 gap-2 sm:gap-3")}>
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-md sm:p-4"
                >
                  <Icon className="mx-auto h-5 w-5 text-cyan-300" aria-hidden="true" />
                  <dt className="mt-1.5 text-[11px] text-blue-100/70 sm:text-xs">{label}</dt>
                  <dd className="truncate text-sm font-semibold text-white sm:text-base">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* Guide card */}
          <div {...enter(440)}>
            <div
              onPointerMove={handlePointerMove}
              className={cn(
                "group relative overflow-hidden rounded-3xl border bg-white/[0.06] p-5 shadow-2xl shadow-blue-950/60 backdrop-blur-xl transition-colors duration-300 sm:p-7",
                ready ? "border-emerald-400/40" : showHint ? "border-rose-400/30" : "border-white/10 hover:border-blue-300/30"
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,0%),rgba(96,165,250,0.18),transparent_60%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl"
              />

              <div className="relative space-y-5">
                {!online && (
                  <div
                    role="status"
                    className="flex items-start gap-2.5 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100"
                  >
                    <WifiOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Tidak ada koneksi internet. Sambungkan dulu sebelum melanjutkan.</span>
                  </div>
                )}

                {load === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <div className="space-y-2">
                      <p>{loadError}</p>
                      <button
                        type="button"
                        onClick={fetchExamInformation}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      >
                        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                        Coba lagi
                      </button>
                    </div>
                  </div>
                )}

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="inline-flex items-center gap-2.5 font-jakarta text-sm font-semibold text-white">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
                        <ListChecks className="h-4 w-4 text-white" aria-hidden="true" />
                      </span>
                      Panduan pengerjaan
                    </p>
                    <button type="button" onClick={toggleAll} className={cn(ghostBtn, "-mr-2")}>
                      {ready ? "Atur ulang" : "Tandai semua"}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      role="progressbar"
                      aria-label="Panduan yang sudah dibaca"
                      aria-valuemin={0}
                      aria-valuemax={RULES.length}
                      aria-valuenow={done}
                      className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
                    >
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                          ready ? "bg-emerald-400" : "bg-gradient-to-r from-blue-400 to-cyan-300"
                        )}
                        style={{ width: `${(done / RULES.length) * 100}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-xs tabular-nums text-blue-100/70">
                      {done}/{RULES.length} dibaca
                    </span>
                  </div>
                </div>

                {/* Rules: tap each one to confirm it's been read */}
                <ul ref={listRef} role="group" aria-label="Panduan pengerjaan ujian" className="space-y-2.5">
                  {RULES.map((rule, i) => {
                    const isChecked = checked[i];
                    const Icon = rule.icon;
                    return (
                      <li
                        key={rule.title}
                        className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both motion-reduce:animate-none"
                        style={{ animationDelay: `${520 + i * 80}ms` }}
                      >
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={isChecked}
                          onClick={() => toggle(i)}
                          className={cn(
                            "group/rule flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:p-4",
                            isChecked
                              ? "border-emerald-400/50 bg-emerald-400/10"
                              : showHint
                                ? "border-rose-400/60 bg-rose-400/5"
                                : "border-white/10 bg-white/[0.04] hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-white/10"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                              isChecked
                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                : "bg-white/10 text-cyan-200 group-hover/rule:scale-110"
                            )}
                          >
                            {isChecked ? (
                              <Check
                                key="done"
                                className="h-5 w-5 animate-in zoom-in-50 duration-200 motion-reduce:animate-none"
                                aria-hidden="true"
                              />
                            ) : (
                              <Icon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-jakarta text-sm font-semibold text-white">
                              {rule.title}
                            </span>
                            <span className="mt-0.5 block font-jakarta text-sm leading-relaxed text-blue-100/80">
                              {rule.text}
                            </span>
                          </span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                              isChecked ? "border-emerald-400 bg-emerald-400 text-blue-950" : "border-white/30"
                            )}
                          >
                            {isChecked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* One info row: hint > ready > helper. Announced politely. */}
                <div className="min-h-5 text-xs" aria-live="polite">
                  {showHint && !ready ? (
                    <p role="alert" className="flex items-start gap-1.5 text-rose-300">
                      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      Tandai {remaining} panduan lagi sebelum melanjutkan.
                    </p>
                  ) : ready ? (
                    <p className="text-emerald-300">
                      Semua panduan sudah dibaca. Pastikan koneksi stabil dan baterai perangkat cukup.
                    </p>
                  ) : (
                    <p className="text-blue-100/70">
                      Ketuk setiap panduan untuk menandai bahwa kamu sudah membacanya.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={navigating || !online}
                  className={cn(
                    "group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full text-base font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 disabled:cursor-not-allowed",
                    ready || !REQUIRE_ACKNOWLEDGE
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-xl shadow-blue-500/40 hover:-translate-y-0.5 hover:shadow-cyan-400/40 disabled:opacity-90 disabled:hover:translate-y-0"
                      : "bg-gradient-to-r from-blue-500/60 to-cyan-500/60 hover:from-blue-500/80 hover:to-cyan-500/80",
                    !online && "opacity-60"
                  )}
                >
                  {!navigating && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[120%]"
                    />
                  )}
                  {navigating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Membuka ujian
                    </>
                  ) : (
                    <>
                      {ready ? "Mulai mengerjakan" : "Lanjutkan"}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </>
                  )}
                </button>

                <span className="sr-only" role="status">
                  {navigating && "Membuka halaman ujian"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keyframes for the moving gradient on the title */}
      <style>{"@keyframes shine { to { background-position: 200% center; } }"}</style>
    </main>
  );
}
