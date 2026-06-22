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
    description: 'Download, print, or share your I/O Connect keepsake.',
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
