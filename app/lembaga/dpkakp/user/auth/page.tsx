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
  Check,
  ClipboardPaste,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  MessageSquareHeart,
  WifiOff,
  X,
} from "lucide-react";

import Toast from "@/components/toast";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success";

/** The access code is exactly this many characters. */
const CODE_LENGTH = 6;
const SLOTS = Array.from({ length: CODE_LENGTH }, (_, i) => i);

/** Short pause so the "Kode diterima" state is actually seen before navigating. */
const REDIRECT_DELAY_MS = 900;
/** Let the red "wrong code" state show before the boxes are emptied. */
const CLEAR_DELAY_MS = 600;
const LANDING_ROUTE = "/lembaga/dpkakp";

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
    const data = e.response.data;
    const apiMessage: string | undefined = data?.pesan ?? data?.Pesan;
    if (e.response.status === 401) {
      return apiMessage || "Kode akses tidak valid.";
    }
    return apiMessage || e.message;
  }
  return String(e);
};

/** Keep the caret at the end so the visible boxes and the real input never disagree. */
const caretToEnd = (el: HTMLInputElement) => {
  const n = el.value.length;
  if (el.selectionStart !== n || el.selectionEnd !== n) el.setSelectionRange(n, n);
};

export default function AksesUjianPage() {
  const router = useRouter();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const slotRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);
  const redirectTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const clearTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const [code, setCode] = React.useState("");
  const [showCode, setShowCode] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = React.useState(0);
  const [capsLock, setCapsLock] = React.useState(false);
  const [online, setOnline] = React.useState(true);
  const [canPaste, setCanPaste] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const busy = status !== "idle";
  const hasCode = code.length > 0;
  const complete = code.length === CODE_LENGTH;

  /* ---------------------------------------------------------------- */
  /*  Browser capabilities & connection status (client-only)           */
  /* ---------------------------------------------------------------- */
  React.useEffect(() => {
    setOnline(navigator.onLine);
    setCanPaste(typeof navigator.clipboard?.readText === "function");
    setFocused(document.activeElement === inputRef.current);

    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  React.useEffect(
    () => () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
      if (clearTimer.current) clearTimeout(clearTimer.current);
    },
    []
  );

  /* ---------------------------------------------------------------- */
  /*  Pointer parallax on background & glow (DOM only, no re-renders)   */
  /* ---------------------------------------------------------------- */
  React.useEffect(() => {
    if (reduceMotion()) return;
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
  /*  Feedback helpers                                                  */
  /* ---------------------------------------------------------------- */
  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  const animateSlot = (
    i: number,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ) => {
    if (reduceMotion()) return;
    slotRefs.current[i]?.animate(keyframes, options);
  };

  /** Little "pop" on every box that just received a character. */
  const popSlots = (from: number, to: number) => {
    for (let i = from; i < to; i++) {
      animateSlot(
        i,
        [
          { transform: "scale(0.82)" },
          { transform: "scale(1.08)" },
          { transform: "scale(1)" },
        ],
        { duration: 180, delay: (i - from) * 35, easing: "ease-out" }
      );
    }
  };

  /** Ripple across the boxes when the code is accepted. */
  const waveSlots = () => {
    SLOTS.forEach((i) =>
      animateSlot(
        i,
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-8px)" },
          { transform: "translateY(0)" },
        ],
        { duration: 320, delay: i * 55, easing: "ease-out" }
      )
    );
  };

  const shake = () => {
    if (reduceMotion()) return;
    fieldRef.current?.animate(
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

  const showError = (
    message: string,
    opts?: { toast?: boolean; countAttempt?: boolean; clear?: boolean }
  ) => {
    setError(message);
    setStatus("idle");
    if (opts?.countAttempt) setFailedAttempts((n) => n + 1);
    if (opts?.toast) {
      Toast.fire({ icon: "error", title: "Oopss!", text: message });
    }
    // Wrong code: empty the boxes after the red state has been seen.
    if (opts?.clear) {
      clearTimer.current = setTimeout(() => setCode(""), CLEAR_DELAY_MS);
    }
    shake();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  /* ---------------------------------------------------------------- */
  /*  Actions                                                           */
  /* ---------------------------------------------------------------- */
  const verify = async (raw: string) => {
    if (busy) return;

    const value = raw.trim();
    if (!value) {
      showError("Masukkan kode akses terlebih dahulu sebelum memulai ujian.");
      return;
    }
    if (value.length < CODE_LENGTH) {
      showError(`Kode akses terdiri dari ${CODE_LENGTH} karakter. Lengkapi dulu kodenya.`);
      return;
    }
    if (!online) {
      showError("Kamu sedang offline. Sambungkan internet lalu coba lagi.");
      return;
    }

    setError(null);
    setStatus("loading");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/AuthExam`,
        { code_akses: value }
      );

      if (response.status == 200) {
        Cookies.set("XSRF096", response?.data?.t);
        Cookies.set("XSRF097_CODE", value);
        setStatus("success");
        waveSlots();
        Toast.fire({
          icon: "success",
          title: "Yeayyy!",
          text: `Berhasil memasukkan kode akses, silahkan lanjut melaksanakan ujian!`,
        });
        redirectTimer.current = setTimeout(
          () => router.replace("/lembaga/dpkakp/user/auth/guide"),
          REDIRECT_DELAY_MS
        );
      } else {
        showError(response.statusText || "Kode akses tidak dapat diverifikasi.", {
          toast: true,
          countAttempt: true,
          clear: true,
        });
      }
    } catch (err) {
      showError(getErrorMessage(err), { toast: true, countAttempt: true, clear: true });
    }
  };

  /**
   * Single entry point for typing, pasting and the clipboard button:
   * strips whitespace, caps at CODE_LENGTH, animates new boxes and
   * checks the code automatically as soon as the last box is filled.
   */
  const applyCode = (raw: string) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);

    const next = raw.replace(/\s/g, "").slice(0, CODE_LENGTH);
    const prevLength = code.length;

    setCode(next);
    if (error) setError(null);
    if (next.length > prevLength) popSlots(prevLength, next.length);
    if (next.length === CODE_LENGTH && next !== code) verify(next);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) applyCode(text);
      inputRef.current?.focus();
    } catch {
      setError("Tidak bisa menempel otomatis. Tekan Ctrl+V di kolom kode, atau tahan lalu pilih Tempel.");
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    setCode("");
    setError(null);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verify(code);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(e.getModifierState?.("CapsLock") ?? false);
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "Escape" && hasCode && !busy) handleClear();
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
    <main className="relative isolate min-h-[100svh] w-full overflow-hidden bg-darkDPKAKP">
      {/* Background: photo with pointer parallax, tint, grid, glow (same as landing hero) */}
      <div ref={bgRef} className="absolute inset-0 -z-20 will-change-transform" aria-hidden="true">
        <Image
          src="/dpkakp/image2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/90 via-blue-950/75 to-darkDPKAKP"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[120px]" />
        <div className="absolute bottom-10 right-[10%] h-64 w-64 rounded-full bg-teal-400/15 blur-[100px]" />
      </div>

      {/* Back to landing */}
      <Link
        href={LANDING_ROUTE}
        {...enter(0, "absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-medium text-blue-50 backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-6 sm:top-6 sm:text-sm")}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Beranda
      </Link>

      <section className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 py-20">
        <div className="w-full max-w-xl space-y-3">
          {/* Header */}
          <header className="flex flex-col items-center gap-4 text-center">
            <div {...enter(80)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-blue-50 backdrop-blur-md">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
                </span>
                SIKAP · Ujian Keahlian AKP
              </span>
            </div>

            <div {...enter(160, "group relative")}>
              <div
                className="absolute inset-0 rounded-full bg-blue-400/40 blur-2xl transition-all duration-500 group-hover:bg-teal-300/50"
                aria-hidden="true"
              />
              <Image
                className="relative h-24 w-auto drop-shadow-2xl transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105"
                src="/lembaga/logo/logo-sertifikasi-akp.png"
                width={100}
                height={100}
                alt="DPKAKP Logo"
                priority
              />
            </div>

            <h1 {...enter(240, "font-calsans text-3xl leading-none text-white sm:text-4xl")}>
              Akses Ujian Keahlian
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-[length:200%_auto] bg-clip-text text-transparent [animation:shine_6s_linear_infinite] motion-reduce:[animation:none]">
                Awak Kapal Perikanan
              </span>
            </h1>
            <p {...enter(320, "max-w-xl font-jakarta text-sm leading-relaxed text-blue-100/90 sm:text-base")}>
              Selamat datang peserta ujian! Masukkan kode aksesmu untuk memulai ujian.
              Persiapkan diri dengan baik!
            </p>
          </header>

          {/* Access card */}
          <div {...enter(420)}>
            <div
              onPointerMove={handlePointerMove}
              className={cn(
                "group relative overflow-hidden rounded-3xl border bg-white/[0.06] p-5 shadow-2xl shadow-blue-950/60 backdrop-blur-xl transition-colors duration-300 sm:p-7",
                status === "success"
                  ? "border-emerald-400/40"
                  : error
                    ? "border-rose-400/30"
                    : "border-white/10 hover:border-blue-300/30"
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

              <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
                {!online && (
                  <div
                    role="status"
                    className="flex items-start gap-2.5 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100"
                  >
                    <WifiOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      Tidak ada koneksi internet. Sambungkan dulu sebelum memasukkan
                      kode.
                    </span>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Label + quick actions */}
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="kode-akses"
                      className="inline-flex items-center gap-2.5 font-jakarta text-sm font-semibold text-white"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
                        <KeyRound className="h-4 w-4 text-white" aria-hidden="true" />
                      </span>
                      Kode akses
                    </label>

                    <div className="-mr-2 flex items-center gap-0.5">
                      {!busy && hasCode && (
                        <button type="button" onClick={handleClear} className={ghostBtn}>
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                          Hapus
                        </button>
                      )}
                      {!busy && !hasCode && canPaste && (
                        <button
                          type="button"
                          onClick={handlePasteFromClipboard}
                          className={ghostBtn}
                        >
                          <ClipboardPaste className="h-3.5 w-3.5" aria-hidden="true" />
                          Tempel
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowCode((s) => !s)}
                        aria-pressed={showCode}
                        className={ghostBtn}
                      >
                        {showCode ? (
                          <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {showCode ? "Sembunyikan" : "Tampilkan"}
                      </button>
                    </div>
                  </div>

                  {/* 6 boxes (visual) + one real, invisible input on top (typing, paste, autofill) */}
                  <div ref={fieldRef} className="relative flex justify-center gap-1.5 sm:gap-2.5">
                    {SLOTS.map((i) => {
                      const filled = i < code.length;
                      const current =
                        focused && !busy && i === Math.min(code.length, CODE_LENGTH - 1);
                      const showCaret = current && !complete;

                      return (
                        <div
                          key={i}
                          ref={(el) => {
                            slotRefs.current[i] = el;
                          }}
                          aria-hidden="true"
                          className={cn(
                            "flex h-14 max-w-14 min-w-0 flex-1 items-center justify-center rounded-2xl border font-mono text-2xl text-white transition-[border-color,background-color,box-shadow] duration-200 sm:h-16",
                            i === 2 && "mr-1 sm:mr-2",
                            status === "success"
                              ? "border-emerald-400 bg-emerald-400/15 shadow-lg shadow-emerald-500/20"
                              : error
                                ? "border-rose-400 bg-rose-400/10"
                                : current
                                  ? "border-cyan-300 bg-white/10 shadow-lg shadow-cyan-400/20 ring-2 ring-cyan-300/30"
                                  : filled
                                    ? "border-blue-300/50 bg-blue-400/10"
                                    : "border-white/15 bg-white/[0.04]"
                          )}
                        >
                          {filled ? (
                            showCode ? (
                              code[i]
                            ) : (
                              "•"
                            )
                          ) : showCaret ? (
                            <span className="h-6 w-px animate-pulse bg-cyan-200 motion-reduce:animate-none" />
                          ) : null}
                        </div>
                      );
                    })}

                    <input
                      ref={inputRef}
                      id="kode-akses"
                      name="kode-akses"
                      type="text"
                      value={code}
                      autoFocus
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      readOnly={busy}
                      aria-label={`Kode akses, ${CODE_LENGTH} karakter`}
                      aria-invalid={error ? true : undefined}
                      aria-describedby="kode-akses-info"
                      onChange={(e) => applyCode(e.target.value)}
                      onPaste={(e) => {
                        // A paste replaces the whole code instead of being cut off at 6.
                        e.preventDefault();
                        if (!busy) applyCode(e.clipboardData.getData("text"));
                      }}
                      onKeyDown={handleKeyDown}
                      onKeyUp={(e) => setCapsLock(e.getModifierState?.("CapsLock") ?? false)}
                      onFocus={(e) => {
                        setFocused(true);
                        caretToEnd(e.currentTarget);
                      }}
                      onBlur={() => {
                        setFocused(false);
                        setCapsLock(false);
                      }}
                      onClick={(e) => caretToEnd(e.currentTarget)}
                      onSelect={(e) => caretToEnd(e.currentTarget)}
                      className="absolute inset-0 h-full w-full cursor-text text-base opacity-0"
                    />
                  </div>

                  {/* Progress line under the boxes */}
                  <div className="h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                        status === "success"
                          ? "bg-emerald-400"
                          : error
                            ? "bg-rose-400"
                            : "bg-gradient-to-r from-blue-400 to-cyan-300"
                      )}
                      style={{ width: `${(code.length / CODE_LENGTH) * 100}%` }}
                    />
                  </div>

                  {/* One info row: error > caps lock > helper. Always announced politely. */}
                  <div
                    id="kode-akses-info"
                    className="flex min-h-5 items-start justify-between gap-3 text-xs"
                    aria-live="polite"
                  >
                    {error ? (
                      <p role="alert" className="flex items-start gap-1.5 text-rose-300">
                        <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {error}
                      </p>
                    ) : capsLock ? (
                      <p className="text-amber-300">Caps Lock sedang aktif.</p>
                    ) : (
                      <p className="text-blue-100/70">
                        Kode diperiksa otomatis setelah {CODE_LENGTH} karakter terisi.
                      </p>
                    )}
                    <span className="shrink-0 tabular-nums text-blue-100/60">
                      {code.length}/{CODE_LENGTH}
                    </span>
                  </div>
                </div>

                {failedAttempts >= 2 && (
                  <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-blue-100/90 animate-in fade-in-0 slide-in-from-top-1 duration-300 motion-reduce:animate-none">
                    Kode tidak terdaftar? Periksa huruf besar/kecil dan spasi, pastikan
                    koneksi stabil, lalu hubungi pengawas ujian jika masih gagal.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy || !online}
                  className={cn(
                    "group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full text-base font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 disabled:cursor-not-allowed",
                    status === "success"
                      ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                      : complete
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-xl shadow-blue-500/40 hover:-translate-y-0.5 hover:shadow-cyan-400/40 disabled:opacity-90 disabled:hover:translate-y-0"
                        : "bg-gradient-to-r from-blue-500/60 to-cyan-500/60 hover:from-blue-500/80 hover:to-cyan-500/80",
                    !online && "opacity-60"
                  )}
                >
                  {status === "idle" && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[120%]"
                    />
                  )}
                  {status === "loading" && (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Memeriksa kode
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      Kode diterima, membuka panduan
                    </>
                  )}
                  {status === "idle" && (
                    <>
                      Mulai ujian
                      <ArrowRight
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                <span className="sr-only" role="status">
                  {status === "loading" && "Memeriksa kode akses"}
                  {status === "success" && "Kode akses diterima"}
                </span>
              </form>
            </div>
          </div>

          {/* Survey */}
          <div
            {...enter(520, cn("transition-opacity", busy && "opacity-0"))}
            aria-hidden={busy}
          >
            <Link
              href="/lembaga/dpkakp/user/survey"
              tabIndex={busy ? -1 : undefined}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 pr-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-200 transition-transform group-hover:scale-110">
                <MessageSquareHeart className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">Isi survei layanan</span>
                <span className="block text-xs text-blue-100/70">
                  Bantu kami meningkatkan pelaksanaan ujian keahlian
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-blue-200 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Keyframes for the moving gradient on the title */}
      <style>{"@keyframes shine { to { background-position: 200% center; } }"}</style>
    </main>
  );
}
