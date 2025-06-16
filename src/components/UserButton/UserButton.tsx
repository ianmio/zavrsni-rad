import Link from 'next/link';

import { auth } from '@auth';
import { Role } from '@prisma/client';
import { UserIcon } from 'lucide-react';

import Button from '@components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@components/DropdownMenu';

import SignOutButton from './SignOutButton';
import { getTranslations } from 'next-intl/server';

const UserButton = async () => {
  const session = await auth();
  const t = await getTranslations('Common');

  console.log({ session });

  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon /> {t('sign-in')}
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className="flex gap-2 items-center ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relativee w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-400"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60 mt-5"
          align="end"
          forceMount
          style={{ background: '#fff' }}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link href="/user/bookings" className="w-full">
              {t('my-bookings')}
            </Link>
          </DropdownMenuItem>

          {session?.user?.role === Role.ADMIN && (
            <DropdownMenuItem>
              <Link href="/admin" className="w-full">
                Admin
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="p-0 mb-1">
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
