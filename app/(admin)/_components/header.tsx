import AdminMobileToggle from '@/components/admin-mobile-toggle';
import { Separator } from '@/components/ui/separator';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="px-4 pt-4">
      <div className="flex justify-between">
        <div>
          <p className="text-lg">Hey,</p>
          <h1 className="text-3xl font-bold">Bishal Moktan 👋</h1>
        </div>
        <Link href={'/'} className="hidden md:flex gap-2 hover:underline">
          <Undo2 />
          Home
        </Link>
        <div className="md:hidden">
          <AdminMobileToggle />
        </div>
      </div>
      <Separator className="bg-zinc-300 my-8" />
    </div>
  );
};
export default Header;
