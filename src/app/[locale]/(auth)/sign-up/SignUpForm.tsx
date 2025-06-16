'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { signUpUser } from '@server/actions/user';
import { useTranslations } from 'next-intl';

const SignUpForm = () => {
  const t = useTranslations('Common');
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <button
        disabled={pending}
        className="w-full py-2 px-4 bg-green-600 text-white-100 font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {t('sign-up')}
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
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {t('name')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t('email')}
          </label>
          <input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            {t('confirm-password')}
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-sm text-red-600">{data.message}</div>
        )}

        <div className="text-sm text-center text-gray-500">
          {t('has-account')}{' '}
          <Link
            href="/sign-in"
            target="_self"
            className="text-green-600 hover:underline"
          >
            {t('sign-in')}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
