# Deploy to Vercel

Production deployment for **GoogleIOConnect2026** — GitHub + Vercel + your Firebase project.

**Team dashboard:** [vercel.com/sumithpdds-projects](https://vercel.com/sumithpdds-projects)

---

## Pre-deployment checklist

- [ ] Code on GitHub: [github.com/sumithpdd/GoogleIOConnect2026](https://github.com/sumithpdd/GoogleIOConnect2026)
- [ ] `.env.local` and `*-firebase-adminsdk-*.json` **not** committed (see `.gitignore`)
- [ ] `.env.example` has placeholder values only
- [ ] `npm run build` succeeds locally
- [ ] Branding PNGs present in `public/branding/`

---

## 1. Connect GitHub to Vercel

1. Open [vercel.com/sumithpdds-projects](https://vercel.com/sumithpdds-projects)
2. **Add New → Project → Import Git Repository**
3. Select **GoogleIOConnect2026** (or paste `https://github.com/sumithpdd/GoogleIOConnect2026.git`)
4. Framework: **Next.js** (auto-detected) → **Deploy**

First deploy may fail until environment variables are set — that is normal.

---

## 2. Environment variables

**Settings → Environment Variables** — add for **Production**, **Preview**, and **Development**.

### Required

```env
APP_PRESET=io-connect-2026

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

GOOGLE_GEMINI_API_KEY=
ADMIN_SECRET=
```

Copy values from local `.env.local` — **never commit them**.

**`FIREBASE_PRIVATE_KEY` on Vercel:** paste the full key with `\n` for newlines, or use `FIREBASE_SERVICE_ACCOUNT_KEY` (entire JSON) if you prefer.

### Recommended for public production

```env
API_SECRET=
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

### Optional — LinkedIn OAuth share

```env
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_REDIRECT_URI=https://your-project.vercel.app/api/linkedin/callback
NEXT_PUBLIC_ENABLE_LINKEDIN_SHARE=true
```

### Optional — Gemini model override

```env
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image
```

**Sources:**

- Firebase: [console.firebase.google.com](https://console.firebase.google.com)
- Gemini: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

Full Firebase guide: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

---

## 3. Deploy

### Automatic (recommended)

```bash
git push origin main
```

Vercel rebuilds on every push to `main`. Preview URLs are created for pull requests.

### Manual (CLI)

If corporate proxy blocks the CLI, use the dashboard instead.

```bash
npm i -g vercel
vercel login
vercel link
vercel --prod
```

---

## 4. Verify deployment

1. **Vercel dashboard** — deployment status **Ready**
2. **Live site** — complete booth flow: input → camera → scenes → result
3. **Gallery** — photo appears at `/gallery`
4. **Composited image** — person blended into Berlin scene; GDG sticker **top-right**
5. **Social post** — I/O Connect Berlin copy with GDG London hashtags
6. **Admin** — `/admin` with `ADMIN_SECRET`
7. **Firebase** — add Vercel domain to **Authentication → Authorized domains** if using client auth

---

## 5. Update & redeploy

```bash
npm run dev          # test locally
npm run build        # verify build
git add .
git commit -m "Your message"
git push origin main # Vercel auto-deploys
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | Check Vercel build logs; run `npm run build` locally |
| Env var not applied | Redeploy after adding vars in dashboard |
| Gallery empty / upload fails | Confirm client and server Firebase vars use the **same** project |
| Gemini errors | Verify `GOOGLE_GEMINI_API_KEY` and quota |
| API 401 | Set `API_SECRET` on Vercel; session bootstrap uses `/api/auth/session` |
| Missing logos | Ensure `public/branding/*.png` committed to repo |
| CLI SSL error | Use dashboard import; fix corporate proxy / certs locally |

Runtime logs: Vercel → Project → Deployments → select deployment → **Logs**

More fixes: [04_TROUBLESHOOTING.md](./04_TROUBLESHOOTING.md)

---

## Security reminder

- ✅ Secrets live in Vercel env vars — not in git
- ❌ Never commit `.env.local` or `*-firebase-adminsdk-*.json`
- ❌ Never log `GOOGLE_GEMINI_API_KEY` or private keys

See [06_API_SECURITY.md](./06_API_SECURITY.md)

---

## Useful URLs

| Feature | URL |
|---------|-----|
| Team dashboard | https://vercel.com/sumithpdds-projects |
| GitHub repo | https://github.com/sumithpdd/GoogleIOConnect2026 |
| Firebase console | https://console.firebase.google.com |
| Event RSVP | https://rsvp.withgoogle.com/events/ioconnect-berlin-2026 |

After import, your project URL will appear in the Vercel dashboard (e.g. `https://google-io-connect2026.vercel.app`).

---

## Production checklist

- [ ] All required env vars set on Vercel
- [ ] `APP_PRESET=io-connect-2026`
- [ ] `NEXT_PUBLIC_APP_URL` matches live domain
- [ ] End-to-end photo flow tested on live URL
- [ ] Print/download tested
- [ ] Mobile / kiosk browser tested
- [ ] `ADMIN_SECRET` shared only with event staff

---

**Next:** Push to `main` → Vercel deploys → test the live booth before event day.
