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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { createPlaylist } from "@/lib/public-actions/actions";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const { closeModal, isOpen, type } = useModal();
  const isModalOpen = isOpen && type === "createPlaylist";
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSave = async () => {
    if (playlistName.length < 3) {
      toast.error("Playlist name cannot be less than 3", {
        duration: 2000,
      });
      return;
    }
    setLoading(true);
    try {
      const playlist = await createPlaylist(playlistName);
      toast.success(playlist.msg, {
        duration: 2000,
      });
      router.refresh();
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

  const handleClose = () => {
    closeModal();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle>Create Playlist</DialogTitle>
          <DialogDescription>
            {`Create a playlist. Click save when you're done.`}
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

export default CreatePlaylist;
