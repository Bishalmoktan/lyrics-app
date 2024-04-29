'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Artist, User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, ArrowUpDown, BadgeCheck } from 'lucide-react';
import DeleteSongButton from './_components/delete-song-button';
import Link from 'next/link';
import ToggleFeaturedButton from './_components/toggle-feature-button';

export interface Song {
  id: string;
  isFeatured: boolean;
  title: string;
  Artist: Artist;
  User: User;
}

export const columns: ColumnDef<Song>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Song Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const song = row.original;
      return (
        <div className="">
          <div className="flex items-center gap-1">
            <h3 className="text-xl">{song.title}</h3>
            {song.isFeatured && <BadgeCheck className="size-6" />}
          </div>
          <p className="text-sm text-zinc-500">{song.Artist.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'postedBy',
    header: 'Posted by',
    cell: ({ row }) => {
      const song = row.original;
      return (
        <div className="">
          <h3 className="text-xl">{song.User.name}</h3>
          <p className="text-sm text-zinc-500">{song.User.email}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="space-x-3">
              <Edit />{' '}
              <Link href={`/admin/songs/update?id=${row.original.id}`}>
                {' '}
                Update
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-3">
              <DeleteSongButton song={row.original} />
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-3">
              <ToggleFeaturedButton song={row.original} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
