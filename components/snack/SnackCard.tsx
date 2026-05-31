import Link from "next/link";
import { Snack } from "@/lib/snacks";
import { RatingStars } from "./RatingStars";

interface SnackCardProps {
  snack: Snack;
}

export function SnackCard({ snack }: SnackCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ name: snack.name, tag: snack.tags[0] || "" })
    );
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("ring-2", "ring-primary/50");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("ring-2", "ring-primary/50");
  };

  return (
    <article
      className="glass card-hover overflow-hidden cursor-grab active:cursor-grabbing group"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={(e) => e.currentTarget.classList.remove("ring-2", "ring-primary/50")}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Link href={`/snack/${snack.id}`}>
        <div className="relative h-48 bg-gradient-to-br from-primary-light/40 via-accent/20 to-pink/20 flex items-center justify-center overflow-hidden">
          <div className="text-6xl group-hover:scale-110 transition-transform duration-500">
            {getEmoji(snack.category)}
          </div>
        </div>
        <div className="p-5" onClick={(e) => e.preventDefault()}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium">
              {snack.tags[0]}
            </span>
            <span className="text-xs text-dark/40">{snack.brand}</span>
          </div>
          <h3 className="text-lg font-bold text-dark mb-1 group-hover:text-primary transition-colors">
            {snack.name}
          </h3>
          <p className="text-sm text-dark/50 mb-3 line-clamp-1">{snack.subtitle}</p>
          <RatingStars rating={snack.rating} size="sm" label="口感评分" />
          <p className="mt-2 text-sm text-dark/60 line-clamp-2 leading-relaxed">
            {snack.review} <span className="text-xs text-primary/50">← 拖到右下角喂猫</span>
          </p>
        </div>
      </Link>
    </article>
  );
}

function getEmoji(category: string): string {
  const map: Record<string, string> = {
    puffed: "🍿", candy: "🍬", "spicy-snack": "🌶",
    "instant-food": "🍜", beverage: "🥤", healthy: "🥗",
  };
  return map[category] || "🍪";
}
