"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal";
import {
  addSongToPlaylist,
  getPlaylistsOnly,
} from "@/lib/public-actions/actions";
import { Playlist } from "@prisma/client";
import { Edit, MoreHorizontal, Plus, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SongActionMenuProps {
  playlist: Playlist;
}

function PlaylistActionMenu({ playlist }: SongActionMenuProps) {
  const { openModal } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <MoreHorizontal size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          onClick={() => openModal("renamePlaylist", { playlist: playlist })}
        >
          <Edit className="mr-2" />
          <span>Rename Playlist</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openModal("deletePlaylist", { playlist: playlist })}
        >
          <Trash2 className="mr-2" />
          <span>Delete Playlist</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default PlaylistActionMenu;
