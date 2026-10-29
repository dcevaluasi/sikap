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
  Building2,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
  WifiOff,
} from "lucide-react";

import Toast from "@/components/toast";
import { containsPukakp } from "@/utils/dpkakp";
import { cn } from "@/lib/utils";

type Role = "dpkakp" | "pukakp" | "penguji";
type Status = "idle" | "loading" | "success";
type Field = "email" | "password" | "role";

const LANDING_ROUTE = "/lembaga/dpkakp";

const ROLES: { value: Role; label: string; hint: string; icon: typeof ShieldCheck }[] = [
  { value: "dpkakp", label: "DPKAKP", hint: "Dewan penguji", icon: ShieldCheck },
  { value: "pukakp", label: "PUKAKP", hint: "Penyelenggara", icon: Building2 },
  { value: "penguji", label: "Penguji", hint: "Pengawas ujian", icon: UserCheck },
];

/** Staggered entrance, same as the landing hero. */
const enter = (delay: number, className?: string) => ({
  className: cn(
    "animate-in fade-in-0 slide-in-from-bottom-6 duration-700 fill-mode-both motion-reduce:animate-none",
    className
  ),
  style: { animationDelay: `${delay}ms` },
});

const inputCls =
  "h-12 w-full rounded-2xl border bg-white/[0.04] pl-11 pr-4 text-sm text-white placeholder:text-blue-100/40 transition-all duration-200 focus:bg-white/10 focus:outline-none focus:ring-2 disabled:opacity-60";

const getErrorMessage = (e: unknown): string => {
  if (e instanceof AxiosError) {
    if (!e.response) {
      return "Tidak dapat terhubung ke server. Periksa koneksi internetmu lalu coba lagi.";
    }
    const pesan: string | undefined = e.response.data?.pesan ?? e.response.data?.Pesan;
    if (e.response.status === 401) return `Unauthorized, ${pesan ?? "email atau password salah"}!`;
    return pesan ? `${pesan}!` : e.message;
  }
  return String(e);
};

function LoginPage() {
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<Role | "">("");
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [capsLock, setCapsLock] = React.useState(false);
  const [online, setOnline] = React.useState(true);

  const busy = status !== "idle";

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
  /*  Feedback helpers                                                  */
  /* ---------------------------------------------------------------- */
  const shake = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    formRef.current?.animate(
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

  const clearFieldError = (field: Field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (formError) setFormError(null);
  };

  const fail = (message: string) => {
    setStatus("idle");
    setFormError(message);
    setPassword(""); // keep the email so only the password needs retyping
    Toast.fire({ icon: "error", title: "Oopsss!", text: message });
    shake();
    requestAnimationFrame(() => passwordRef.current?.focus());
  };

  /* ---------------------------------------------------------------- */
  /*  Submit                                                            */
  /* ---------------------------------------------------------------- */
  const handleLoginAdminDPKAKP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    const value = email.trim();
    const next: Partial<Record<Field, string>> = {};
    if (!value) next.email = "Isi terlebih dahulu emailmu.";
    else if (!/^\S+@\S+\.\S+$/.test(value)) next.email = "Format email belum benar.";
    if (!password) next.password = "Isi terlebih dahulu passwordmu.";
    if (!role) next.role = "Pilih role akses terlebih dahulu.";
    else if (value.includes("pukakp") && role === "dpkakp") next.role = "Role kamu bukan DPKAKP!";

    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length) {
      shake();
      if (next.email) emailRef.current?.focus();
      else if (next.password) passwordRef.current?.focus();
      return;
    }
    if (!online) {
      setFormError("Kamu sedang offline. Sambungkan internet lalu coba lagi.");
      shake();
      return;
    }

    setStatus("loading");
    try {
      const response = await axios.post(
        role === "penguji"
          ? `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/penguji/login`
          : `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminPusat/login`,
        { email: value, password }
      );

      if (response.status == 200) {
        setStatus("success");
        Toast.fire({
          icon: "success",
          title: "Yeayyy!",
          text: `Berhasil login, silahkan menggunakan layanan admin DPKAKP!`,
        });
        Cookies.set("XSRF095", response?.data?.t);
        Cookies.set(
          "IsPUKAKP",
          role == "pukakp" ? "true" : role == "penguji" ? "penguji" : "false"
        );
        if (containsPukakp(value) || value.includes("tryout")) {
          router.replace("/lembaga/pukakp/admin/dashboard/ujian");
        } else {
          router.replace("/lembaga/dpkakp/admin/dashboard/ujian");
        }
      } else {
        fail(response.statusText || "Login gagal, coba lagi.");
      }
    } catch (err) {
      console.error("LOGIN ADMIN", err);
      fail(getErrorMessage(err));
    }
  };

  const trackCaps = (e: React.KeyboardEvent<HTMLInputElement>) =>
    setCapsLock(e.getModifierState?.("CapsLock") ?? false);

  /** Soft spotlight that follows the pointer across the card (set via CSS vars, no re-render). */
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const fieldTone = (field: Field) =>
    errors[field]
      ? "border-rose-400/70 focus:ring-rose-400/40"
      : "border-white/10 hover:border-white/20 focus:border-cyan-300/60 focus:ring-cyan-300/30";

  const FieldError = ({ field }: { field: Field }) =>
    errors[field] ? (
      <p
        id={`${field}-error`}
        role="alert"
        className="flex items-center gap-1.5 text-xs text-rose-300 animate-in fade-in-0 slide-in-from-top-1 duration-200 motion-reduce:animate-none"
      >
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null;

  /* ---------------------------------------------------------------- */
  /*  Render                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <main className="relative isolate min-h-[100svh] w-full overflow-hidden bg-darkDPKAKP">
      {/* Background: photo with pointer parallax, tint, grid, glow (same as landing hero) */}
      <div ref={bgRef} className="absolute inset-0 -z-20 will-change-transform" aria-hidden="true">
        <Image src="/dpkakp/image3.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
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

      {/* Back to landing */}
      <Link
        href={LANDING_ROUTE}
        {...enter(0, "absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-medium text-blue-50 backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-6 sm:top-6 sm:text-sm")}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Beranda
      </Link>

      <section className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 pb-12 pt-20">
        <div className="w-full max-w-2xl space-y-3">
          {/* Header */}
          <header className="flex flex-col items-center gap-4 text-center">
            <div {...enter(80)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-blue-50 backdrop-blur-md">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
                </span>
                Portal Admin DPKAKP
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
                width={96}
                height={96}
                alt="DPKAKP Logo"
                priority
              />
            </div>

            <h1 {...enter(240, "font-calsans text-4xl leading-none text-white sm:text-5xl")}>
              Login{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-[length:200%_auto] bg-clip-text text-transparent [animation:shine_6s_linear_infinite] motion-reduce:[animation:none]">
                SIKAP
              </span>
            </h1>
            <p {...enter(320, "max-w-2xl font-jakarta text-sm leading-none text-blue-100/90 sm:text-base")}>
              Selamat datang dewan penguji. Silakan login untuk mengakses fitur penunjang
              pelaksanaan ujian keahlian awak kapal perikanan.
            </p>
          </header>

          {/* Form card */}
          <div {...enter(420)}>
            <div
              onPointerMove={handlePointerMove}
              className={cn(
                "group relative overflow-hidden rounded-3xl border bg-white/[0.06] p-5 shadow-2xl shadow-blue-950/60 backdrop-blur-xl transition-colors duration-300 sm:p-7",
                status === "success"
                  ? "border-emerald-400/40"
                  : formError
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

              <form ref={formRef} onSubmit={handleLoginAdminDPKAKP} noValidate className="relative space-y-5">
                {!online && (
                  <div
                    role="status"
                    className="flex items-start gap-2.5 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100"
                  >
                    <WifiOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Tidak ada koneksi internet. Sambungkan dulu sebelum login.</span>
                  </div>
                )}

                {formError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100 animate-in fade-in-0 slide-in-from-top-1 duration-200 motion-reduce:animate-none"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Role */}
                <fieldset className="space-y-2" disabled={busy}>
                  <legend className="mb-2 font-jakarta text-sm font-semibold text-white">Masuk sebagai</legend>
                  <div role="radiogroup" aria-describedby={errors.role ? "role-error" : undefined} className="grid grid-cols-3 gap-2">
                    {ROLES.map(({ value, label, hint, icon: Icon }) => {
                      const active = role === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => {
                            setRole(value);
                            clearFieldError("role");
                          }}
                          className={cn(
                            "group/role relative flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                            active
                              ? "border-cyan-300/70 bg-gradient-to-b from-blue-500/25 to-cyan-500/10 shadow-lg shadow-cyan-500/10"
                              : errors.role
                                ? "border-rose-400/60 bg-rose-400/5"
                                : "border-white/10 bg-white/[0.04] hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-white/10"
                          )}
                        >
                          {active && (
                            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-300 text-blue-950 animate-in zoom-in-50 duration-200 motion-reduce:animate-none">
                              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                            </span>
                          )}
                          <span
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300",
                              active
                                ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30"
                                : "bg-white/10 text-cyan-200 group-hover/role:scale-110"
                            )}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="text-sm font-semibold text-white">{label}</span>
                          <span className="hidden text-[11px] leading-tight text-blue-100/60 sm:block">{hint}</span>
                        </button>
                      );
                    })}
                  </div>
                  <FieldError field="role" />
                </fieldset>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="admin-email" className="font-jakarta text-sm font-semibold text-white">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/60" aria-hidden="true" />
                    <input
                      ref={emailRef}
                      id="admin-email"
                      type="email"
                      inputMode="email"
                      autoComplete="username"
                      autoFocus
                      value={email}
                      disabled={busy}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError("email");
                      }}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      placeholder="nama@instansi.go.id"
                      className={cn(inputCls, fieldTone("email"))}
                    />
                  </div>
                  <FieldError field="email" />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label htmlFor="admin-password" className="font-jakarta text-sm font-semibold text-white">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/60" aria-hidden="true" />
                    <input
                      ref={passwordRef}
                      id="admin-password"
                      type={isShowPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      disabled={busy}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearFieldError("password");
                      }}
                      onKeyDown={trackCaps}
                      onKeyUp={trackCaps}
                      onBlur={() => setCapsLock(false)}
                      aria-invalid={errors.password ? true : undefined}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      placeholder="Masukkan password"
                      className={cn(inputCls, "pr-12", fieldTone("password"))}
                    />
                    <button
                      type="button"
                      onClick={() => setIsShowPassword((s) => !s)}
                      aria-label={isShowPassword ? "Sembunyikan password" : "Tampilkan password"}
                      aria-pressed={isShowPassword}
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-blue-100/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      {isShowPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FieldError field="password" />
                  {capsLock && !errors.password && (
                    <p className="text-xs text-amber-300">Caps Lock sedang aktif.</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={busy || !online}
                  className={cn(
                    "group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full text-base font-semibold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 disabled:cursor-not-allowed",
                    status === "success"
                      ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-xl shadow-blue-500/40 hover:-translate-y-0.5 hover:shadow-cyan-400/40 active:scale-[0.98] disabled:hover:translate-y-0",
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
                      Memeriksa akun
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      Berhasil, membuka dashboard
                    </>
                  )}
                  {status === "idle" && (
                    <>
                      Masuk
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </>
                  )}
                </button>

                <span className="sr-only" role="status">
                  {status === "loading" && "Memeriksa akun"}
                  {status === "success" && "Login berhasil"}
                </span>
              </form>
            </div>
          </div>

          <p {...enter(520, "text-center text-xs text-blue-100/60")}>
            Lupa akses atau akun terkunci? Hubungi administrator pusat DPKAKP.
          </p>
        </div>
      </section>

      {/* Keyframes for the moving gradient on the title */}
      <style>{"@keyframes shine { to { background-position: 200% center; } }"}</style>
    </main>
  );
}

export default LoginPage;
