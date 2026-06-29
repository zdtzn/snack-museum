export const revalidate = 60;

import { getSnacks } from "@/lib/data";
import { LeaderboardClient } from "./LeaderboardClient";

export const metadata = {
  title: "好物精选 | 鑫安好物优选",
  description: "按口感评分排序的精选零食榜单，每一款都经过严格筛选。",
};

export default function LeaderboardPage() {
  const snacks = getSnacks();
  return <LeaderboardClient snacks={snacks} />;
}
