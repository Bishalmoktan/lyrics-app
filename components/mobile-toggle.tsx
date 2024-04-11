import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import MobileRoutes from './navbar/mobile-routes';
import { auth } from '@/auth';

export const MobileToggle = async () => {
  const session = await auth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="w-[72px]">
          <MobileRoutes session={session} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
