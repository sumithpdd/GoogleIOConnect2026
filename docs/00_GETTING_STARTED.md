# Getting Started — Google I/O Connect Photo Booth

AI photo booth for **Google I/O Connect London & Berlin 2026**, with GDG London photobooth UX and Gemini image generation.

> **Firebase:** Full setup for project **`ioconnect2026`** is in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

## Prerequisites

- **Node.js** 18+ — [nodejs.org](https://nodejs.org/)
- **npm** 9+ (bundled with Node.js)
- **Git** — [git-scm.com](https://git-scm.com/)
- **Firebase project** `ioconnect2026` with web app **`GoogleIOConnect2026`**
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

# Firebase client config — from Firebase Console → Project settings → Your apps → GoogleIOConnect2026
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ioconnect2026.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ioconnect2026
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ioconnect2026.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin — service account from the SAME project (ioconnect2026)
FIREBASE_PROJECT_ID=ioconnect2026
FIREBASE_STORAGE_BUCKET=ioconnect2026.firebasestorage.app
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@ioconnect2026.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

GOOGLE_GEMINI_API_KEY=your_gemini_key
ADMIN_SECRET=choose-a-strong-password-for-event-staff
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
API_SECRET=choose-a-long-random-string
```

Sitecore Marketplace mode is optional; see [05_MARKETPLACE.md](./05_MARKETPLACE.md) if you embed the app in Sitecore.

## Step 3: Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the I/O Connect landing page (“Send a Smile From London & Berlin”).

## Booth flow

1. **Landing** — hero + start
2. **Your details** — name, email, GDPR
3. **Camera** — capture or upload
4. **City scene** — London, Berlin, or Connect backdrop
5. **Choose magic** — themed AI presets
6. **Processing** — Gemini + Firebase upload
7. **Result** — download, print, share

## Admin screen (event staff)

**URL:** `/admin` — e.g. [http://localhost:3000/admin](http://localhost:3000/admin)

1. Ensure in `.env.local`:
   ```env
   ADMIN_SECRET=choose-a-strong-password-for-event-staff
   ```
   Gallery, admin, summary, and standalone mode are enabled by the `io-connect-2026` preset — no extra feature flags needed.
2. Restart the dev server.
3. Sign in with `ADMIN_SECRET` to hide/show/delete gallery photos.

See [06_API_SECURITY.md](./06_API_SECURITY.md).

## Step 4: Verify everything works

### Home page

- [ ] Page loads without console errors
- [ ] I/O Connect branding and “Create Photo” / “View Gallery” actions visible
- [ ] Dark theme with Google colors

### End-to-end

- [ ] Complete one photo through to **Result**
- [ ] Photo appears on `/gallery`
- [ ] `/admin` moderation works (if enabled)

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

1. Confirm all Firebase vars use project **`ioconnect2026`**
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
│   ├── app/                    # Next.js routes (booth flow, gallery, admin)
│   ├── components/io-connect/  # I/O Connect UI (wizard, logos, decorations)
│   ├── data/                   # Backgrounds & prompts
│   ├── lib/                    # Firebase, Gemini, app config
│   └── store/                  # Zustand state
├── public/branding/            # Logos and assets
├── docs/                       # Documentation (+ docs/images/)
├── .env.local                  # Local secrets (never commit)
└── package.json
```

## Next steps

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** — Firebase project & env vars
- **[Architecture](./01_ARCHITECTURE.md)** — How the app is structured
- **[Features](./02_FEATURES.md)** — Feature overview
- **[Development](./03_DEVELOPMENT.md)** — Day-to-day dev tasks
- **[Vercel deploy](./VERCEL_DEPLOY.md)** — Production deployment

---

**You're all set.** Run through the booth once locally, then deploy when Firebase and Gemini keys are on Vercel.
