"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import {
  AlertCircle,
  Check,
  ClipboardPaste,
  Eye,
  EyeOff,
  Loader2,
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

const ghostBtn =
  "inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-blue-100/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

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
  /*  Feedback helpers                                                  */
  /* ---------------------------------------------------------------- */
  const reduceMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    <main className="relative min-h-screen w-full overflow-hidden bg-darkDPKAKP">
      <Image
        src="/dpkakp/image2.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-blue-950/80" aria-hidden="true" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-7 animate-in fade-in-0 slide-in-from-bottom-3 duration-700 motion-reduce:animate-none">
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

            <h1 className="font-calsans text-3xl leading-none text-white sm:text-4xl">
              Akses Ujian Keahlian
              <br />
              Awak Kapal Perikanan
            </h1>
            <p className="max-w-sm font-jakarta text-sm leading-relaxed text-blue-100/90 sm:text-base">
              Selamat datang peserta ujian! Masukkan kode aksesmu untuk dapat
              memulai ujiannya, persiapkan diri dengan baik!
            </p>
          </header>

          {/* Access card */}
          <div
            onPointerMove={handlePointerMove}
            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-blue-950/50 backdrop-blur-xl sm:p-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(380px_circle_at_var(--x,50%)_var(--y,0%),rgba(147,197,253,0.22),transparent_65%)]"
            />

            <form onSubmit={handleSubmit} noValidate className="relative space-y-4">
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

              <div className="space-y-2">
                {/* Label + quick actions */}
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="kode-akses"
                    className="font-jakarta text-sm font-medium text-blue-50"
                  >
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
                          "flex h-14 max-w-14 min-w-0 flex-1 items-center justify-center rounded-xl border font-mono text-2xl text-white transition-[border-color,background-color,box-shadow] duration-150 sm:h-16",
                          i === 2 && "mr-1 sm:mr-2",
                          status === "success"
                            ? "border-emerald-400 bg-emerald-400/15"
                            : error
                              ? "border-rose-400 bg-rose-400/10"
                              : current
                                ? "border-blue-400 bg-white/10 ring-2 ring-blue-400/40"
                                : filled
                                  ? "border-white/40 bg-white/10"
                                  : "border-white/20 bg-white/5"
                        )}
                      >
                        {filled ? (
                          showCode ? (
                            code[i]
                          ) : (
                            "•"
                          )
                        ) : showCaret ? (
                          <span className="h-6 w-px animate-pulse bg-blue-200 motion-reduce:animate-none" />
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
                <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-blue-100/90">
                  Kode tidak terdaftar? Periksa huruf besar/kecil dan spasi, pastikan
                  koneksi stabil, lalu hubungi pengawas ujian jika masih gagal.
                </p>
              )}

              <button
                type="submit"
                disabled={busy || !online}
                className={cn(
                  "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950 disabled:cursor-not-allowed",
                  status === "success"
                    ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                    : complete
                      ? "bg-blue-500 shadow-lg shadow-blue-500/30 hover:bg-blue-400 disabled:opacity-90"
                      : "bg-blue-500/60 hover:bg-blue-500/75",
                  !online && "opacity-60"
                )}
              >
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
                {status === "idle" && "Mulai ujian"}
              </button>

              <span className="sr-only" role="status">
                {status === "loading" && "Memeriksa kode akses"}
                {status === "success" && "Kode akses diterima"}
              </span>
            </form>
          </div>

          {/* Survey */}
          <p
            className={cn(
              "text-center text-sm leading-relaxed text-blue-100/80 transition-opacity",
              busy && "opacity-0"
            )}
            aria-hidden={busy}
          >
            Bantu kami meningkatkan layanan pelaksanaan ujian keahlian dengan mengisi{" "}
            <Link
              href="/lembaga/dpkakp/user/survey"
              tabIndex={busy ? -1 : undefined}
              className="font-medium text-blue-300 underline-offset-4 transition-colors hover:text-blue-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              survey berikut
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}