import Footer from '@/components/footer';
import Navbar from '@/components/navbar/navbar';
import React from 'react';

interface AboutLayoutProps {
  children: React.ReactNode;
}

const AboutLayout: React.FC<AboutLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-16 min-h-[100vh]">
      <div className="container">
        <Navbar />
      </div>
      {children}
      <div className="container">
        <Footer />
      </div>
    </div>
  );
};

export default AboutLayout;
