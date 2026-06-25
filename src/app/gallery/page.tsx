'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PhotoPreviewModal, PhotoPreviewData } from '@/components/photo-booth/PhotoPreviewModal';
import { PageMotion, StaggerGrid } from '@/components/io-connect/PageMotion';
import { WizardLayout } from '@/components/io-connect/WizardLayout';
import { backgrounds } from '@/data/backgrounds';
import { GDPR_FOOTER } from '@/lib/gdpr';

import type { AttendeeProfile } from '@/types';

interface GalleryPhoto {
  id: string;
  photoCode: string;
  userName: string;
  userEmail?: string;
  backgroundId: string;
  promptId: string;
  originalPhotoUrl: string;
  compositedPhotoUrl: string;
  createdAt: string;
  attendeeProfile?: AttendeeProfile;
}

const GALLERY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'innovation', label: 'Berlin' },
  { id: 'heritage', label: 'I/O Connect' },
] as const;

function photoMatchesCategory(photo: GalleryPhoto, category: string): boolean {
  if (category === 'all') return true;
  const bg = backgrounds.find((b) => b.id === photo.backgroundId);
  return bg?.category === category;
}

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<PhotoPreviewData | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch('/api/gallery?limit=100&offset=0', {
          cache: 'no-store',
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || `Gallery API error: ${response.status}`);
        }

        if (result.success && result.data?.photos) {
          setGalleryPhotos(
            result.data.photos.map((p: GalleryPhoto) => ({
              ...p,
              createdAt:
                typeof p.createdAt === 'string'
                  ? p.createdAt
                  : new Date(p.createdAt).toISOString(),
            }))
          );
        } else {
          setGalleryPhotos([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load gallery');
        setGalleryPhotos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  const filteredPhotos = galleryPhotos.filter((photo) => {
    const q = searchQuery.trim();
    const matchesSearch =
      !q ||
      photo.photoCode.toUpperCase().includes(q.toUpperCase()) ||
      photo.userName.toLowerCase().includes(q.toLowerCase());

    return matchesSearch && photoMatchesCategory(photo, selectedCategory);
  });

  const openPreview = (photo: GalleryPhoto) => {
    setPreviewPhoto({
      photoCode: photo.photoCode,
      userName: photo.userName,
      userEmail: photo.userEmail,
      compositedPhotoUrl: photo.compositedPhotoUrl,
      originalPhotoUrl: photo.originalPhotoUrl,
      backgroundId: photo.backgroundId,
      promptId: photo.promptId,
      attendeeProfile: photo.attendeeProfile,
      createdAt: photo.createdAt,
    });
  };

  return (
    <WizardLayout
      step={1}
      totalSteps={1}
      backHref="/"
      title="Community Gallery"
      wide
      hideProgress
    >
      <PageMotion className="w-full space-y-8" stagger>
        <div className="text-center space-y-2 io-heading-block">
          <h2 className="wizard-title io-heading-block__title">Community Gallery</h2>
          <p className="wizard-subtitle io-heading-block__subtitle">
            Tap a photo to view, download, print, or share to social
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by photo code or name…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gallery-search flex-1"
          />
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="wizard-secondary-btn shrink-0"
          >
            Clear
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {GALLERY_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedCategory(id)}
              className={`wizard-category-pill ${
                selectedCategory === id ? 'wizard-category-pill--active' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="gemini-loader mx-auto mb-6" aria-hidden>
              <span className="gemini-loader__orb gemini-loader__orb--yellow" />
              <span className="gemini-loader__orb gemini-loader__orb--blue" />
              <span className="gemini-loader__orb gemini-loader__orb--red" />
            </div>
            <p className="text-io-muted">Loading gallery…</p>
          </div>
        )}

        {error && !loading && (
          <div className="wizard-card text-center py-10 border-red-500/30">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && filteredPhotos.length > 0 ? (
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => {
              const sceneName =
                backgrounds.find((b) => b.id === photo.backgroundId)?.name ??
                photo.backgroundId;

              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => openPreview(photo)}
                  className="gallery-card group"
                >
                  <div className="gallery-card__image">
                    <img
                      src={photo.compositedPhotoUrl}
                      alt={photo.photoCode}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="gallery-card__overlay" />
                  <div className="gallery-card__meta">
                    <p className="text-xs text-google-yellow font-semibold">{photo.photoCode}</p>
                    <p className="font-bold text-white text-sm">{photo.userName}</p>
                    <p className="text-xs text-white/60">
                      {sceneName} · Tap to view
                    </p>
                  </div>
                </button>
              );
            })}
          </StaggerGrid>
        ) : (
          !loading &&
          !error && (
            <div className="wizard-card text-center py-12 space-y-3">
              <p className="text-io-muted text-lg">No photos found</p>
              <p className="wizard-subtitle">Be the first to create one!</p>
              <Link href="/input" className="wizard-primary-btn inline-flex mt-2">
                Create Photo →
              </Link>
            </div>
          )
        )}

        <div className="text-center space-y-4 pt-2">
          <Link href="/input" className="wizard-primary-btn inline-flex">
            📸 Create Your Photo
          </Link>
          <p className="text-xs text-io-subtle max-w-lg mx-auto leading-relaxed">
            {GDPR_FOOTER}{' '}
            <Link href="/privacy" className="text-google-blue underline">
              Privacy notice
            </Link>
          </p>
        </div>
      </PageMotion>

      <PhotoPreviewModal photo={previewPhoto} onClose={() => setPreviewPhoto(null)} />
    </WizardLayout>
  );
}
