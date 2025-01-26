import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import React from "react";

interface AboutLayoutProps {
  children: React.ReactNode;
}

const ContactLayout: React.FC<AboutLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-16 min-h-[100vh]">
      <Navbar />
      <div className="pt-24">{children}</div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
};

export default ContactLayout;
