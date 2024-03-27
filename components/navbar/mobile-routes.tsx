'use client';

import { cn } from '@/lib/utils';
import { routes } from '@/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileRoutes = () => {
  const path = usePathname();
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl">BoSS</h1>
      <div className="space-y-2">
        {routes.map((route, index) => {
          const Icon = route.icon;
          return (
            <Link
              className={cn(
                'w-[200px] rounded-md p-2 flex gap-8',
                path === route.path && 'bg-brand-light w-[50vw]'
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
      </div>
    </div>
  );
};
export default MobileRoutes;
