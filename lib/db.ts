import fs from "fs";
import path from "path";
import { Snack } from "./snacks";
import { persistDataFile } from "./persist";

const DATA_PATH = path.join(process.cwd(), "data", "snacks.json");

export interface SnackStore {
  snacks: Snack[];
}

/** 读取所有零食 */
export function readSnacks(): Snack[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const store: SnackStore = JSON.parse(raw);
    return store.snacks ?? [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      // 数据文件不存在时返回空数组，避免崩溃
      return [];
    }
    throw err;
  }
}

/** 写入所有零食：原子写本地 + 回写 GitHub（若已配置） */
export async function writeSnacks(
  snacks: Snack[]
): Promise<{ committed: boolean; warning?: string }> {
  const store: SnackStore = { snacks };
  return persistDataFile("snacks.json", JSON.stringify(store, null, 2));
}
