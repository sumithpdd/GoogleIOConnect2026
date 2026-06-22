/**
 * AI prompts — Google I/O Connect Berlin 2026 · GDG London community
 * Face-forward, interactive scenes: the attendee is inside the experience, not pasted on top.
 */

import { PhotoPrompt } from '@/types';

/** Appended to every preset — keeps Gemini on-brand and face-safe. */
export const PROMPT_GUARDRAILS =
  'EVENT CONTEXT: Google I/O Connect Berlin 2026 photo booth · GDG London · Berlin. ' +
  'Black-background aesthetic with luminous Google gradients (blue #4285F4, red #EA4335, yellow #FBBC04, green #34A853). ' +
  'Semi-transparent globe, cloud, Android and code-brace motifs like official I/O Connect Berlin art. ' +
  'FACE AS HERO: keep the person\'s face sharp, expressive, well-lit and unmistakably recognizable — they are the star of an interactive moment, not a cutout. ' +
  'Show natural pose, eye contact or purposeful gaze, hands or body language interacting with the scene when it fits. ' +
  'Remove the original indoor/webcam background completely; blend the person into one seamless photorealistic portrait with matching light, shadows and perspective — never a collage or pasted strip. ' +
  'Do not draw logos, stickers or readable text — the GDG London Berlin 2026 watermark is added after generation.';

const G = ` ${PROMPT_GUARDRAILS}`;

export const prompts: PhotoPrompt[] = [
  // ─── Berlin · immersive city experiences ───────────────────────────────────
  {
    id: 'berlin-hello',
    title: 'Hello Berlin Portal',
    description: 'Step through giant gradient braces · Gate behind you',
    fullPrompt:
      'Interactive Hello Berlin moment: the person stepping forward through enormous luminous Google-gradient code braces { } like a portal, Brandenburg Gate glowing behind them, arms slightly open in welcome. Their face catches warm key light from the gate; braces cast colored rim light on cheeks and hair. Black sky, overlapping globe and cloud shapes — they are arriving at I/O Connect Berlin, not posing in front of a poster.' +
      G,
    category: 'innovation',
    emoji: '🚪',
  },
  {
    id: 'berlin-connect-art',
    title: 'Inside the Art',
    description: 'You among braces, globe & Android sparkle',
    fullPrompt:
      'Immersive official I/O Connect Berlin art: the person standing inside the composition — gradient curly braces framing their shoulders, a friendly semi-transparent Android mascot waving beside them at shoulder height, four-pointed Gemini sparkle near their temple, wireframe globe and soft cloud icons overlapping at different depths. Face lit by multicolor gradient bounce; colors mix where shapes overlap on pure black.' +
      G,
    category: 'innovation',
    emoji: '✨',
  },
  {
    id: 'berlin-tv-tower',
    title: 'Tower Sphere Reflection',
    description: 'Your face mirrored in the Fernsehturm globe',
    fullPrompt:
      'Cinematic night at Alexanderplatz: the person in the foreground laughing or looking up with wonder while the Berlin TV Tower rises behind them — their face subtly reflected in the tower\'s glowing sphere. Wet pavement neon, Google gradient light trails swirling around their silhouette like developer energy, subtle code-brace constellations in the sky. Interactive urban tech portrait — wind in hair, city alive around them.' +
      G,
    category: 'innovation',
    emoji: '📡',
  },
  {
    id: 'berlin-buddy-bears',
    title: 'Bear Hug Berlin',
    description: 'High-five a United Buddy Bear · street party',
    fullPrompt:
      'Joyful street moment: the person high-fiving or hugging a tall colorful United Buddy Bear sculpture — bears arm-in-arm along a sunny Berlin plaza. Person\'s face beaming, mid-laugh or playful grin; bear paint patterns reflected as soft color on their skin. Optimistic I/O Connect community energy, Google gradient sun flares between sculptures, welcoming developer networking vibe.' +
      G,
    category: 'innovation',
    emoji: '🐻',
  },
  {
    id: 'berlin-city-bear',
    title: 'Berlin Bear Selfie',
    description: 'Selfie with the city mascot · Gate at dusk',
    fullPrompt:
      'Playful selfie-style composition: the person holding an imaginary phone or leaning toward camera while a stylized Berliner Bär mascot leans in from the side — both faces close, fun friendship energy. Brandenburg Gate at golden dusk behind them, festive I/O Connect glow, Build with Gemini sparkle particles drifting past their cheeks.' +
      G,
    category: 'innovation',
    emoji: '🧸',
  },
  {
    id: 'berlin-east-side',
    title: 'Mural Cameo',
    description: 'You painted into East Side Gallery art',
    fullPrompt:
      'Creative East Side Gallery scene: the person\'s portrait stylized as if they are part of the Berlin Wall mural — bold street-art brush strokes and Kreuzberg colors flowing around their shoulders while their real face stays photorealistic and expressive at center. They reach toward the mural or point at a painted motif; Spree river light, Google gradient accents woven into the artwork like modern digital paint.' +
      G,
    category: 'innovation',
    emoji: '🎨',
  },
  {
    id: 'berlin-gdg-stage',
    title: 'Keynote Moment',
    description: 'On stage · spotlight · GDG London crowd',
    fullPrompt:
      'Dynamic on-stage portrait: the person mid-gesture delivering a keynote at I/O Connect Berlin — one hand raised, confident smile, face lit by professional conference spotlight with soft audience bokeh (GDG London community). Hello Berlin art on LED screens, Google gradient stage edges, subtle lens flare. They own the moment — interactive speaker energy, not a static headshot.' +
      G,
    category: 'innovation',
    emoji: '🎤',
  },
  {
    id: 'berlin-connect-wrap',
    title: "That's a Wrap!",
    description: 'Confetti · stage lights · victory pose',
    fullPrompt:
      'Finale celebration: the person throwing hands up or clapping in a shower of Gemini sparkle confetti after a full day of AI/Android/web/cloud tracks. Warm stage wash on their face, joyful open expression, colorful Buddy Bear silhouettes soft in background, black sky with Google gradient firework bursts — pure "we did it" group-photo energy with them as the emotional center.' +
      G,
    category: 'innovation',
    emoji: '🎉',
  },
  {
    id: 'berlin-spree-golden',
    title: 'Spree Golden Hour',
    description: 'River boat · wind · Berlin skyline',
    fullPrompt:
      'Golden-hour adventure on the Spree: the person on a boat deck, wind in hair, face glowing in sunset light, Berlin skyline and Oberbaum Bridge behind them. They lean on the rail or wave to someone off-camera — candid travel moment. Warm oranges mixed with Google blue-green accent reflections on water, relaxed post-conference joy.' +
      G,
    category: 'innovation',
    emoji: '🌅',
  },
  {
    id: 'berlin-code-storm',
    title: 'Code Storm',
    description: 'Gradient code swirls around your face',
    fullPrompt:
      'Developer power portrait: streams of luminous Google-gradient code characters and curly braces spiraling around the person like a gentle storm — face calm and focused at the eye of the vortex, rim-lit in four colors. Black void background, Android sparkle at their shoulder, sense of building something extraordinary at I/O Connect Berlin.' +
      G,
    category: 'innovation',
    emoji: '💻',
  },

  // ─── I/O Connect · AI & community magic ────────────────────────────────────
  {
    id: 'connect-berlin-landmarks',
    title: 'Landmark Halo',
    description: 'Mini Berlin icons orbit your shoulders',
    fullPrompt:
      'Surreal but photoreal celebratory portrait: miniature holographic Brandenburg Gate, Fernsehturm and Buddy Bears orbiting the person\'s shoulders like a personal Berlin solar system. Face forward, delighted expression, gradient braces arching overhead, globe motif behind their head — GDG London at I/O Connect 2026, them at the center of the city.' +
      G,
    category: 'heritage',
    emoji: '🏙️',
  },
  {
    id: 'connect-gemini',
    title: 'Gemini Orbit',
    description: 'AI stars circle your face · yellow halo',
    fullPrompt:
      'Gemini AI magic portrait: four-pointed sparkle stars and soft yellow halos orbiting the person\'s head like satellites, blue-green gradient orbs tracing paths near their cheeks. Face sharp and lit from within by gentle AI glow — curious, inspired expression as if ideas are forming. Black I/O Connect background, premium shareable social photo.' +
      G,
    category: 'heritage',
    emoji: '🤖',
  },
  {
    id: 'connect-community',
    title: 'Global Connect',
    description: 'Globe in your hands · worldwide devs',
    fullPrompt:
      'Inclusive community moment: the person cupping or presenting a glowing wireframe globe at chest height, face illuminated from below by its light — warm welcoming smile. Android silhouette and cloud shapes drift behind them, sparkle star near one eye, overlapping Google gradients on black. They are connecting the world at I/O Connect Berlin 2026.' +
      G,
    category: 'heritage',
    emoji: '🌍',
  },
  {
    id: 'connect-android-friend',
    title: 'Android Sidekick',
    description: 'Friendly Android mascot · arm around you',
    fullPrompt:
      'Wholesome conference buddy shot: a friendly semi-transparent Android mascot with arm around the person\'s shoulders, both looking at camera — person laughing or grinning, face fully visible. Gradient braces and cloud icons in background, black stage aesthetic, GDG London community warmth.' +
      G,
    category: 'heritage',
    emoji: '🤖',
  },
  {
    id: 'connect-neural',
    title: 'Neural Spark',
    description: 'Glowing threads from mind to globe',
    fullPrompt:
      'Futuristic builder portrait: delicate luminous neural threads flowing from the person\'s temples toward a floating globe and sparkle star — face thoughtful then breaking into a smile, eyes bright. Google four-color light along the threads, black background, sense of ideas traveling from human to AI at I/O Connect Berlin.' +
      G,
    category: 'heritage',
    emoji: '🧠',
  },
  {
    id: 'connect-particle-edge',
    title: 'Gemini Dissolve',
    description: 'Sparkle particles at the edges · face intact',
    fullPrompt:
      'Creative edge effect only: the person\'s face and core portrait stay crisp and photorealistic while shoulders and background dissolve into ascending Gemini sparkle particles and gradient mist — as if they are materializing from AI magic. Dramatic but face-safe; black void, I/O Connect Berlin energy.' +
      G,
    category: 'heritage',
    emoji: '✨',
  },

  // ─── Share · social-ready moments ──────────────────────────────────────────
  {
    id: 'fun-postcard',
    title: 'Berlin Postcard',
    description: 'Cheerful keepsake · icons frame your smile',
    fullPrompt:
      'Bright postcard moment: the person waving or making a peace sign, big genuine smile, Berlin icons (Gate, Tower, bears) arranged as a playful frame around them — not blocking the face. Sunny optimistic mood, Google gradient border glow, Instagram-ready I/O Connect Berlin 2026 keepsake.' +
      G,
    category: 'fun',
    emoji: '📮',
  },
  {
    id: 'fun-linkedin',
    title: 'LinkedIn Ready',
    description: 'Confident pro · soft Berlin bokeh',
    fullPrompt:
      'Polished professional portrait: the person with confident approachable expression, slight head tilt, soft Berlin skyline bokeh (Fernsehturm or Gate) behind them. Flattering conference rim light in Google blue, subtle gradient accent on one cheek — perfect LinkedIn headshot after I/O Connect Berlin 2026.' +
      G,
    category: 'fun',
    emoji: '💼',
  },
  {
    id: 'fun-festival',
    title: 'Festival Mode',
    description: 'Hands up · light trails · pure joy',
    fullPrompt:
      'Berlin festival energy: the person with hands raised, huge smile, face lit by moving Google-gradient light trails and soft bokeh orbs — as if dancing at an outdoor dev after-party. Motion suggested in background only; face frozen sharp and happy. Celebratory, shareable, unforgettable.' +
      G,
    category: 'fun',
    emoji: '🪩',
  },
  {
    id: 'fun-hero-pose',
    title: 'Dev Hero',
    description: 'Comic energy lines · confident power pose',
    fullPrompt:
      'Playful hero portrait: the person in a confident power pose (hands on hips or arms crossed), slight smirk or determined grin — subtle stylized energy lines and gradient speed accents radiating behind them like a conference superhero poster. Face fully realistic; fun but flattering, I/O Connect Berlin swagger.' +
      G,
    category: 'fun',
    emoji: '🦸',
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
