---
name: io-connect-security
description: Audit this repo for leaked secrets, unsafe logging, and git hygiene before push or deploy. Use when changing env handling, admin auth, API routes, docs, or when the user asks about secrets, credentials, or safety checks.
---

# I/O Connect — Security Audit

Run before pushing, opening a PR, or after touching auth/env/API code.

## Quick checklist

1. **Git index** — `git ls-files` must not include `.env.local`, `*-firebase-adminsdk-*.json`, or `serviceAccountKey*.json`.
2. **Gitignore** — `git check-ignore -v` on local secret files should match `.gitignore` rules.
3. **Source scan** — no hardcoded `AIzaSy…`, `BEGIN PRIVATE KEY`, or literal API keys in `src/`.
4. **Logging** — API routes use `devLog`/`devWarn` from `src/lib/safe-log.ts`; never log base64 photos, env values, or full prompts in production.
5. **Responses** — JSON errors use generic messages via `publicErrorMessage()`; no `details: error` blobs.
6. **Admin** — `createAdminSessionToken()` for cookies; never set cookie value to raw `ADMIN_SECRET`.
7. **Docs** — placeholders only (`YOUR_KEY_HERE`, `AIzaSy...` truncated examples in setup guides).

## Commands (Windows)

```powershell
cd c:\code\react\GoogleIOConnect2026
git check-ignore -v .env.local
git ls-files | Select-String firebase-adminsdk
powershell -File scripts/check-secrets.ps1
```

## If secrets were exposed

1. Rotate **Firebase** service account key in Google Cloud Console.
2. Rotate **GOOGLE_GEMINI_API_KEY** in Google AI Studio.
3. Change **ADMIN_SECRET** and **API_SECRET** on Vercel + local `.env.local`.
4. Never paste `.env.local` or JSON key files into chat or commits.

## Reference

- `docs/SECURITY.md`, `docs/06_API_SECURITY.md`
- `.cursor/rules/security.mdc`
- `.cursor/commands/safety-check.md`
