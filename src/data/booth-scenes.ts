/**
 * Curated booth experiences — one tap picks background + Gemini magic together.
 */

import { getBackgroundById } from '@/data/backgrounds';
import { getPromptById } from '@/data/prompts';
import type { Background, PhotoPrompt } from '@/types';

export interface BoothScene {
  id: string;
  title: string;
  description: string;
  emoji: string;
  backgroundId: string;
  promptId: string;
  category: 'berlin' | 'io-connect';
  featured?: boolean;
}

/** Featured experiences shown on the combined scene picker (step 3). */
export const BOOTH_SCENES: BoothScene[] = [
  {
    id: 'scene-hello-berlin',
    title: 'Hello Berlin Portal',
    description: 'Brandenburg Gate · gradient braces · arrival energy',
    emoji: '🚪',
    backgroundId: 'berlin-brandenburg',
    promptId: 'berlin-hello',
    category: 'berlin',
    featured: true,
  },
  {
    id: 'scene-tv-tower',
    title: 'Fernsehturm Night',
    description: 'TV Tower glow · neon Alexanderplatz · your face in the sphere',
    emoji: '📡',
    backgroundId: 'berlin-tvtower',
    promptId: 'berlin-tv-tower',
    category: 'berlin',
    featured: true,
  },
  {
    id: 'scene-buddy-bears',
    title: 'Bear Hug Berlin',
    description: 'United Buddy Bears · high-five · street party joy',
    emoji: '🐻',
    backgroundId: 'berlin-buddy-bears',
    promptId: 'berlin-buddy-bears',
    category: 'berlin',
    featured: true,
  },
  {
    id: 'scene-east-side',
    title: 'Mural Cameo',
    description: 'East Side Gallery · Kreuzberg art · you in the mural',
    emoji: '🎨',
    backgroundId: 'berlin-east-side',
    promptId: 'berlin-east-side',
    category: 'berlin',
  },
  {
    id: 'scene-connect-art',
    title: 'I/O Connect Art',
    description: 'Official braces, globe & Android · inside the event visual',
    emoji: '✨',
    backgroundId: 'connect-braces',
    promptId: 'berlin-connect-art',
    category: 'io-connect',
    featured: true,
  },
  {
    id: 'scene-gemini',
    title: 'Gemini Orbit',
    description: 'AI sparkle stars · yellow halo · Build with Gemini',
    emoji: '🤖',
    backgroundId: 'connect-gemini',
    promptId: 'connect-gemini',
    category: 'io-connect',
    featured: true,
  },
  {
    id: 'scene-keynote',
    title: 'Keynote Moment',
    description: 'On stage at I/O Connect · GDG London · spotlight on you',
    emoji: '🎤',
    backgroundId: 'berlin-hello-art',
    promptId: 'berlin-gdg-stage',
    category: 'io-connect',
    featured: true,
  },
  {
    id: 'scene-wrap',
    title: "That's a Wrap!",
    description: 'Finale confetti · Berlin night · celebration portrait',
    emoji: '🎉',
    backgroundId: 'berlin-night-skyline',
    promptId: 'berlin-connect-wrap',
    category: 'io-connect',
  },
];

export const SCENE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'berlin', label: 'Berlin' },
  { id: 'io-connect', label: 'I/O Connect' },
] as const;

export function filterScenes(category: string): BoothScene[] {
  if (category === 'all') return BOOTH_SCENES;
  return BOOTH_SCENES.filter((s) => s.category === category);
}

export function getBoothSceneById(id: string): BoothScene | undefined {
  return BOOTH_SCENES.find((s) => s.id === id);
}

export function resolveBoothScene(scene: BoothScene): {
  background: Background;
  prompt: PhotoPrompt;
} | null {
  const background = getBackgroundById(scene.backgroundId);
  const prompt = getPromptById(scene.promptId);
  if (!background || !prompt) return null;
  return { background, prompt };
}

/** Default studio background when the guest writes a custom prompt. */
export const CUSTOM_SCENE_BACKGROUND_ID = 'connect-gradient';
