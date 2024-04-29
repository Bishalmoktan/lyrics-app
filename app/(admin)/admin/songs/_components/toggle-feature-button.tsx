'use client';
import { useModal } from '@/hooks/use-modal';
import { Star, StarOff } from 'lucide-react';
import { Song } from '../columns';

const ToggleFeaturedButton = ({ song }: { song: Song }) => {
  const { openModal } = useModal();
  return (
    <div
      className="flex gap-3 cursor-pointer"
      onClick={() => openModal('toggleFeatureSong', { song: song })}
    >
      {song.isFeatured ? (
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
export default ToggleFeaturedButton;
