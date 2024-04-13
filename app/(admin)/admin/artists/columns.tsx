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
import { Artist, Song } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, ArrowUpDown, Trash2Icon } from 'lucide-react';

// export type Artist = {
//   id: string;
//   name: string;
//   songs: number;
//   designation: string;
// };

interface IArtist extends Artist {
  songs: Song[];
}

export const columns: ColumnDef<IArtist>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Artist Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const artist = row.original;
      return (
        <div className="">
          <h3 className="text-xl">{artist.name}</h3>
          <p className="text-sm text-zinc-500">{artist.designation}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'songs',
    header: 'Songs',
    cell: ({ row }) => {
      const artist = row.original;
      return <h3 className="text-xl">{artist.songs.length}</h3>;
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
              <Edit /> <span> Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-3">
              <Trash2Icon /> <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
