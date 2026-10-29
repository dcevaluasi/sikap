"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import {
  AlertCircle,
  ArrowRight,
  Ban,
  Check,
  Clock,
  ListChecks,
  Loader2,
  MousePointerClick,
  RefreshCw,
  Smartphone,
  Timer,
  WifiOff,
} from "lucide-react";

import { SoalBagian } from "@/types/ujian-keahlian-akp";
import { cn } from "@/lib/utils";

type LoadState = "loading" | "ready" | "error";

const EXAM_ROUTE = "/lembaga/dpkakp/user/auth/exam";

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
];

const ghostBtn =
  "inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-blue-100/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

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

  /* ---------------------------------------------------------------- */
  /*  Render                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-darkDPKAKP">
      <Image
        src="/dpkakp/image8.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-blue-950/80" aria-hidden="true" />

      <section className="relative z-10 mt-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl space-y-2 animate-in fade-in-0 slide-in-from-bottom-3 duration-700 motion-reduce:animate-none">
          {/* Header */}
          <header className="flex flex-col items-center gap-3 text-center">
            <Image
              className="h-auto w-[96px]"
              src="/lembaga/logo/logo-sertifikasi-akp.png"
              width={100}
              height={100}
              alt="DPKAKP Logo"
              priority
            />

            {load === "ready" && data ? (
              <>
                <h1 className="font-calsans text-3xl leading-[1.05] text-white sm:text-4xl">
                  {data.Ujian}
                </h1>
                <span className="rounded-full border w-full border-blue-300/30 bg-blue-400/10 px-3 py-1 font-jakarta text-xs font-medium text-blue-100">
                  {data.Fungsi} {data.Bagian}
                </span>

              </>
            ) : load === "loading" ? (
              <div className="flex w-full flex-col items-center gap-3" aria-hidden="true">
                <div className="h-6 w-32 animate-pulse rounded-full bg-white/10" />
                <div className="h-9 w-4/5 animate-pulse rounded-lg bg-white/10" />
              </div>
            ) : (
              <h1 className="font-calsans text-3xl leading-[1.05] text-white sm:text-4xl">
                Panduan Pengerjaan Ujian
              </h1>
            )}

            <p className="max-w-5xl font-jakarta text-sm leading-relaxed text-blue-100/90 sm:text-base">
              Harap membaca dengan teliti dan saksama panduan pengerjaan ujian
              keahlian awak kapal perikanan.
            </p>
          </header>

          {/* Guide card */}
          <div
            onPointerMove={handlePointerMove}
            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/50 backdrop-blur-xl sm:p-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(380px_circle_at_var(--x,50%)_var(--y,0%),rgba(147,197,253,0.22),transparent_65%)]"
            />

            <div className="relative space-y-4">
              {!online && (
                <div
                  role="status"
                  className="flex items-start gap-2.5 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100"
                >
                  <WifiOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    Tidak ada koneksi internet. Sambungkan dulu sebelum melanjutkan.
                  </span>
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
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-jakarta text-sm font-medium text-blue-50">
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
                        ready ? "bg-emerald-400" : "bg-blue-400"
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
              <ul ref={listRef} role="group" aria-label="Panduan pengerjaan ujian" className="space-y-2">
                {RULES.map((rule, i) => {
                  const isChecked = checked[i];
                  const Icon = rule.icon;
                  return (
                    <li
                      key={rule.title}
                      className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both motion-reduce:animate-none"
                      style={{ animationDelay: `${150 + i * 80}ms` }}
                    >
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={isChecked}
                        onClick={() => toggle(i)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                          isChecked
                            ? "border-emerald-400/50 bg-emerald-400/10"
                            : showHint
                              ? "border-rose-400/60 bg-rose-400/5"
                              : "border-white/15 bg-white/5 hover:bg-white/10"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                            isChecked ? "bg-emerald-500 text-white" : "bg-blue-400/15 text-blue-200"
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
                        <span className="min-w-0">
                          <span className="block font-jakarta text-sm font-semibold text-white">
                            {rule.title}
                          </span>
                          <span className="mt-0.5 block font-jakarta text-sm leading-relaxed text-blue-100/80">
                            {rule.text}
                          </span>
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
                    Semua panduan sudah dibaca. Pastikan koneksi stabil dan baterai
                    perangkat cukup.
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
                  "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950 disabled:cursor-not-allowed",
                  ready || !REQUIRE_ACKNOWLEDGE
                    ? "bg-blue-500 shadow-lg shadow-blue-500/30 hover:bg-blue-400 disabled:opacity-90"
                    : "bg-blue-500/60 hover:bg-blue-500/75",
                  !online && "opacity-60"
                )}
              >
                {navigating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Membuka ujian
                  </>
                ) : (
                  <>
                    Lanjutkan
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </button>

              <span className="sr-only" role="status">
                {navigating && "Membuka halaman ujian"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}