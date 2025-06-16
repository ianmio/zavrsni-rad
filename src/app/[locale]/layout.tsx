import type { Metadata, Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';

import { auth } from '@auth';
import { Analytics } from '@vercel/analytics/react';

import LocalizationProvider from '@components/LocalizationProvider';

import '../../styles/globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@i18n/routing';
import { notFound } from 'next/navigation';

export const revalidate = 0;

const fontSalvatore = localFont({
  src: [
    {
      path: '../fonts/salvatore/Salvatore-RegularItalic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/salvatore/Salvatore-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/salvatore/Salvatore-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/salvatore/Salvatore-Book.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/salvatore/Salvatore-Bold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-salvatore',
});
const fontFlood = localFont({
  src: [
    {
      path: '../fonts/flood/FloodStdRegular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-flood',
});

export const viewport: Viewport = {
  themeColor: '#e4ebee',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    absolute: 'Split Adventures',
    template: '%s | Split Adventures',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const session = await auth();
  return (
    <html lang={locale}>
      <body
        className={`${fontSalvatore.variable} ${fontFlood.variable} font-salvatore antialiased`}
      >
        <NextIntlClientProvider>
          <Analytics />
          <SessionProvider session={session}>
            <LocalizationProvider>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 5000,
                }}
              />
              {children}
            </LocalizationProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
