"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mascot } from "./MascotEmoji";

type Mood = "idle" | "excited" | "spicy" | "cool" | "happy" | "full";

interface FeedZoneProps {
  onFeedComplete?: (snackName: string) => void;
  snackNames?: string[];
}

function getMoodFromTag(tag: string): Mood {
  const spicy = ["辣", "辣条", "麻辣", "重口", "火鸡面", "泡面"];
  const cool = ["果冻", "果干", "草莓", "饮品", "咖啡"];
  if (spicy.some((t) => tag.includes(t))) return "spicy";
  if (cool.some((t) => tag.includes(t))) return "cool";
  return "happy";
}

export function FeedZone({ onFeedComplete, snackNames = [] }: FeedZoneProps) {
  const [mood, setMood] = useState<Mood>("idle");
  const [draggingOver, setDraggingOver] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [fedSnack, setFedSnack] = useState("");
  const [isMobile] = useState(
    () => typeof navigator !== "undefined" && /Mobi|Android|iPhone/i.test(navigator.userAgent)
  );
  const [showPicker, setShowPicker] = useState(false);

  const feedSnack = useCallback(
    (name: string, tag: string) => {
      const newMood = getMoodFromTag(tag);
      setMood(newMood);
      setFedSnack(name);
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
          onFeedComplete?.(name);
        }, 1000);
      }, 2500);
    },
    [onFeedComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDraggingOver(false);
      const data = e.dataTransfer.getData("text/plain");
      if (!data) return;
      try {
        const snack = JSON.parse(data);
        feedSnack(snack.name || "零食", snack.tag || "");
      } catch {}
    },
    [feedSnack]
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div
        className={`relative rounded-[1.75rem] border border-white/80 bg-white/78 p-2 shadow-2xl shadow-dark/10 backdrop-blur transition-all duration-300 ${
          draggingOver ? "scale-105 ring-4 ring-primary/20" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDraggingOver(true);
        }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
        onClick={() => {
          if (isMobile) setShowPicker(true);
        }}
      >
        {draggingOver && (
          <motion.div
            className="absolute -inset-3 rounded-[2rem] border-2 border-dashed border-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}
        <AnimatePresence>
          {draggingOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-dark px-3 py-1.5 text-xs font-extrabold text-white shadow-lg"
            >
              松手试吃
            </motion.div>
          )}
        </AnimatePresence>
        <Mascot mood={mood} />
      </div>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[110] flex items-end justify-center bg-dark/40 p-4 backdrop-blur-sm sm:items-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowPicker(false);
            }}
          >
            <div className="max-h-[70vh] w-full max-w-sm overflow-y-auto rounded-3xl border border-white/80 bg-white p-5 shadow-2xl">
              <div className="mb-4 text-center">
                <p className="text-xl">😋</p>
                <h3 className="text-base font-extrabold text-dark">选一个零食试喂</h3>
                <p className="mt-1 text-xs text-dark/40">手机端可以直接点选</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {snackNames.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setShowPicker(false);
                      feedSnack(name, name);
                    }}
                    className="rounded-2xl border border-dark/10 bg-cream p-3 text-left text-xs font-bold text-dark transition-colors hover:bg-primary/10 truncate"
                  >
                    {name.length > 12 ? name.slice(0, 12) + "..." : name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full right-0 mb-4 w-72 rounded-3xl border border-white/80 bg-white p-5 shadow-2xl shadow-dark/10"
          >
            <div className="text-center">
              <p className="mb-2 text-4xl">😋</p>
              <p className="mb-1 text-sm font-bold text-dark">试吃反馈：值得关注</p>
              <p className="mb-3 text-xs text-dark/50">
                <span className="font-bold text-primary">{fedSnack}</span> 适合加入今日候选清单。
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setMood("idle");
                  }}
                  className="flex-1 rounded-xl border border-dark/10 bg-cream px-3 py-2 text-xs font-bold text-dark hover:bg-primary/10"
                >
                  再试一次
                </button>
                <button
                  onClick={() => {
                    setShowResults(false);
                    window.dispatchEvent(new CustomEvent("open-customer-service"));
                  }}
                  className="flex-1 rounded-xl bg-dark px-3 py-2 text-xs font-bold text-white shadow-lg hover:bg-dark/90"
                >
                  咨询拿货
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
