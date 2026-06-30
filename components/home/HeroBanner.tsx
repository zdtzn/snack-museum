"use client";

import Image from "next/image";
import { ArrowRight, Sparkles, Store } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(233,173,95,0.24),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(201,95,76,0.14),transparent_24%)]" />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-3 py-1 text-xs font-bold tracking-[0.18em] text-primary">
            <Sparkles size={14} />
            SNACK CURATION
          </div>
          <h1 className="text-4xl font-black leading-[1.04] tracking-tight text-dark sm:text-6xl">
            把零食做成
            <span className="gradient-text block">可挑选的陈列馆</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-dark/62 sm:text-lg">
            从口感、包装、性价比到批发拿货，一页看懂哪些值得卖、哪些值得囤。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-customer-service"))}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-dark/10 transition hover:-translate-y-0.5 hover:bg-dark/90"
            >
              <Store size={16} />
              联系客服拿货
            </button>
            <a
              href="#snack-list"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/10 bg-white/80 px-6 py-3 text-sm font-semibold text-dark/75 transition hover:border-primary/25 hover:text-primary"
            >
              先看精选
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              ["6类", "零食分类"],
              ["4.8+", "口感评分"],
              ["本地", "客服对接"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/80 bg-white/72 px-4 py-3 shadow-sm">
                <p className="text-xl font-black text-dark">{value}</p>
                <p className="mt-1 text-xs font-medium text-dark/42">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute -right-4 bottom-0 h-32 w-32 rounded-full bg-accent/12 blur-3xl" />
          <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/82 p-3 shadow-2xl shadow-dark/10 backdrop-blur">
            <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[340px] overflow-hidden rounded-[1.5rem] bg-[#f3e3cc]">
                <Image
                  src="/mascot.png"
                  alt="零食吉祥物"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="rounded-[1.5rem] bg-[#232a31] p-5 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">today picks</p>
                    <p className="mt-1 text-2xl font-black">今日上新</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-primary-light">
                    现货优先
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    ["薯片", "酥脆上头"],
                    ["辣条", "越嚼越香"],
                    ["饮品", "清爽解腻"],
                    ["糖果", "办公室分享"],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-2xl bg-white/8 p-4">
                      <p className="text-sm font-semibold text-white/80">{title}</p>
                      <p className="mt-2 text-xs text-white/50">{desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-white p-4 text-dark">
                  <p className="text-xs font-bold text-dark/40">挑选逻辑</p>
                  <p className="mt-1 text-sm font-semibold">好吃、好卖、好补货，一次看清。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
