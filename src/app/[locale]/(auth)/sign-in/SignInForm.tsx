'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { signInWithCredentials } from '@server/actions/user';
import { useTranslations } from 'next-intl';

const SignInForm = () => {
  const t = useTranslations('Common');
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <button
        disabled={pending}
        className="w-full py-2 px-4 bg-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 text-white-100"
      >
        {t('sign-in')}
      </button>
    );
  };

  return (
    <form
      action={action}
      className="max-w-md mx-auto bg-white-100 p-6 rounded-lg shadow-md space-y-6"
    >
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t('name')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            {t('password')}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-sm text-red-600">{data.message}</div>
        )}

        <div className="text-sm text-center text-gray-500">
          {t('no-account')}{' '}
          <Link
            href="/sign-up"
            target="_self"
            className="text-blue-600 hover:underline"
          >
            {t('sign-up')}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
