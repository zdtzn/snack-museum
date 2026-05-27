import { NextRequest, NextResponse } from "next/server";
import { readSnacks, writeSnacks } from "@/lib/db";

// PUT /api/snacks/[id] — 编辑零食
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const snacks = readSnacks();

  const index = snacks.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  snacks[index] = { ...snacks[index], ...body, id }; // 保持 id 不变
  writeSnacks(snacks);

  return NextResponse.json({ snack: snacks[index] });
}

// DELETE /api/snacks/[id] — 删除零食
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const snacks = readSnacks();

  const filtered = snacks.filter((s) => s.id !== id);
  if (filtered.length === snacks.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  writeSnacks(filtered);
  return NextResponse.json({ success: true });
}
