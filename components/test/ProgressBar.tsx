"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number; // 0-based
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = ((current) / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-dark/40">
          第 {Math.min(current, total)} / {total} 题
        </span>
        <span className="text-xs font-bold text-primary">{Math.round(pct)}%</span>
      </div>
      <div className="h-2 bg-white/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
