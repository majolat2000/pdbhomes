import crypto from "crypto";
import { NextRequest } from "next/server";

const AUTH_SECRET =
  process.env.ADMIN_AUTH_SECRET ||
  process.env.PAYSTACK_SECRET_KEY ||
  "pdb-homes-admin-secure-auth-salt-2024";

export interface AdminTokenPayload {
  email: string;
  role: string;
  exp: number; // unix timestamp in ms
}

/**
 * Creates an HMAC-signed token for admin sessions (valid for 7 days).
 */
export function createAdminToken(email: string, role = "ADMIN"): string {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload: AdminTokenPayload = { email, role, exp };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(encodedPayload)
    .digest("base64url");
  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies an HMAC-signed admin token.
 */
export function verifyAdminToken(token: string | null | undefined): AdminTokenPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  try {
    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(encodedPayload)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const payload: AdminTokenPayload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Extracts and validates admin credentials from an incoming Request.
 * Supports:
 * - Authorization: Bearer <token>
 * - x-admin-token: <token>
 * - Cookie: pdb_admin_token=<token>
 */
export function verifyAdminSession(req: NextRequest | Request): AdminTokenPayload | null {
  // 1. Authorization header: "Bearer <token>"
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    const verified = verifyAdminToken(token);
    if (verified) return verified;
  }

  // 2. Custom header: "x-admin-token"
  const customHeader = req.headers.get("x-admin-token");
  if (customHeader) {
    const verified = verifyAdminToken(customHeader);
    if (verified) return verified;
  }

  // 3. Cookie: "pdb_admin_token"
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    const match = cookieHeader.match(/pdb_admin_token=([^;]+)/);
    if (match && match[1]) {
      const verified = verifyAdminToken(match[1]);
      if (verified) return verified;
    }
  }

  return null;
}
