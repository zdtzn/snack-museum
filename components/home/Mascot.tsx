"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type MascotMood = "idle" | "excited" | "spicy" | "cool" | "happy" | "full";

const moodLabels: Record<MascotMood, { label: string; st: string }> = {
  idle:   { label: "来喂我呀~", st: "bg-white/70 text-dark" },
  excited: { label: "想吃想吃!", st: "bg-pink/20 text-pink" },
  spicy:  { label: "好辣!!", st: "bg-red-100 text-red-500" },
  cool:   { label: "清爽~", st: "bg-green-100 text-green-600" },
  happy:  { label: "好吃!", st: "bg-yellow-100 text-yellow-600" },
  full:   { label: "满足!", st: "bg-orange-100 text-primary" },
};

const bubbles = [
  "喵~拖个零食丢过来！",
  "好饿好饿…求投喂",
  "把零食拖到我嘴里~",
  "咕噜咕噜…肚子叫了",
];

export function Mascot({ mood = "idle" }: { mood?: MascotMood }) {
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const m = moodLabels[mood];

  useEffect(() => {
    if (mood !== "idle") return;
    const t = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => { setBubbleIdx(i => (i+1) % bubbles.length); setShowBubble(true); }, 500);
    }, 4000);
    return () => clearInterval(t);
  }, [mood]);

  return (
    <div className="relative flex flex-col items-center">
      {/* 气泡 */}
      <AnimatePresence>
        {showBubble && mood === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white text-dark text-xs font-medium px-3 py-2 rounded-2xl shadow-lg mb-2 whitespace-nowrap"
          >
            💬 {bubbles[bubbleIdx]}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 -mt-1.5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 提示标签 */}
      {mood === "idle" && (
        <motion.div
          className="bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow mb-2"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          👆 拖零食到猫猫身上
        </motion.div>
      )}

      {/* 猫图片 */}
      <motion.div
        className="w-40 h-40 relative cursor-pointer select-none"
        animate={
          mood === "spicy"
            ? { x: [0, -3, 3, -3, 3, 0], y: [0], transition: { duration: 0.4 } }
            : mood === "happy"
            ? { y: [0, -6, 0, -6, 0], transition: { duration: 0.5 } }
            : mood === "full"
            ? { y: [0, -3, 0], transition: { duration: 1 }}
            : { y: [0, -3, 0], transition: { duration: 2, repeat: Infinity }}
        }
      >
        <Image
          src="/mascot.png"
          alt="Mimi's Munchies 猫咪"
          width={160}
          height={160}
          className="object-contain drop-shadow-lg"
          priority
        />

        {/* 特效叠加层 */}
        {mood === "spicy" && (
          <>
            <div className="absolute top-0 -left-1 text-xl animate-bounce">🔥</div>
            <div className="absolute top-0 -right-1 text-xl animate-bounce">🔥</div>
          </>
        )}
        {mood === "cool" && (
          <div className="absolute -top-0 right-0 text-base animate-pulse">💧</div>
        )}
        {mood === "happy" && (
          <div className="absolute -top-1 right-1 text-base animate-pulse">💕</div>
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
