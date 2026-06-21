'use client';

import { useEffect, useState } from 'react';
import { downloadImage, printPhoto } from '@/lib/photo-actions';
import { backgrounds } from '@/data/backgrounds';

export interface PhotoPreviewData {
  photoCode: string;
  userName: string;
  compositedPhotoUrl: string;
  originalPhotoUrl?: string;
  backgroundId?: string;
  createdAt?: string;
}

interface PhotoPreviewModalProps {
  photo: PhotoPreviewData | null;
  onClose: () => void;
}

export function PhotoPreviewModal({ photo, onClose }: PhotoPreviewModalProps) {
  const [downloading, setDownloading] = useState<'original' | 'composite' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  const hasOriginal = Boolean(photo.originalPhotoUrl);
  const sceneName =
    backgrounds.find((b) => b.id === photo.backgroundId)?.name ?? photo.backgroundId;

  const handleDownload = async (type: 'original' | 'composite') => {
    setError(null);
    setDownloading(type);
    try {
      const src =
        type === 'original' && photo.originalPhotoUrl
          ? photo.originalPhotoUrl
          : photo.compositedPhotoUrl;
      await downloadImage(src, `io-connect-${photo.photoCode}-${type}.jpg`);
    } catch {
      setError('Download failed. Try again or open the image in a new tab.');
    } finally {
      setDownloading(null);
    }
  };

  const handlePrint = () => {
    printPhoto(photo.compositedPhotoUrl, { code: photo.photoCode });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Photo preview"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto wizard-card animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 text-white text-xl hover:bg-black/80 transition border border-white/10"
          aria-label="Close preview"
        >
          ×
        </button>

        <div className="p-6 space-y-6">
          <div className="pr-10">
            <p className="text-xs font-semibold text-google-yellow uppercase tracking-wider">
              {photo.photoCode}
            </p>
            <h3 className="wizard-title text-xl mt-1">{photo.userName}</h3>
            <p className="text-io-subtle text-sm mt-1">
              {sceneName}
              {photo.createdAt &&
                ` · ${new Date(photo.createdAt).toLocaleDateString()}`}
            </p>
          </div>

          <div className={`grid gap-4 ${hasOriginal ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
            {hasOriginal && (
              <div className="space-y-2">
                <p className="text-sm font-bold text-io-subtle uppercase tracking-wide">
                  Original
                </p>
                <img
                  src={photo.originalPhotoUrl}
                  alt={`${photo.photoCode} original`}
                  className="w-full rounded-xl border border-white/15 object-contain max-h-[50vh] bg-black/50"
                />
              </div>
            )}
            <div className="space-y-2">
              <p className="text-sm font-bold text-io-subtle uppercase tracking-wide">
                AI Enhanced
              </p>
              <img
                src={photo.compositedPhotoUrl}
                alt={`${photo.photoCode} composited`}
                className="w-full rounded-xl border border-white/20 object-contain max-h-[50vh] bg-black/50"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="flex flex-wrap gap-3 justify-center">
            {hasOriginal && (
              <button
                type="button"
                disabled={downloading !== null}
                onClick={() => handleDownload('original')}
                className="wizard-secondary-btn disabled:opacity-50"
              >
                {downloading === 'original' ? 'Downloading…' : '⬇️ Original'}
              </button>
            )}
            <button
              type="button"
              disabled={downloading !== null}
              onClick={() => handleDownload('composite')}
              className="wizard-primary-btn disabled:opacity-50"
            >
              {downloading === 'composite' ? 'Downloading…' : '⬇️ Enhanced'}
            </button>
            <button type="button" onClick={handlePrint} className="wizard-secondary-btn">
              🖨️ Print
            </button>
            <button type="button" onClick={onClose} className="wizard-secondary-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
