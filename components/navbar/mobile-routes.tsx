'use client';

import { cn } from '@/lib/utils';
import { routes } from '@/routes';
import { UserRole } from '@prisma/client';
import { LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileRoutes = ({ session }: { session: Session | null }) => {
  const path = usePathname();
  const isAdmin = session?.user.role === UserRole.ADMIN;
  const isLoggedIn = !!session;
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl">BoSS</h1>
      <div className="space-y-2">
        {routes.map((route, index) => {
          const Icon = route.icon;
          return (
            <Link
              className={cn(
                'w-[50vw] rounded-md p-2 flex gap-8 hover:bg-brand-light',
                path === route.path && 'bg-brand-light'
              )}
              href={route.path}
              key={index}
            >
              <div>
                <Icon className="size-8" />
              </div>
              <p className="text-lg ">{route.label}</p>
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            className={cn(
              'w-[50vw] rounded-md p-2 flex gap-8 hover:bg-brand-light'
            )}
            href={'/admin/songs'}
          >
            <div>
              <ShieldCheck className="size-8" />
            </div>
            <p className="text-lg ">{'Admin'}</p>
          </Link>
        )}

        {isLoggedIn ? (
          <div
            className={cn(
              'w-[50vw] rounded-md p-2 flex gap-8 hover:bg-brand-light cursor-pointer'
            )}
          >
            <div>
              <LogOut className="size-8" />
            </div>
            <p className="text-lg" onClick={handleSignOut}>
              {'Logout'}
            </p>
          </div>
        ) : (
          <Link
            href={'/login'}
            className={cn(
              'w-[50vw] rounded-md p-2 flex gap-8 hover:bg-brand-light'
            )}
          >
            <div>
              <LogIn className="size-8" />
            </div>
            <p className="text-lg">{'Login'}</p>
          </Link>
        )}
      </div>
    </div>
  );
};
export default MobileRoutes;
