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
import { toggleFeatureArtist } from '@/lib/admin/modal-actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const ToggleFeatureArtistModal = () => {
  const { closeModal, isOpen, type, data } = useModal();
  const { artist } = data;
  const [loading, setLoading] = useState(false);
  const isModalOpen = isOpen && type === 'toggleFeatureArtist';
  const router = useRouter();
  const handleToggle = async () => {
    try {
      setLoading(true);
      if (artist) {
        const updatedArtist = await toggleFeatureArtist(artist);
        toast.success(`${updatedArtist.msg}`);
        router.refresh();
      } else {
        throw new Error(`Artist doesn't exists`);
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

  const text: string = artist?.isFeatured ? 'Unfeature' : 'Feature';
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">{text} Artist</DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Are you sure want to {text.toLowerCase()} this artist? <br />
            <span className="font-semibold text-indigo-500">
              {' '}
              {artist?.name}{' '}
            </span>{' '}
            will be {artist?.isFeatured ? 'removed from' : 'added to'} the
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

export default ToggleFeatureArtistModal;
