import Navbar from '@/components/navbar/navbar';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
