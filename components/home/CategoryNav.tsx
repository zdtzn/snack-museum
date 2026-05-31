"use client";

import { CATEGORY_EMOJIS, CATEGORY_LABELS, SnackCategory } from "@/lib/snacks";

const categories: SnackCategory[] = [
  "puffed",
  "candy",
  "spicy-snack",
  "instant-food",
  "beverage",
  "healthy",
];

interface CategoryNavProps {
  active?: SnackCategory;
  onSelect?: (category: SnackCategory) => void;
}

export function CategoryNav({ active, onSelect }: CategoryNavProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-20">
      <div className="glass-heavy p-4 flex flex-wrap justify-center gap-2 sm:gap-3">
        {/* "全部"按钮 */}
        <button
          onClick={() => onSelect?.(active || "puffed")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all ${
            !active
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-white/60 text-dark/50 hover:bg-primary/10 hover:text-primary"
          }`}
        >
          🍪 全部
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect?.(cat)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              active === cat
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-white/60 text-dark/50 hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
    </section>
  );
}
