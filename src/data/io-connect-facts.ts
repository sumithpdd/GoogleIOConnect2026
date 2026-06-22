/**
 * Google I/O Connect Berlin 2026 — milestone facts for the keepsake summary page.
 */

export interface IoConnectHighlight {
  year: number;
  title: string;
  fact: string;
  category: 'event' | 'ai' | 'community' | 'android' | 'cloud';
}

export const ioConnectHighlights: IoConnectHighlight[] = [
  {
    year: 2026,
    title: 'I/O Connect Berlin',
    fact: 'Google brings I/O Connect to Berlin — a hands-on developer conference for Android, Web, Cloud, and Gemini.',
    category: 'event',
  },
  {
    year: 2026,
    title: 'Build with Gemini',
    fact: 'Sessions and labs explore Gemini-powered apps, agents, and multimodal experiences for production workloads.',
    category: 'ai',
  },
  {
    year: 2026,
    title: 'GDG London community',
    fact: 'GDG London hosts the photo booth experience — celebrating builders who learn, connect, and ship together.',
    category: 'community',
  },
  {
    year: 2026,
    title: 'Android & Web',
    fact: 'Deep dives into the latest Android, Chrome, and progressive web tooling for modern mobile and web apps.',
    category: 'android',
  },
  {
    year: 2026,
    title: 'Cloud & AI/ML',
    fact: 'Workshops cover Google Cloud, Vertex AI, and practical patterns for scaling AI features in real products.',
    category: 'cloud',
  },
  {
    year: 2026,
    title: 'Berlin developer energy',
    fact: 'Networking across keynotes, codelabs, and community meetups in one of Europe\'s leading tech capitals.',
    category: 'event',
  },
];

export const celebrationTaglines = [
  'Send a smile from Berlin.',
  'Built with Gemini. Shared with the community.',
  'Google I/O Connect Berlin 2026 · GDG London',
  'Capture the moment. Ship what\'s next.',
  'Developers learning, building, and connecting in Berlin.',
];

export function pickFactsForSession(sessionId: string, count: number): IoConnectHighlight[] {
  const seed = Math.abs(
    sessionId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  );
  const shuffled = [...ioConnectHighlights].sort(
    (a, b) =>
      ((seed + a.year * 7 + a.title.length) % 97) -
      ((seed + b.year * 7 + b.title.length) % 97)
  );
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
