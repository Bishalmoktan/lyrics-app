'use client';
import { useModal } from '@/hooks/use-modal';
import { Edit } from 'lucide-react';
import { IUser } from '../columns';

const EditUserButton = ({ user }: { user: IUser }) => {
  const { openModal } = useModal();

  return (
    <div
      className="flex gap-3 cursor-pointer"
      onClick={() => openModal('updateUser', { user })}
    >
      <Edit /> <span>Update</span>
    </div>
  );
};
export default EditUserButton;
