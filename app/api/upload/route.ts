import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

function signWithSha1(message: string, secret: string): Promise<string> {
  // Edge 兼容的 SHA-1 HMAC
  const enc = new TextEncoder();
  return crypto.subtle
    .importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"]
    )
    .then((key) => crypto.subtle.sign("HMAC", key, enc.encode(message)))
    .then((buf) => {
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    });
}

export async function POST(request: NextRequest) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary 未配置" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "仅支持 JPG/PNG/WebP/GIF" }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "图片不能超过 10MB" }, { status: 400 });
  }

  // 校验文件头（magic bytes），防止伪造 Content-Type 上传非图片
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
  const isPng =
    head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47;
  const isGif = head[0] === 0x47 && head[1] === 0x49 && head[2] === 0x46; // GIF
  const isWebp =
    head[0] === 0x52 && head[1] === 0x49 && head[2] === 0x46 && head[3] === 0x46 && // RIFF
    head[8] === 0x57 && head[9] === 0x45 && head[10] === 0x42 && head[11] === 0x50; // WEBP
  if (!isJpeg && !isPng && !isGif && !isWebp) {
    return NextResponse.json({ error: "文件内容不是有效图片" }, { status: 400 });
  }

  // 使用签名上传（signed upload）：timestamp + signature + api_key
  // 不再使用 upload_preset，避免与签名上传冲突
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = await signWithSha1(
    `timestamp=${timestamp}`,
    apiSecret
  );

  const uploadForm = new FormData();
  uploadForm.append("file", file);
  uploadForm.append("api_key", apiKey);
  uploadForm.append("timestamp", timestamp);
  uploadForm.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: uploadForm }
  );
  const data = await res.json();

  if (data.secure_url) {
    return NextResponse.json({ url: data.secure_url });
  }
  return NextResponse.json(
    { error: data.error?.message || "上传失败" },
    { status: 500 }
  );
}
