import { NextRequest, NextResponse } from "next/server";

const protectedApiPrefixes = [
  "/api/about",
  "/api/customer-service",
  "/api/price-comparison",
  "/api/snacks",
  "/api/upload",
];

function requiresAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return true;
  }

  return (
    request.method !== "GET" &&
    protectedApiPrefixes.some((prefix) => pathname.startsWith(prefix))
  );
}

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Snack Museum Admin", charset="UTF-8"',
    },
  });
}

/** 常量时间字符串比较，避免登录密码被计时攻击探测 */
function safeEqual(a: string, b: string) {
  const enc = new TextEncoder();
  const aBytes = enc.encode(a);
  const bBytes = enc.encode(b);
  // 长度不同直接判否，但仍走完循环以尽量恒定耗时
  const len = Math.max(aBytes.length, bBytes.length);
  let diff = aBytes.length ^ bBytes.length;
  for (let i = 0; i < len; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}

function parseBasicAuth(header: string | null) {
  if (!header?.startsWith("Basic ")) {
    return null;
  }

  const decoded = atob(header.slice("Basic ".length));
  const separator = decoded.indexOf(":");

  if (separator === -1) {
    return null;
  }

  return {
    username: decoded.slice(0, separator),
    password: decoded.slice(separator + 1),
  };
}

export function proxy(request: NextRequest) {
  if (!requiresAuth(request)) {
    return NextResponse.next();
  }

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword =
    process.env.ADMIN_PASSWORD ||
    (process.env.NODE_ENV === "development" ? "admin" : "");

  if (!adminPassword) {
    return new NextResponse("ADMIN_PASSWORD is not configured", { status: 500 });
  }

  const credentials = parseBasicAuth(request.headers.get("authorization"));

  if (
    credentials &&
    safeEqual(credentials.username, adminUsername) &&
    safeEqual(credentials.password, adminPassword)
  ) {
    return NextResponse.next();
  }

  return unauthorized();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
