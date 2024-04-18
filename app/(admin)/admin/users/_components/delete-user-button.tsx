'use client';
import { useModal } from '@/hooks/use-modal';
import { Trash2Icon } from 'lucide-react';
import { IUser } from '../columns';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/actions';
import { Session } from 'next-auth';

const DeleteUserButton = ({ user }: { user: IUser }) => {
  const { openModal } = useModal();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const res = await getCurrentUser();
      setSession(res);
    };
    getSession();
  }, []);

  if (session?.user.role === 'ADMIN') {
    return (
      <div
        className="flex gap-3 cursor-pointer"
        onClick={() => openModal('deleteUser', { user })}
      >
        <Trash2Icon /> <span>Delete</span>
      </div>
    );
  }

  return null;
};
export default DeleteUserButton;
