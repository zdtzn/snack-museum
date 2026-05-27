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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dark/30 hover:text-dark/60 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="text-center mb-6">
          <p className="text-4xl mb-2">
            {spinning ? "🎰" : showCard ? "✨" : "🎲"}
          </p>
          <h3 className="text-xl font-extrabold gradient-text">
            {spinning ? "正在抽取..." : showCard ? "今天就是它了！" : "今天吃什么？"}
          </h3>
          {!selected && !spinning && (
            <p className="text-sm text-dark/40 mt-1">
              点击下方按钮，让零食之神替你决定
            </p>
          )}
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
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-light/40 via-accent/20 to-pink/20 flex items-center justify-center text-3xl shrink-0">
                🍪
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${selected.isRecommended ? "bg-pink/15 text-pink" : "bg-dark/10 text-dark/40"}`}>
                    {selected.isRecommended ? "🔴 红榜" : "⚫ 黑榜"}
                  </span>
                  <span className="text-xs text-dark/40">{selected.brand}</span>
                </div>
                <h4 className="font-extrabold text-dark text-lg leading-tight mb-1">{selected.name}</h4>
                <p className="text-sm text-dark/50 mb-2">{selected.subtitle}</p>
                <RatingStars rating={selected.rating} size="sm" />
                <p className="text-xs text-dark/40 mt-2 line-clamp-2">{selected.review}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex gap-3">
          <button
            onClick={pickRandom}
            disabled={spinning}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3
              bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl
              shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30
              transition-all hover:scale-[1.02] active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selected ? <><RefreshCw size={16} />再来一个</> : "开始抽取 🎰"}
          </button>
          {selected && (
            <a
              href={selected.purchaseLink || "#"}
              target="_blank"
              className="flex items-center justify-center px-5 py-3
                bg-white/70 text-dark font-bold rounded-xl border border-primary/20
                hover:bg-primary/10 transition-all text-sm"
            >
              去购买 🛒
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
