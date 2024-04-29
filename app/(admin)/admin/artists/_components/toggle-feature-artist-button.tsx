'use client';
import { useModal } from '@/hooks/use-modal';
import { Star, StarOff } from 'lucide-react';
import { IArtist } from '../columns';

const ToggleFeaturedArtistButton = ({ artist }: { artist: IArtist }) => {
  const { openModal } = useModal();
  return (
    <div
      className="flex gap-3 cursor-pointer"
      onClick={() => openModal('toggleFeatureArtist', { artist: artist })}
    >
      {artist.isFeatured ? (
        <>
          <StarOff /> <span>Unfeature</span>
        </>
      ) : (
        <>
          <Star /> <span>Feature</span>
        </>
      )}
    </div>
  );
};
export default ToggleFeaturedArtistButton;
