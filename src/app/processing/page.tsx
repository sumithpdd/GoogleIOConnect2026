'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePhotoBoothStore } from '@/store/photo-booth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { apiFetch, isApiSessionError } from '@/lib/core/api-client';
import { fetchCompositedPhoto } from '@/lib/composit-client';
import { WizardLayout } from '@/components/io-connect/WizardLayout';
import { PageMotion } from '@/components/io-connect/PageMotion';

export default function ProcessingPage() {
  const router = useRouter();
  const session = usePhotoBoothStore((state) => state.session);
  const capturedPhoto = usePhotoBoothStore((state) => state.capturedPhoto);
  const selectedBackground = usePhotoBoothStore((state) => state.selectedBackground);
  const selectedPrompt = usePhotoBoothStore((state) => state.selectedPrompt);
  const setCompositedPhoto = usePhotoBoothStore((state) => state.setCompositedPhoto);
  const consentTermsAccepted = usePhotoBoothStore((state) => state.consentTermsAccepted);
  const consentGalleryShare = usePhotoBoothStore((state) => state.consentGalleryShare);
  const attendeeProfile = usePhotoBoothStore((state) => state.attendeeProfile);

  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const processingStarted = useRef(false);

  useEffect(() => {
    if (!session || !capturedPhoto || !selectedBackground || !selectedPrompt) {
      router.push('/input');
    }
  }, [session, capturedPhoto, selectedBackground, selectedPrompt, router]);

  const runProcessing = useCallback(async () => {
    try {
      setError(null);

      if (!capturedPhoto || !selectedBackground || !selectedPrompt) {
        throw new Error('Missing required data for processing');
      }

      const compositedPhoto = await fetchCompositedPhoto({
        photo: capturedPhoto,
        background: selectedBackground,
        prompt: selectedPrompt,
      });

      setCompositedPhoto(compositedPhoto);

      const uploadFormData = new FormData();
      uploadFormData.append('sessionId', session!.sessionId);
      uploadFormData.append('userName', session!.userName);
      uploadFormData.append('userEmail', session!.userEmail || '');
      uploadFormData.append('originalPhoto', capturedPhoto);
      uploadFormData.append('compositedPhoto', compositedPhoto);
      uploadFormData.append('backgroundId', selectedBackground.id);
      uploadFormData.append('promptId', selectedPrompt.id);
      uploadFormData.append('consentTermsAccepted', String(consentTermsAccepted));
      uploadFormData.append('consentGalleryShare', String(consentGalleryShare));
      uploadFormData.append(
        'fullName',
        attendeeProfile?.fullName ?? session!.userName
      );

      const uploadResponse = await apiFetch('/api/upload-photo', {
        method: 'POST',
        body: uploadFormData,
      });

      if (uploadResponse.ok) {
        const uploadResult = JSON.parse(await uploadResponse.text());
        if (uploadResult.success && uploadResult.data?.photoCode) {
          setCompositedPhoto(
            compositedPhoto,
            uploadResult.data.photoId,
            uploadResult.data.photoCode
          );
        }
      }

      setTimeout(() => {
        router.push('/result');
      }, 800);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      if (!isApiSessionError(errorMsg)) {
        setTimeout(() => router.push('/prompts'), 3000);
      }
    } finally {
      setRetrying(false);
    }
  }, [
    capturedPhoto,
    selectedBackground,
    selectedPrompt,
    router,
    setCompositedPhoto,
    session,
    consentTermsAccepted,
    consentGalleryShare,
    attendeeProfile,
  ]);

  const handleRetry = async () => {
    setRetrying(true);
    processingStarted.current = true;
    await runProcessing();
  };

  useEffect(() => {
    if (capturedPhoto && selectedBackground && selectedPrompt) {
      if (processingStarted.current) return;
      processingStarted.current = true;
      void runProcessing();
    }
  }, [capturedPhoto, selectedBackground, selectedPrompt, runProcessing]);

  if (!session || !capturedPhoto || !selectedBackground || !selectedPrompt) {
    return null;
  }

  return (
    <WizardLayout step={5} totalSteps={5} backHref="/prompts" title="AI Generation">
      <PageMotion className="w-full text-center space-y-8">
        {error ? (
          <div className="wizard-card space-y-4 animate-bounce-in">
            <div className="text-5xl">⚠️</div>
            <h2 className="wizard-title text-red-400">Processing Error</h2>
            <p className="wizard-subtitle">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => void handleRetry()}
                disabled={retrying}
                className="wizard-primary-btn disabled:opacity-50"
              >
                {retrying ? 'Retrying…' : 'Retry'}
              </button>
              <Link href="/prompts" className="wizard-secondary-btn">
                Back to magic
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="gemini-loader" aria-hidden>
              <span className="gemini-loader__orb gemini-loader__orb--yellow" />
              <span className="gemini-loader__orb gemini-loader__orb--blue" />
              <span className="gemini-loader__orb gemini-loader__orb--red" />
              <div className="gemini-loader__sparkles">✦ ✦ ✦</div>
            </div>

            <div className="space-y-3">
              <h2 className="wizard-title processing-text-pulse">✨ Your Image is Getting Generated by AI</h2>
              <p className="wizard-subtitle animate-fade-in">
                Google Gemini AI is creating your masterpiece… This may take a few moments.
              </p>
            </div>

            <div className="text-sm text-io-subtle space-y-1">
              <p>Scene: {selectedBackground?.name}</p>
              <p>Magic: {selectedPrompt?.title}</p>
            </div>

            <p className="text-xs text-io-subtle flex items-center justify-center gap-2">
              Powered by <strong className="text-white/80">Gemini</strong>
            </p>
          </>
        )}
      </PageMotion>
    </WizardLayout>
  );
}
