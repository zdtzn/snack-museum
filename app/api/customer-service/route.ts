import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { validateObject } from "@/lib/validate";
import { persistDataFile } from "@/lib/persist";

const DATA_PATH = path.join(process.cwd(), "data", "customer-service.json");

export async function GET() {
  return NextResponse.json(JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")));
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

  const serialized = JSON.stringify(body, null, 2);
  if (serialized.length > 500 * 1024) {
    return NextResponse.json({ error: "数据过大（超过 500KB）" }, { status: 413 });
  }

  const { warning } = await persistDataFile("customer-service.json", serialized);
  return NextResponse.json({ success: true, warning });
}
