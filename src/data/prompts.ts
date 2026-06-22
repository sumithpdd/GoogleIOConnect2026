/**
 * AI prompts — Google I/O Connect Berlin 2026 · GDG London community
 * @see https://rsvp.withgoogle.com/events/ioconnect-berlin-2026/
 */

import { PhotoPrompt } from '@/types';

const GUARDRAILS =
  ' Google I/O Connect Berlin 2026 photo booth in Berlin, presented by GDG London. Black background aesthetic with luminous Google gradient accents (blue #4285F4, red #EA4335, yellow #FBBC04, green #34A853). Semi-transparent globe, cloud, Android and code-brace motifs like the official event art. Photorealistic portrait set in Berlin — not London landmarks. Remove the person\'s original room/webcam background and blend them naturally into the scene — no collage, no pasted photo strip. Do not draw logos or stickers in the scene — the GDG London Berlin 2026 watermark is added after generation.';

export const prompts: PhotoPrompt[] = [
  // Berlin — I/O Connect Berlin RSVP theme
  {
    id: 'berlin-hello',
    title: 'Hello Berlin',
    description: 'Brandenburg Gate · code braces · I/O Connect Berlin',
    fullPrompt:
      'Classic Hello Berlin composition: the person centered between large gradient code braces { } with Brandenburg Gate visible behind them. Black sky, vibrant blue-green-yellow-red Google gradients blending through semi-transparent globe and cloud shapes — exactly like Google I/O Connect Berlin 2026 event branding.' +
      GUARDRAILS,
    category: 'innovation',
    emoji: '🚪',
  },
  {
    id: 'berlin-connect-art',
    title: 'I/O Connect Berlin Art',
    description: 'Official event visual style — braces, globe & sparkle',
    fullPrompt:
      'Recreate the Google I/O Connect Berlin 2026 art direction: person flanked by gradient curly braces, overlapping semi-transparent Android head, four-pointed sparkle star, wireframe globe and soft cloud icons. Pure black background, colors mixing where shapes overlap.' +
      GUARDRAILS,
    category: 'innovation',
    emoji: '✨',
  },
  {
    id: 'berlin-tv-tower',
    title: 'Berlin Fernsehturm Night',
    description: 'TV Tower at Alexanderplatz with neon developer glow',
    fullPrompt:
      'Night portrait at Alexanderplatz with the Berlin TV Tower lit up behind the person. Neon reflections on wet pavement, modern European tech hub energy, Google gradient light trails and subtle code-brace motifs in the sky.' +
      GUARDRAILS,
    category: 'innovation',
    emoji: '📡',
  },
  {
    id: 'berlin-buddy-bears',
    title: 'United Buddy Bears',
    description: 'Colorful Berlin bear statues · community art',
    fullPrompt:
      'Place the person among the famous United Buddy Bears — tall colorful fiberglass bear sculptures painted by artists from around the world, standing arm-in-arm on a Berlin street. Sunny optimistic mood like the I/O Connect Berlin community, soft Google gradient light leaks between the bears, welcoming developer networking energy.' +
      GUARDRAILS,
    category: 'innovation',
    emoji: '🐻',
  },
  {
    id: 'berlin-city-bear',
    title: 'Berlin Bear Pride',
    description: 'City mascot · Brandenburg Gate · I/O Connect',
    fullPrompt:
      'Celebrate Berlin\'s iconic bear mascot: the person beside a stylized Berliner Bär figure with Brandenburg Gate in the background at dusk. Festive I/O Connect Berlin 2026 atmosphere — community, friendship and Build with Gemini energy — with subtle Google four-color gradient glow, no text overlays.' +
      GUARDRAILS,
    category: 'innovation',
    emoji: '🧸',
  },
  {
    id: 'berlin-east-side',
    title: 'East Side Gallery',
    description: 'Berlin Wall murals · Kreuzberg · street art',
    fullPrompt:
      'Portrait at the East Side Gallery on the Spree — bold Berlin Wall murals in soft focus behind the person, Kreuzberg creative energy, Google gradient light accents and I/O Connect Berlin developer community vibe.' +
      GUARDRAILS,
    category: 'innovation',
    emoji: '🎨',
  },
  {
    id: 'berlin-gdg-stage',
    title: 'GDG London at I/O Connect',
    description: 'On stage in Berlin · GDG London community',
    fullPrompt:
      'Show the person on the I/O Connect Berlin main stage — GDG London community in the audience, professional conference lighting, Berlin venue with Hello Berlin art on the screens and Google I/O Connect gradient accents on stage edges.' +
      GUARDRAILS,
    category: 'innovation',
    emoji: '🎤',
  },
  {
    id: 'berlin-connect-wrap',
    title: "That's a Wrap — Berlin",
    description: 'Conference finale · dev community · Gemini',
    fullPrompt:
      'End-of-conference celebration portrait inspired by I/O Connect Berlin: the person in a lively developer community moment after a full day of keynotes and AI/Android/web/cloud tracks. Confetti-like Gemini sparkle particles, warm stage lighting, colorful Berlin Buddy Bear silhouette in soft focus, black background with Google gradient accents — joyful "that\'s a wrap" group-photo energy.' +
      GUARDRAILS,
    category: 'innovation',
    emoji: '🎉',
  },

  // I/O Connect Berlin — event art & Gemini
  {
    id: 'connect-berlin-landmarks',
    title: 'Berlin Landmarks Portrait',
    description: 'Gate, TV Tower & bears in one scene',
    fullPrompt:
      'Celebratory Berlin portrait for I/O Connect 2026: Brandenburg Gate, Fernsehturm and United Buddy Bears arranged around the person with overlapping Google gradient braces and globe motifs on black — GDG London community at the Berlin event.' +
      GUARDRAILS,
    category: 'heritage',
    emoji: '🏙️',
  },
  {
    id: 'connect-gemini',
    title: 'Gemini at I/O Connect',
    description: 'Gemini AI sparkle on a conference portrait',
    fullPrompt:
      'Polished conference portrait with Gemini AI magic: floating four-pointed stars, soft yellow glow halo, blue and green gradient orbs orbiting the person. Black background matching I/O Connect Berlin RSVP page, premium shareable social photo from Berlin 2026.' +
      GUARDRAILS,
    category: 'heritage',
    emoji: '🤖',
  },
  {
    id: 'connect-community',
    title: 'Global Dev Community',
    description: 'Globe · cloud · Android — the Connect motif set',
    fullPrompt:
      'Show the person surrounded by the iconic I/O Connect icon set: wireframe globe, Android mascot silhouette, cloud shape and sparkle star — all with overlapping Google color gradients on black. Welcoming, inclusive developer community portrait at I/O Connect Berlin 2026 with GDG London.' +
      GUARDRAILS,
    category: 'heritage',
    emoji: '🌍',
  },

  // Shareable fun
  {
    id: 'fun-postcard',
    title: 'Berlin Postcard',
    description: 'Shareable keepsake from I/O Connect Berlin',
    fullPrompt:
      'Cheerful postcard-style portrait with Berlin icons — Brandenburg Gate, TV Tower, Buddy Bears — framing the person. Bright, friendly, Instagram-ready with Google gradient border accents and I/O Connect Berlin 2026 celebratory mood.' +
      GUARDRAILS,
    category: 'fun',
    emoji: '📮',
  },
  {
    id: 'fun-linkedin',
    title: 'LinkedIn Ready',
    description: 'Professional headshot for your network',
    fullPrompt:
      'Clean professional headshot with soft bokeh and a hint of Berlin skyline — Fernsehturm or Brandenburg Gate in the distance. Flattering I/O Connect conference lighting, subtle Google blue accent rim light, perfect for LinkedIn after Google I/O Connect Berlin 2026.' +
      GUARDRAILS,
    category: 'fun',
    emoji: '💼',
  },
];

export function getPromptById(id: string): PhotoPrompt | undefined {
  return prompts.find((p) => p.id === id);
}

export function getPromptsByCategory(
  category: 'heritage' | 'celebration' | 'innovation' | 'fun'
): PhotoPrompt[] {
  return prompts.filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const categories = prompts.map((p) => p.category);
  return Array.from(new Set(categories)).sort();
}

export function getPromptsBySearch(query: string): PhotoPrompt[] {
  const lowerQuery = query.toLowerCase();
  return prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
}

export const CITY_CATEGORIES = [
  { id: 'innovation', label: 'Berlin' },
  { id: 'heritage', label: 'I/O Connect' },
  { id: 'fun', label: 'Share' },
] as const;
