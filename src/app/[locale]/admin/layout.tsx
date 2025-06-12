import Link from 'next/link';

import Tabs from './components/Tabs';
import { auth } from '@auth';
import { notFound } from 'next/navigation';

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-200 text-gray-500 font-salvatore">
      <header className="bg-gray-100 text-white-100 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Link href="/">
          <button className="bg-blue-500 text-white-100 py-2 px-4 rounded hover:bg-blue-600">
            Back to Website
          </button>
        </Link>
      </header>
      <Tabs />

      {children}
    </div>
  );
};

export default AdminLayout;
