"use client";

import { useState } from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryNav } from "@/components/home/CategoryNav";
import { SnackCardList } from "@/components/home/SnackCardList";
import { RandomPicker } from "@/components/snack/RandomPicker";
import { Snack, SnackCategory } from "@/lib/snacks";

interface Props {
  snacks: Snack[];
}

export function HomeClient({ snacks }: Props) {
  const [activeCategory, setActiveCategory] = useState<
    SnackCategory | undefined
  >(undefined);
  const [showPicker, setShowPicker] = useState(false);

  const filteredSnacks = activeCategory
    ? snacks.filter((s) => s.category === activeCategory)
    : snacks;

  return (
    <>
      <HeroBanner />
      <CategoryNav
        active={activeCategory}
        onSelect={(cat) =>
          setActiveCategory(activeCategory === cat ? undefined : cat)
        }
      />
      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="glass p-6 sm:p-8 text-center">
          <p className="text-4xl mb-3">🎲</p>
          <h3 className="text-xl font-extrabold text-dark mb-2">今天吃什么？</h3>
          <p className="text-sm text-dark/50 mb-4">
            选择困难症犯了？让零食之神替你决定！
          </p>
          <button
            onClick={() => setShowPicker(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full
              shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30
              transition-all hover:scale-105 active:scale-95"
          >
            随机抽取一款零食 🎰
          </button>
        </div>
      </section>
      <SnackCardList snacks={filteredSnacks} />
      {showPicker && (
        <RandomPicker snacks={snacks} onClose={() => setShowPicker(false)} />
      )}
    </>
  );
}
