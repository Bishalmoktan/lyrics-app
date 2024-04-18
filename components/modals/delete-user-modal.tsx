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
import { useModal } from '@/hooks/use-modal';
import { getCurrentUser } from '@/lib/actions';
import { deleteUser } from '@/lib/modal-actions';
import { UserRole } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const DeleteUserModal = () => {
  const { closeModal, isOpen, type, data } = useModal();
  const { user } = data;
  const [loading, setLoading] = useState(false);
  const isModalOpen = isOpen && type === 'deleteUser';
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setLoading(true);
      const session = await getCurrentUser();
      if (user) {
        if (session?.user.id === user.id) {
          throw new Error('You cannot delete yourself!');
        }

        if (user.role === UserRole.ADMIN) {
          throw new Error('You cannot delete other admins');
        }
        const deletedUser = await deleteUser(user);
        toast.success(deletedUser.msg);
        router.refresh();
      } else {
        throw new Error('User not found');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    closeModal();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete User</DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Are you sure want to do this? <br />
            <span className="font-semibold text-indigo-500">
              {' '}
              {user?.name}{' '}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={loading}
              onClick={handleClose}
              variant={'ghost'}
              className="hover:bg-white hover:text-black transition"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={handleDelete}
              variant={'destructive'}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
