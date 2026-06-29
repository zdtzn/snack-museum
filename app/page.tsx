export const revalidate = 60;

import { getSnacks } from "@/lib/data";
import { HomeClient } from "./HomeClient";

export default function Home() {
  const snacks = getSnacks();
  return <HomeClient snacks={snacks} />;
}
