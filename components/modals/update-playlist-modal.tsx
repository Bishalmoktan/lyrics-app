"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { renamePlaylist } from "@/lib/public-actions/actions";

const UpdatePlaylistModal = () => {
  const [playlistName, setPlaylistName] = useState("");
  const { closeModal, isOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === "renamePlaylist";
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (playlistName.length < 3) {
      toast.error("Playlist name cannot be less than 3", {
        duration: 2000,
      });
      return;
    }
    const { playlist } = data;
    if (!playlist) {
      toast.error("Playlist not found");
      return;
    }
    setLoading(true);

    try {
      const res = await renamePlaylist(playlist.id, playlistName);
      router.replace(`/dashboard/playlist`);
      toast.success(res.msg, {
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          duration: 2000,
        });
      } else {
        toast.error("Something went wrong!", {
          duration: 2000,
        });
      }
    } finally {
      setLoading(false);
      handleClose();
      router.refresh();
      setPlaylistName("");
    }
  };

  useEffect(() => {
    if (data.playlist) {
      setPlaylistName(data.playlist.title);
    }
  }, [data]);
  const handleClose = () => {
    closeModal();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle>Rename Playlist</DialogTitle>
          <DialogDescription>
            {`Rename a playlist. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label>Name</Label>
          <Input
            placeholder="Playlist name"
            className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button
            disabled={loading}
            onClick={handleSave}
            className="bg-rose-500 text-whtie hover:bg-rose-700"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlaylistModal;
