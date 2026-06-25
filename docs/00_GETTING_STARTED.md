# Getting Started — Google I/O Connect Photo Booth

AI photo booth for **Google I/O Connect Berlin 2026**, presented by **GDG London** — Gemini image generation, Firebase gallery, and animated GDG-style UX.

> **Firebase:** Full setup is in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).  
> **Production:** Deploy to Vercel — [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md).

## Prerequisites

- **Node.js** 18+ — [nodejs.org](https://nodejs.org/)
- **npm** 9+ (bundled with Node.js)
- **Git** — [git-scm.com](https://git-scm.com/)
- **Firebase project** with a registered web app (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
- **Gemini API key** — [Google AI Studio](https://aistudio.google.com/app/apikey)

### Verify installation

```bash
node --version    # v18+
npm --version     # 9+
git --version
```

## Step 1: Clone and install

```bash
git clone https://github.com/sumithpdd/GoogleIOConnect2026.git
cd GoogleIOConnect2026
npm install
```

First install usually takes 2–5 minutes.

## Step 2: Environment variables

```bash
copy .env.example .env.local
```

Edit `.env.local`:

```env
APP_PRESET=io-connect-2026

# Firebase client config — from Firebase Console → Project settings → Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin — service account from the SAME project as client config
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

GOOGLE_GEMINI_API_KEY=
# ADMIN_SECRET=
```

See **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** for screenshots, service account steps, and troubleshooting.

### Never commit secrets

Keep these **out of git** (already in `.gitignore`):

- `.env.local` — real API keys and Firebase credentials
- `*-firebase-adminsdk-*.json` — Firebase service account downloads
- Any file containing private keys or passwords

Use `.env.example` as the template; copy to `.env.local` locally only.

Optional for public deploys:

```env
API_SECRET=
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

Optional LinkedIn OAuth (result page “Post to LinkedIn”):

```env
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
LINKEDIN_REDIRECT_URI=https://your-app.vercel.app/api/linkedin/callback
```

## Step 3: Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the I/O Connect landing page (“Send a Smile From Berlin”).

## Booth flow

1. **Landing** — animated hero; **Go beyond the basics** — generate AI social posts by email
2. **Your details** — name, email, workshop/session, optional takeaway, GDPR
3. **Camera** — capture or upload (portrait crop + GDG watermark top-right)
4. **Scenes** — one-tap **Berlin / I/O Connect** experiences (background + magic combined)
5. **Processing** — Gemini compositing + Firebase upload
6. **Result** — download, print, saved AI social posts, gallery, optional LinkedIn

## Admin screen (event staff)

**URL:** `/admin` — e.g. [http://localhost:3000/admin](http://localhost:3000/admin)

1. Ensure in `.env.local`:
   ```env
   # ADMIN_SECRET=
   ```
   Gallery, admin, summary, and standalone mode are enabled by the `io-connect-2026` preset — no extra feature flags needed.
2. Restart the dev server.
3. Sign in with `ADMIN_SECRET` to hide/show/delete gallery photos.

See [06_API_SECURITY.md](./06_API_SECURITY.md).

## Step 4: Verify everything works

### Home page

- [ ] Page loads without console errors
- [ ] I/O Connect branding and “Start Experience” / gallery link visible
- [ ] Dark theme with Google colors and landing animations

### End-to-end

- [ ] Complete one photo through to **Result**
- [ ] Composited photo shows Berlin scene (not raw room background pasted on)
- [ ] GDG sticker visible **top-right** on enhanced photo
- [ ] Photo appears on `/gallery`
- [ ] `/admin` moderation works (if enabled)
- [ ] **Go beyond the basics** on home — generate social post, see it in saved list
- [ ] Result page reuses saved caption on refresh (no duplicate Gemini call for same photo code)
- [ ] Regenerate social post creates a new saved entry

## Common issues

### Port 3000 in use

```bash
netstat -ano | findstr :3000
npm run dev -- -p 3001
```

### Module not found

```bash
Remove-Item -Recurse -Force node_modules
npm install
```

### Firebase errors

1. Confirm client and server Firebase env vars reference the **same** project
2. Regenerate service account key if `FIREBASE_CLIENT_EMAIL` still references another project
3. Restart dev server after editing `.env.local`

Details: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) and [04_TROUBLESHOOTING.md](./04_TROUBLESHOOTING.md).

### Build cache errors

```bash
Remove-Item -Recurse -Force .next
npm run build
```

## Project structure

```
GoogleIOConnect2026/
├── src/
│   ├── app/                    # Next.js routes (booth flow, gallery, admin, API)
│   ├── components/io-connect/  # Wizard, LandingBeyondSocial, PageMotion
│   ├── data/                   # booth-scenes, backgrounds, prompts, workshops
│   ├── lib/                    # Firebase, Gemini, social-posts-storage, captions
│   └── store/                  # Zustand state
├── public/branding/            # Logos and assets (see public/branding/README.md)
├── docs/                       # Documentation (+ docs/images/)
├── .env.local                  # Local secrets (never commit)
└── package.json
```

## Next steps

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** — Firebase project & env vars
- **[Architecture](./01_ARCHITECTURE.md)** — How the app is structured
- **[Features](./02_FEATURES.md)** — Feature overview
- **[Branding & motion](./BRANDING_GUIDE.md)** — Theme, assets, animations
- **[Development](./03_DEVELOPMENT.md)** — Day-to-day dev tasks
- **[Vercel deploy](./VERCEL_DEPLOY.md)** — Production deployment

---

**You're all set.** Run through the booth once locally, then deploy when Firebase and Gemini keys are on Vercel.
