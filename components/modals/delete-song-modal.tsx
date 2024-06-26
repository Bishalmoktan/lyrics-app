'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import { deleteSong } from '@/lib/admin/modal-actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const DeleteSongModal = () => {
  const { closeModal, isOpen, type, data } = useModal();
  const { song } = data;
  const [loading, setLoading] = useState(false);
  const isModalOpen = isOpen && type === 'deleteSong';
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setLoading(true);
      if (song) {
        const deletedSong = await deleteSong(song);
        toast.success(`${deletedSong.msg}`);
        router.refresh();
      } else {
        throw new Error(`Song doesn't exists`);
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
          <DialogTitle className="text-center">Delete Song</DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Are you sure want to do this? <br />
            <span className="font-semibold text-indigo-500">
              {' '}
              {song?.title}{' '}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={loading}
              onClick={handleClose}
              variant={'ghost'}
              className="hover:bg-white hover:text-black transition"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={handleDelete}
              variant={'destructive'}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSongModal;
