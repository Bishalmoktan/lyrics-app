'use client';

import { cn } from '@/lib/utils';
import { routes } from '@/routes';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileRoutes = () => {
  const path = usePathname();
  const isAdmin = true;
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
      </div>
    </div>
  );
};
export default MobileRoutes;
