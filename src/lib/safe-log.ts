/** Dev-only logging — avoids leaking PII or payload fragments in production logs. */

const isDev = process.env.NODE_ENV === 'development';

export function devLog(...args: unknown[]): void {
  if (isDev) console.log(...args);
}

export function devWarn(...args: unknown[]): void {
  if (isDev) console.warn(...args);
}

/** Safe server error message for JSON responses (never include stack or env). */
export function publicErrorMessage(error: unknown, fallback: string): string {
  if (isDev && error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
