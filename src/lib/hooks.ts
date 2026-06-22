'use client';

import { useCallback, useRef, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CompositingRequest, CompositingResponse } from '@/types';

/**
 * Hook for handling camera/file input
 */
export function useCameraCapture() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure this only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const startCamera = useCallback(async () => {
    if (!isClient) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      throw error;
    }
  }, [isClient]);

  const capturePhoto = useCallback(() => {
    if (!isClient || !videoRef.current || !canvasRef.current) return null;
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context || !video.videoWidth || !video.videoHeight) return null;

      const targetAspect = 3 / 4;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      let sx = 0;
      let sy = 0;
      let sw = vw;
      let sh = vh;

      const videoAspect = vw / vh;
      if (videoAspect > targetAspect) {
        sw = vh * targetAspect;
        sx = (vw - sw) / 2;
      } else {
        sh = vw / targetAspect;
        sy = (vh - sh) / 2;
      }

      const outW = 1200;
      const outH = 1600;
      canvas.width = outW;
      canvas.height = outH;
      context.drawImage(video, sx, sy, sw, sh, 0, 0, outW, outH);

      const photoData = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedPhoto(photoData);
      return photoData;
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
    return null;
  }, [isClient]);

  const clearCapturedPhoto = useCallback(() => {
    setCapturedPhoto(null);
  }, []);

  const selectFromGallery = useCallback(() => {
    if (!isClient) return;
    fileInputRef.current?.click();
  }, [isClient]);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isClient) return;
      const file = e.target.files?.[0];
      if (file) {
        try {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const result = event.target?.result as string;
              if (result) {
                setCapturedPhoto(result);
              }
            } catch (error) {
              console.error('Error processing file result:', error);
            }
          };
          reader.onerror = (error) => {
            console.error('FileReader error:', error);
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }
    },
    [isClient]
  );

  const stopCamera = useCallback(() => {
    if (!isClient || !videoRef.current?.srcObject) return;
    try {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Error stopping camera:', error);
    }
  }, [isClient]);

  return {
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
  };
}

/**
 * Hook for AI image compositing via API
 */
export function useCompositing() {
  return useMutation({
    mutationFn: async (request: CompositingRequest) => {
      const response = await fetch('/api/composit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to composit image');
      }

      return response.json() as Promise<CompositingResponse>;
    },
  });
}

/**
 * Hook for uploading photo to Firebase
 */
export function usePhotoUpload() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/upload-photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload photo');
      }

      return response.json();
    },
  });
}

/**
 * Hook for managing local storage with hydration safety
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (mounted) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error writing to localStorage: ${key}`, error);
      }
    },
    [key, storedValue, mounted]
  );

  return [storedValue, setValue, mounted] as const;
}

/**
 * Hook for generating unique session ID
 */
export function useSessionId(): string {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  return sessionId;
}
