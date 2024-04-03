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
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, ArrowUpDown, Trash2Icon } from 'lucide-react';

export type Song = {
  id: string;
  name: string;
  postedBy: string;
  artist: string;
};

export const columns: ColumnDef<Song>[] = [
  {
    accessorKey: 'name',
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
          <h3 className="text-xl">{song.name}</h3>
          <p className="text-sm text-zinc-500">{song.artist}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'postedBy',
    header: 'Posted by',
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
