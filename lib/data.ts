import { readSnacks } from "./db";
import { Snack } from "./snacks";

/** 服务端获取零食数据 */
export function getSnacks(): Snack[] {
  return readSnacks();
}
