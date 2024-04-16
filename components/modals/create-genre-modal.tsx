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
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal';
import { createGenre } from '@/lib/actions';
import { useState } from 'react';
import { toast } from 'sonner';

const CreateGenreModal = () => {
  const { closeModal, isOpen, type } = useModal();
  const isModalOpen = isOpen && type === 'createGenre';
  const [genre, setGenre] = useState('');
  const handleSave = async () => {
    if (genre === '') {
      toast.error('Genre cannot be empty!');
      return;
    }
    try {
      const res = await createGenre(genre);
      toast.success(res.msg);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setGenre('');
      handleClose();
    }
  };

  const handleClose = () => {
    setGenre('');
    closeModal();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Genre</DialogTitle>
          <DialogDescription>
            {`Create a new genre. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            id="name"
            placeholder="Eg: Pop"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
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

export default CreateGenreModal;
