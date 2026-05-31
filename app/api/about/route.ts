import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "about-data.json");

export async function GET() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  fs.writeFileSync(DATA_PATH, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
