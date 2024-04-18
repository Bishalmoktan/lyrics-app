'use client';
import { useModal } from '@/hooks/use-modal';
import { Edit } from 'lucide-react';
import { IArtist } from '../columns';

const EditArtistButton = ({ artist }: { artist: IArtist }) => {
  const { openModal } = useModal();

  return (
    <div
      className="flex gap-3 cursor-pointer"
      onClick={() => openModal('updateArtist', { artist })}
    >
      <Edit /> <span>Update</span>
    </div>
  );
};
export default EditArtistButton;
