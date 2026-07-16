import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { validateObject } from "@/lib/validate";
import { persistDataFile } from "@/lib/persist";

const dataPath = path.join(process.cwd(), "data", "price-comparison.json");

export async function GET() {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return Response.json(JSON.parse(raw));
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "无效的 JSON" }, { status: 400 });
  }

  const validation = validateObject(body);
  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const serialized = JSON.stringify(body, null, 2);
  if (serialized.length > 100 * 1024) {
    return Response.json({ error: "数据过大（超过 100KB）" }, { status: 413 });
  }

  const { warning } = await persistDataFile("price-comparison.json", serialized);
  revalidatePath("/");
  return Response.json({ ok: true, warning });
}
