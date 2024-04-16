'use client';
import { cn } from '@/lib/utils';
import { routes } from '@/routes';
import { UserRole } from '@prisma/client';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Routes = ({ session }: { session: Session | null }) => {
  const path = usePathname();
  const isUserPrivileged =
    session?.user.role === UserRole.ADMIN ||
    session?.user.role === UserRole.MODERATOR;
  const isLoggedIn = !!session;
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className="flex gap-8">
      {routes.map((route, index) => (
        <Link
          className={cn(
            'text-lg text-zinc-500 hover:text-white transition',
            path === route.path && 'text-white font-semibold'
          )}
          href={route.path}
          key={index}
        >
          {route.label}
        </Link>
      ))}
      {isUserPrivileged && (
        <Link
          className={cn('text-lg text-zinc-500 hover:text-white transition')}
          href={'/admin/songs'}
        >
          Admin
        </Link>
      )}
      {isLoggedIn ? (
        <div
          className={cn(
            'text-lg text-zinc-500 hover:text-white transition cursor-pointer'
          )}
          onClick={handleSignOut}
        >
          Logout
        </div>
      ) : (
        <Link
          className={cn('text-lg text-zinc-500 hover:text-white transition')}
          href={'/login'}
        >
          Login
        </Link>
      )}
    </div>
  );
};
export default Routes;
