'use client';

import Sidebar from '@/app/(admin)/_components/sidebar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';

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
          <Link href={'/'} className="text-2xl font-bold">
            BoSS
          </Link>
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default AdminMobileToggle;
