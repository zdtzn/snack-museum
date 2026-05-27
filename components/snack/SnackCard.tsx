import Link from "next/link";
import { Snack } from "@/lib/snacks";
import { RatingStars } from "./RatingStars";

interface SnackCardProps {
  snack: Snack;
}

export function SnackCard({ snack }: SnackCardProps) {
  return (
    <Link href={`/snack/${snack.id}`}>
      <article className="glass card-hover overflow-hidden cursor-pointer group">
        {/* 图片区域 - 渐变色占位 */}
        <div className="relative h-48 bg-gradient-to-br from-primary-light/40 via-accent/20 to-pink/20 flex items-center justify-center overflow-hidden">
          <div className="text-6xl group-hover:scale-110 transition-transform duration-500">
            {getEmoji(snack.category)}
          </div>
          {/* 推荐/避雷角标 */}
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${
              snack.isRecommended
                ? "bg-pink/20 text-pink"
                : "bg-dark/10 text-dark/50"
            }`}
          >
            {snack.isRecommended ? "🔴 红榜" : "⚫ 黑榜"}
          </span>
        </div>

        {/* 内容区 */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium">
              {snack.tags[0]}
            </span>
            <span className="text-xs text-dark/40">{snack.brand}</span>
          </div>

          <h3 className="text-lg font-bold text-dark mb-1 group-hover:text-primary transition-colors">
            {snack.name}
          </h3>
          <p className="text-sm text-dark/50 mb-3 line-clamp-1">
            {snack.subtitle}
          </p>

          <RatingStars rating={snack.rating} size="sm" />

          <p className="mt-2 text-sm text-dark/60 line-clamp-2 leading-relaxed">
            {snack.review}
          </p>
        </div>
      </article>
    </Link>
  );
}

function getEmoji(category: string): string {
  const map: Record<string, string> = {
    puffed: "🍿",
    candy: "🍬",
    nuts: "🥜",
    "dried-fruit": "🍑",
    beverage: "🥤",
    baked: "🥐",
    healthy: "🥗",
  };
  return map[category] || "🍪";
}
