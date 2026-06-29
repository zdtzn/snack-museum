"use client";

import Link from "next/link";
import Image from "next/image";
import { Snack, SnackCategory, CATEGORY_EMOJIS } from "@/lib/snacks";
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
      className="group overflow-hidden rounded-3xl border border-dark/10 bg-white shadow-sm shadow-dark/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-dark/10 cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={(e) => e.currentTarget.classList.remove("ring-2", "ring-primary/50")}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Link href={`/snack/${snack.id}`} className="block h-full">
        <div className="relative h-52 overflow-hidden bg-[#f5efe6]">
          {snack.image ? (
            <Image
              src={snack.image}
              alt={snack.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
              {CATEGORY_EMOJIS[snack.category as SnackCategory] || "🍪"}
            </div>
          )}
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-dark shadow-sm">
            {snack.brand}
          </div>
          <div className="absolute bottom-4 right-4 rounded-full bg-dark/90 px-3 py-1 text-xs font-bold text-white shadow-sm">
            {snack.tags[0] || "精选"}
          </div>
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black leading-tight text-dark transition-colors group-hover:text-primary">
                {snack.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-dark/50 line-clamp-1">{snack.subtitle}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-black text-primary">
              {snack.rating.toFixed(1)}
            </span>
          </div>
          <RatingStars rating={snack.rating} size="sm" label="口感评分" showNumber={false} />
          <p className="mt-3 text-sm leading-6 text-dark/60 line-clamp-2">
            {snack.review}
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-dark/10 pt-4">
            <span className="text-xs font-bold text-dark/40">拖动卡片可试喂右下角</span>
            <span className="text-sm font-black text-dark transition group-hover:text-primary">查看详情</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
