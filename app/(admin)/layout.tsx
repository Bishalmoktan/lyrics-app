import React from 'react';
import Header from './_components/header';
import Sidebar from './_components/sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
