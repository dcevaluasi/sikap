"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ExternalLink, Play, ScrollText, X } from "lucide-react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */
const SLIDES = ["/dpkakp/image2.jpg", "/dpkakp/image3.jpg", "/dpkakp/image1.jpg"];
const SLIDE_MS = 8000;
const EXAM_ROUTE = "/lembaga/dpkakp/user/auth";

const VIDEOS = [
  { id: "FA70GlQXoJ0", title: "Tutorial Pelaksanaan Ujian", hint: "Langkah mengerjakan ujian" },
  { id: "ACdOJomFv70", title: "Tutorial DPKAKP & PUKAKP", hint: "Panduan untuk penyelenggara" },
];

type Video = (typeof VIDEOS)[number];

/** Staggered entrance; `fill-mode-both` keeps elements hidden until their turn. */
const enter = (delay: number) => ({
  className:
    "animate-in fade-in-0 slide-in-from-bottom-6 duration-700 fill-mode-both motion-reduce:animate-none",
  style: { animationDelay: `${delay}ms` },
});

/* ------------------------------------------------------------------ */
/*  Video modal                                                         */
/* ------------------------------------------------------------------ */
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in-0 duration-200 motion-reduce:animate-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl animate-in zoom-in-95 fade-in-0 duration-300 motion-reduce:animate-none"
      >
        <div className="mb-3 flex items-center justify-between gap-3 text-white">
          <p className="font-semibold">{video.title}</p>
          <div className="flex items-center gap-2">
            <a
              href={`https://youtu.be/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Buka di YouTube
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup video"
              className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */
export default function HeroDPKAKP() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  const [slide, setSlide] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [video, setVideo] = React.useState<Video | null>(null);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Slideshow; restarts the timer whenever the slide changes (also after a manual pick)
  React.useEffect(() => {
    if (paused || video) return;
    const t = setTimeout(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [slide, paused, video]);

  // Scroll + pointer parallax, written straight to the DOM (no re-renders)
  React.useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let mx = 0;
    let my = 0;

    const render = () => {
      frame = 0;
      const y = Math.min(window.scrollY, section.offsetHeight);
      const p = y / section.offsetHeight;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${mx * -18}px, ${y * 0.45 + my * -18}px, 0) scale(1.08)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
        contentRef.current.style.opacity = String(Math.max(0, 1 - p * 1.4));
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mx * 40}px, ${my * 40}px, 0)`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      schedule();
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    section.addEventListener("pointermove", onPointer);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      section.removeEventListener("pointermove", onPointer);
    };
  }, [reduced]);

  const scrollNext = () => {
    const section = sectionRef.current;
    if (!section) return;
    window.scrollTo({
      top: section.offsetTop + section.offsetHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const closeVideo = React.useCallback(() => setVideo(null), []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-darkDPKAKP"
    >
      {/* Background slideshow (crossfade + slow zoom) */}
      <div ref={bgRef} className="absolute inset-0 -z-20 will-change-transform" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover"
            style={{
              opacity: i === slide ? 1 : 0,
              transform: !reduced && i === slide ? "scale(1.12)" : "scale(1)",
              transition: reduced
                ? "opacity 1s ease"
                : `opacity 1.6s ease, transform ${SLIDE_MS + 2000}ms linear`,
            }}
          />
        ))}
      </div>

      {/* Overlays: tint, grid, glow, bottom fade into the page */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/80 via-blue-950/70 to-darkDPKAKP" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div ref={glowRef} className="pointer-events-none absolute inset-0 -z-10 will-change-transform" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[120px]" />
        <div className="absolute bottom-10 right-[10%] h-64 w-64 rounded-full bg-teal-400/15 blur-[100px]" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="mx-auto w-full max-w-5xl px-5 pb-28 pt-28 text-center will-change-transform sm:px-6 md:pt-32">
        <div {...enter(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-blue-50 backdrop-blur-md sm:text-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
            </span>
            Dewan Penguji Keahlian Awak Kapal Perikanan
          </span>
        </div>

        <div {...enter(120)} className={cn(enter(120).className, "mt-8 flex justify-center")}>
          <div className="group relative">
            <div className="absolute inset-0 rounded-full bg-blue-400/40 blur-2xl transition-all duration-500 group-hover:bg-teal-300/50" aria-hidden="true" />
            <Image
              src="/lembaga/logo/logo-sertifikasi-akp.png"
              width={112}
              height={112}
              alt="Logo DPKAKP"
              priority
              className="relative h-24 w-auto drop-shadow-2xl transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105 sm:h-28"
            />
          </div>
        </div>

        <h1 {...enter(240)} className={cn(enter(240).className, "mt-6 font-calsans text-6xl leading-none tracking-tight sm:text-8xl")}>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-[length:200%_auto] bg-clip-text text-transparent [animation:shine_6s_linear_infinite] motion-reduce:[animation:none]">
            SIKAP
          </span>
        </h1>

        <h2 {...enter(360)} className={cn(enter(360).className, "mt-3 font-calsans text-2xl leading-tight text-white sm:text-4xl")}>
          Sistem Informasi Ujian
          <br />
          <span className="text-blue-100/90">Keahlian Awak Kapal Perikanan</span>
        </h2>


        {/* Primary CTA */}
        <div {...enter(600)} className={cn(enter(600).className, "mt-8 flex justify-center")}>
          <Link
            href={EXAM_ROUTE}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-400/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[120%]"
            />
            <Play className="h-5 w-5 fill-white" aria-hidden="true" />
            Ayo Ujian Sekarang
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>


      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-auto sm:left-auto sm:right-8 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:flex-col"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Tampilkan gambar ${i + 1}`}
            aria-current={i === slide}
            className={cn(
              "rounded-full bg-white/40 transition-all duration-500 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
              i === slide ? "h-2 w-8 bg-white sm:h-8 sm:w-2" : "h-2 w-2"
            )}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={scrollNext}
        className="group absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-blue-100/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-lg p-1"
      >
        Gulir untuk menjelajah
        <span className="flex h-9 w-6 justify-center rounded-full border border-white/30 pt-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white motion-reduce:animate-none" />
        </span>
        <ChevronDown className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      </button>

      {/* Keyframes for the moving gradient on the title */}
      <style>{"@keyframes shine { to { background-position: 200% center; } }"}</style>

      {video && <VideoModal video={video} onClose={closeVideo} />}
    </section>
  );
}
