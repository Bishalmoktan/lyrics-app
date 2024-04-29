import React from 'react';
import Header from './_components/header';
import Sidebar from './_components/sidebar';
import { auth } from '@/auth';
import { UserRole } from '@prisma/client';
import UnauthorizedPage from './_components/unauthorized';
import { ModalProvider } from '@/components/providers/modal-provider';
import { ModalContextProvider } from '@/components/providers/modal-context-providers';
import { getUserById } from '@/data/user';
import { Toaster } from 'sonner';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = await getUserById(session?.user.id || '');
  if (session?.user.role === UserRole.USER || !user) {
    return <UnauthorizedPage />;
  }
  return (
    <div className="h-full">
      <Header />
      <div>
        <div className="hidden md:flex h-full w-[250px] z-30 flex-col fixed inset-y-0 pt-[150px] px-6">
          <Sidebar />
        </div>
        <main className="md:pl-[250px] px-4 md:pr-8 h-full">
          <ModalContextProvider>
            {children}
            <Toaster richColors />
            <ModalProvider />
          </ModalContextProvider>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
