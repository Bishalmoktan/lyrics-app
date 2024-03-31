import Footer from '@/components/footer';
import Navbar from '@/components/navbar/navbar';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="container flex flex-col gap-16 min-h-[100vh]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
