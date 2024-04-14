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
import { Song, User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, ArrowUpDown, Trash2Icon } from 'lucide-react';

type UserType = Omit<User, 'password' | 'emailVerified'>;

interface IUser extends UserType {
  songs: Song[];
}

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const person = row.original;
      return (
        <div className="">
          <h3 className="text-xl">{person.name}</h3>
          <p className="text-sm text-zinc-500">{person.role}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'songsPosted',
    header: 'Songs posted',
    cell: ({ row }) => {
      const user = row.original;
      return <h3 className="text-xl">{user.songs.length}</h3>;
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
