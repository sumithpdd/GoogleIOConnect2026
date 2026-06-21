import type { Metadata, Viewport } from 'next';
import { AppConfigProvider } from '@/components/providers/app-config-provider';
import { ApiSessionBootstrap } from '@/components/providers/api-session-bootstrap';
import { MarketplaceProvider } from '@/components/providers/marketplace';
import './globals.css';

const appTitle = process.env.APP_EVENT_TITLE ?? 'Google I/O Connect Photo Booth';
const appDescription =
  process.env.APP_META_DESCRIPTION ??
  'AI photo booth for Google I/O Connect London & Berlin — capture, transform, and share with Gemini';

export const metadata: Metadata = {
  title: appTitle,
  description: appDescription,
  keywords: ['Google I/O Connect', 'Photo Booth', 'AI', 'Gemini', 'London', 'Berlin', 'GDG'],
  openGraph: {
    title: appTitle,
    description: appDescription,
    type: 'website',
  },
  icons: {
    icon: [{ url: '/branding/io-mark.png', type: 'image/png' }],
    apple: '/branding/io-mark.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@8..144,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-sc-bg text-sc-text antialiased font-google min-h-screen">
        <MarketplaceProvider>
          <ApiSessionBootstrap />
          <AppConfigProvider>{children}</AppConfigProvider>
        </MarketplaceProvider>
      </body>
    </html>
  );
}
