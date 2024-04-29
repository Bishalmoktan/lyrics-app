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
import { toggleFeatureSong } from '@/lib/admin/modal-actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const ToggleFeatureSongModal = () => {
  const { closeModal, isOpen, type, data } = useModal();
  const { song } = data;
  const [loading, setLoading] = useState(false);
  const isModalOpen = isOpen && type === 'toggleFeatureSong';
  const router = useRouter();
  const handleToggle = async () => {
    try {
      setLoading(true);
      if (song) {
        const updatedSong = await toggleFeatureSong(song);
        toast.success(`${updatedSong.msg}`);
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

  const text: string = song?.isFeatured ? 'Unfeature' : 'Feature';
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">{text} Song</DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Are you sure want to {text.toLowerCase()} this song? <br />
            <span className="font-semibold text-indigo-500">
              {' '}
              {song?.title}{' '}
            </span>{' '}
            will be {song?.isFeatured ? 'removed from' : 'added to'} the
            featured list.
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
              onClick={handleToggle}
              className="bg-rose-500 text-white hover:bg-rose-700"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleFeatureSongModal;
