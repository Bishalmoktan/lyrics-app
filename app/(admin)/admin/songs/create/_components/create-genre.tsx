'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createGenre } from '@/lib/actions';
import { useState } from 'react';
import { toast } from 'sonner';

const CreateGenre = () => {
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
    }
    setGenre('');
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="underline underline-offset-1 ml-1 cursor-pointer">
          {' '}
          Create Genre
        </span>
      </DialogTrigger>
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

export default CreateGenre;
