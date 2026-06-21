'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePhotoBoothStore } from '@/store/photo-booth';
import { downloadImage, printPhoto } from '@/lib/photo-actions';
import { fetchCompositedPhoto } from '@/lib/composit-client';
import { isApiSessionError } from '@/lib/core/api-client';
import { useAppConfig } from '@/components/providers/app-config-provider';
import { WizardLayout } from '@/components/io-connect/WizardLayout';
import { SocialSharePanel } from '@/components/photo-booth/SocialSharePanel';

function ResultSocialShare({
  compositedPhoto,
  userName,
  photoCode,
  promptTitle,
  backgroundName,
  company,
  companyDescription,
  role,
  headline,
}: {
  compositedPhoto: string;
  userName: string;
  photoCode: string;
  promptTitle: string;
  backgroundName: string;
  company?: string;
  companyDescription?: string;
  role?: string;
  headline?: string;
}) {
  return (
    <Suspense fallback={null}>
      <SocialSharePanel
        compositedPhoto={compositedPhoto}
        userName={userName}
        photoCode={photoCode}
        promptTitle={promptTitle}
        backgroundName={backgroundName}
        company={company}
        companyDescription={companyDescription}
        role={role}
        headline={headline}
        returnPath="/result"
      />
    </Suspense>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const { branding, features } = useAppConfig();
  const session = usePhotoBoothStore((state) => state.session);
  const capturedPhoto = usePhotoBoothStore((state) => state.capturedPhoto);
  const compositedPhotoUrl = usePhotoBoothStore((state) => state.compositedPhotoUrl);
  const storedPhotoCode = usePhotoBoothStore((state) => state.photoCode);
  const sitecoreAttendeePage = usePhotoBoothStore((state) => state.sitecoreAttendeePage);
  const sitecoreSyncError = usePhotoBoothStore((state) => state.sitecoreSyncError);
  const selectedBackground = usePhotoBoothStore((state) => state.selectedBackground);
  const selectedPrompt = usePhotoBoothStore((state) => state.selectedPrompt);
  const attendeeProfile = usePhotoBoothStore((state) => state.attendeeProfile);
  const resetSession = usePhotoBoothStore((state) => state.resetSession);
  const setCompositedPreview = usePhotoBoothStore((state) => state.setCompositedPreview);

  const [fallbackPhotoCode] = useState(() => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${branding.photoCodePrefix}${timestamp}${random}`;
  });
  const photoCode = storedPhotoCode ?? fallbackPhotoCode;

  const originalPhoto = capturedPhoto;
  const compositedPhoto = compositedPhotoUrl ?? capturedPhoto;
  const hasBoth =
    Boolean(capturedPhoto && compositedPhotoUrl && capturedPhoto !== compositedPhotoUrl);

  const [downloading, setDownloading] = useState<'original' | 'composite' | null>(null);
  const [regenerating, setRegenerating] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!session || !compositedPhoto || !selectedBackground || !selectedPrompt) {
      router.push('/input');
    }
  }, [session, compositedPhoto, selectedBackground, selectedPrompt, router]);

  const handleCreateNew = () => {
    resetSession();
    router.push('/input');
  };

  const handleDownload = async (type: 'original' | 'composite') => {
    setActionError(null);
    setDownloading(type);
    try {
      const src = type === 'original' ? originalPhoto! : compositedPhoto!;
      await downloadImage(src, `io-connect-${photoCode}-${type}.jpg`);
    } catch {
      setActionError('Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const handlePrint = () => {
    printPhoto(compositedPhoto!, { code: photoCode });
  };

  const handleRegenerate = async () => {
    if (!capturedPhoto || !selectedBackground || !selectedPrompt) return;
    setActionError(null);
    setRegenerating(true);
    try {
      const next = await fetchCompositedPhoto({
        photo: capturedPhoto,
        background: selectedBackground,
        prompt: selectedPrompt,
      });
      setCompositedPreview(next);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Regeneration failed';
      setActionError(
        isApiSessionError(message)
          ? `${message} — try again in a moment.`
          : message
      );
    } finally {
      setRegenerating(false);
    }
  };

  if (!session || !compositedPhoto || !selectedBackground || !selectedPrompt)
    return null;

  return (
    <WizardLayout step={5} totalSteps={5} backHref="/" title="Your Photo" wide>
      <div className="w-full space-y-6 animate-fade-in">
          <div className="text-center">
            <h2 className="wizard-title mb-2">Your Photo: {photoCode}</h2>
            <p className="wizard-subtitle">
              Share this code to find your photo in the gallery
            </p>
          </div>

          <div
            className={`grid gap-5 ${hasBoth ? 'md:grid-cols-2' : 'grid-cols-1'}`}
          >
            {hasBoth && originalPhoto && (
              <div className="wizard-card p-4 space-y-3">
                <p className="text-sm font-bold text-io-subtle uppercase tracking-wide text-center">
                  Original
                </p>
                <img
                  src={originalPhoto}
                  alt="Your original photo"
                  className="w-full rounded-lg border border-white/15 object-contain max-h-[360px] bg-black/50 mx-auto"
                />
                <button
                  type="button"
                  disabled={downloading !== null}
                  onClick={() => handleDownload('original')}
                  className="w-full wizard-secondary-btn text-sm disabled:opacity-50"
                >
                  {downloading === 'original' ? 'Downloading…' : '⬇️ Download Original'}
                </button>
              </div>
            )}

            <div className="wizard-card p-4 space-y-3 relative">
              {regenerating && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-black/80 gap-3">
                  <div className="w-12 h-12 border-4 border-google-blue border-t-transparent rounded-full animate-spin" />
                  <p className="text-io-muted text-sm">Regenerating AI photo…</p>
                </div>
              )}
              <p className="text-sm font-bold text-io-subtle uppercase tracking-wide text-center">
                {hasBoth ? 'AI Enhanced' : 'Your Photo'}
              </p>
              <p className="text-xs text-io-subtle text-center">
                Portrait · ready to print or share
              </p>
              <img
                src={compositedPhoto}
                alt="Your AI-transformed photo"
                className="w-full max-w-xs mx-auto rounded-lg border-2 border-white/20 object-contain aspect-[100/148] bg-black/40"
              />
              <button
                type="button"
                disabled={downloading !== null || regenerating}
                onClick={() => void handleRegenerate()}
                className="w-full wizard-secondary-btn text-sm disabled:opacity-50"
              >
                {regenerating ? 'Regenerating…' : '🔄 Regenerate AI Photo'}
              </button>
              <button
                type="button"
                disabled={downloading !== null || regenerating}
                onClick={() => handleDownload('composite')}
                className="w-full wizard-primary-btn text-sm disabled:opacity-50"
              >
                {downloading === 'composite' ? 'Downloading…' : '⬇️ Download Enhanced'}
              </button>
            </div>
          </div>

          {actionError && (
            <p className="text-red-400 text-sm text-center">{actionError}</p>
          )}

          <ResultSocialShare
            compositedPhoto={compositedPhoto}
            userName={session.userName}
            photoCode={photoCode}
            promptTitle={selectedPrompt.title}
            backgroundName={selectedBackground.name}
            company={attendeeProfile?.company}
            companyDescription={attendeeProfile?.companyDescription}
            role={attendeeProfile?.role}
            headline={attendeeProfile?.headline}
          />

          <div className="grid grid-cols-2 gap-4 wizard-card p-5 text-sm">
            <div>
              <p className="text-io-subtle">Scene</p>
              <p className="font-bold text-white">{selectedBackground.name}</p>
            </div>
            <div>
              <p className="text-io-subtle">Magic</p>
              <p className="font-bold text-white">{selectedPrompt.title}</p>
            </div>
            <div>
              <p className="text-io-subtle">Created by</p>
              <p className="font-bold text-white">{session.userName}</p>
            </div>
            <div>
              <p className="text-io-subtle">Code</p>
              <p className="font-bold text-white">{photoCode}</p>
            </div>
          </div>

          {features.summaryPage && (
          <Link href="/summary" className="wizard-primary-btn w-full text-center block py-4 text-lg">
            ✨ View Your I/O Connect Keepsake
          </Link>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={handlePrint}
              disabled={regenerating}
              className="wizard-secondary-btn disabled:opacity-50"
            >
              🖨️ Print
            </button>
            <button
              type="button"
              onClick={() => router.push('/gallery')}
              className="wizard-secondary-btn"
            >
              🖼️ Gallery
            </button>
            <button
              type="button"
              onClick={handleCreateNew}
              className="wizard-primary-btn col-span-2 md:col-span-1"
            >
              📸 New Photo
            </button>
          </div>
        </div>
    </WizardLayout>
  );
}
