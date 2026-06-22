import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'io_admin_session';
const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

export function getAdminSecret(): string | undefined {
  return process.env.ADMIN_SECRET?.trim();
}

function safeEqual(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/** Issue a signed admin session cookie value (never store raw ADMIN_SECRET). */
export function createAdminSessionToken(secret: string): string {
  const expires = Date.now() + ADMIN_SESSION_TTL_MS;
  const payload = `admin:${expires}`;
  const sig = createHmac('sha256', secret).update(payload).digest('hex');
  return `${expires}.${sig}`;
}

export function verifyAdminSessionToken(token: string, secret: string): boolean {
  const [expiresStr, sig] = token.split('.');
  if (!expiresStr || !sig) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const expected = createHmac('sha256', secret)
    .update(`admin:${expires}`)
    .digest('hex');

  return safeEqual(sig, expected);
}

/** Verify admin from signed cookie or Authorization bearer (raw secret for scripts only). */
export function verifyAdminRequest(request: NextRequest): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;

  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const bearer = authHeader.slice(7).trim();
    if (safeEqual(bearer, secret)) return true;
    if (verifyAdminSessionToken(bearer, secret)) return true;
  }

  const cookieToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (cookieToken && verifyAdminSessionToken(cookieToken, secret)) return true;

  return false;
}

export async function verifyAdminFromCookies(): Promise<boolean> {
  const secret = getAdminSecret();
  if (!secret) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifyAdminSessionToken(token, secret);
}

export function unauthorizedAdminResponse() {
  return Response.json(
    { success: false, error: 'Unauthorized — admin access required' },
    { status: 401 }
  );
}
