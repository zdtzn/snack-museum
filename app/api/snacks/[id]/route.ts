import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readSnacks, writeSnacks } from "@/lib/db";
import { validateSnackInput, sanitizeSnack } from "@/lib/validate";

// PUT /api/snacks/[id] — 编辑零食
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

  const index = snacks.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  snacks[index] = { ...snacks[index], ...safeInput, id }; // 保持 id 不变
  const { warning } = await writeSnacks(snacks);

  revalidatePath("/");
  revalidatePath("/leaderboard");
  revalidatePath(`/snack/${id}`);

  return NextResponse.json({ snack: snacks[index], warning });
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

  const { warning } = await writeSnacks(filtered);

  revalidatePath("/");
  revalidatePath("/leaderboard");
  revalidatePath(`/snack/${id}`);

  return NextResponse.json({ success: true, warning });
}
