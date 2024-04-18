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
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import DeleteArtistButton from './_components/delete-artist-button';
import EditArtistButton from './_components/edit-artist-button';

export interface IArtist extends Artist {
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
              <EditArtistButton artist={row.original} />
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-3">
              <DeleteArtistButton artist={row.original} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
