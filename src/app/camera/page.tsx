'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePhotoBoothStore } from '@/store/photo-booth';
import { useCameraCapture } from '@/lib/hooks';
import { useEffect } from 'react';
import { WizardLayout } from '@/components/io-connect/WizardLayout';
import { HeadingMotion, PageMotion } from '@/components/io-connect/PageMotion';
import { IO_CONNECT_ASSETS } from '@/lib/io-connect-brand';

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
    clearCapturedPhoto,
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
    clearCapturedPhoto();
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
      <PageMotion className="w-full space-y-6" stagger>
        <HeadingMotion
          title={capturedPhoto ? 'Happy with your photo?' : 'Ready to be photographed?'}
          subtitle={
            capturedPhoto
              ? 'Retake or continue to choose your city scene.'
              : 'Smile for the camera — or upload from your gallery.'
          }
        />

        <div className="wizard-card p-4 md:p-6">
          <div
            className={`camera-preview-frame mx-auto ${
              !capturedPhoto ? 'camera-preview-frame--live' : ''
            }`}
          >
            {capturedPhoto ? (
              <img
                src={capturedPhoto}
                alt="Captured"
                className="camera-preview-media"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="camera-preview-media"
                />
                <div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center px-4"
                  aria-hidden
                >
                  <Image
                    src={IO_CONNECT_ASSETS.mainLogo}
                    alt=""
                    width={640}
                    height={165}
                    className="camera-preview-logo"
                    priority
                  />
                </div>
              </>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {!capturedPhoto && (
            <button
              type="button"
              onClick={handleCapture}
              className="wizard-primary-btn w-full mt-4 animate-pulse-soft"
            >
              📸 Capture Photo
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!capturedPhoto ? (
            <button
              type="button"
              onClick={selectFromGallery}
              className="wizard-secondary-btn flex-1"
            >
              📁 Upload Photo
            </button>
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
      </PageMotion>
    </WizardLayout>
  );
}
