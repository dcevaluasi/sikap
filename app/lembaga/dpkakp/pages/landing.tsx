"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { ReactTyped } from "react-typed";
import { Fade, Slide } from "react-awesome-reveal";
import {
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Expand,
  Quote,
  Scale,
  Target,
  X,
  Zap,
} from "lucide-react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../styles.css";

// import required modules
import { Autoplay, EffectCoverflow, Keyboard, Pagination } from "swiper/modules";
import HeroDPKAKP from "@/components/dpkakp/HeroDPKAKP";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */
const EXAM_ROUTE = "/lembaga/dpkakp/user/auth";
const LOGO = "/lembaga/logo/logo-sertifikasi-akp-blue.png";

const VALUES = [
  {
    title: "Akurat",
    icon: Target,
    text: "Penilaian berbasis standar kompetensi yang terukur, sehingga hasil ujian mencerminkan keahlian sebenarnya.",
  },
  {
    title: "Responsif",
    icon: Zap,
    text: "Layanan cepat dan tanggap terhadap kebutuhan peserta, dari pendaftaran hingga penerbitan hasil.",
  },
  {
    title: "Independen",
    icon: Scale,
    text: "Pengujian dilaksanakan secara objektif dan bebas dari kepentingan pihak mana pun.",
  },
  {
    title: "Profesional",
    icon: BadgeCheck,
    text: "Dijalankan oleh penguji berkompeten dengan prosedur yang transparan dan akuntabel.",
  },
];

const GALLERY = [2, 3, 7, 8].map((n) => `/dpkakp/image${n}.jpg`);
const GALLERY_ALT = "Pelaksanaan Ujian ANKAPIN & ATKAPIN";

const MAKLUMAT =
  "Dewan Penguji Keahlian Awak Kapal Perikanan (DPKAKP) berjanji untuk menerapkan pencapaian mutu, perbaikan secara terus menerus dan berkelanjutan untuk meyakinkan seluruh pengguna jasa mendapatkan pelayanan pengujian terbaik serta bersedia menerima sanksi administrasi dan ganti rugi materiil apabila tidak melaksanakan manajemen pelayanan.";

/* ------------------------------------------------------------------ */
/*  Motion helpers                                                      */
/* ------------------------------------------------------------------ */
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Moves its content vertically relative to the parent's position in the
 * viewport. `speed` > 0 lags behind the scroll, < 0 moves ahead of it.
 */
function Parallax({
  speed = 0.2,
  className,
  children,
}: {
  speed?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    const anchor = el?.parentElement;
    if (!el || !anchor || prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = anchor.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/** Card that tilts toward the pointer and shows a soft spotlight. */
function TiltCard({ className, children }: { className?: string; children: React.ReactNode }) {
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--x", `${px * 100}%`);
    el.style.setProperty("--y", `${py * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 8}deg)`;
  };
  const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-[transform,border-color,background-color] duration-300 ease-out hover:border-blue-300/30 hover:bg-white/[0.07] motion-reduce:transition-none",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,0%),rgba(96,165,250,0.18),transparent_60%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-5 text-center">
      <Fade triggerOnce>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-300" aria-hidden="true" />
          {eyebrow}
        </span>
      </Fade>
      <Slide direction="up" triggerOnce>
        <h2 className="font-heading text-3xl font-bold leading-[1.1] text-white sm:text-5xl">
          {title}
        </h2>
      </Slide>
      {description && (
        <Fade triggerOnce delay={150}>
          <p className="text-base leading-relaxed text-mutedForegroundDPKAKP sm:text-lg">
            {description}
          </p>
        </Fade>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery lightbox                                                    */
/* ------------------------------------------------------------------ */
function Lightbox({
  index,
  onClose,
  onMove,
}: {
  index: number;
  onClose: () => void;
  onMove: (step: number) => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onMove]);

  const navBtn =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} dari ${GALLERY.length}`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in-0 duration-200 motion-reduce:animate-none"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        key={index}
        onClick={(e) => e.stopPropagation()}
        className="relative h-[75vh] w-full max-w-5xl animate-in zoom-in-95 fade-in-0 duration-300 motion-reduce:animate-none"
      >
        <Image src={GALLERY[index]} alt={GALLERY_ALT} fill sizes="100vw" className="rounded-2xl object-contain" />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onMove(-1);
        }}
        aria-label="Foto sebelumnya"
        className={cn(navBtn, "left-3 sm:left-6")}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onMove(1);
        }}
        aria-label="Foto berikutnya"
        className={cn(navBtn, "right-3 sm:right-6")}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm tabular-nums text-white/90 backdrop-blur">
        {index + 1} / {GALLERY.length}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function LandingDPKAKP() {
  const progressRef = React.useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = React.useState(false);
  const [photo, setPhoto] = React.useState<number | null>(null);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => setReduced(prefersReducedMotion()), []);

  // Scroll progress bar + back-to-top button (rAF-throttled)
  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${ratio})`);
      setShowTop(window.scrollY > 600);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  const closePhoto = React.useCallback(() => setPhoto(null), []);
  const movePhoto = React.useCallback(
    (step: number) =>
      setPhoto((p) => (p === null ? p : (p + step + GALLERY.length) % GALLERY.length)),
    []
  );

  const marqueeItems = (
    <>
      {VALUES.map(({ title }) => (
        <span key={title} className="mx-8 flex items-center gap-8 sm:mx-12 sm:gap-12">
          <span className="bg-gradient-to-r from-white to-blue-200/70 bg-clip-text text-3xl font-black uppercase tracking-tight text-transparent sm:text-5xl">
            {title}
          </span>
          <Image src={LOGO} width={56} height={56} alt="" aria-hidden="true" className="h-10 w-auto opacity-80 sm:h-14" />
        </span>
      ))}
    </>
  );

  return (
    <main className="relative w-full overflow-x-clip bg-darkDPKAKP text-white">
      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent" aria-hidden="true">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500"
        />
      </div>

      <HeroDPKAKP />

      {/* Ambient parallax blobs */}
      <div className="pointer-events-none absolute inset-x-0 top-[100vh] -z-0 h-[260vh]" aria-hidden="true">
        <Parallax speed={0.35} className="absolute left-[-10rem] top-40">
          <div className="h-[28rem] w-[28rem] rounded-full bg-blue-600/25 blur-[120px]" />
        </Parallax>
        <Parallax speed={-0.25} className="absolute right-[-8rem] top-[70vh]">
          <div className="h-[24rem] w-[24rem] rounded-full bg-cyan-500/15 blur-[120px]" />
        </Parallax>
        <Parallax speed={0.2} className="absolute left-1/3 top-[170vh]">
          <div className="h-[22rem] w-[22rem] rounded-full bg-indigo-500/20 blur-[120px]" />
        </Parallax>
      </div>

      {/* Values marquee */}
      <section
        aria-label="Nilai DPKAKP"
        className="relative z-10 -rotate-1 border-y border-white/10 bg-white/[0.03] py-6 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <Marquee speed={45} pauseOnHover autoFill>
          {marqueeItems}
        </Marquee>
      </section>

      {/* Values bento */}
      <section id="nilai" className="relative z-10 py-20 md:py-28">
        <SectionHeading
          eyebrow="Komitmen kami"
          title={
            <>
              Empat nilai yang menjaga <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
                mutu pengujian
              </span>
            </>
          }
          description="Setiap ujian keahlian awak kapal perikanan dijalankan dengan prinsip yang sama, untuk setiap peserta."
        />

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ title, icon: Icon, text }, i) => (
            <Fade key={title} triggerOnce delay={i * 100} className={cn(i % 2 === 1 && "lg:translate-y-8")}>
              <TiltCard className="h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="mt-6 font-mono text-xs text-blue-200/60">0{i + 1}</p>
                <h3 className="mt-1 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mutedForegroundDPKAKP">{text}</p>
              </TiltCard>
            </Fade>
          ))}
        </div>
      </section>

      {/* Full-bleed parallax band */}
      <section aria-hidden="true" className="relative z-10 h-[50vh] overflow-hidden sm:h-[60vh]">
        <Parallax speed={-0.3} className="absolute inset-x-0 -inset-y-[30%]">
          <Image src="/dpkakp/image4.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-darkDPKAKP via-darkDPKAKP/40 to-darkDPKAKP" />
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <Parallax speed={0.15}>
            <p className="text-center text-4xl font-black uppercase leading-none tracking-tight text-white/90 drop-shadow-2xl sm:text-7xl">
              Kompeten di laut,
              <br />
              <span className="text-blue-200/80">teruji di darat.</span>
            </p>
          </Parallax>
        </div>
      </section>

      {/* Gallery */}
      <section id="profilDPKAKP" className="relative z-10 py-20 md:py-28">
        <SectionHeading
          eyebrow="Galeri"
          title={
            <>
              Potret Pelaksanaan Ujian <br className="hidden sm:block" />
              Keahlian Awak Kapal Perikanan
            </>
          }
          description="Pelaksanaan Ujian Keahlian Awak Kapal Perikanan Tingkat I dan Tingkat II."
        />

        <Fade triggerOnce delay={200}>
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            initialSlide={2}
            keyboard={{ enabled: true }}
            autoplay={reduced ? false : { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 160, modifier: 1, slideShadows: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Autoplay, EffectCoverflow, Keyboard, Pagination]}
            className="mySwiper !mt-12 !pb-14"
          >
            {GALLERY.map((src, i) => (
              <SwiperSlide key={src} className="swiper-slide potret">
                <button
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={`Lihat foto ${i + 1} lebih besar`}
                  className="group/photo relative block h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <Image
                    src={src}
                    alt={GALLERY_ALT}
                    width={0}
                    height={0}
                    sizes="(max-width: 640px) 80vw, 400px"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover/photo:scale-110 motion-reduce:transition-none"
                  />
                  <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100">
                    <span className="text-left text-sm font-medium">{GALLERY_ALT}</span>
                    <Expand className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </Fade>
        <p className="mt-2 text-center text-xs text-mutedForegroundDPKAKP">
          Geser atau gunakan tombol panah, ketuk foto untuk memperbesar
        </p>
      </section>

      {/* Maklumat */}
      <section id="maklumat" className="relative z-10 px-5 py-20 md:py-28">
        <SectionHeading
          eyebrow="Janji layanan"
          title={
            <>
              Maklumat <br />
              Manajemen Pelayanan
            </>
          }
        />

        <Slide direction="up" triggerOnce>
          <div className="relative mx-auto mt-12 max-w-4xl">
            <Parallax speed={0.12} className="absolute -left-4 -top-10 sm:-left-10">
              <Quote className="h-20 w-20 rotate-180 text-blue-400/30 sm:h-28 sm:w-28" aria-hidden="true" />
            </Parallax>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 shadow-2xl shadow-blue-950/50 backdrop-blur-xl sm:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl"
              />
              <p className="sr-only">{MAKLUMAT}</p>
              <div
                aria-hidden="true"
                className="relative min-h-[12rem] text-lg italic leading-relaxed text-blue-50/90 sm:text-2xl sm:leading-relaxed"
              >
                {reduced ? (
                  MAKLUMAT
                ) : (
                  <ReactTyped strings={[MAKLUMAT]} typeSpeed={25} startWhenVisible showCursor />
                )}
              </div>
              <div className="relative mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <Image src={LOGO} width={48} height={48} alt="" className="h-12 w-auto" />
                <div>
                  <p className="font-semibold">Dewan Penguji Keahlian Awak Kapal Perikanan</p>
                  <p className="text-sm text-mutedForegroundDPKAKP">Kementerian Kelautan dan Perikanan</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-5 pb-20">
        <Fade triggerOnce>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-300/20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-center shadow-2xl shadow-blue-900/50 sm:p-14">
            <Parallax speed={-0.15} className="pointer-events-none absolute -right-10 -top-10 opacity-20">
              <Image src={LOGO} width={260} height={260} alt="" aria-hidden="true" className="h-64 w-auto brightness-200" />
            </Parallax>
            <h2 className="relative text-3xl font-bold sm:text-4xl">Siap mengikuti ujian keahlian?</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-blue-100/90">
              Masuk dengan kode akses yang telah kamu terima untuk memulai ujian.
            </p>
            <Link
              href={EXAM_ROUTE}
              className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-blue-800 shadow-xl transition-all hover:gap-3 hover:shadow-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              Masuk ke ujian
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Fade>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <Image src={LOGO} width={40} height={40} alt="Logo DPKAKP" className="h-10 w-auto" />
            <p className="text-sm font-semibold">DPKAKP</p>
          </div>
          <p className="text-sm text-mutedForegroundDPKAKP">
            Copyright © {new Date().getFullYear()} Dewan Penguji Keahlian Awak Kapal Perikanan
          </p>
        </div>
      </footer>

      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
        aria-label="Kembali ke atas"
        className={cn(
          "fixed bottom-6 right-6 z-40 rounded-full border border-white/15 bg-blue-600/80 p-3 text-white shadow-lg shadow-blue-900/40 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {photo !== null && <Lightbox index={photo} onClose={closePhoto} onMove={movePhoto} />}
    </main>
  );
}
