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
  ExternalLink,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  WifiOff,
} from "lucide-react";

import Toast from "@/components/toast";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success";

/** Short pause so the "Kode diterima" state is actually seen before navigating. */
const REDIRECT_DELAY_MS = 900;

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

export default function AksesUjianPage() {
  const router = useRouter();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const redirectTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
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

  const busy = status !== "idle";
  const hasCode = code.trim().length > 0;

  /* ---------------------------------------------------------------- */
  /*  Browser capabilities & connection status (client-only)           */
  /* ---------------------------------------------------------------- */
  React.useEffect(() => {
    setOnline(navigator.onLine);
    setCanPaste(typeof navigator.clipboard?.readText === "function");

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
    },
    []
  );

  /* ---------------------------------------------------------------- */
  /*  Feedback helpers                                                  */
  /* ---------------------------------------------------------------- */
  const shake = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

  const showError = (message: string, opts?: { toast?: boolean; countAttempt?: boolean }) => {
    setError(message);
    setStatus("idle");
    if (opts?.countAttempt) setFailedAttempts((n) => n + 1);
    if (opts?.toast) {
      Toast.fire({ icon: "error", title: "Oopss!", text: message });
    }
    shake();
    // Keep what they typed, but select it so retyping is one keystroke away.
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  /* ---------------------------------------------------------------- */
  /*  Actions                                                           */
  /* ---------------------------------------------------------------- */
  const handlePasteFromClipboard = async () => {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (text) {
        setCode(text);
        setError(null);
      }
      inputRef.current?.focus();
    } catch {
      setError("Tidak bisa menempel otomatis. Tekan Ctrl+V di kolom kode, atau tahan lalu pilih Tempel.");
      inputRef.current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    const value = code.trim();
    if (!value) {
      showError("Masukkan kode akses terlebih dahulu sebelum memulai ujian.");
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
        });
      }
    } catch (err) {
      showError(getErrorMessage(err), { toast: true, countAttempt: true });
    }
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
                <label
                  htmlFor="kode-akses"
                  className="block font-jakarta text-sm font-medium text-blue-50"
                >
                  Kode akses
                </label>

                <div ref={fieldRef} className="relative">
                  <KeyRound
                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-200/70"
                    aria-hidden="true"
                  />
                  <input
                    ref={inputRef}
                    id="kode-akses"
                    name="kode-akses"
                    type={showCode ? "text" : "password"}
                    value={code}
                    autoFocus
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    readOnly={busy}
                    placeholder="Masukkan kode akses"
                    aria-invalid={error ? true : undefined}
                    aria-describedby="kode-akses-info"
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (error) setError(null);
                    }}
                    onKeyDown={(e) => setCapsLock(e.getModifierState?.("CapsLock") ?? false)}
                    onKeyUp={(e) => setCapsLock(e.getModifierState?.("CapsLock") ?? false)}
                    onBlur={() => setCapsLock(false)}
                    className={cn(
                      "h-12 w-full rounded-xl border bg-white/5 pl-11 pr-24 font-mono text-base tracking-wider text-white transition-colors placeholder:font-jakarta placeholder:tracking-normal placeholder:text-blue-100/50 read-only:opacity-80 focus:outline-none focus:ring-2",
                      error
                        ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/40"
                        : "border-white/20 focus:border-blue-400 focus:ring-blue-400/40"
                    )}
                  />

                  <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
                    {canPaste && !hasCode && !busy && (
                      <button
                        type="button"
                        onClick={handlePasteFromClipboard}
                        aria-label="Tempel kode dari clipboard"
                        title="Tempel dari clipboard"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-100/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      >
                        <ClipboardPaste className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowCode((s) => !s)}
                      aria-label={showCode ? "Sembunyikan kode" : "Tampilkan kode"}
                      aria-pressed={showCode}
                      title={showCode ? "Sembunyikan kode" : "Tampilkan kode"}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-100/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      {showCode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
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
                      Masukkan kode persis seperti yang kamu terima.
                    </p>
                  )}
                  {hasCode && (
                    <span className="shrink-0 tabular-nums text-blue-100/60">
                      {code.length} karakter
                    </span>
                  )}
                </div>
              </div>

              {failedAttempts >= 2 && (
                <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-blue-100/90">
                  Kode belum diterima? Periksa huruf besar/kecil dan spasi, pastikan
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
                    : hasCode
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