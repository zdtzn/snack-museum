import { Snack } from "@/lib/snacks";
import { RatingStars } from "@/components/snack/RatingStars";

interface ListProps {
  snacks: Snack[];
}

export function RedList({ snacks }: ListProps) {
  const redList = snacks
    .filter((s) => s.isRecommended)
    .sort((a, b) => b.rating - a.rating);

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">🔴</span>
        <h2 className="text-xl font-extrabold text-dark">无限回购 · 红榜</h2>
      </div>
      <div className="space-y-4">
        {redList.map((snack, i) => (
          <RankCard key={snack.id} snack={snack} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}

export function BlackList({ snacks }: ListProps) {
  const blackList = snacks
    .filter((s) => !s.isRecommended)
    .sort((a, b) => a.rating - b.rating);

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">⚫</span>
        <h2 className="text-xl font-extrabold text-dark">避雷踩坑 · 黑榜</h2>
      </div>
      <div className="space-y-4">
        {blackList.map((snack, i) => (
          <RankCard key={snack.id} snack={snack} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}

function RankCard({ snack, rank }: { snack: Snack; rank: number }) {
  return (
    <div className="glass card-hover p-4 flex items-start gap-4">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold shrink-0 ${
          snack.isRecommended
            ? "bg-pink/15 text-pink"
            : "bg-dark/10 text-dark/40"
        }`}
      >
        {rank}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-bold text-dark">{snack.name}</h3>
          <span className="text-xs text-dark/30">{snack.brand}</span>
        </div>
        <p className="text-sm text-dark/50 mb-2">{snack.subtitle}</p>
        <RatingStars rating={snack.rating} size="sm" />
        <p className="text-xs text-dark/40 mt-1.5 line-clamp-2">{snack.review}</p>
      </div>

      <div className="text-center shrink-0">
        <div
          className={`text-2xl font-extrabold ${
            snack.isRecommended ? "gradient-text" : "text-dark/40"
          }`}
        >
          {snack.rating.toFixed(1)}
        </div>
        <div className="text-xs text-dark/30">总分</div>
      </div>
    </div>
  );
}
