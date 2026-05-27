"use client";

import { StarIcon as StarOutline } from "lucide-react";
import { StarIcon as StarFilled } from "lucide-react";

interface RatingStarsProps {
  rating: number; // 0-5
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function RatingStars({
  rating,
  size = "md",
  showNumber = true,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const starSize = sizeMap[size];

  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarFilled
          key={`filled-${i}`}
          className={`${starSize} text-primary fill-primary`}
        />
      ))}
      {hasHalf && (
        <span className="relative">
          <StarOutline className={`${starSize} text-primary/30`} />
          <span className="absolute inset-0 overflow-hidden w-[50%]">
            <StarFilled className={`${starSize} text-primary fill-primary`} />
          </span>
        </span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <StarOutline
          key={`empty-${i}`}
          className={`${starSize} text-primary/30`}
        />
      ))}
      {showNumber && (
        <span className="ml-1.5 text-sm font-semibold text-dark/60">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
