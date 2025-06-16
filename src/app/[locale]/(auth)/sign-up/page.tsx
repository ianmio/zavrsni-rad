import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import SignUpForm from './SignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = async (props: {
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
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
