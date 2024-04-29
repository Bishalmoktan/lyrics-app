'use client';
import { useModal } from '@/hooks/use-modal';
import { Edit } from 'lucide-react';
import { IArtist } from '../columns';
import Link from 'next/link';

const EditArtistButton = ({ artist }: { artist: IArtist }) => {
  const { openModal } = useModal();

  return (
    <Link
      className="flex gap-3 cursor-pointer"
      href={`/admin/artists/update?artistId=${artist.id}`}
    >
      <Edit /> <span>Update</span>
    </Link>
  );
};
export default EditArtistButton;
