'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { userInputSchema, type UserInputFormData } from '@/lib/validators';
import { usePhotoBoothStore } from '@/store/photo-booth';
import { apiPostJson } from '@/lib/core/api-client';
import { WizardLayout } from '@/components/io-connect/WizardLayout';
import { PageMotion } from '@/components/io-connect/PageMotion';
import { useAppConfig } from '@/components/providers/app-config-provider';
import { GdprConsentBlock } from '@/components/common/GdprConsentBlock';
import { FormField } from '@/components/ui/FormField';
import { IconMail, IconSparkles, IconUser } from '@/components/icons/BoothIcons';
import { GDPR_FOOTER } from '@/lib/gdpr';
import { WORKSHOP_TRACKS } from '@/data/io-connect-workshops';

export default function InputPage() {
  const router = useRouter();
  const { branding } = useAppConfig();
  const initializeSession = usePhotoBoothStore((state) => state.initializeSession);
  const setConsent = usePhotoBoothStore((state) => state.setConsent);
  const consentTermsAccepted = usePhotoBoothStore((state) => state.consentTermsAccepted);
  const consentGalleryShare = usePhotoBoothStore((state) => state.consentGalleryShare);

  const [termsAccepted, setTermsAccepted] = useState(consentTermsAccepted);
  const [galleryShare, setGalleryShare] = useState(consentGalleryShare);
  const [consentError, setConsentError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserInputFormData>({
    resolver: zodResolver(userInputSchema),
  });

  const onSubmit = async (data: UserInputFormData) => {
    if (!termsAccepted) {
      setConsentError('Please accept the Terms & Privacy Notice to continue.');
      return;
    }
    setConsentError(null);
    setConsent(termsAccepted, galleryShare);
    initializeSession(data.userName, data.userEmail, {
      workshopTrack: data.workshopTrack,
      sessionTakeaway: data.sessionTakeaway,
    });

    const session = usePhotoBoothStore.getState().session;
    const profile = usePhotoBoothStore.getState().attendeeProfile;
    if (session && profile) {
      try {
        await apiPostJson('/api/session', {
          sessionId: session.sessionId,
          userName: session.userName,
          userEmail: session.userEmail ?? '',
          attendeeProfile: profile,
          consentTermsAccepted: termsAccepted,
          consentGalleryShare: galleryShare,
        });
      } catch {
        // Continue booth flow
      }
    }

    router.push('/camera');
  };

  return (
    <WizardLayout step={1} totalSteps={4} backHref="/" title="Your Details" formWide>
      <PageMotion className="w-full" stagger>
      <div className="wizard-card wizard-card--form space-y-6 w-full">
          <div className="text-center space-y-2">
            <span className="io-sparkle-row text-google-yellow text-xl">
              <IconSparkles size={18} className="io-sparkle-twinkle" />
              <IconSparkles size={14} className="io-sparkle-twinkle" />
              <IconSparkles size={18} className="io-sparkle-twinkle" />
            </span>
            <h2 className="wizard-title">{branding.eventTitle}</h2>
            <p className="wizard-subtitle">
              Create your AI photo, then share it with an auto-generated social post.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <p className="text-sm font-semibold text-io-muted flex items-center gap-2">
              <IconUser size={16} className="text-google-blue" />
              Your Details
            </p>

            <FormField
              {...register('userName')}
              label="Full Name *"
              icon={<IconUser size={20} />}
              type="text"
              placeholder="Full Name *"
              autoFocus
              error={errors.userName?.message}
              className="wizard-input"
            />

            <FormField
              {...register('userEmail')}
              label="Email Address *"
              icon={<IconMail size={20} />}
              type="email"
              placeholder="Email Address *"
              error={errors.userEmail?.message}
              className="wizard-input"
            />

            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-io-muted">
                Which session or workshop did you attend? *
              </legend>
              <p className="text-xs text-io-subtle -mt-1">
                Go beyond the basics — we use this to personalize your AI social post.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {WORKSHOP_TRACKS.map((track) => (
                  <label key={track.id} className="workshop-track-option">
                    <input
                      type="radio"
                      value={track.id}
                      {...register('workshopTrack')}
                      className="workshop-track-option__input"
                    />
                    <span className="workshop-track-option__body">
                      <span className="workshop-track-option__label">{track.label}</span>
                      <span className="workshop-track-option__desc">{track.description}</span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.workshopTrack && (
                <p className="form-field__error">{errors.workshopTrack.message}</p>
              )}
            </fieldset>

            <div className="form-field space-y-2">
              <label htmlFor="sessionTakeaway" className="form-label">
                Key takeaway, new feature, or light-bulb moment
                <span className="text-io-subtle font-normal"> (optional)</span>
              </label>
              <textarea
                id="sessionTakeaway"
                {...register('sessionTakeaway')}
                rows={3}
                maxLength={280}
                placeholder="What will you share online from your session?"
                className="wizard-input w-full resize-y min-h-[88px]"
              />
              {errors.sessionTakeaway && (
                <p className="form-field__error">{errors.sessionTakeaway.message}</p>
              )}
            </div>

            <div className="wizard-promo-banner">
              Go beyond the basics — Gemini writes your post with #GoogleIOConnect and
              #BuildWithGemini. Share what you created! 📱
            </div>

            <GdprConsentBlock
              termsAccepted={termsAccepted}
              galleryShare={galleryShare}
              onTermsChange={(v) => {
                setTermsAccepted(v);
                if (!v) setGalleryShare(false);
                setConsentError(null);
              }}
              onGalleryChange={setGalleryShare}
            />
            {consentError && (
              <p className="text-red-400 text-sm font-medium">{consentError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !termsAccepted}
              className="wizard-primary-btn w-full disabled:opacity-50"
            >
              {isSubmitting ? 'Getting Ready...' : 'Continue to Camera 📸'}
            </button>
          </form>

          <p className="text-center text-xs text-io-subtle leading-relaxed">
            {GDPR_FOOTER}{' '}
            <Link href="/privacy" className="text-google-blue underline">
              Full privacy notice
            </Link>
          </p>
        </div>
      </PageMotion>
    </WizardLayout>
  );
}
