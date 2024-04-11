import React from 'react';
import Header from './_components/header';
import Sidebar from './_components/sidebar';
import { auth } from '@/auth';
import { UserRole } from '@prisma/client';
import UnauthorizedPage from './_components/unauthorized';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session?.user.role !== UserRole.ADMIN) {
    return <UnauthorizedPage />;
  }
  return (
    <div className="h-full">
      <Header />
      <div>
        <div className="hidden md:flex h-full w-[250px] z-30 flex-col fixed inset-y-0 pt-[150px] px-6">
          <Sidebar />
        </div>
        <main className="md:pl-[250px] px-4 md:pr-8 h-full">{children}</main>
      </div>
    </div>
  );
};
export default AdminLayout;
