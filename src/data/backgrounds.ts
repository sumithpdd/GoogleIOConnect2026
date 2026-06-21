/**
 * Background scenes — Google I/O Connect London & Berlin 2026
 */

import { Background } from '@/types';
import { IO_CONNECT_ASSETS } from '@/lib/io-connect-brand';

const P = IO_CONNECT_ASSETS.backgroundPreviews;

export const backgrounds: Background[] = [
  // ─── London ───────────────────────────────────────────────────────────────
  {
    id: 'london-tower-bridge',
    name: 'Tower Bridge Sunrise',
    description:
      'Golden sunrise over the Thames with Tower Bridge, shimmering water reflections and soft morning mist — classic London skyline portrait backdrop',
    imageUrl: P.londonTowerBridge,
    category: 'celebration',
    previewClass: 'bg-preview-london-warm',
    city: 'London',
    emoji: '🌉',
    featured: true,
  },
  {
    id: 'london-westminster',
    name: 'Westminster & Big Ben',
    description:
      'Palace of Westminster and Big Ben at blue hour, Gothic architecture lit against a deep indigo London sky with gentle river glow',
    imageUrl: P.londonWestminster,
    category: 'celebration',
    previewClass: 'bg-preview-london-blue',
    city: 'London',
    emoji: '🕰️',
    featured: true,
  },
  {
    id: 'london-skyline',
    name: 'City Skyline',
    description:
      'Panoramic London cityscape — The Shard, Walkie Talkie and Thames bridges under dramatic clouds, modern GDG London energy',
    imageUrl: P.londonSkyline,
    category: 'celebration',
    previewClass: 'bg-preview-london-skyline',
    city: 'London',
    emoji: '🏙️',
  },
  {
    id: 'london-lights',
    name: 'Piccadilly Nights',
    description:
      'Vibrant London night street — neon signs, red double-decker bus blur and wet pavement reflections, festive developer meetup atmosphere',
    imageUrl: P.londonNight,
    category: 'celebration',
    previewClass: 'bg-preview-london-neon',
    city: 'London',
    emoji: '🚌',
  },

  // ─── Berlin ───────────────────────────────────────────────────────────────
  {
    id: 'berlin-brandenburg',
    name: 'Brandenburg Gate',
    description:
      'Pariser Platz at dusk — the Brandenburg Gate lit warm gold, Unter den Linden trees and classic Berlin Mitte skyline behind you',
    imageUrl: P.berlinGate,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-golden',
    city: 'Berlin',
    emoji: '🚪',
    featured: true,
  },
  {
    id: 'berlin-tvtower',
    name: 'Fernsehturm & Alexanderplatz',
    description:
      'Berlin TV Tower rising over Alexanderplatz — socialist-era plaza, red city lights and the unmistakable Fernsehturm sphere at night',
    imageUrl: P.berlinAlexanderplatz,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-neon',
    city: 'Berlin',
    emoji: '📡',
    featured: true,
  },
  {
    id: 'berlin-reichstag',
    name: 'Reichstag Dome',
    description:
      'The Reichstag glass dome glowing at twilight — Paul-Löbe-Allee, German Bundestag flags and historic Berlin government quarter',
    imageUrl: P.berlinReichstag,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-dome',
    city: 'Berlin',
    emoji: '🏛️',
  },
  {
    id: 'berlin-east-side',
    name: 'East Side Gallery',
    description:
      'Murals on the remaining Berlin Wall at East Side Gallery — Kreuzberg riverside, bold street art colours and Spree riverbank atmosphere',
    imageUrl: P.berlinEastSide,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-wall',
    city: 'Berlin',
    emoji: '🎨',
  },
  {
    id: 'berlin-oberbaum',
    name: 'Oberbaum Bridge',
    description:
      'The red-brick Oberbaum Bridge linking Friedrichshain and Kreuzberg — U-Bahn tracks, Spree reflections and iconic Berlin crossover skyline',
    imageUrl: P.berlinOberbaum,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-river',
    city: 'Berlin',
    emoji: '🌉',
  },
  {
    id: 'berlin-buddy-bears',
    name: 'United Buddy Bears',
    description:
      'Colourful United Buddy Bear statues arm-in-arm on a Berlin boulevard — the city\'s famous bear art trail and friendly Hauptstadt welcome',
    imageUrl: P.berlinBuddyBears,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-bears',
    city: 'Berlin',
    emoji: '🐻',
    featured: true,
  },
  {
    id: 'berlin-city-bear',
    name: 'Berliner Bär',
    description:
      'Berlin\'s coat-of-arms bear mascot beside the Brandenburg Gate — Berliner Bär pride, Pariser Platz cobbles and golden evening light on the Siegessäule axis',
    imageUrl: P.berlinGate,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-bear-gate',
    city: 'Berlin',
    emoji: '🧸',
    featured: true,
  },
  {
    id: 'berlin-hello-art',
    name: 'Hello Berlin Art',
    description:
      'Official Hello Berlin visual style on pure black — gradient globe, Android, cloud and sparkle motifs from the Berlin developer conference art direction',
    imageUrl: IO_CONNECT_ASSETS.helloBerlin,
    category: 'innovation',
    previewClass: 'bg-preview-connect-official',
    city: 'Berlin',
    emoji: '👋',
  },

  // ─── Google I/O Connect 2026 ──────────────────────────────────────────────
  {
    id: 'connect-braces',
    name: 'I/O Connect Berlin',
    description:
      'Google I/O Connect Berlin banner aesthetic — luminous gradient code braces, Android head and wireframe globe on pure black studio',
    imageUrl: IO_CONNECT_ASSETS.berlinBanner,
    category: 'heritage',
    previewClass: 'bg-preview-connect-braces',
    city: 'I/O Connect',
    emoji: '{ }',
    featured: true,
  },
  {
    id: 'connect-two-cities',
    name: 'London ↔ Berlin Connect',
    description:
      'Split portrait bridging both host cities — Thames-side London merging into Berlin landmarks with a luminous Google gradient connection',
    imageUrl: IO_CONNECT_ASSETS.berlinBanner,
    category: 'heritage',
    previewClass: 'bg-preview-connect-bridge',
    city: 'I/O Connect',
    emoji: '🌍',
    featured: true,
  },
  {
    id: 'connect-gdg-sticker',
    name: 'GDG London · Berlin 2026',
    description:
      'Official GDG London sticker art — London and Berlin skyline in one badge (Tower Bridge, Big Ben, Brandenburg Gate, TV Tower, Berliner Dom) on a soft sunrise sky',
    imageUrl: IO_CONNECT_ASSETS.gdgLondonLogo,
    category: 'heritage',
    previewClass: 'bg-preview-connect-sticker',
    city: 'I/O Connect',
    emoji: '🏷️',
    featured: true,
  },
  {
    id: 'connect-gradient',
    name: 'Gradient Studio',
    description:
      'Minimal black portrait studio with sweeping Google blue-red-yellow-green gradient light bars and soft developer-event rim lighting',
    imageUrl: IO_CONNECT_ASSETS.mainLogo,
    category: 'heritage',
    previewClass: 'bg-preview-connect-gradient',
    city: 'I/O Connect',
    emoji: '🎨',
  },
  {
    id: 'connect-gemini',
    name: 'Gemini Sparkle',
    description:
      'Deep black studio with floating Gemini sparkle stars, multicolor gradient orbs and subtle AI photo-booth glow — I/O Connect 2026',
    imageUrl: IO_CONNECT_ASSETS.samplePhotos[0],
    category: 'heritage',
    previewClass: 'bg-preview-connect-gemini',
    city: 'I/O Connect',
    emoji: '✨',
  },
];

export const BACKGROUND_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'celebration', label: 'London' },
  { id: 'innovation', label: 'Berlin' },
  { id: 'heritage', label: 'I/O Connect' },
] as const;

export function getBackgroundById(id: string): Background | undefined {
  return backgrounds.find((bg) => bg.id === id);
}

export function getBackgroundsByCategory(
  category: 'heritage' | 'celebration' | 'innovation'
): Background[] {
  return backgrounds.filter((bg) => bg.category === category);
}

export function filterBackgrounds(category: string): Background[] {
  if (category === 'all') return backgrounds;
  return backgrounds.filter((bg) => bg.category === category);
}

/** @deprecated use filterBackgrounds — kept for compatibility */
export const featuredScenes = backgrounds.filter((b) => b.featured);
