"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const snacks = ["🍿", "🍬", "🌶", "🍜", "🥤", "🍪", "🧃", "🍩"];
const phrases = [
  "正在分析你的零食基因…",
  "正在搅拌口感数据…",
  "正在匹配人格模型…",
  "正在计算辣度耐受值…",
  "正在扫描甜度偏好…",
  "正在评估脆度系数…",
];

export function MixingLoader() {
  const [phrase, setPhrase] = useState(phrases[0]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => c + 1);
      setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    }, 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* 旋转的零食环 */}
      <div className="relative w-48 h-48 mb-8">
        {/* 外环 */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* 旋转的零食 */}
        {snacks.map((s, i) => {
          const angle = (i / snacks.length) * Math.PI * 2;
          const r = 72;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{ left: "50%", top: "50%" }}
              animate={{
                x,
                y,
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                x: { duration: 0 },
                y: { duration: 0 },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: {
                  duration: 1.5 + (i % 3) * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                },
              }}
            >
              {s}
            </motion.div>
          );
        })}

        {/* 中心 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <span className="text-6xl">
            {snacks[count % snacks.length]}
          </span>
        </motion.div>
      </div>

      {/* 提示文字 */}
      <motion.p
        key={phrase}
        className="text-lg font-extrabold gradient-text text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {phrase}
      </motion.p>
      <motion.p className="text-xs text-dark/30 mt-2">稍等片刻，马上出结果~</motion.p>
    </div>
  );
}
