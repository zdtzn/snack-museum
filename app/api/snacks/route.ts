import { NextRequest, NextResponse } from "next/server";
import { readSnacks, writeSnacks } from "@/lib/db";
import { Snack } from "@/lib/snacks";
import { validateSnackInput, sanitizeSnack } from "@/lib/validate";

// GET /api/snacks — 获取所有零食
export async function GET() {
  const snacks = readSnacks();
  return NextResponse.json({ snacks });
}

// POST /api/snacks — 新增零食
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "无效的 JSON" }, { status: 400 });
  }

  const validation = validateSnackInput(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const safeInput = sanitizeSnack(body as Record<string, unknown>);
  const snacks = readSnacks();

  // 生成 id（中文拼音简化 + 时间戳）
  const id =
    safeInput.name
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "-")
      .slice(0, 20)
      .toLowerCase() +
    "-" +
    Date.now().toString(36);

  const newSnack: Snack = { ...safeInput, id };
  snacks.push(newSnack);
  writeSnacks(snacks);

  return NextResponse.json({ snack: newSnack }, { status: 201 });
}
