"use client";

import Image from "next/image";
import { ArrowRight, MousePointer2, Sparkles, Store } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./HeroBanner.module.css";

const FLOATING_TAGS = [
  { label: "酥脆", className: styles.tagCrisp, delay: "-1.5s" },
  { label: "香甜", className: styles.tagSweet, delay: "-4s" },
  { label: "够辣", className: styles.tagSpicy, delay: "-2.8s" },
  { label: "上新", className: styles.tagNew, delay: "-5.2s" },
];

export function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reveal = revealRef.current;
    const grid = gridRef.current;

    if (!section || !reveal || !grid) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = section.clientWidth;
    let height = section.clientHeight;
    let targetX = width * 0.68;
    let targetY = height * 0.55;
    let currentX = targetX;
    let currentY = targetY;
    let animationFrame = 0;
    const requestFrame: (callback: FrameRequestCallback) => number =
      typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame.bind(window)
        : (callback) => window.setTimeout(() => callback(Date.now()), 16);
    const cancelFrame = typeof window.cancelAnimationFrame === "function"
      ? window.cancelAnimationFrame.bind(window)
      : window.clearTimeout.bind(window);

    const renderPosition = () => {
      reveal.style.setProperty("--spotlight-x", `${currentX}px`);
      reveal.style.setProperty("--spotlight-y", `${currentY}px`);

      const normalizedX = (currentX / Math.max(width, 1) - 0.5) * 2;
      const normalizedY = (currentY / Math.max(height, 1) - 0.5) * 2;
      grid.style.transform = `translate3d(${normalizedX * 14}px, ${normalizedY * 10}px, 0) scale(1.04)`;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      renderPosition();
      animationFrame = requestFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const bounds = section.getBoundingClientRect();
      targetX = Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width);
      targetY = Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height);

      if (reduceMotion) {
        currentX = targetX;
        currentY = targetY;
        renderPosition();
      }
    };

    const handlePointerLeave = () => {
      targetX = width * 0.68;
      targetY = height * 0.55;

      if (reduceMotion) {
        currentX = targetX;
        currentY = targetY;
        renderPosition();
      }
    };

    const handleResize = () => {
      width = section.clientWidth;
      height = section.clientHeight;
      targetX = Math.min(targetX, width);
      targetY = Math.min(targetY, height);
      currentX = Math.min(currentX, width);
      currentY = Math.min(currentY, height);
      renderPosition();
    };

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(handleResize);

    renderPosition();
    if (!reduceMotion) animationFrame = requestFrame(animate);

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);
    resizeObserver?.observe(section);

    return () => {
      cancelFrame(animationFrame);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#170d08] text-white"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/mascot.png"
          alt="零食博物馆吉祥物和各类零食"
          fill
          preload
          sizes="100vw"
          className={`${styles.baseImage} object-cover object-center`}
        />
      </div>

      <svg
        ref={gridRef}
        className={styles.grid}
        aria-hidden="true"
      >
        <defs>
          <pattern id="snack-hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="0.65" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#snack-hero-grid)" />
      </svg>

      <div ref={revealRef} className={styles.revealLayer} aria-hidden="true">
        <Image
          src="/mascot.png"
          alt=""
          fill
          sizes="100vw"
          className={`${styles.revealImage} object-cover object-center`}
        />
      </div>

      <div className={styles.atmosphere} aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-20 hidden sm:block" aria-hidden="true">
        {FLOATING_TAGS.map((tag) => (
          <span
            key={tag.label}
            className={`${styles.floatingTag} ${styles.liquidGlass} ${tag.className}`}
            style={{ animationDelay: tag.delay }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className="relative z-30 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1440px] flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <div className={`${styles.liquidGlass} inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.7rem] font-bold tracking-[0.22em] text-white/80 sm:text-xs`}>
            <Sparkles size={14} className="text-[#ffc46b]" />
            SNACK CURATION · 2026
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium tracking-[0.14em] text-white/55 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9ee493] shadow-[0_0_14px_rgba(158,228,147,0.85)]" />
            馆藏持续上新
          </div>
        </div>

        <div className="mt-9 text-center sm:mt-10 lg:mt-7">
          <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-white/48 sm:text-xs">
            Taste the little moments
          </p>
          <h1 className={`${styles.heroTitle} whitespace-nowrap text-[clamp(3.9rem,12vw,11rem)] leading-[0.86] tracking-[-0.07em]`}>
            零食博物馆
          </h1>
        </div>

        <div className="mt-auto flex flex-col items-start justify-between gap-8 pb-1 pt-12 md:flex-row md:items-end">
          <div className={`${styles.contentCard} ${styles.liquidGlass} max-w-xl rounded-[1.75rem] p-5 sm:p-6`}>
            <p className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
              把每一种快乐，
              <span className="text-[#ffc46b]">收进今天的陈列。</span>
            </p>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
              从口感、包装、性价比到批发拿货，一页发现值得卖、也值得囤的零食。
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-customer-service"))}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f3a84b] px-5 py-3 text-sm font-bold text-[#25150c] shadow-[0_12px_32px_rgba(243,168,75,0.24)] transition hover:-translate-y-0.5 hover:bg-[#ffc46b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Store size={16} />
                联系客服拿货
              </button>
              <a
                href="#snack-list"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/7 px-5 py-3 text-sm font-semibold text-white/86 transition hover:-translate-y-0.5 hover:bg-white/12 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                进入馆藏
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className={`${styles.pointerHint} ${styles.liquidGlass} hidden max-w-[220px] items-center gap-3 rounded-full px-4 py-3 text-xs leading-5 text-white/58 lg:flex`}>
            <MousePointer2 size={18} className="shrink-0 text-[#ffc46b]" />
            移动鼠标，用聚光灯唤醒彩色馆藏
          </div>
        </div>
      </div>
    </section>
  );
}
