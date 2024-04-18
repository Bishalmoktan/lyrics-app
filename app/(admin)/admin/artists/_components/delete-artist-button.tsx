'use client';
import { useModal } from '@/hooks/use-modal';
import { Trash2Icon } from 'lucide-react';
import { IArtist } from '../columns';

const DeleteArtistButton = ({ artist }: { artist: IArtist }) => {
  const { openModal } = useModal();
  return (
    <div
      className="flex gap-3 cursor-pointer"
      onClick={() => openModal('deleteArtist', { artist })}
    >
      <Trash2Icon /> <span>Delete</span>
    </div>
  );
};
export default DeleteArtistButton;
