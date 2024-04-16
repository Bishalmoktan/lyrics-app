import { useModal } from '@/hooks/use-modal';
import { Trash2Icon } from 'lucide-react';
import { Song } from '../columns';

const DeleteSongButton = ({ song }: { song: Song }) => {
  const { openModal } = useModal();
  return (
    <div
      className="flex gap-3 cursor-pointer"
      onClick={() => openModal('deleteSong', { song: song })}
    >
      <Trash2Icon /> <span>Delete</span>
    </div>
  );
};
export default DeleteSongButton;
