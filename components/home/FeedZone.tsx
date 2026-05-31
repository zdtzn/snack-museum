"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mascot3D as Mascot } from "./Mascot3D";

type Mood = "idle" | "excited" | "spicy" | "cool" | "happy" | "full";

interface FeedZoneProps {
  onFeedComplete?: (snackName: string) => void;
}

function getMoodFromTag(tag: string): Mood {
  const spicy = ["麻辣", "辣条", "辣", "怪味", "火鸡", "泡面"];
  const cool = ["果冻", "果干", "草莓", "椰子", "饮品", "饮料", "咖啡"];
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
        setMood(newMood);
        setFedSnack(snack.name || "零食");

        // "啊呜"音效
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(700, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(500, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.15);
        } catch {}

        setTimeout(() => {
          setMood("full");
          setTimeout(() => {
            setShowResults(true);
            if (onFeedComplete) onFeedComplete(snack.name || "");
          }, 1000);
        }, 2500);
      } catch {}
    },
    [onFeedComplete]
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 入门提示大字的 - 首次3秒后消失 */}
      <AnimatePresence>
        {mood === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-52 -left-44 bg-white text-dark text-xs px-4 py-2.5 rounded-2xl shadow-xl text-center z-20 whitespace-nowrap"
          >
            👆 <b>拖拽零食卡片</b>
            <br />丢到猫猫嘴里试试！
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`relative transition-all duration-300 ${draggingOver ? "scale-110" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
      >
        {draggingOver && (
          <motion.div
            className="absolute -inset-4 rounded-full border-3 border-dashed border-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}

        <AnimatePresence>
          {draggingOver && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-extrabold text-primary whitespace-nowrap">
              🐱 丢进来！丢进来！
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
                <span className="font-bold text-primary">{fedSnack}</span> 是本店爆款！
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowResults(false); setMood("idle"); }}
                  className="flex-1 px-3 py-2 bg-white/70 text-dark text-xs font-bold rounded-xl border border-primary/20 hover:bg-primary/5"
                >
                  再喂一个
                </button>
                <button
                  onClick={() => {
                    setShowResults(false);
                    window.dispatchEvent(new CustomEvent("open-customer-service"));
                  }}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
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
