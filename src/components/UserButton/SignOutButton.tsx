'use client';

import { useRouter } from 'next/navigation';

import { signOutUser } from '@server/actions/user';

import Button from '@components/Button';

const SignOutButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={signOutUser}
      className="w-full py-4 px-2 h-4 justify-start"
      variant="ghost"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
