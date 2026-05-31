"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MascotMood = "idle" | "excited" | "spicy" | "cool" | "happy" | "full";

interface MascotProps {
  mood?: MascotMood;
}

const idleBubbles = [
  "好饿呀，快拖个零食喂我！",
  "嘴巴寂寞了...把零食丢进来~",
  "喵呜~有没有好吃的？",
  "肚子咕噜噜叫了…求投喂！",
];

export function Mascot({ mood = "idle" }: MascotProps) {
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [blinking, setBlinking] = useState(false);

  // 气泡轮播
  useEffect(() => {
    const t = setInterval(() => {
      setBubbleVisible(false);
      setTimeout(() => { setBubbleIndex((i) => (i + 1) % idleBubbles.length); setBubbleVisible(true); }, 500);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // 眨眼
  useEffect(() => {
    const t = setInterval(() => { setBlinking(true); setTimeout(() => setBlinking(false), 150); }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative" style={{ width: 130, height: 150 }}>
      {/* 气泡提示 */}
      <AnimatePresence>
        {bubbleVisible && mood === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white text-dark text-[11px] 
              px-3 py-2 rounded-2xl shadow-lg whitespace-nowrap z-10 font-medium"
            style={{ minWidth: 160, textAlign: "center" }}
          >
            💬 {idleBubbles[bubbleIndex]}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 "拖零食喂我" 闪烁标签 */}
      {mood === "idle" && (
        <motion.div
          className="absolute top-24 -right-6 bg-primary text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg whitespace-nowrap z-10"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          👈 拖我
        </motion.div>
      )}

      {/* 猫身体 */}
      <motion.div
        className="relative select-none"
        animate={
          mood === "spicy"
            ? { x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.5 } }
            : mood === "cool"
            ? { rotate: [0, 10, -10, 10, 0], transition: { duration: 1.2 } }
            : mood === "happy"
            ? { y: [0, -8, 0, -8, 0], transition: { duration: 0.5 } }
            : { y: [0, -2, 0], transition: { duration: 2.5, repeat: Infinity } }
        }
      >
        {/* 猫头 */}
        <div className="w-28 h-24 rounded-[50%_50%_45%_45%] bg-[#FFE0B2] border-3 border-[#FFB347]/30 relative">

          {/* 耳朵 */}
          <div className="absolute -top-5 -left-1 w-7 h-10 bg-[#FFB347] rounded-t-full rotate-[-22deg] z-[-1]" />
          <div className="absolute -top-3 left-1 w-5 h-7 bg-[#FFCC80] rounded-t-full rotate-[-22deg]" />
          <div className="absolute -top-5 -right-1 w-7 h-10 bg-[#FFB347] rounded-t-full rotate-[22deg] z-[-1]" />
          <div className="absolute -top-3 right-1 w-5 h-7 bg-[#FFCC80] rounded-t-full rotate-[22deg]" />

          {/* 眼睛 */}
          <div className="flex gap-3 justify-center pt-4">
            <div className="w-7 h-8 bg-white rounded-[45%] border border-dark/15 overflow-hidden relative">
              <div className="w-3.5 h-4 bg-dark rounded-full absolute" style={{ top: 3, left: 5 }} />
              {blinking && <div className="absolute inset-0 bg-white" />}
            </div>
            <div className="w-7 h-8 bg-white rounded-[45%] border border-dark/15 overflow-hidden relative">
              <div className="w-3.5 h-4 bg-dark rounded-full absolute" style={{ top: 3, left: 5 }} />
              {blinking && <div className="absolute inset-0 bg-white" />}
            </div>
          </div>

          {/* 鼻子 */}
          <div className="flex justify-center -mt-0.5">
            <div className="w-3 h-2.5 bg-[#FF8A80] rounded-full" />
          </div>

          {/* 嘴 - 张大准备吃东西 */}
          <div className="flex justify-center gap-3 mt-0.5">
            <div className="text-sm">(</div>
            <motion.div
              className="w-8 h-6 bg-[#FF5252]/20 rounded-b-2xl border-b-2 border-[#FF5252]/30 flex items-center justify-center"
              animate={mood === "idle" ? { scaleY: [1, 1.3, 1] } : { scaleY: 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-[10px]">😛</span>
            </motion.div>
            <div className="text-sm">)</div>
          </div>

          {/* 胡须 */}
          <div className="absolute left-2 top-12 flex gap-0.5">
            <div className="w-5 h-0.5 bg-dark/20 rotate-[-5deg]" />
            <div className="w-4 h-0.5 bg-dark/20 rotate-[3deg]" />
          </div>
          <div className="absolute right-2 top-12 flex gap-0.5">
            <div className="w-4 h-0.5 bg-dark/20 rotate-[-3deg]" />
            <div className="w-5 h-0.5 bg-dark/20 rotate-[5deg]" />
          </div>
        </div>

        {/* 身体 */}
        <div className="w-24 h-16 bg-[#FFE0B2] rounded-b-[50%] mx-auto -mt-1 border border-[#FFB347]/20" />

        {/* 特效 */}
        {mood === "spicy" && (
          <>
            <motion.div className="absolute -top-6 left-1/2 -translate-x-1/2 text-base" animate={{ y: [0, -12, 0], opacity: [0,1,0] }} transition={{ duration: 1.2, repeat: Infinity }}>💨</motion.div>
            <motion.div className="absolute top-0 left-0 text-lg" animate={{ scale: [1,1.4,1] }} transition={{ duration: 0.4, repeat: Infinity }}>🔥</motion.div>
            <motion.div className="absolute top-0 right-0 text-lg" animate={{ scale: [1,1.4,1] }} transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}>🔥</motion.div>
          </>
        )}
        {mood === "cool" && (
          <>
            <motion.div className="absolute top-4 -right-1 text-xs" animate={{ y: [0,18], opacity: [1,0] }} transition={{ duration: 1, repeat: Infinity }}>💧</motion.div>
            <motion.div className="absolute top-1 right-3 text-xs" animate={{ y: [0,22], opacity: [1,0] }} transition={{ duration: 1.3, repeat: Infinity, delay: 0.3 }}>💧</motion.div>
          </>
        )}
        {mood === "happy" && (
          <motion.div className="absolute -top-3 right-1 text-sm" animate={{ y: [-3,-20], opacity: [1,0], scale: [1,1.5] }} transition={{ duration: 1.5, repeat: Infinity }}>💕</motion.div>
        )}
      </motion.div>
    </div>
  );
}
