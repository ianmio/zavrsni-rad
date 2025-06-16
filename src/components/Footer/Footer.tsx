import Link from 'next/link';

import Logo from '@icons/Logo';

import Container from '@components/Container';

import {
  CONTACT_PAGE_PATH,
  FOOTER_NAVIGATION,
  HOME_PAGE_PATH,
  TOURS_PAGE_PATH,
} from '@utils/constants';

import { INFOS } from './constants';
import { getTranslations } from 'next-intl/server';

const Footer = async () => {
  const t = await getTranslations('Navigation');

  return (
    <footer className="bg-gray-500 py-12 flex flex-col">
      <Container className="flex flex-col gap-9 text-gray-200">
        <div className="flex gap-0 md:gap-14 items-center lg:flex-row flex-col">
          <ul className="flex-col flex md:flex-row gap-4 md:gap-14 md:ml-auto">
            {INFOS.map(info => (
              <li className={'flex gap-3 items-center'} key={info.value}>
                <div className="w-[45px] h-[45px] bg-gray-50 rounded-full flex items-center justify-center">
                  {info.icon}
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-[16px] leading-[16px] tracking-[-0.02em] text-gray-200 mb-0.5 capitalize">
                    {info.label === 'Location' ? t('location') : info.label}
                  </p>
                  <p className="font-light text-[16px] leading-[16px] tracking-[-0.02em] text-gray-200">
                    {info.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-[1px] w-full bg-white-100-50" />

        <ul className="text uppercase flex gap-6 md:flex-row flex-col items-center italic font-light text-base leading-[20px]">
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
              <Link aria-label={page.label} href={page.href}>
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
