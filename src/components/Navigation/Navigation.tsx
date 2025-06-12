import Link from 'next/link';

import Logo from '@icons/Logo';

import UserButton from '@components/UserButton';

import {
  CONTACT_PAGE_PATH,
  HOME_PAGE_PATH,
  PAGES,
  TOURS_PAGE_PATH,
} from '@utils/constants';
import { cn } from '@utils/tailwind';
import LanguageSwitcher from '@components/LanguageSwitcher';
import { getTranslations } from 'next-intl/server';

const Navigation = async () => {
  const t = await getTranslations('Navigation');

  const isGreyNavigation = false;

  return (
    <nav className="absolute top-[20px] max-w-[1328px] w-full left-1/2 -translate-x-1/2 px-6 z-10  ">
      <div
        className={cn(
          'flex-row-reverse md:flex-row flex w-full justify-between items-center gap-9 text-white-100 uppercase italic text-base leading-[20px] duration-200',
          {
            'text-gray-500': isGreyNavigation,
          }
        )}
      >
        <ul className="flex gap-6 md:gap-9 md:flex-1">
          {[
            {
              label: t('tours'),
              href: TOURS_PAGE_PATH,
            },
            {
              label: t('contact'),
              href: CONTACT_PAGE_PATH,
            },
          ].map(page => (
            <li key={page.label}>
              <Link
                aria-label={page.label}
                href={page.href}
                className="text-[14px] leading-[17.5px] md:text-[16px] md:leading-[20px]"
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          aria-label="home page"
          className="md:mx-auto text-[24px] leading-[30px] ml-[-13px]"
          href={HOME_PAGE_PATH}
        >
          Split Adventures
        </Link>
        <div className="hidden md:flex gap-2 md:flex-1 justify-end">
          <LanguageSwitcher />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
