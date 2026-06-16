"use client";

import { CATEGORY_LABELS, SnackCategory } from "@/lib/snacks";

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
  onSelect?: (category?: SnackCategory) => void;
}

export function CategoryNav({ active, onSelect }: CategoryNavProps) {
  return (
    <section className="relative z-20 mx-auto -mt-8 max-w-6xl px-4">
      <div className="rounded-3xl border border-white/80 bg-white/80 p-3 shadow-xl shadow-dark/5 backdrop-blur">
        <div className="mb-3 flex items-center justify-between gap-3 px-2 pt-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">browse</p>
            <h2 className="text-lg font-black text-dark">按口味快速筛选</h2>
          </div>
          <p className="hidden text-sm text-dark/40 sm:block">点一下分类，再点一次返回全部</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {/* "全部"按钮 */}
        <button
          onClick={() => onSelect?.(undefined)}
          className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all ${
            !active
              ? "bg-dark text-white shadow-lg shadow-dark/10"
              : "bg-cream text-dark/55 hover:bg-primary/10 hover:text-primary"
          }`}
        >
          全部精选
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect?.(cat)}
            className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all ${
              active === cat
                ? "bg-dark text-white shadow-lg shadow-dark/10"
                : "bg-cream text-dark/55 hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
        </div>
      </div>
    </section>
  );
}
