import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { validateObject } from "@/lib/validate";
import { persistDataFile } from "@/lib/persist";

const DATA_PATH = path.join(process.cwd(), "data", "about-data.json");

export async function GET() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "无效的 JSON" }, { status: 400 });
  }

  const validation = validateObject(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // 限制 JSON 大小（防超大 payload）
  const serialized = JSON.stringify(body, null, 2);
  if (serialized.length > 200 * 1024) {
    return NextResponse.json({ error: "数据过大（超过 200KB）" }, { status: 413 });
  }

  const { warning } = await persistDataFile("about-data.json", serialized);
  revalidatePath("/about");
  return NextResponse.json({ success: true, warning });
}
