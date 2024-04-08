'use client';
import { cn } from '@/lib/utils';
import { routes } from '@/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Routes = () => {
  const path = usePathname();
  const isAdmin = true;
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
      {isAdmin && (
        <Link
          className={cn('text-lg text-zinc-500 hover:text-white transition')}
          href={'/admin/songs'}
        >
          Admin
        </Link>
      )}
    </div>
  );
};
export default Routes;
