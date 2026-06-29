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

  // 从 API 读取数据
  useEffect(() => {
    fetch("/api/price-comparison").then(r => r.json()).then(setData);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  // 加载中或使用默认值
  const d = data || {
    leftImage: "", leftTitle: "普通超市 / 街边便利店",
    leftDesc: "层层中间商加价，货架租金贵，随便抓两包就超预算",
    leftBadge: "就几包...", leftPriceLabel: "同样花 ¥29.9",
    leftPriceValue: "零售价刚好抓饱一小袋 🛍️",
    rightImage: "", rightTitle: "鑫安好物优选 · 仓库直发",
    rightDesc: "一手源头批发价，各种辣条、果冻、火鸡面塞满大纸箱",
    rightBadge: "一整箱！", rightPriceLabel: "同样花 ¥29.9",
    rightPriceValue: "拿走约 3.5 斤重货 📦",
    ctaText: "🚀 拒绝刺客！直接加客服微信拿批发价",
    ctaSub: "一件也是批发价 · 五千平大仓库无需担心缺货",
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* 区块头部文案 */}
      <div className="text-center mb-8">
        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
          20年线下老批发店的底气
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-dark mt-2">
          别再给中间商送钱了！
        </h2>
        <p className="text-sm text-dark/50 mt-1">
          左右拖动中间的滑块，看看同样的预算在我们这能拿多少 🤫
        </p>
      </div>

      {/* 滑动对比核心容器 */}
      <div
        ref={containerRef}
        onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
        onClick={(e) => handleMove(e.clientX)}
        className="relative w-full h-[320px] sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 select-none cursor-ew-resize"
      >

        {/* ===== 右侧底图：鑫安批发 ===== */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 flex flex-col justify-between p-6 sm:p-10 text-white">
          {d.rightImage && (
            <Image src={d.rightImage} alt="鑫安批发" fill sizes="(min-width: 640px) 100vw, 100vw" className="object-cover opacity-50" unoptimized />
          )}
          <div className="self-end text-right relative z-10">
            <span className="bg-white/20 backdrop-blur-sm text-xs px-3 py-1 rounded-full font-bold">
              {d.rightTitle}
            </span>
            <h3 className="text-3xl sm:text-5xl font-black mt-2 flex items-center justify-end gap-2">
              <Truck size={36} className="animate-bounce" /> {d.rightBadge}
            </h3>
            <p className="text-sm opacity-90 mt-1 max-w-[200px] ml-auto">{d.rightDesc}</p>
          </div>
          <div className="self-end text-right relative z-10">
            <p className="text-xs opacity-70">{d.rightPriceLabel}</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-yellow-300">{d.rightPriceValue}</p>
          </div>
        </div>

        {/* ===== 左侧浮层：普通零售 ===== */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-br from-zinc-700 to-zinc-900 flex flex-col justify-between p-6 sm:p-10 text-zinc-300 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          {d.leftImage && (
            <Image src={d.leftImage} alt="普通零售" fill sizes="(min-width: 640px) 100vw, 100vw" className="object-cover opacity-40" unoptimized />
          )}
          <div className="w-[320px] sm:w-[400px] relative z-10">
            <span className="bg-black/20 text-xs px-3 py-1 rounded-full font-bold">
              {d.leftTitle}
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white mt-2 flex items-center gap-2">
              <ShoppingBag size={36} /> {d.leftBadge}
            </h3>
            <p className="text-sm opacity-70 mt-1 max-w-[200px]">{d.leftDesc}</p>
          </div>
          <div className="w-[320px] sm:w-[400px] relative z-10">
            <p className="text-xs opacity-60">{d.leftPriceLabel}</p>
            <p className="text-xl sm:text-2xl font-extrabold text-zinc-400 line-through">{d.leftPriceValue}</p>
          </div>
        </div>

        {/* ===== 中间滑动隔离线 ===== */}
        <div
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 shadow-xl"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white text-dark rounded-full shadow-2xl flex items-center justify-center border-4 border-amber-500 z-30 transition-transform active:scale-110">
            <ArrowLeftRight size={16} className="text-amber-600" />
          </div>
        </div>

      </div>

      {/* 底部 CTA */}
      <div className="mt-6 text-center">
        <motion.button
          onClick={() => window.dispatchEvent(new CustomEvent("open-customer-service"))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-dark text-white rounded-2xl font-bold shadow-lg shadow-dark/10 hover:bg-dark/90 transition-all cursor-pointer text-sm sm:text-base"
        >
          {d.ctaText}
        </motion.button>
        <p className="text-xs text-dark/30 mt-2">{d.ctaSub}</p>
      </div>
    </section>
  );
}
