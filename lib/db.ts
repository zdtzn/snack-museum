import fs from "fs";
import path from "path";
import { Snack } from "./snacks";

const DATA_PATH = path.join(process.cwd(), "data", "snacks.json");

export interface SnackStore {
  snacks: Snack[];
}

/** 读取所有零食 */
export function readSnacks(): Snack[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  const store: SnackStore = JSON.parse(raw);
  return store.snacks;
}

/** 写入所有零食 */
export function writeSnacks(snacks: Snack[]): void {
  const store: SnackStore = { snacks };
  fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), "utf-8");
}
