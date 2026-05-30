export const dynamic = "force-dynamic";

import { getSnacks } from "@/lib/data";
import { LeaderboardClient } from "./LeaderboardClient";

export const metadata = {
  title: "好物精选 | 鑫安好物优选",
};

export default function LeaderboardPage() {
  const snacks = getSnacks();
  return <LeaderboardClient snacks={snacks} />;
}
