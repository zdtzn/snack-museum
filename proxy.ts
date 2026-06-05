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
    credentials?.username === adminUsername &&
    credentials.password === adminPassword
  ) {
    return NextResponse.next();
  }

  return unauthorized();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
