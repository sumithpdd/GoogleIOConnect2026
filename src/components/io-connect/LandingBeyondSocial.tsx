'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/core/api-client';
import {
  listSocialPosts,
  previewSocialPostCaption,
  saveSocialPost,
  type StoredSocialPost,
} from '@/lib/social-posts-storage';
import {
  getWorkshopTrackLabel,
  WORKSHOP_TRACKS,
  type WorkshopTrackId,
} from '@/data/io-connect-workshops';
import { ensureSocialPostFormatted } from '@/lib/linkedin/social-post-format';
import { SocialPostTagsBlock } from '@/components/photo-booth/SocialPostTagsBlock';

const LAST_EMAIL_KEY = 'io_connect_last_email_v1';

function formatPostDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function readRememberedEmail(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(LAST_EMAIL_KEY)?.trim() ?? '';
  } catch {
    return '';
  }
}

function rememberEmail(email: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LAST_EMAIL_KEY, email.trim().toLowerCase());
  } catch {
    // ignore
  }
}

export function LandingBeyondSocial() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [workshopTrack, setWorkshopTrack] = useState<WorkshopTrackId | ''>('');
  const [sessionTakeaway, setSessionTakeaway] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [savedPosts, setSavedPosts] = useState<StoredSocialPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);

  const emailKey = email.trim().toLowerCase();
  const workshopTrackLabel = getWorkshopTrackLabel(workshopTrack || undefined);

  const refreshPosts = useCallback(() => {
    if (!emailKey) {
      setSavedPosts([]);
      return;
    }
    setSavedPosts(listSocialPosts(emailKey));
  }, [emailKey]);

  useEffect(() => {
    const remembered = readRememberedEmail();
    if (remembered) setEmail(remembered);
  }, []);

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  const selectPost = (post: StoredSocialPost) => {
    setCaption(post.caption);
    setSelectedPostId(post.id);
    if (post.sessionTakeaway) setSessionTakeaway(post.sessionTakeaway);
    setMessage('Loaded saved post — copy or edit below.');
    setError(null);
  };

  const handleGenerate = async () => {
    setError(null);
    setMessage(null);

    if (!emailKey) {
      setError('Enter your email to generate and save posts.');
      return;
    }
    if (!workshopTrack) {
      setError('Select the session or workshop you attended.');
      return;
    }

    const displayName = userName.trim() || emailKey.split('@')[0] || 'Attendee';
    setLoading(true);

    try {
      const res = await apiFetch('/api/social/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: displayName,
          workshopTrackLabel,
          sessionTakeaway: sessionTakeaway.trim() || undefined,
        }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        data?: { caption?: string };
        error?: string;
      };
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate post');
      }

      const generated = ensureSocialPostFormatted(json.data?.caption ?? '');
      setCaption(generated);

      const saved = saveSocialPost(emailKey, {
        caption: generated,
        userName: displayName,
        workshopTrackLabel,
        sessionTakeaway: sessionTakeaway.trim() || undefined,
      });
      setSelectedPostId(saved.id);
      rememberEmail(emailKey);
      refreshPosts();
      setMessage('Post generated and saved to your list.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!caption.trim()) return;
    const text = ensureSocialPostFormatted(caption);
    setCaption(text);
    try {
      await navigator.clipboard.writeText(text);
      setMessage('Copied to clipboard — paste on your favourite social network.');
    } catch {
      setError('Could not copy — select the text and copy manually.');
    }
  };

  const visiblePosts = showAllPosts ? savedPosts : savedPosts.slice(0, 5);

  return (
    <section className="landing-beyond-section max-w-4xl mx-auto px-4 w-full animate-slide-up">
      <div className="landing-beyond-card">
        <p className="landing-eyebrow">Go beyond the basics</p>
        <h2 className="landing-beyond-title">Automatic AI social posts</h2>
        <p className="landing-beyond-lead">
          Complete a workshop across AI, Android, Chrome, or Cloud — or a session at the View
          Lounge — then create your photo. Gemini writes a ready-to-post caption so you can share
          what you built with the community online.
        </p>

        <p className="landing-beyond-share-prompt">
          Share on your social networks what you created — with a key takeaway, a new feature, or a
          light-bulb moment from the process.
        </p>

        <SocialPostTagsBlock />

        <div className="landing-beyond-form">
          <h3 className="landing-beyond-form__title">Generate your social post</h3>
          <p className="landing-beyond-form__hint">
            No login needed — enter your email to create, save, and revisit your AI captions on
            this device.
          </p>

          <div className="landing-beyond-form__grid">
            <label className="landing-beyond-field">
              <span className="landing-beyond-field__label">Email *</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="landing-beyond-input"
                autoComplete="email"
              />
            </label>
            <label className="landing-beyond-field">
              <span className="landing-beyond-field__label">Your name</span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="How you want to sign the post"
                className="landing-beyond-input"
                autoComplete="name"
              />
            </label>
          </div>

          <fieldset className="landing-beyond-fieldset">
            <legend className="landing-beyond-field__label">
              Which session or workshop did you attend? *
            </legend>
            <ul className="landing-beyond-tracks landing-beyond-tracks--select">
              {WORKSHOP_TRACKS.map((track) => {
                const selected = workshopTrack === track.id;
                return (
                  <li key={track.id}>
                    <label
                      className={`landing-beyond-track landing-beyond-track--select ${
                        selected ? 'landing-beyond-track--selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="landing-workshop-track"
                        value={track.id}
                        checked={selected}
                        onChange={() => setWorkshopTrack(track.id)}
                        className="sr-only"
                      />
                      <span className="landing-beyond-track__label">{track.label}</span>
                      <span className="landing-beyond-track__desc">{track.description}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <label className="landing-beyond-field">
            <span className="landing-beyond-field__label">
              Key takeaway, new feature, or light-bulb moment
            </span>
            <textarea
              value={sessionTakeaway}
              onChange={(e) => setSessionTakeaway(e.target.value)}
              rows={3}
              maxLength={280}
              placeholder="What will you share from your session?"
              className="landing-beyond-input landing-beyond-input--textarea"
            />
          </label>

          <div className="landing-beyond-actions">
            <button
              type="button"
              onClick={() => void handleGenerate()}
              disabled={loading}
              className="landing-cta-btn landing-beyond-generate-btn disabled:opacity-50"
            >
              {loading ? 'Generating with Gemini…' : '✨ Generate social post'}
            </button>
            <button
              type="button"
              onClick={() => void handleCopy()}
              disabled={loading || !caption.trim()}
              className="landing-event-link landing-beyond-copy-btn disabled:opacity-50"
            >
              Copy post text
            </button>
          </div>

          {caption && (
            <label className="landing-beyond-field">
              <span className="landing-beyond-field__label">Your AI post</span>
              <textarea
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                  setSelectedPostId(null);
                }}
                rows={8}
                className="landing-beyond-input landing-beyond-input--textarea landing-beyond-caption"
                readOnly={loading}
              />
            </label>
          )}
        </div>

        {emailKey && savedPosts.length > 0 && (
          <div className="landing-beyond-posts">
            <div className="landing-beyond-posts__header">
              <h3 className="landing-beyond-form__title">
                Your saved posts ({savedPosts.length})
              </h3>
              {savedPosts.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllPosts((v) => !v)}
                  className="landing-beyond-posts__toggle"
                >
                  {showAllPosts ? 'Show fewer' : `Show all ${savedPosts.length}`}
                </button>
              )}
            </div>
            <ul className="social-posts-list landing-beyond-posts__list">
              {visiblePosts.map((post) => {
                const active = post.id === selectedPostId;
                return (
                  <li key={post.id}>
                    <button
                      type="button"
                      onClick={() => selectPost(post)}
                      className={`social-posts-list__item w-full text-left ${
                        active ? 'social-posts-list__item--active' : ''
                      }`}
                    >
                      <span className="social-posts-list__meta">
                        {formatPostDate(post.createdAt)}
                        {post.photoCode ? ` · Photo ${post.photoCode}` : ' · Home'}
                        {post.workshopTrackLabel ? ` · ${post.workshopTrackLabel}` : ''}
                      </span>
                      <span className="social-posts-list__preview">
                        {previewSocialPostCaption(post.caption, 120)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {emailKey && savedPosts.length === 0 && (
          <p className="landing-beyond-form__hint landing-beyond-posts-empty">
            No saved posts yet for this email — generate your first caption above.
          </p>
        )}

        {message && <p className="landing-beyond-feedback landing-beyond-feedback--ok">{message}</p>}
        {error && <p className="landing-beyond-feedback landing-beyond-feedback--err">{error}</p>}
      </div>
    </section>
  );
}
