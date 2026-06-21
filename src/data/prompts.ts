/**
 * AI prompts — Google I/O Connect Berlin 2026 · London & Berlin
 * Themed to match https://rsvp.withgoogle.com/events/ioconnect-berlin-2026
 */

import { PhotoPrompt } from '@/types';

const GUARDRAILS =
  ' Google I/O Connect Berlin 2026 photo booth. Black background aesthetic with luminous Google gradient accents (blue #4285F4, red #EA4335, yellow #FBBC04, green #34A853). Semi-transparent globe, cloud, Android and code-brace motifs like the official event art. Photorealistic portrait. Do not draw logos or stickers in the scene — the GDG London Berlin 2026 watermark is added after generation.';

export const prompts: PhotoPrompt[] = [
  // London — GDG London / Thames-side
  {
    id: 'london-hello',
    title: 'Hello from London',
    description: 'Thames skyline · Tower Bridge · GDG London energy',
    fullPrompt:
      'Place the person on the South Bank with Tower Bridge, Big Ben and the London Eye behind them at blue hour. Warm street lights, developer community meetup vibe, subtle Google four-color gradient glow in the sky like I/O Connect art.' +
      GUARDRAILS,
    category: 'celebration',
    emoji: '🇬🇧',
  },
  {
    id: 'london-gdg-stage',
    title: 'GDG London Stage',
    description: 'On stage at a Google developer event in London',
    fullPrompt:
      'Show the person presenting on a GDG London DevFest stage with audience silhouettes, professional conference lighting, and a cinematic London skyline visible through floor-to-ceiling windows. Google I/O Connect gradient accents on stage edges.' +
      GUARDRAILS,
    category: 'celebration',
    emoji: '🎤',
  },
  {
    id: 'london-eye-view',
    title: 'London Eye Perspective',
    description: 'Panoramic view from the Thames and the London Eye',
    fullPrompt:
      'Portrait with the London Eye and Westminster in soft focus behind the person. Golden sunset, red bus blur in the distance, celebratory I/O Connect developer event atmosphere with floating gradient sparkle shapes.' +
      GUARDRAILS,
    category: 'celebration',
    emoji: '🎡',
  },

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
    id: 'berlin-connect-wrap',
    title: "That's a Wrap — Berlin",
    description: 'Conference finale · dev community · Gemini',
    fullPrompt:
      'End-of-conference celebration portrait inspired by I/O Connect Berlin: the person in a lively developer community moment after a full day of keynotes and AI/Android/web/cloud tracks. Confetti-like Gemini sparkle particles, warm stage lighting, colorful Berlin Buddy Bear silhouette in soft focus, black background with Google gradient accents — joyful "that\'s a wrap" group-photo energy.' +
      GUARDRAILS,
    category: 'innovation',
    emoji: '🎉',
  },

  // London ↔ Berlin Connect
  {
    id: 'connect-two-cities',
    title: 'London ↔ Berlin Connect',
    description: 'Two cities, one developer journey',
    fullPrompt:
      'Split composition: London landmarks (Tower Bridge, red bus) on the left merging into Berlin landmarks (Brandenburg Gate, TV Tower) on the right. Person centered on the divide with a luminous Google gradient bridge connecting both cities — I/O Connect community portrait.' +
      GUARDRAILS,
    category: 'heritage',
    emoji: '🌉',
  },
  {
    id: 'connect-gemini',
    title: 'Gemini at I/O Connect',
    description: 'Gemini AI sparkle on a conference portrait',
    fullPrompt:
      'Polished conference portrait with Gemini AI magic: floating four-pointed stars, soft yellow glow halo, blue and green gradient orbs orbiting the person. Black background matching I/O Connect Berlin RSVP page, premium shareable social photo.' +
      GUARDRAILS,
    category: 'heritage',
    emoji: '🤖',
  },
  {
    id: 'connect-community',
    title: 'Global Dev Community',
    description: 'Globe · cloud · Android — the Connect motif set',
    fullPrompt:
      'Show the person surrounded by the iconic I/O Connect icon set: wireframe globe, Android mascot silhouette, cloud shape and sparkle star — all with overlapping Google color gradients on black. Welcoming, inclusive developer community portrait for London and Berlin attendees.' +
      GUARDRAILS,
    category: 'heritage',
    emoji: '🌍',
  },

  // Shareable fun
  {
    id: 'fun-postcard',
    title: 'London & Berlin Postcard',
    description: 'Shareable keepsake from both cities',
    fullPrompt:
      'Cheerful postcard-style portrait combining London and Berlin icons in a collage frame around the person. Bright, friendly, Instagram-ready with Google gradient border accents and I/O Connect 2026 celebratory mood.' +
      GUARDRAILS,
    category: 'fun',
    emoji: '📮',
  },
  {
    id: 'fun-linkedin',
    title: 'LinkedIn Ready',
    description: 'Professional headshot for your network',
    fullPrompt:
      'Clean professional headshot with soft bokeh and a hint of London or Berlin skyline. Flattering conference lighting, subtle Google blue accent rim light, perfect for LinkedIn after Google I/O Connect Berlin 2026.' +
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
  { id: 'celebration', label: 'London' },
  { id: 'innovation', label: 'Berlin' },
  { id: 'heritage', label: 'I/O Connect' },
  { id: 'fun', label: 'Share' },
] as const;
