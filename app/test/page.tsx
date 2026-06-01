import type { Metadata } from "next";
import { TestClient } from "./TestClient";

export const metadata: Metadata = {
  title: "测测你的零食人格 | 鑫安好物优选",
  description:
    "5道灵魂拷问，揭开你藏在味蕾深处的真实性格！果冻、辣条、火鸡面、膨化、速食——你是哪一款？测完还能领福利~",
};

export default function TestPage() {
  return <TestClient />;
}
