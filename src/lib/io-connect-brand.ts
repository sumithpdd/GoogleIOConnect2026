/** Google I/O Connect Berlin 2026 — visual tokens aligned with RSVP page theme. */

export const GOOGLE_COLORS = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC04',
  green: '#34A853',
} as const;

export const IO_CONNECT_ASSETS = {
  /** Primary header wordmark — Google I/O Connect Berlin banner */
  mainLogo: '/branding/io-connect-main-logo.png',
  heroLogo: '/branding/io-connect-main-logo.png',
  helloBerlin: '/branding/hello-berlin.png',
  /** GDG London · Berlin 2026 sticker — footer + printed photo watermark */
  gdgLondonLogo: '/branding/gdg-london-berlin-2026.png',
  photoWatermarkLogo: '/branding/gdg-london-berlin-2026.png',
  samplePhotos: [
    '/branding/sample-photo-1.png',
    '/branding/sample-photo-2.png',
    '/branding/sample-photo-3.png',
  ],
  londonSkyline: '/branding/gdg-london-berlin-2026.png',
  pageBackdrop: '/branding/page-backdrop-official.jpg',
  berlinBanner: '/branding/io-connect-berlin-logo.png',
  ioMark: '/branding/io-mark.png',
  /** Card preview photos — London, Berlin landmarks + I/O Connect art */
  backgroundPreviews: {
    londonTowerBridge:
      'https://images.unsplash.com/photo-1524680208518-6b235625d768?w=800&q=80&auto=format&fit=crop',
    londonWestminster:
      'https://images.unsplash.com/photo-1529655683826-aba9cb8c5aac?w=800&q=80&auto=format&fit=crop',
    londonSkyline:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80&auto=format&fit=crop',
    londonNight:
      'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800&q=80&auto=format&fit=crop',
    berlinGate:
      'https://images.unsplash.com/photo-1567933472381-52e8f42d9720?w=800&q=80&auto=format&fit=crop',
    berlinTower:
      'https://images.unsplash.com/photo-1587330979470-3595ac045cb0?w=800&q=80&auto=format&fit=crop',
    berlinReichstag:
      'https://images.unsplash.com/photo-1569949381666-ecf31ae59f42?w=800&q=80&auto=format&fit=crop',
    berlinNight:
      'https://images.unsplash.com/photo-1582407947302-f3277a668928?w=800&q=80&auto=format&fit=crop',
    berlinBuddyBears:
      'https://images.unsplash.com/photo-1623021499066-927fdfede995?w=800&q=80&auto=format&fit=crop',
    berlinEastSide:
      'https://images.unsplash.com/photo-1587336407440-7e397b96a859?w=800&q=80&auto=format&fit=crop',
    berlinOberbaum:
      'https://images.unsplash.com/photo-1596484552834-6a58f850e134?w=800&q=80&auto=format&fit=crop',
    berlinAlexanderplatz:
      'https://images.unsplash.com/photo-1560963685-2f1a3d8a6c96?w=800&q=80&auto=format&fit=crop',
  },
} as const;

export const IO_CONNECT_EVENT = {
  title: 'Google I/O Connect Photo Booth',
  subtitle: 'London & Berlin',
  tagline: 'London · Berlin · 2026',
  location: 'Google I/O Connect',
  date: '2026',
  url: 'https://rsvp.withgoogle.com/events/ioconnect-berlin-2026',
  copyrightHolder: 'GDG London',
} as const;

export const IO_CONNECT_IMAGE_RULES =
  'Google I/O Connect 2026 photo booth — London and Berlin developer community. ' +
  'Black background aesthetic with luminous Google gradient accents (blue, red, yellow, green). ' +
  'Semi-transparent globe, cloud, Android and code-brace motifs like the official Berlin event art. ' +
  'Berlin scenes may include the city\'s famous bear mascot or colorful United Buddy Bear statues as playful community symbols. ' +
  'Do not draw logos, stickers, or text overlays in the scene — the official GDG London Berlin 2026 sticker watermark is added after generation. ' +
  'Photorealistic, celebratory event portrait.';
