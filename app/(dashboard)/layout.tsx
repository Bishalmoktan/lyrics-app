import Sidebar from "./_components/Sidebar";
import Player from "./_components/Player";
import Queue from "./_components/Queue";
import MobileNav from "./_components/MobileNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col bg-[#0E1729]">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main
            className="flex-1 overflow-y-auto relative h-custom-calc-mobile md:h-custom-calc-screen"
          >
            {children}
          </main>
            <Queue />
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player />
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
