import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow /bia-control root (login page) — no auth required
  if (pathname === "/bia-control") {
    return NextResponse.next();
  }

  // All other /bia-control/* sub-routes require valid JWT
  const token = request.cookies.get("bia_session")?.value;

  if (!token) {
    // Return 404 — do NOT hint that a login page exists
    return new NextResponse(null, { status: 404 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    // Invalid/expired token — return 404 (not a redirect to login)
    return new NextResponse(null, { status: 404 });
  }
}

export const config = {
  // :path+ means ONE OR MORE path segments (excludes the root /bia-control itself)
  matcher: ["/bia-control/:path+"],
};
