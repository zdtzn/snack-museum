"use client";

import { Snack } from "@/lib/snacks";
import { SnackCard } from "@/components/snack/SnackCard";

interface Props {
  snacks: Snack[];
}

export function LeaderboardClient({ snacks }: Props) {
  const sorted = [...snacks].sort((a, b) => b.rating - a.rating);
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-4xl mb-3">🛒</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">好物精选</h1>
        <p className="text-dark/50 max-w-lg mx-auto text-sm">
          按口感评分排序，高分产品优先展示
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((snack) => (
          <SnackCard key={snack.id} snack={snack} />
        ))}
      </div>
    </div>
  );
}
