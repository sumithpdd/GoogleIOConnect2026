'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoConnectLogo } from '@/components/io-connect/IoConnectLogo';
import {
  FestiveLights,
  LandingDecorations,
} from '@/components/io-connect/LandingDecorations';
import { IO_CONNECT_ASSETS } from '@/lib/io-connect-brand';
import { GdgLondonBrand } from '@/components/io-connect/GdgLondonBrand';
import { useAppConfig } from '@/components/providers/app-config-provider';
import {
  SOCIAL_SHARE_HASHTAGS,
  WORKSHOP_TRACKS,
} from '@/data/io-connect-workshops';

const STEPS = [
  {
    number: '01',
    title: 'Upload',
    description: 'Take a selfie or upload your favorite photo.',
    icon: '📸',
  },
  {
    number: '02',
    title: 'Customize',
    description: 'Apply exclusive Berlin & I/O Connect AI filters powered by Gemini.',
    icon: '✨',
  },
  {
    number: '03',
    title: 'Share',
    description:
      'Get an AI-written social post and share your creation with #GoogleIOConnect & #BuildWithGemini.',
    icon: '📬',
  },
];

export default function Home() {
  const { branding, features } = useAppConfig();

  return (
    <div className="landing-page min-h-screen flex flex-col">
      <LandingDecorations />
      <FestiveLights />

      <header className="landing-header relative z-20 animate-slide-down">
        <div className="landing-header-inner">
          <IoConnectLogo />
          {features.gallery && (
            <Link href="/gallery" className="landing-nav-link">
              Gallery
            </Link>
          )}
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <section className="w-full max-w-5xl mx-auto px-2 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <p className="landing-eyebrow">Google I/O Connect 2026</p>
              <h1 className="landing-hero-title">
                Send a Smile
                <br />
                <span className="landing-gradient-text">From Berlin</span>
              </h1>
              <p className="landing-hero-subtitle">
                GDG London invites you to Google I/O Connect Berlin 2026 — upload your photo,
                add a touch of AI magic with Gemini, and take home a keepsake from the event.
              </p>
            </div>

            <div className="landing-hero-actions">
              <Link href="/input" className="landing-cta-btn">
                Start Experience
              </Link>

              <a
                href={branding.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-event-link"
              >
                Event details
                <span className="landing-event-link__arrow" aria-hidden>
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="landing-photo-stack animate-fade-in">
            {IO_CONNECT_ASSETS.samplePhotos.map((src, i) => (
              <div
                key={src}
                className={`landing-photo-card landing-photo-card--${i}`}
              >
                <Image
                  src={src}
                  alt="AI photo sample"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 200px, 280px"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="landing-beyond-section max-w-4xl mx-auto px-4 w-full animate-slide-up">
          <div className="landing-beyond-card">
            <p className="landing-eyebrow">Go beyond the basics</p>
            <h2 className="landing-beyond-title">Automatic AI social posts</h2>
            <p className="landing-beyond-lead">
              Complete a workshop across AI, Android, Chrome, or Cloud — or a session at the View
              Lounge — then create your photo. Gemini writes a ready-to-post caption so you can
              share what you built with the community online.
            </p>

            <ul className="landing-beyond-tracks">
              {WORKSHOP_TRACKS.map((track) => (
                <li key={track.id} className="landing-beyond-track">
                  <span className="landing-beyond-track__label">{track.label}</span>
                  <span className="landing-beyond-track__desc">{track.description}</span>
                </li>
              ))}
            </ul>

            <p className="landing-beyond-share-prompt">
              Share on your social networks what you created — with a key takeaway, a new feature,
              or a light-bulb moment from the process.
            </p>

            <div className="landing-hashtag-row" aria-label="Event hashtags for social posts">
              {SOCIAL_SHARE_HASHTAGS.map((tag) => (
                <span
                  key={tag}
                  className={
                    tag === '#GoogleIOConnect' || tag === '#BuildWithGemini'
                      ? 'landing-hashtag landing-hashtag--primary'
                      : 'landing-hashtag'
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-steps-section max-w-6xl mx-auto px-4 pb-16 md:pb-24">
          <div className="grid md:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="landing-step-card animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="landing-step-number">{step.number}</span>
                <span className="landing-step-icon" aria-hidden>
                  {step.icon}
                </span>
                <h3 className="landing-step-title">{step.title}</h3>
                <p className="landing-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="landing-footer relative z-20 io-footer-enter">
        <div className="landing-footer-inner">
          <GdgLondonBrand />
          <p className="landing-footer-meta">
            Powered by Google Gemini AI ·{' '}
            <a
              href={branding.eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="landing-footer-link"
            >
              I/O Connect Berlin 2026
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
