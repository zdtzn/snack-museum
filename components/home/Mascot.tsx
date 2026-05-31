"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MascotMood = "idle" | "hungry" | "excited" | "spicy" | "cool" | "happy" | "full";

interface MascotProps {
  mood?: MascotMood;
  onReset?: () => void;
}

const moodConfig: Record<MascotMood, { emoji: string; color: string; label: string }> = {
  idle: { emoji: "😺", color: "#FFB347", label: "待机中" },
  hungry: { emoji: "😿", color: "#FF8C69", label: "好饿..." },
  excited: { emoji: "😻", color: "#FF6B81", label: "想吃!" },
  spicy: { emoji: "🥵", color: "#FF4444", label: "好辣!!" },
  cool: { emoji: "😎", color: "#7BED9F", label: "清爽!" },
  happy: { emoji: "🥳", color: "#FFD700", label: "美味!" },
  full: { emoji: "😋", color: "#FFB347", label: "满足!" },
};

const idleBubbles = [
  "今天又是搬砖的一天，好饿呀…",
  "嘴巴寂寞了，快投喂我！",
  "喵~有没有好吃的？",
  "肚子咕噜噜叫了…",
];

export function Mascot({ mood = "idle", onReset }: MascotProps) {
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [eyesLooking, setEyesLooking] = useState("center");
  const config = moodConfig[mood];

  // 气泡轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleVisible(false);
      setTimeout(() => {
        setBubbleIndex((i) => (i + 1) % idleBubbles.length);
        setBubbleVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 眼球随机转动
  useEffect(() => {
    const interval = setInterval(() => {
      const dirs = ["left", "right", "center", "up"];
      setEyesLooking(dirs[Math.floor(Math.random() * dirs.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative" style={{ width: 120, height: 140 }}>
      {/* 气泡 */}
      <AnimatePresence>
        {bubbleVisible && mood === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/95 text-dark text-[10px] 
              px-3 py-2 rounded-2xl shadow-lg whitespace-nowrap z-10"
            style={{ minWidth: 140, textAlign: "center" }}
          >
            {idleBubbles[bubbleIndex]}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 猫身体 */}
      <motion.div
        className="relative cursor-pointer select-none"
        animate={
          mood === "spicy"
            ? { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } }
            : mood === "cool"
            ? { rotate: [0, 15, -15, 15, 0], transition: { duration: 1 } }
            : mood === "happy"
            ? { y: [0, -10, 0, -10, 0], transition: { duration: 0.5 } }
            : { y: [0, -2, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
        }
      >
        {/* 猫脸 */}
        <div
          className="w-28 h-28 rounded-full relative flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 40% 40%, #ffe0c0 0%, ${config.color}40 100%)`,
            border: "3px solid rgba(255,179,71,0.3)",
          }}
        >
          {/* 耳朵 */}
          <div className="absolute -top-4 -left-1 w-8 h-10 bg-[#FFB347] rounded-t-full rotate-[-25deg]" />
          <div className="absolute -top-4 -right-1 w-8 h-10 bg-[#FFB347] rounded-t-full rotate-[25deg]" />

          {/* 眼睛 */}
          <div className="flex gap-4 mt-1">
            <div className="w-6 h-6 bg-white rounded-full relative overflow-hidden border border-dark/20">
              <div
                className="w-3 h-3 bg-dark rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: eyesLooking === "left" ? "2px" : eyesLooking === "right" ? "8px" : eyesLooking === "up" ? "4px" : "4px",
                  top: eyesLooking === "up" ? "1px" : "6px",
                }}
              />
            </div>
            <div className="w-6 h-6 bg-white rounded-full relative overflow-hidden border border-dark/20">
              <div
                className="w-3 h-3 bg-dark rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: eyesLooking === "left" ? "2px" : eyesLooking === "right" ? "8px" : eyesLooking === "up" ? "4px" : "4px",
                  top: eyesLooking === "up" ? "1px" : "6px",
                }}
              />
            </div>
          </div>

          {/* 嘴巴 */}
          <div className="absolute bottom-5 text-center text-lg">
            {mood === "spicy" ? "👅" : mood === "happy" || mood === "full" ? "😋" : "👄"}
          </div>

          {/* 脸颊 */}
          {mood === "spicy" && (
            <motion.div
              className="absolute bottom-6 left-3 text-lg"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🔥
            </motion.div>
          )}

          {/* 冒烟 */}
          {mood === "spicy" && (
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm"
              animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💨
            </motion.div>
          )}

          {/* 水滴 */}
          {mood === "cool" && (
            <>
              <motion.div
                className="absolute -right-1 top-3 text-xs"
                animate={{ y: [0, 20], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💧
              </motion.div>
              <motion.div
                className="absolute right-3 top-1 text-xs"
                animate={{ y: [0, 25], opacity: [1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              >
                💧
              </motion.div>
            </>
          )}

          {/* 爱心 */}
          {mood === "happy" && (
            <motion.div
              className="absolute -top-4 right-0 text-sm"
              animate={{ y: [-5, -25], opacity: [1, 0], scale: [1, 1.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💕
            </motion.div>
          )}
        </div>

        {/* 脚 */}
        <div className="flex justify-center gap-6 mt-1">
          <div className="w-6 h-4 bg-[#FFB347]/40 rounded-full" />
          <div className="w-6 h-4 bg-[#FFB347]/40 rounded-full" />
        </div>
      </motion.div>

      {/* 情绪标签 */}
      <motion.div
        className="text-center mt-2 text-xs font-bold"
        style={{ color: config.color }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {config.emoji} {config.label}
      </motion.div>
    </div>
  );
}
