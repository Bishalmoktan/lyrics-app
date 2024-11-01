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
import { MoreHorizontal, Plus, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SongActionMenuProps {
  songId: string;
}

function SongActionMenu({ songId }: SongActionMenuProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { openModal } = useModal();

  useEffect(() => {
    getPlaylistsOnly()
      .then((data) => {
        setPlaylists(data.playlists);
      })
      .catch((err) => {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Something went wrong!");
        }
      });
  }, []);

  const saveToPlaylist = async (playlistId: string) => {
    try {
      const res = await addSongToPlaylist(songId, playlistId);
      toast.success(res?.msg);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <MoreHorizontal size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Plus className="mr-2" />
            <span>Add to playlist</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuLabel>Your playlist</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {playlists.map((playlist) => (
                <DropdownMenuItem
                  key={playlist.id}
                  onClick={() => saveToPlaylist(playlist.id)}
                >
                  {playlist.title}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openModal("createPlaylist")}>
                <PlusCircle className="mr-2" />
                <span>Create new one</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <PlusCircle className="mr-2" />
          <span>Add to liked songs</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default SongActionMenu;
