import { NextRequest, NextResponse } from "next/server";
import { readSnacks, writeSnacks } from "@/lib/db";
import { Snack } from "@/lib/snacks";

// GET /api/snacks — 获取所有零食
export async function GET() {
  const snacks = readSnacks();
  return NextResponse.json({ snacks });
}

// POST /api/snacks — 新增零食
export async function POST(request: NextRequest) {
  const body: Omit<Snack, "id"> = await request.json();
  const snacks = readSnacks();

  // 生成 id（中文拼音简化 + 时间戳）
  const id =
    body.name
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "-")
      .slice(0, 20)
      .toLowerCase() +
    "-" +
    Date.now().toString(36);

  const newSnack: Snack = { ...body, id };
  snacks.push(newSnack);
  writeSnacks(snacks);

  return NextResponse.json({ snack: newSnack }, { status: 201 });
}
