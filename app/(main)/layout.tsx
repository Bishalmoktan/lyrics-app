import Footer from '@/components/footer';
import Navbar from '@/components/navbar/navbar';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="container space-y-8">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
