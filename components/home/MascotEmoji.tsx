"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MascotMood = "idle" | "excited" | "spicy" | "cool" | "happy" | "full";

const moodEmojis: Record<MascotMood, { base: string; label: string; st: string }> = {
  idle:   { base: "🐱", label: "试吃官待命", st: "bg-white/80 text-dark" },
  excited: { base: "😻", label: "想吃想吃!", st: "bg-pink/20 text-pink" },
  spicy:  { base: "😾", label: "好辣!!", st: "bg-red-100 text-red-500" },
  cool:   { base: "🐱", label: "清爽~", st: "bg-green-100 text-green-600" },
  happy:  { base: "😺", label: "好吃!", st: "bg-yellow-100 text-yellow-600" },
  full:   { base: "😸", label: "满足!", st: "bg-orange-100 text-primary" },
};

const bubbles = [
  "拖一张卡片给我试吃",
  "我来帮你判断爆款",
  "想知道哪款更适合拿货？",
  "喂我一口，给你反馈",
];

export function Mascot({ mood = "idle" }: { mood?: MascotMood }) {
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const m = moodEmojis[mood];

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
      <AnimatePresence>
        {showBubble && mood === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-2 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-dark shadow-lg shadow-dark/8 whitespace-nowrap"
          >
            {bubbles[bubbleIdx]}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 -mt-1.5" />
          </motion.div>
        )}
      </AnimatePresence>

      {mood === "idle" && (
        <motion.div
          className="mb-2 rounded-full bg-dark px-3 py-1 text-[11px] font-bold text-white shadow"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          拖卡片试吃
        </motion.div>
      )}

      <motion.div
        className="select-none text-6xl sm:text-7xl"
        animate={
          mood === "spicy"
            ? { x: [0, -3, 3, -3, 3, 0], transition: { duration: 0.4 } }
            : mood === "happy"
            ? { y: [0, -6, 0, -6, 0], transition: { duration: 0.5 } }
            : mood === "full"
            ? { y: [0, -3, 0], transition: { duration: 1 }}
            : { y: [0, -3, 0], transition: { duration: 2, repeat: Infinity }}
        }
      >
        {m.base}
      </motion.div>

      {mood === "spicy" && (
        <div className="flex gap-2 -mt-1">
          <span className="text-lg animate-bounce">🔥</span>
          <span className="text-lg animate-bounce" style={{ animationDelay: "0.2s" }}>🔥</span>
        </div>
      )}
      {mood === "cool" && <div className="text-base -mt-1">💧</div>}
      {mood === "happy" && <div className="text-base -mt-1">💕</div>}

      <motion.div
        className={`mt-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${m.st}`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {m.label}
      </motion.div>
    </div>
  );
}
