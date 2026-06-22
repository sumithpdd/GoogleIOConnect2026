import type { Metadata, Viewport } from 'next';
import { AppConfigProvider } from '@/components/providers/app-config-provider';
import { ApiSessionBootstrap } from '@/components/providers/api-session-bootstrap';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ThemePullSwitch } from '@/components/io-connect/ThemePullSwitch';
import { THEME_STORAGE_KEY, DEFAULT_THEME } from '@/lib/theme';
import './globals.css';

const themeInitScript = `(function(){try{var k='${THEME_STORAGE_KEY}',t=localStorage.getItem(k),d='${DEFAULT_THEME}';if(t!=='light'&&t!=='dark')t=d;document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');}})();`;

const appTitle = process.env.APP_EVENT_TITLE ?? 'Google I/O Connect Photo Booth';
const appDescription =
  process.env.APP_META_DESCRIPTION ??
  'AI photo booth for Google I/O Connect Berlin 2026 — GDG London community · capture, transform, and share with Gemini';

export const metadata: Metadata = {
  title: appTitle,
  description: appDescription,
  keywords: ['Google I/O Connect', 'Photo Booth', 'AI', 'Gemini', 'Berlin', 'GDG London', 'GDG'],
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
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@8..144,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-io-bg text-io-text antialiased font-google min-h-screen">
        <ThemeProvider>
          <ThemePullSwitch />
          <ApiSessionBootstrap />
          <AppConfigProvider>{children}</AppConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
