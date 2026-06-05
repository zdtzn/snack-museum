import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "price-comparison.json");

export async function GET() {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return Response.json(JSON.parse(raw));
}

export async function POST(req: Request) {
  const body = await req.json();
  fs.writeFileSync(dataPath, JSON.stringify(body, null, 2), "utf-8");
  return Response.json({ ok: true });
}
