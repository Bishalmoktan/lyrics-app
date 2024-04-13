'use client';

import { cn } from '@/lib/utils';
import {
  MicVocal,
  Music,
  Undo2,
  Upload,
  UserRoundPlus,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const sidebarItems = [
    {
      label: 'Songs',
      path: '/admin/songs',
      icon: Music,
    },
    {
      label: 'Users',
      path: '/admin/users',
      icon: Users,
    },
    {
      label: 'Artists',
      path: '/admin/artists',
      icon: MicVocal,
    },
    {
      label: 'Add Song',
      path: '/admin/songs/create',
      icon: Upload,
    },
    {
      label: 'Create Artist',
      path: '/admin/artists/create',
      icon: UserRoundPlus,
    },
  ];

  const path = usePathname();

  return (
    <div className="flex flex-col gap-1">
      <Link
        href={'/'}
        className={cn(
          'md:hidden flex gap-2 p-3 items-center rounded-md hover:bg-brand-light transition'
        )}
      >
        <Undo2 className="size-8" />
        <div className="text-xl">{'Home'}</div>
      </Link>
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            href={item.path}
            key={index}
            className={cn(
              'flex gap-2 p-3 items-center rounded-md hover:bg-brand-light transition',
              path === item.path && 'bg-brand-light'
            )}
          >
            <Icon className="size-8" />
            <div className="text-xl">{item.label}</div>
          </Link>
        );
      })}
    </div>
  );
};
export default Sidebar;
