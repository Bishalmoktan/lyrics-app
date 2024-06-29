'use client';

import Sidebar from '@/app/(admin)/_components/sidebar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import Logo from '@/components/logo';

const AdminMobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="space-y-4">
          <Logo />
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default AdminMobileToggle;
