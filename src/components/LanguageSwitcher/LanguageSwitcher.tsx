'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { routing } from '@i18n/routing';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  return (
    <div className="flex gap-2 w-full max-w-36">
      {routing.locales.map(locale => {
        const isActive = locale === currentLocale;

        return (
          <button
            key={locale}
            onClick={() => changeLanguage(locale)}
            disabled={isPending || isActive}
            className={`w-full h-10 rounded font-medium transition-colors duration-200 ${
              isActive
                ? 'bg-blue-500 text-white cursor-default'
                : 'bg-white text-white border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
