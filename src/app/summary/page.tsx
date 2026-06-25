'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BoothLayout } from '@/components/common/BoothLayout';
import { SocialSharePanel } from '@/components/photo-booth/SocialSharePanel';
import { useAppConfig } from '@/components/providers/app-config-provider';
import { usePhotoBoothStore } from '@/store/photo-booth';
import {
  pickFactsForSession,
  celebrationTaglines,
} from '@/data/io-connect-facts';
import { BRAND, BRAND_ASSETS } from '@/lib/branding';
import { downloadImage, printPhoto } from '@/lib/photo-actions';
import { getWorkshopTrackLabel } from '@/data/io-connect-workshops';

function SummarySocialShare({
  compositedPhoto,
  userName,
  userEmail,
  photoCode,
  promptTitle,
  backgroundName,
  company,
  companyDescription,
  role,
  headline,
  workshopTrackLabel,
  sessionTakeaway,
}: {
  compositedPhoto: string;
  userName: string;
  userEmail?: string;
  photoCode?: string;
  promptTitle?: string;
  backgroundName?: string;
  company?: string;
  companyDescription?: string;
  role?: string;
  headline?: string;
  workshopTrackLabel?: string;
  sessionTakeaway?: string;
}) {
  return (
    <Suspense fallback={null}>
      <SocialSharePanel
        compositedPhoto={compositedPhoto}
        userName={userName}
        userEmail={userEmail}
        photoCode={photoCode}
        promptTitle={promptTitle}
        backgroundName={backgroundName}
        company={company}
        companyDescription={companyDescription}
        role={role}
        headline={headline}
        workshopTrackLabel={workshopTrackLabel}
        sessionTakeaway={sessionTakeaway}
        returnPath="/summary"
      />
    </Suspense>
  );
}

export default function SummaryPage() {
  const router = useRouter();
  const { features } = useAppConfig();
  const session = usePhotoBoothStore((s) => s.session);
  const capturedPhoto = usePhotoBoothStore((s) => s.capturedPhoto);
  const compositedPhotoUrl = usePhotoBoothStore((s) => s.compositedPhotoUrl);
  const photoCode = usePhotoBoothStore((s) => s.photoCode);
  const selectedBackground = usePhotoBoothStore((s) => s.selectedBackground);
  const selectedPrompt = usePhotoBoothStore((s) => s.selectedPrompt);
  const attendeeProfile = usePhotoBoothStore((s) => s.attendeeProfile);
  const resetSession = usePhotoBoothStore((s) => s.resetSession);

  const composited = compositedPhotoUrl ?? capturedPhoto;
  const facts = useMemo(
    () => (session ? pickFactsForSession(session.sessionId, 5) : []),
    [session]
  );
  const tagline = useMemo(() => {
    if (!session) return celebrationTaglines[0];
    const idx =
      Math.abs(session.sessionId.charCodeAt(0)) % celebrationTaglines.length;
    return celebrationTaglines[idx];
  }, [session]);

  useEffect(() => {
    if (!session || !composited) {
      router.push('/input');
    }
  }, [session, composited, router]);

  if (!session || !composited) return null;

  const handlePrintKeepsake = () => {
    printPhoto(composited, {
      code: photoCode ?? undefined,
      subtitle: `${BRAND.eventTitle} · ${BRAND.eventLocation}`,
    });
  };

  return (
    <BoothLayout>
      <div className="px-4 py-10 max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold landing-gradient-text">
            Your I/O Connect Keepsake
          </h1>
          <p className="text-io-muted text-lg max-w-xl mx-auto">{tagline}</p>
          {photoCode && (
            <p className="text-sm text-io-subtle uppercase tracking-widest">
              Photo code · {photoCode}
            </p>
          )}
        </div>

        <section className="wizard-card p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-io-muted border-b border-io-border pb-3">
            Celebrating
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-io-subtle uppercase text-xs tracking-wide">Name</p>
              <p className="text-xl font-bold">{session.userName}</p>
            </div>
            {session.userEmail && (
              <div>
                <p className="text-io-subtle uppercase text-xs tracking-wide">Email</p>
                <p className="text-io-muted">{session.userEmail}</p>
              </div>
            )}
            {selectedBackground && (
              <div>
                <p className="text-io-subtle uppercase text-xs tracking-wide">Scene</p>
                <p className="text-io-muted">{selectedBackground.name}</p>
              </div>
            )}
            {selectedPrompt && (
              <div>
                <p className="text-io-subtle uppercase text-xs tracking-wide">Magic</p>
                <p className="text-io-muted">{selectedPrompt.title}</p>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 pt-2">
            {capturedPhoto && compositedPhotoUrl && capturedPhoto !== compositedPhotoUrl && (
              <div>
                <p className="text-xs text-io-subtle mb-2 uppercase tracking-wide">Original</p>
                <img
                  src={capturedPhoto}
                  alt="Original"
                  className="w-full rounded-lg border border-io-border max-h-56 object-contain io-photo-well"
                />
              </div>
            )}
            <div className={capturedPhoto && compositedPhotoUrl ? '' : 'md:col-span-2'}>
              <p className="text-xs text-io-subtle mb-2 uppercase tracking-wide">AI Enhanced</p>
              <img
                src={composited}
                alt="Your creation"
                className="w-full rounded-lg border-2 border-google-yellow/50 max-h-56 object-contain io-photo-well"
              />
            </div>
          </div>
        </section>

        {features.socialShare && composited && (
          <SummarySocialShare
            compositedPhoto={composited}
            userName={session.userName}
            userEmail={session.userEmail}
            photoCode={photoCode ?? undefined}
            promptTitle={selectedPrompt?.title}
            backgroundName={selectedBackground?.name}
            company={attendeeProfile?.company}
            companyDescription={attendeeProfile?.companyDescription}
            role={attendeeProfile?.role}
            headline={attendeeProfile?.headline}
            workshopTrackLabel={getWorkshopTrackLabel(attendeeProfile?.workshopTrack)}
            sessionTakeaway={attendeeProfile?.sessionTakeaway}
          />
        )}

        <section className="wizard-card p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={BRAND_ASSETS.helloBerlin}
              alt=""
              className="hidden sm:block w-24 h-auto shrink-0 rounded opacity-90"
            />
            <div>
              <h2 className="text-xl font-bold text-io-muted">
                Google I/O Connect Berlin 2026
              </h2>
              <p className="text-io-subtle text-sm mt-1">
                Highlights from the developer conference — curated for your keepsake
              </p>
            </div>
          </div>

          <ul className="space-y-4">
            {facts.map((m) => (
              <li
                key={`${m.year}-${m.title}`}
                className="flex gap-4 border-l-2 border-google-blue/50 pl-4 py-1"
              >
                <span className="text-2xl font-bold shrink-0 w-16 text-google-yellow">
                  {m.year}
                </span>
                <div>
                  <p className="font-bold">{m.title}</p>
                  <p className="text-io-muted text-sm mt-0.5">{m.fact}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="wizard-card overflow-hidden">
          <img
            src={BRAND_ASSETS.gdgLondonLogo}
            alt="GDG London · Berlin 2026"
            className="w-full h-auto object-contain p-8 io-photo-well"
          />
          <p className="text-center text-xs text-io-subtle py-3 px-4">
            GDG London · Google I/O Connect Berlin 2026
          </p>
        </section>

        <section className="wizard-card p-6 text-center space-y-4">
          <p className="text-io-muted">
            Join us in {BRAND.eventLocation} for {BRAND.eventSubtitle} — {BRAND.eventTagline}.
          </p>
          <a
            href={BRAND.eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-cta-btn inline-block"
          >
            View official event page →
          </a>
        </section>

        <div className="flex flex-wrap gap-3 justify-center pb-8">
          <button
            type="button"
            className="wizard-primary-btn"
            onClick={() =>
              downloadImage(composited, `io-connect-keepsake-${photoCode ?? 'photo'}.jpg`)
            }
          >
            ⬇️ Download keepsake
          </button>
          <button type="button" className="wizard-secondary-btn" onClick={handlePrintKeepsake}>
            🖨️ Print
          </button>
          <Link href="/gallery" className="wizard-secondary-btn text-center">
            🖼️ Gallery
          </Link>
          <button
            type="button"
            className="wizard-secondary-btn"
            onClick={() => {
              resetSession();
              router.push('/input');
            }}
          >
            📸 New photo
          </button>
        </div>
      </div>
    </BoothLayout>
  );
}
