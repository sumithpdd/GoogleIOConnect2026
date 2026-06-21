# Firebase setup — Google I/O Connect 2026

This app stores generated photos in **Firebase Storage** and metadata in **Cloud Firestore**. Server-side API routes use the **Firebase Admin SDK**; the browser only needs the public web app config when client-side Firebase features are enabled.

**Project:** [`ioconnect2026`](https://console.firebase.google.com/project/ioconnect2026)  
**Web app nickname:** `GoogleIOConnect2026`

---

## 1. Create or open the Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com).
2. Open project **`ioconnect2026`** (or create it with that ID).
3. Enable **Firestore** and **Storage** if prompted (Production mode is fine for an event booth).

---

## 2. Register the web app

1. In Project overview, click **Add app** → **Web** (`</>`).
2. On **Add Firebase to your web app**, set the app nickname to **`GoogleIOConnect2026`**.
3. Leave **Firebase Hosting** unchecked unless you plan to deploy static hosting from this repo (Vercel is the usual deploy target).
4. Click **Register app**, then continue to **Add Firebase SDK** and copy the `firebaseConfig` values.

![Register web app with nickname GoogleIOConnect2026](./images/firebase-web-app-register.png)

Map those values into `.env.local`:

| Firebase config field | Environment variable |
|----------------------|----------------------|
| `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY` |
| `authDomain` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` |
| `storageBucket` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `NEXT_PUBLIC_FIREBASE_APP_ID` |
| `measurementId` (optional) | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` |

Example (replace with your console values):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ioconnect2026.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ioconnect2026
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ioconnect2026.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=667745049577
NEXT_PUBLIC_FIREBASE_APP_ID=1:667745049577:web:e4972c5a5fd6ad04678978
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-T6NNHMY2JX
```

---

## 3. Create a service account (server upload & gallery)

Gallery, upload, and admin routes run on the server and need Admin credentials **from the same project** (`ioconnect2026`).

1. Firebase Console → **Project settings** → **Service accounts**.
2. Click **Generate new private key** (JSON download).
3. Either paste the JSON as one line:

   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"ioconnect2026",...}
   ```

   Or set separate vars (common for local dev):

   ```env
   FIREBASE_PROJECT_ID=ioconnect2026
   FIREBASE_STORAGE_BUCKET=ioconnect2026.firebasestorage.app
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@ioconnect2026.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

**Important:** `FIREBASE_CLIENT_EMAIL` must end with `@ioconnect2026.iam.gserviceaccount.com`. A key from another project (e.g. `copenhagesilver`) will fail uploads with permission errors.

---

## 4. Firestore & Storage layout

With `APP_PRESET=io-connect-2026`, the app uses:

| Resource | Name / path |
|----------|-------------|
| Firestore collection | `photobooth` — photo metadata for the gallery |
| Firestore collection | `photobooth_sessions` — attendee session data |
| Storage prefix | `io-connect-2026/` — generated image files |

No manual seed data is required; collections are created on first upload.

### Suggested security rules (starting point)

Tighten before a public launch. The app reads/writes via Admin SDK on the server, so rules mainly protect direct client access:

**Firestore** — deny public writes; allow read only if you expose client gallery later.

**Storage** — restrict writes to authenticated/admin paths under `io-connect-2026/`.

For a kiosk behind Vercel + `API_SECRET`, server-side Admin access is sufficient for booth operation.

---

## 5. Complete `.env.local` checklist

Copy from `.env.example`, then set at minimum:

```env
APP_PRESET=io-connect-2026

# Client Firebase config (step 2)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ioconnect2026
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

# Admin SDK (step 3) — must match ioconnect2026
FIREBASE_PROJECT_ID=ioconnect2026
FIREBASE_STORAGE_BUCKET=ioconnect2026.firebasestorage.app
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@ioconnect2026.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

GOOGLE_GEMINI_API_KEY=...
ADMIN_SECRET=choose-a-strong-password-for-event-staff
```

Sitecore variables (`SITECORE_*`, attendee sync) are **not** required for the I/O Connect preset.

---

## 6. Verify locally

```bash
npm run dev
```

1. Complete the booth flow through **Result**.
2. Open `/gallery` — your photo should appear.
3. Open `/admin`, sign in with `ADMIN_SECRET`, and confirm moderation works.

If gallery is empty or upload fails, check the terminal for Firebase errors and confirm all vars reference **`ioconnect2026`**, not a copied CopenhagenSilver project.

---

## 7. Deploy (Vercel)

Add the same variables in Vercel → **Settings → Environment Variables**. See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md).

For production, also set:

```env
API_SECRET=long-random-string
NEXT_PUBLIC_APP_URL=https://your-deploy-domain.vercel.app
```

---

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Upload 500 / permission denied | Service account from wrong project or missing Storage/Firestore APIs |
| Gallery empty but upload “succeeds” | `FIREBASE_PROJECT_ID` mismatch between client and server vars |
| `Invalid JWT Signature` | Malformed `FIREBASE_PRIVATE_KEY` — use `\n` for line breaks in `.env.local` |
| Works locally, fails on Vercel | Env vars not set for Production, or `FIREBASE_PRIVATE_KEY` truncated |

More help: [04_TROUBLESHOOTING.md](./04_TROUBLESHOOTING.md)
