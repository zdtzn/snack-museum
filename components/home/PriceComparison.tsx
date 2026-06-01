"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ShoppingBag, Truck } from "lucide-react";

export function PriceComparison() {
  // 控制滑块百分比位置 (0 - 100)
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理拖动/点击逻辑
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
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

        {/* ===== 右侧底图：鑫安批发（量大管饱） ===== */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 flex flex-col justify-between p-6 sm:p-10 text-white">
          <div className="self-end text-right">
            <span className="bg-white/20 backdrop-blur-sm text-xs px-3 py-1 rounded-full font-bold">
              鑫安好物优选 · 仓库直发
            </span>
            <h3 className="text-3xl sm:text-5xl font-black mt-2 flex items-center justify-end gap-2">
              <Truck size={36} className="animate-bounce" /> 一整箱！
            </h3>
            <p className="text-sm opacity-90 mt-1 max-w-[200px] ml-auto">
              一手源头批发价，各种辣条、果冻、火鸡面塞满大纸箱
            </p>
          </div>
          <div className="self-end text-right">
            <p className="text-xs opacity-70">同样花 ¥29.9</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-yellow-300">拿走约 3.5 斤重货 📦</p>
          </div>
        </div>

        {/* ===== 左侧浮层：普通零售（心痛干瘪） ===== */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-br from-zinc-700 to-zinc-900 flex flex-col justify-between p-6 sm:p-10 text-zinc-300 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          {/* 保证左侧文字宽度固定，不随着滑动被挤压压缩 */}
          <div className="w-[320px] sm:w-[400px]">
            <span className="bg-black/20 text-xs px-3 py-1 rounded-full font-bold">
              普通超市 / 街边便利店
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white mt-2 flex items-center gap-2">
              <ShoppingBag size={36} /> 就几包...
            </h3>
            <p className="text-sm opacity-70 mt-1 max-w-[200px]">
              层层中间商加价，货架租金贵，随便抓两包就超预算
            </p>
          </div>
          <div className="w-[320px] sm:w-[400px]">
            <p className="text-xs opacity-60">同样花 ¥29.9</p>
            <p className="text-xl sm:text-2xl font-extrabold text-zinc-400 line-through">零售价刚好抓饱一小袋 🛍️</p>
          </div>
        </div>

        {/* ===== 中间滑动隔离线与纽扣 ===== */}
        <div
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 shadow-xl"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white text-dark rounded-full shadow-2xl flex items-center justify-center border-4 border-amber-500 z-30 transition-transform active:scale-110">
            <ArrowLeftRight size={16} className="text-amber-600" />
          </div>
        </div>

      </div>

      {/* 底部私域引流动作栏 */}
      <div className="mt-6 text-center">
        <motion.button
          onClick={() => window.dispatchEvent(new CustomEvent("open-customer-service"))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-dark text-white rounded-2xl font-bold shadow-lg shadow-dark/10 hover:bg-dark/90 transition-all cursor-pointer text-sm sm:text-base"
        >
          🚀 拒绝刺客！直接加客服微信拿批发价
        </motion.button>
        <p className="text-xs text-dark/30 mt-2">一件也是批发价 · 五千平大仓库无需担心缺货</p>
      </div>
    </section>
  );
}
