import fs from "fs";
import path from "path";
import { Snack } from "./snacks";

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

/** 写入所有零食 */
export function writeSnacks(snacks: Snack[]): void {
  const store: SnackStore = { snacks };
  const tmpPath = DATA_PATH + ".tmp";
  // 先写临时文件再原子重命名，防止写一半进程崩溃导致数据损坏
  fs.writeFileSync(tmpPath, JSON.stringify(store, null, 2), "utf-8");
  fs.renameSync(tmpPath, DATA_PATH);
}
