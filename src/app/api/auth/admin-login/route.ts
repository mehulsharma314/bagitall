import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { timingSafeEqual, createHash } from "crypto";

// In-memory rate limiter (resets on server restart — sufficient for admin)
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function timingSafeCompare(a: string, b: string): boolean {
  try {
    // Pad to same length to prevent length-based timing attacks
    const hashA = createHash("sha256").update(a).digest();
    const hashB = createHash("sha256").update(b).digest();
    return timingSafeEqual(hashA, hashB);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const now = Date.now();

  // Check rate limit
  const record = failedAttempts.get(ip);
  if (record && record.lockedUntil > now) {
    const remaining = Math.ceil((record.lockedUntil - now) / 60000);
    return NextResponse.json(
      { error: "Too many attempts" },
      { status: 429, headers: { "Retry-After": String(remaining * 60) } }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { username = "", password = "" } = body;

  const expectedUsername = process.env.ADMIN_USERNAME ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";

  // Timing-safe credential comparison
  const usernameMatch = timingSafeCompare(username, expectedUsername);
  const passwordMatch = timingSafeCompare(password, expectedPassword);
  const valid = usernameMatch && passwordMatch;

  if (!valid) {
    // Track failed attempts
    const current = failedAttempts.get(ip) ?? { count: 0, lockedUntil: 0 };
    current.count += 1;
    if (current.count >= MAX_ATTEMPTS) {
      current.lockedUntil = now + LOCKOUT_MS;
      current.count = 0;
    }
    failedAttempts.set(ip, current);

    // Generic error — do not hint which field is wrong
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // ✓ Valid — reset failed attempts
  failedAttempts.delete(ip);

  // Sign JWT
  const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  // Set httpOnly secure cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set("bia_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return response;
}
