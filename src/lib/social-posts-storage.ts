/**
 * Client-side persistence for AI-generated social posts, keyed by attendee email.
 * Avoids repeat Gemini calls when the user revisits or picks a saved caption.
 */

const STORAGE_KEY = 'io_connect_social_posts_v1';
const MAX_POSTS_PER_EMAIL = 40;

export interface StoredSocialPost {
  id: string;
  email: string;
  caption: string;
  createdAt: string;
  photoCode?: string;
  userName?: string;
  promptTitle?: string;
  backgroundName?: string;
  workshopTrackLabel?: string;
  sessionTakeaway?: string;
}

type SocialPostsStore = Record<string, StoredSocialPost[]>;

export function normalizeSocialPostsEmail(email: string): string {
  return email.trim().toLowerCase();
}

function readStore(): SocialPostsStore {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as SocialPostsStore;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: SocialPostsStore): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Quota exceeded or private mode — ignore
  }
}

function sortNewestFirst(posts: StoredSocialPost[]): StoredSocialPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function listSocialPosts(email: string): StoredSocialPost[] {
  const key = normalizeSocialPostsEmail(email);
  if (!key) return [];
  const store = readStore();
  return sortNewestFirst(store[key] ?? []);
}

export function findSocialPostForPhoto(
  email: string,
  photoCode?: string
): StoredSocialPost | undefined {
  if (!photoCode?.trim()) return undefined;
  const code = photoCode.trim();
  return listSocialPosts(email).find((post) => post.photoCode === code);
}

export function saveSocialPost(
  email: string,
  post: Omit<StoredSocialPost, 'id' | 'email' | 'createdAt'>
): StoredSocialPost {
  const key = normalizeSocialPostsEmail(email);
  const store = readStore();
  const existing = store[key] ?? [];

  const entry: StoredSocialPost = {
    id: `sp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    email: key,
    createdAt: new Date().toISOString(),
    ...post,
    caption: post.caption.trim(),
  };

  const next = sortNewestFirst([entry, ...existing]).slice(0, MAX_POSTS_PER_EMAIL);
  store[key] = next;
  writeStore(store);
  return entry;
}

export function previewSocialPostCaption(caption: string, max = 72): string {
  const oneLine = caption.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= max) return oneLine;
  return `${oneLine.slice(0, max - 1)}…`;
}
