import { auth } from "@/auth";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = async ({ children }) => {
  const session = await auth();
  const user = await getUserById(session?.user.id || "");
  if (user) {
    redirect("/dashboard");
  }
  return (
    <>
      <Navbar />

      <div className="container flex flex-col gap-16 min-h-[100vh] pt-32">
        {children}
        <Toaster richColors />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
