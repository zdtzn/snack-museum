"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";

interface PriceData {
  leftImage: string;
  leftTitle: string;
  leftDesc: string;
  leftBadge: string;
  leftPriceLabel: string;
  leftPriceValue: string;
  rightImage: string;
  rightTitle: string;
  rightDesc: string;
  rightBadge: string;
  rightPriceLabel: string;
  rightPriceValue: string;
  ctaText: string;
  ctaSub: string;
}

export function PriceComparison() {
  const [sliderPos, setSliderPos] = useState(50);
  const [data, setData] = useState<PriceData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/price-comparison").then((r) => r.json()).then(setData);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const d = data || {
    leftImage: "",
    leftTitle: "普通零售 / 门店拿货",
    leftDesc: "层层中间商加价，陈列成本高，补一箱货都觉得贵。",
    leftBadge: "零售价格",
    leftPriceLabel: "同样花 29.9",
    leftPriceValue: "结算后拿到的是单件高价",
    rightImage: "",
    rightTitle: "鑫安零食博物馆 · 仓库直发",
    rightDesc: "一手源头拿货，口味、包装和补货节奏都更适合长期卖。",
    rightBadge: "批发价",
    rightPriceLabel: "同样花 29.9",
    rightPriceValue: "拿到的是整箱或更低单价",
    ctaText: "联系客户拿批发价",
    ctaSub: "适合想做零食摊、便利货架、团购补货的人。",
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <span className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          价格对比
        </span>
        <h2 className="mt-3 text-2xl font-black text-dark sm:text-3xl">别把中间商的利润，误认成你的成本</h2>
        <p className="mt-2 text-sm text-dark/50">左右拖动中间滑块，看同样预算在两种渠道里能拿到什么。</p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
        onClick={(e) => handleMove(e.clientX)}
        className="relative h-[320px] w-full select-none overflow-hidden rounded-[2rem] border border-white/60 shadow-2xl shadow-dark/10 sm:h-[400px] cursor-ew-resize"
      >
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#ca7f2b] to-[#efb25a] p-6 text-white sm:p-10">
          {d.rightImage && (
            <Image
              src={d.rightImage}
              alt="鑫安批发"
              fill
              sizes="100vw"
              className="object-cover opacity-45"
              unoptimized
            />
          )}
          <div className="relative z-10 self-end text-right">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              {d.rightTitle}
            </span>
            <h3 className="mt-2 flex items-center justify-end gap-2 text-3xl font-black sm:text-5xl">
              <Truck size={36} />
              {d.rightBadge}
            </h3>
            <p className="mt-1 max-w-[220px] text-sm opacity-90">{d.rightDesc}</p>
          </div>
          <div className="relative z-10 self-end text-right">
            <p className="text-xs opacity-70">{d.rightPriceLabel}</p>
            <p className="text-2xl font-extrabold text-yellow-200 sm:text-3xl">{d.rightPriceValue}</p>
          </div>
        </div>

        <div
          className="absolute inset-y-0 left-0 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#26303a] to-[#10161b] p-6 text-zinc-300 sm:p-10"
          style={{ width: `${sliderPos}%` }}
        >
          {d.leftImage && (
            <Image
              src={d.leftImage}
              alt="普通零售"
              fill
              sizes="100vw"
              className="object-cover opacity-35"
              unoptimized
            />
          )}
          <div className="relative z-10 w-[320px] sm:w-[400px]">
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold">{d.leftTitle}</span>
            <h3 className="mt-2 flex items-center gap-2 text-3xl font-black text-white sm:text-5xl">
              <ShoppingBag size={36} />
              {d.leftBadge}
            </h3>
            <p className="mt-1 max-w-[220px] text-sm opacity-75">{d.leftDesc}</p>
          </div>
          <div className="relative z-10 w-[320px] sm:w-[400px]">
            <p className="text-xs opacity-60">{d.leftPriceLabel}</p>
            <p className="text-xl font-extrabold text-zinc-400 line-through sm:text-2xl">
              {d.leftPriceValue}
            </p>
          </div>
        </div>

        <div
          className="absolute inset-y-0 z-20 w-1 bg-white shadow-xl"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-amber-500 bg-white text-dark shadow-2xl">
            <ArrowLeftRight size={16} className="text-amber-600" />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <motion.button
          onClick={() => window.dispatchEvent(new CustomEvent("open-customer-service"))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer rounded-2xl bg-dark px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-dark/10 transition hover:bg-dark/90 sm:text-base"
        >
          {d.ctaText}
        </motion.button>
        <p className="mt-2 text-xs text-dark/30">{d.ctaSub}</p>
      </div>
    </section>
  );
}
