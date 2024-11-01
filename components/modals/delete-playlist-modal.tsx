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
import { deletePlaylist } from "@/lib/public-actions/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const DeletePlaylistModal = () => {
  const { closeModal, isOpen, type, data } = useModal();
  const { playlist } = data;
  const [loading, setLoading] = useState(false);
  const isModalOpen = isOpen && type === "deletePlaylist";
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setLoading(true);
      if (playlist) {
        const deletedPlaylist = await deletePlaylist(playlist.id);
        toast.success(deletedPlaylist.msg);
        router.replace("/dashboard/playlist");
        router.refresh();
      } else {
        throw new Error("Playlist not found");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    closeModal();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete Playlist</DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Are you sure want to do this? <br />
            <span className="font-semibold text-indigo-500">
              {" "}
              {playlist?.title}{" "}
            </span>{" "}
            playlist will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={loading}
              onClick={handleClose}
              variant={"ghost"}
              className="hover:bg-white hover:text-black transition"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={handleDelete}
              variant={"destructive"}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePlaylistModal;
