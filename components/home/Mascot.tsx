"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MascotMood = "idle" | "excited" | "spicy" | "cool" | "happy" | "full";

// 每种情绪对应的猫emoji + 身上特效
const moodEmojis: Record<MascotMood, { base: string; effect?: string; label: string; st: string }> = {
  idle:   { base: "🐱", label: "来喂我呀~", st: "bg-white/70 text-dark" },
  excited: { base: "😻", label: "想吃想吃!", st: "bg-pink/20 text-pink" },
  spicy:  { base: "🐱", effect: "🥵", label: "好辣!!", st: "bg-red-100 text-red-500" },
  cool:   { base: "🐱", effect: "😎", label: "清爽!", st: "bg-green-100 text-green-600" },
  happy:  { base: "😺", label: "好吃!", st: "bg-yellow-100 text-yellow-600" },
  full:   { base: "😸", label: "满足!", st: "bg-orange-100 text-primary" },
};

const bubbles = [
  "喵~拖个零食丢过来！",
  "好饿好饿…求投喂",
  "把零食拖到我嘴里！",
  "咕噜咕噜…肚子叫了",
];

export function Mascot({ mood = "idle" }: { mood?: MascotMood }) {
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const m = moodEmojis[mood];

  // 气泡轮播
  useEffect(() => {
    if (mood !== "idle") return;
    const t = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => { setBubbleIdx(i => (i + 1) % bubbles.length); setShowBubble(true); }, 500);
    }, 4000);
    return () => clearInterval(t);
  }, [mood]);

  return (
    <div className="relative flex flex-col items-center">
      {/* 对话气泡 */}
      <AnimatePresence>
        {showBubble && mood === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white text-dark text-xs font-medium px-3 py-2 rounded-2xl shadow-lg mb-2 whitespace-nowrap max-w-[180px] text-center"
          >
            💬 {bubbles[bubbleIdx]}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 -mt-1.5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* "拖这里"提示标签 */}
      {mood === "idle" && (
        <motion.div
          className="bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow mb-2"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          👆 拖零食到这里
        </motion.div>
      )}

      {/* 猫本体 */}
      <motion.div
        className="relative"
        animate={
          mood === "spicy"
            ? { x: [0, -3, 3, -3, 3, 0], transition: { duration: 0.4 } }
            : mood === "happy"
            ? { y: [0, -6, 0, -6, 0], transition: { duration: 0.5 } }
            : mood === "cool"
            ? { rotate: [0, 8, -8, 8, 0], transition: { duration: 1 } }
            : { y: [0, -3, 0], transition: { duration: 2, repeat: Infinity } }
        }
      >
        <div className="text-8xl select-none cursor-pointer">
          {mood === "spicy" ? "😾" : m.base}
        </div>

        {/* 特效浮层 */}
        {mood === "spicy" && (
          <>
            <div className="absolute top-0 -left-2 text-2xl animate-bounce">🔥</div>
            <div className="absolute top-0 -right-2 text-2xl animate-bounce">🔥</div>
          </>
        )}
        {mood === "cool" && (
          <>
            <div className="absolute -top-1 -right-2 text-lg">💧</div>
          </>
        )}
        {mood === "happy" && (
          <div className="absolute -top-2 right-0 text-lg">💕</div>
        )}
      </motion.div>

      {/* 状态标签 */}
      <motion.div
        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-1 ${m.st}`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {m.label}
      </motion.div>
    </div>
  );
}
