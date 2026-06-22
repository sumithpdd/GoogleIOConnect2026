# Architecture Guide - AI Photo Booth

This guide explains how the app is structured and how different parts work together. The booth is a **standalone** Next.js app — deployed to **Vercel** for the event or run on a **kiosk** browser at the venue.

## Big Picture: How the App Works

```
User Interface (React Components)
            ↓
Providers (App Config + API session bootstrap)
            ↓
State Management (Zustand Stores)
            ↓
API Routes (Next.js Backend — secured when API_SECRET set)
            ↓
External Services (Firebase, Gemini AI)
```

## Deployment modes

| Mode | How | Branding source |
|------|-----|-----------------|
| **Vercel** | Public URL for guests and gallery | `APP_PRESET=io-connect-2026` + `/api/config` |
| **Kiosk** | Local dev server or on-site browser (trusted network) | Same preset; `API_SECRET` optional on LAN |

**In Simple Terms:**
1. User opens the app → sees a **React Component**
2. User clicks a button → updates **Zustand State**
3. Component needs data → calls an **API Route**
4. API Route talks to **Firebase or Gemini AI**
5. Data comes back → component re-renders with new data

## Folder Structure Explained

### `src/app/` - Pages and API Routes

**Pages** (What users see):
```
app/
├── page.tsx              # Landing (/)
├── layout.tsx            # Root layout
├── input/page.tsx        # User enters name
├── camera/page.tsx       # Camera or upload photo
├── backgrounds/page.tsx  # Choose Berlin / I/O Connect scene
├── prompts/page.tsx      # Choose magic preset
├── processing/page.tsx   # Gemini loader
├── result/page.tsx       # Final photo + share
├── gallery/page.tsx      # Community gallery
├── admin/page.tsx        # Staff moderation
├── summary/page.tsx      # Keepsake page (optional)
└── privacy/page.tsx      # Privacy notice
```

**API Routes** (Backend endpoints):
```
app/api/
├── config/route.ts           # GET - App branding, backgrounds, prompts
├── auth/session/route.ts     # GET - API session cookie (when secured)
├── session/route.ts          # POST - Booth session metadata
├── composit-image/route.ts   # POST - Gemini image generation (secured)
├── upload-photo/route.ts     # POST - Save to Firebase (secured)
├── gallery/route.ts          # GET - Public gallery
├── social/caption/route.ts   # POST - AI social post text
├── linkedin/*                # Optional OAuth share
└── admin/*                   # Staff moderation (ADMIN_SECRET)
```

**Core libraries:**
```
src/lib/core/          # app-config, api-auth, api-client
src/lib/io-connect-brand.ts  # I/O Connect branding rules & assets
src/components/booth/  # BoothLogo, BoothBackdrop
src/components/providers/ # AppConfigProvider, ThemeProvider, API session bootstrap
```

### `src/components/` - React Components

Reusable building blocks:

```
components/
├── io-connect/           # Wizard, logos, PageMotion, decorations
├── photo-booth/          # SocialSharePanel, PhotoPreviewModal
├── common/               # GDPR, shared layout helpers
├── providers/            # AppConfigProvider, API session bootstrap
└── ui/                   # FormField, icons
```

### `src/lib/` - Utilities and Services

Helper code:

```
lib/
├── core/                 # app-config, api-auth, api-client
├── firebase.ts           # Client Firebase initialization
├── firebase-admin.ts     # Server Firebase Admin
├── gemini-image.ts       # Gemini image generation client
├── io-connect-brand.ts   # Brand rules, assets, image guardrails
├── linkedin/             # Social post copy & OAuth helpers
├── validators.ts         # Zod validation schemas
├── hooks.ts              # Custom React hooks
└── utils.ts              # Helper functions
```

### `src/store/` - State Management

Zustand stores (like a data container):

```
store/
└── photo-booth.ts       # Photo booth session state
    - userName, userEmail
    - selectedBackground, selectedPrompt
    - capturedPhoto, compositedPhoto
    - isProcessing, photoCode
```

### `src/types/` - TypeScript Definitions

What data looks like:

```
types/
└── index.ts
    - PhotoBoothSession  - User's current session
    - Background        - Background image option
    - PhotoPrompt       - AI prompt
    - PhotoBoothPhoto   - Final saved photo
    - ApiResponse       - API response format
```

## How Data Flows Through the App

### Example 1: User Creates a Photo

```
1. HOME PAGE (page.tsx)
   User clicks "Create Photo" button

2. INPUT SCREEN (input/page.tsx)
   User enters name → clicks "Continue"
   ↓
   Component calls: usePhotoBoothStore.initializeSession()
   ↓
   Zustand store updates: session = { sessionId, userName, ... }

3. CAMERA SCREEN (camera/page.tsx)
   Component reads: usePhotoBoothStore.session
   User takes photo
   ↓
   Component calls: useCameraCapture() hook
   ↓
   Photo stored in: usePhotoBoothStore.capturedPhoto = base64

4. BACKGROUND SELECTION (backgrounds/page.tsx)
   Component reads: usePhotoBoothStore.capturedPhoto
   User selects background
   ↓
   Component calls: usePhotoBoothStore.setSelectedBackground()
   ↓
   Zustand updates: selectedBackground = { id, name, ... }

5. PROMPT SELECTION (prompts/page.tsx)
   Component reads: usePhotoBoothStore
   User selects prompt
   ↓
   Component calls: usePhotoBoothStore.setSelectedPrompt()
   ↓
   Zustand updates: selectedPrompt = { id, title, ... }

6. PROCESSING SCREEN (processing/page.tsx)
   Component shows loading animation
   ↓
   Component calls: useMutation to POST /api/composit-image
   ↓
   API ROUTE HANDLER (api/composit-image/route.ts)
   - Receives: photo, background, prompt
   - Calls: Google Gemini AI
   - Returns: compositedPhoto (base64)

7. RESULT SCREEN (result/page.tsx)
   Component receives: compositedPhoto
   ↓
   User clicks "Save to Gallery"
   ↓
   Component calls: useMutation to POST /api/upload-photo
   ↓
   API ROUTE HANDLER (api/upload-photo/route.ts)
   - Saves photo to Firebase Storage
   - Saves metadata to Firestore
   - Returns: photoId, photoCode, photoUrl

8. RESULT DISPLAYED
   Component shows final photo with sharing options
```

## Key Concepts

### 1. React Components

A component is like a function that returns UI:

```typescript
// Simple component
export function MyButton() {
  return <button className="bg-google-blue text-white">Click me</button>
}

// Component with state
export function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### 2. Zustand Store

A global state container (like a data warehouse):

```typescript
// Create a store
const useStore = create((set) => ({
  name: 'John',
  setName: (newName) => set({ name: newName }),
}))

// Use in component
function MyComponent() {
  const name = useStore((state) => state.name)
  const setName = useStore((state) => state.setName)
  
  return <button onClick={() => setName('Jane')}>Hi {name}</button>
}
```

### 3. API Routes

A backend endpoint in Next.js:

```typescript
// src/app/api/hello/route.ts
export async function GET(request: Request) {
  return Response.json({ message: 'Hello!' })
}

export async function POST(request: Request) {
  const data = await request.json()
  // Do something with data
  return Response.json({ success: true })
}
```

### 4. TanStack Query (useQuery/useMutation)

For fetching data from API:

```typescript
// GET data
const { data, isLoading } = useQuery({
  queryKey: ['photos'],
  queryFn: async () => {
    const res = await fetch('/api/gallery')
    return res.json()
  }
})

// POST data
const { mutate, isPending } = useMutation({
  mutationFn: async (photo) => {
    const res = await fetch('/api/upload-photo', {
      method: 'POST',
      body: JSON.stringify(photo)
    })
    return res.json()
  }
})
```

## Data Models

### PhotoBoothSession
Represents a user's current session:
```typescript
{
  sessionId: "session_1234567890",
  userName: "John Doe",
  userEmail: "john@example.com",
  createdAt: Date
}
```

### Background
A background image option:
```typescript
{
  id: "berlin-brandenburg",
  name: "Brandenburg Gate",
  imageUrl: "...",
  description: "Pariser Platz at dusk...",
  category: "innovation"
}
```

### PhotoPrompt
An AI transformation prompt:
```typescript
{
  id: "berlin-hello",
  title: "Hello Berlin",
  fullPrompt: "Classic Hello Berlin composition...",
  category: "innovation"
}
```

### PhotoBoothPhoto
A final saved photo:
```typescript
{
  id: "photo_abc123",
  sessionId: "session_1234567890",
  userName: "John Doe",
  originalPhotoUrl: "...",
  compositedPhotoUrl: "...",
  backgroundId: "berlin-brandenburg",
  promptId: "berlin-hello",
  photoCode: "IO260001",
  createdAt: Date
}
```

## Firebase Integration

### Collections (Firestore)
```
firestore/
└── photobooth/     (collection)
    └── {photoId}   (document)
        ├── id
        ├── userName
        ├── backgroundId
        ├── promptId
        ├── compositedPhotoUrl
        ├── createdAt
        └── ...
```

### Storage (Firebase Cloud Storage)
```
storage/
└── io-connect-2026/
    ├── {sessionId}/
    │   ├── original_{timestamp}.jpg
    │   └── composited_{timestamp}.jpg
```

## Gemini AI Integration

The Gemini API is called from the **server-side** (API route) for security:

```
Client → POST /api/composit-image
         {photo: base64, background: string, prompt: string}
         ↓
API Route → Google Gemini API
           {photo, background, prompt}
           ↓
Gemini → Processes image
         ↓
API Route → Response {compositedPhoto: base64}
           ↓
Client → Updates UI with result
```

## Security Model

**Public (Accessible to anyone):**
- Home page
- Gallery viewing

**Authenticated (Need to be logged in):**
- Create photo
- Upload photo

**Admin Only:**
- Delete photos
- View analytics

**Secret (Never exposed to client):**
- Gemini API key (server-side only)
- Firebase Service Account credentials (server-side only)
- Database write permissions (Firebase rules)

---

**Next Steps:**
- [Feature Guides](./02_FEATURES.md) — What each feature does
- [Development Guide](./03_DEVELOPMENT.md) — How to write code
- [Troubleshooting](./04_TROUBLESHOOTING.md) — Fix common issues
