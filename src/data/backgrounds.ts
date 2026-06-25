/**
 * Background scenes — curated for booth flow (see booth-scenes.ts).
 * Extra entries may remain for gallery photos uploaded with older scene IDs.
 */

import { Background } from '@/types';
import { IO_CONNECT_ASSETS } from '@/lib/io-connect-brand';

const P = IO_CONNECT_ASSETS.backgroundPreviews;

export const backgrounds: Background[] = [
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
      'Berlin TV Tower rising over Alexanderplatz — red city lights and the unmistakable Fernsehturm sphere at night',
    imageUrl: P.berlinAlexanderplatz,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-neon',
    city: 'Berlin',
    emoji: '📡',
    featured: true,
  },
  {
    id: 'berlin-buddy-bears',
    name: 'United Buddy Bears',
    description:
      'Colourful United Buddy Bear statues arm-in-arm on a Berlin boulevard — friendly Hauptstadt welcome',
    imageUrl: P.berlinBuddyBears,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-bears',
    city: 'Berlin',
    emoji: '🐻',
    featured: true,
  },
  {
    id: 'berlin-east-side',
    name: 'East Side Gallery',
    description:
      'Murals on the Berlin Wall at East Side Gallery — Kreuzberg riverside and bold street art colours',
    imageUrl: P.berlinEastSide,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-wall',
    city: 'Berlin',
    emoji: '🎨',
  },
  {
    id: 'berlin-hello-art',
    name: 'Hello Berlin Art',
    description:
      'Official Hello Berlin visual style — gradient globe, Android, cloud and sparkle motifs on black',
    imageUrl: IO_CONNECT_ASSETS.helloBerlin,
    category: 'innovation',
    previewClass: 'bg-preview-connect-official',
    city: 'Berlin',
    emoji: '👋',
    featured: true,
  },
  {
    id: 'berlin-night-skyline',
    name: 'Berlin Night Skyline',
    description:
      'Panoramic Berlin after dark — city lights along the Spree and Fernsehturm glow',
    imageUrl: P.berlinNight,
    category: 'innovation',
    previewClass: 'bg-preview-berlin-neon',
    city: 'Berlin',
    emoji: '🌃',
  },
  {
    id: 'connect-braces',
    name: 'I/O Connect Berlin',
    description:
      'Google I/O Connect Berlin banner — luminous gradient code braces, Android and wireframe globe on black',
    imageUrl: IO_CONNECT_ASSETS.berlinBanner,
    category: 'heritage',
    previewClass: 'bg-preview-connect-braces',
    city: 'I/O Connect',
    emoji: '{ }',
    featured: true,
  },
  {
    id: 'connect-gemini',
    name: 'Gemini Sparkle',
    description:
      'Black studio with floating Gemini sparkle stars and multicolor gradient orbs',
    imageUrl: IO_CONNECT_ASSETS.samplePhotos[0],
    category: 'heritage',
    previewClass: 'bg-preview-connect-gemini',
    city: 'I/O Connect',
    emoji: '✨',
    featured: true,
  },
  {
    id: 'connect-gradient',
    name: 'Gradient Studio',
    description:
      'Minimal black portrait studio with sweeping Google gradient light bars',
    imageUrl: IO_CONNECT_ASSETS.mainLogo,
    category: 'heritage',
    previewClass: 'bg-preview-connect-gradient',
    city: 'I/O Connect',
    emoji: '🎨',
  },
];

export const BACKGROUND_FILTERS = [
  { id: 'all', label: 'All' },
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

/** @deprecated use filterBackgrounds */
export const featuredScenes = backgrounds.filter((b) => b.featured);
