export const dynamic = "force-dynamic";

import { getSnacks } from "@/lib/data";
import { LeaderboardClient } from "./LeaderboardClient";

export const metadata = {
  title: "红黑榜 | 零食博物馆",
  description: "无限回购红榜 vs 避雷踩坑黑榜 — 零食博物馆权威测评",
};

export default function LeaderboardPage() {
  const snacks = getSnacks();
  return <LeaderboardClient snacks={snacks} />;
}
