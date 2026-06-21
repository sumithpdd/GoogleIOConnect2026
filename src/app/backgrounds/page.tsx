'use client';

import { useRouter } from 'next/navigation';
import { usePhotoBoothStore } from '@/store/photo-booth';
import { BACKGROUND_FILTERS, filterBackgrounds } from '@/data/backgrounds';
import { useEffect, useMemo, useState } from 'react';
import { WizardLayout } from '@/components/io-connect/WizardLayout';
import type { Background } from '@/types';

const CITY_BADGE_CLASS: Record<string, string> = {
  London: 'scene-card__city--london',
  Berlin: 'scene-card__city--berlin',
  'I/O Connect': 'scene-card__city--connect',
};

export default function BackgroundsPage() {
  const router = useRouter();
  const session = usePhotoBoothStore((state) => state.session);
  const capturedPhoto = usePhotoBoothStore((state) => state.capturedPhoto);
  const selectedBackground = usePhotoBoothStore((state) => state.selectedBackground);
  const setSelectedBackground = usePhotoBoothStore(
    (state) => state.setSelectedBackground
  );
  const [pending, setPending] = useState<Background | null>(selectedBackground);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    if (!session || !capturedPhoto) {
      router.push('/input');
    }
  }, [session, capturedPhoto, router]);

  const visibleBackgrounds = useMemo(
    () => filterBackgrounds(category),
    [category]
  );

  const handleSelect = (background: Background) => {
    setPending(background);
  };

  const handleContinue = () => {
    if (pending) {
      setSelectedBackground(pending);
      router.push('/prompts');
    }
  };

  if (!session || !capturedPhoto) return null;

  return (
    <WizardLayout step={3} totalSteps={5} backHref="/camera" title="Choose Background" wide>
      <div className="backgrounds-page w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="backgrounds-page__eyebrow">Step 3 · Pick your scene</p>
          <h2 className="wizard-title">London, Berlin & I/O Connect</h2>
          <p className="wizard-subtitle">
            Berlin landmarks, Buddy Bears & Kreuzberg street art — or pure I/O Connect
            studio art for your Gemini portrait
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {BACKGROUND_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setCategory(id)}
              className={`wizard-category-pill ${
                category === id ? 'wizard-category-pill--active' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleBackgrounds.map((scene) => {
            const isSelected = pending?.id === scene.id;
            const cityClass = scene.city ? CITY_BADGE_CLASS[scene.city] : '';
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleSelect(scene)}
                className={`scene-card scene-card--background scene-card--io ${
                  isSelected ? 'scene-card--selected' : ''
                }`}
              >
                <div
                  className={`io-gradient-rim ${isSelected ? 'io-gradient-rim--active' : ''}`}
                >
                  <div className="io-gradient-rim__inner">
                    <div className="scene-card__image scene-card__image--tall">
                      <div
                        className={`scene-card__preview-bg ${scene.previewClass ?? ''}`}
                        style={{ backgroundImage: `url(${scene.imageUrl})` }}
                        aria-hidden
                      />
                      <div className="scene-card__preview-overlay" aria-hidden />
                      {scene.city && (
                        <span className={`scene-card__city ${cityClass}`}>{scene.city}</span>
                      )}
                      {scene.featured && (
                        <span className="scene-card__badge">Popular</span>
                      )}
                    </div>
                    <div className="io-gradient-rim__body scene-card__body">
                      <h3 className="io-card-heading">{scene.name}</h3>
                      {scene.city && (
                        <p className="io-card-subheading">{scene.city}</p>
                      )}
                      <div className="io-inset-panel">
                        <span className="io-inset-panel__label">Scene description</span>
                        <p className="io-inset-panel__text">{scene.description}</p>
                      </div>
                      <span
                        className={`io-btn-white io-btn-white--sm ${
                          isSelected ? '' : 'io-btn-white--muted'
                        }`}
                      >
                        {isSelected ? 'Selected ✓' : 'Select scene'}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {pending && (
          <div className="io-gradient-rim io-gradient-rim--active max-w-lg mx-auto">
            <div className="io-gradient-rim__inner io-gradient-rim__body">
              <p className="io-inset-panel__label">Your pick</p>
              <p className="io-card-heading">{pending.name}</p>
              {pending.city && (
                <p className="io-card-subheading">{pending.city}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!pending}
            className="io-btn-white min-w-[260px]"
          >
            Continue to Magic ✨
          </button>
        </div>
      </div>
    </WizardLayout>
  );
}
