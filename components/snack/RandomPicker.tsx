"use client";

import { useState, useCallback } from "react";
import { Snack } from "@/lib/snacks";
import { RatingStars } from "./RatingStars";
import { X, RefreshCw } from "lucide-react";

interface RandomPickerProps {
  snacks: Snack[];
  onClose: () => void;
}

export function RandomPicker({ snacks, onClose }: RandomPickerProps) {
  const [selected, setSelected] = useState<Snack | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const pickRandom = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setShowCard(false);
    setTimeout(() => {
      const random = snacks[Math.floor(Math.random() * snacks.length)];
      setSelected(random);
      setSpinning(false);
      setShowCard(true);
    }, 600);
  }, [spinning, snacks]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
      <div className="glass-heavy w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-dark/30 hover:text-dark/60">
          <X size={20} />
        </button>
        <div className="text-center mb-6">
          <p className="text-4xl mb-2">{spinning ? "🎰" : showCard ? "✨" : "🎲"}</p>
          <h3 className="text-xl font-extrabold gradient-text">
            {spinning ? "正在抽取..." : showCard ? "就选它了！" : "不知道吃啥？"}
          </h3>
        </div>

        {spinning ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-4xl animate-bounce mb-2">🍿</div>
            <div className="text-4xl animate-bounce mb-2" style={{ animationDelay: "0.15s" }}>🍬</div>
            <div className="text-4xl animate-bounce" style={{ animationDelay: "0.3s" }}>🥤</div>
          </div>
        ) : selected && showCard ? (
          <div className="glass p-5 mb-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-light/40 via-accent/20 to-pink/20 flex items-center justify-center text-3xl shrink-0">🍪</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-dark/40">{selected.brand}</span>
                </div>
                <h4 className="font-extrabold text-dark text-lg leading-tight mb-1">{selected.name}</h4>
                <p className="text-sm text-dark/50 mb-2">{selected.subtitle}</p>
                <RatingStars rating={selected.rating} size="sm" label="口感评分" />
                <p className="text-xs text-dark/40 mt-2 line-clamp-2">{selected.review}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex gap-3">
          <button onClick={pickRandom} disabled={spinning}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3
              bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl
              shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30
              transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
            {selected ? <><RefreshCw size={16} />再来一个</> : "开始抽取 🎰"}
          </button>
        </div>
      </div>
    </div>
  );
}
