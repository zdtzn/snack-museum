export const dynamic = "force-dynamic";

import { getSnacks } from "@/lib/data";
import { RandomClient } from "./RandomClient";

export default function RandomPage() {
  const snacks = getSnacks();
  return <RandomClient snacks={snacks} />;
}
