"use client";

import { RedList, BlackList } from "@/components/leaderboard/RedBlackList";
import { Snack } from "@/lib/snacks";

interface Props {
  snacks: Snack[];
}

export function LeaderboardClient({ snacks }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-4xl mb-3">📊</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">
          零食红黑榜
        </h1>
        <p className="text-dark/50 max-w-lg mx-auto text-sm">
          左边是测评后「无限回购」的红榜零食，右边是实测「避雷踩坑」的黑榜名单。
          所有评分均为主观实测，仅供参考。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RedList snacks={snacks} />
        <BlackList snacks={snacks} />
      </div>
    </div>
  );
}
