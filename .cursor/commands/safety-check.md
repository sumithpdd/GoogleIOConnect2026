# Safety Check

Scan the repo before any push. This project may be public on GitHub.

Report a short pass/fail table:

1. **Service account keys**: `git check-ignore` on `*firebase-adminsdk*.json` and `serviceAccountKey*.json`; `git ls-files` must not list them.
2. **Env files**: `.env.local` must not be tracked; only `.env.example` with placeholders may be committed.
3. **`.cursorignore`**: present and lists `.env.local`, `*-firebase-adminsdk-*.json`.
4. **Tracked secrets scan** (exclude `node_modules`, `.git`, ignored files):
   - `AIzaSy` in source (not `.env.example` placeholders)
   - `BEGIN PRIVATE KEY`, `"private_key":`
   - Hardcoded `GOOGLE_GEMINI_API_KEY=` values that are not placeholders
5. **API logging**: no `console.log` of base64 photo prefixes, env vars, or full prompts in `src/app/api/` — use `devLog` from `src/lib/safe-log.ts`.
6. **Admin cookie**: login route must set signed token via `createAdminSessionToken`, not raw `ADMIN_SECRET`.
7. **Docs**: No real credentials in tracked `docs/` or markdown (placeholders only).

Optional script: `powershell -File scripts/check-secrets.ps1`

If anything fails, stop and list exact paths. Do not push until fixed. See `docs/SECURITY.md`.
