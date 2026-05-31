"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mascot } from "./Mascot";

type Mood = "idle" | "hungry" | "excited" | "spicy" | "cool" | "happy" | "full";

interface FeedZoneProps {
  onFeedComplete?: (snackName: string) => void;
}

/** 根据零食标签判断动画类型 */
function getMoodFromTag(tag: string): Mood {
  const spicy = ["麻辣", "辣条", "辣", "怪味", "火鸡"];
  const cool = ["果冻", "饮料", "果干", "草莓", "水果", "椰子", "地瓜干", "葡萄"];
  if (spicy.some((t) => tag.includes(t))) return "spicy";
  if (cool.some((t) => tag.includes(t))) return "cool";
  return "happy";
}

export function FeedZone({ onFeedComplete }: FeedZoneProps) {
  const [mood, setMood] = useState<Mood>("idle");
  const [draggingOver, setDraggingOver] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [fedSnack, setFedSnack] = useState("");

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDraggingOver(false);
      const data = e.dataTransfer.getData("text/plain");
      if (!data) return;

      try {
        const snack = JSON.parse(data);
        const newMood = getMoodFromTag(snack.tag || "");

        // 播放"啊呜"音效（简单的 Web Audio API）
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.2);
        } catch {}

        setMood(newMood);
        setFedSnack(snack.name || "零食");

        // 表情持续 2 秒后弹窗
        setTimeout(() => {
          setMood("full");
          setTimeout(() => {
            setShowResults(true);
            if (onFeedComplete) onFeedComplete(snack.name || "");
          }, 800);
        }, 2000);
      } catch {}
    },
    [onFeedComplete]
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 投喂目标区域 */}
      <div
        className={`relative transition-all duration-300 ${
          draggingOver ? "scale-110" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDraggingOver(true);
        }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
      >
        {/* 投喂光环 */}
        {draggingOver && (
          <motion.div
            className="absolute inset-0 rounded-full border-3 border-dashed border-primary animate-spin"
            style={{ width: 140, height: 140, left: -10, top: -10 }}
          />
        )}

        {/* 拖入提示 */}
        <AnimatePresence>
          {draggingOver && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-primary whitespace-nowrap"
            >
              👆 丢进嘴里！
            </motion.div>
          )}
        </AnimatePresence>

        <Mascot mood={mood} />
      </div>

      {/* 投喂结果弹窗 */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-full mb-4 right-0 w-72 glass-heavy p-5 rounded-2xl shadow-2xl"
          >
            <div className="text-center">
              <p className="text-4xl mb-2">🍖</p>
              <p className="text-sm font-bold text-dark mb-1">呜哇！太好吃了！</p>
              <p className="text-xs text-dark/50 mb-3">
                <span className="font-bold text-primary">{fedSnack}</span> 是本店大爆款！
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setMood("idle");
                  }}
                  className="flex-1 px-3 py-2 bg-white/70 text-dark text-xs font-bold rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors"
                >
                  再喂一个
                </button>
                <button
                  onClick={() => {
                    setShowResults(false);
                    // 触发客服弹窗 - 通过全局事件
                    window.dispatchEvent(new CustomEvent("open-customer-service"));
                  }}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all"
                >
                  💬 咨询拿货
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
