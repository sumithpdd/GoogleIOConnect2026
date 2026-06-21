'use client';

import { useRouter } from 'next/navigation';
import { usePhotoBoothStore } from '@/store/photo-booth';
import { useCameraCapture } from '@/lib/hooks';
import { useEffect } from 'react';
import { WizardLayout } from '@/components/io-connect/WizardLayout';

export default function CameraPage() {
  const router = useRouter();
  const session = usePhotoBoothStore((state) => state.session);
  const setCapturedPhoto = usePhotoBoothStore((state) => state.setCapturedPhoto);

  const {
    videoRef,
    canvasRef,
    fileInputRef,
    capturedPhoto,
    startCamera,
    capturePhoto,
    selectFromGallery,
    handleFileSelect,
    stopCamera,
  } = useCameraCapture();

  useEffect(() => {
    if (!session) {
      router.push('/input');
    }
  }, [session, router]);

  const handleCapture = () => {
    const photo = capturePhoto();
    if (photo) {
      setCapturedPhoto(photo);
    }
  };

  const handleContinue = () => {
    if (capturedPhoto) {
      setCapturedPhoto(capturedPhoto);
      router.push('/backgrounds');
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    stopCamera();
    startCamera().catch(() => {
      alert('Could not access camera. Please check permissions.');
    });
  };

  useEffect(() => {
    if (!capturedPhoto) {
      startCamera().catch(() => {
        alert('Could not access camera. Please check permissions.');
      });
    }

    return () => {
      stopCamera();
    };
  }, [capturedPhoto, startCamera, stopCamera]);

  if (!session) return null;

  return (
    <WizardLayout step={2} totalSteps={5} backHref="/input" title="Camera">
      <div className="w-full space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="wizard-title">
            {capturedPhoto ? 'Happy with your photo?' : 'Ready to be photographed?'}
          </h2>
          <p className="wizard-subtitle">
            {capturedPhoto
              ? 'Retake or continue to choose your city scene.'
              : 'Smile for the camera — or upload from your gallery.'}
          </p>
        </div>

        <div className="wizard-card p-4 md:p-6">
          {capturedPhoto ? (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-black/50 aspect-[3/4] max-h-[380px] mx-auto border border-white/10">
                <img
                  src={capturedPhoto}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-2xl bg-black aspect-[3/4] max-h-[420px] object-cover"
              />
              <canvas ref={canvasRef} className="hidden" width={1200} height={1800} />
              <button
                type="button"
                onClick={handleCapture}
                className="wizard-primary-btn w-full"
              >
                📸 Capture Photo
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!capturedPhoto ? (
            <>
              <button
                type="button"
                onClick={selectFromGallery}
                className="wizard-secondary-btn flex-1"
              >
                📁 Upload Photo
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleRetake}
                className="wizard-secondary-btn flex-1"
              >
                Retake Photo
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className="wizard-primary-btn flex-1"
              >
                Choose Magic ✨
              </button>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </WizardLayout>
  );
}
