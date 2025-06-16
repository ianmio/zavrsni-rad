import { signOutUser } from '@server/actions/user';

import Button from '@components/Button';
import { getTranslations } from 'next-intl/server';

const SignOutButton = async () => {
  const t = await getTranslations('Common');
  return (
    <Button
      onClick={signOutUser}
      className="w-full py-4 px-2 h-4 justify-start"
      variant="ghost"
    >
      {t('sign-out')}
    </Button>
  );
};

export default SignOutButton;
