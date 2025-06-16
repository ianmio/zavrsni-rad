import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

import { auth } from '@auth';

import SignInForm from './SignInForm';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
