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
import { UserRole } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUser } from '@/lib/admin/modal-actions';
import { useRouter } from 'next/navigation';

const UpdateUserModal = () => {
  const { closeModal, isOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === 'updateUser';
  const [role, setRole] = useState<UserRole>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSave = async () => {
    try {
      setLoading(true);
      
      if (!data.user) {
        throw new Error("User doesn't exist");
      }
      
      if (!role) {
        throw new Error("Role is not selected");
      }
      
      if (role === data.user.role) {
        throw new Error(`${role} is already the current role`);
      }
  
      const res = await updateUser(data.user, role);
      toast.success(res.msg);
      router.refresh();
    } catch (error: any) {
      console.error('Error in handleSave:', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      handleClose();
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (data.user) {
      setRole(data.user?.role);
    }
  }, [data.user]);

  const handleClose = () => {
    closeModal();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            {`Update a user. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div>
          <h2 className="text-xl text-bold">{data.user?.name}</h2>
          <p className="text-sm text-zinc-300">{data.user?.email}</p>
          <p className="text-sm text-zinc-300">{data.user?.role}</p>
        </div>
        <Select
          defaultValue={`${data.user?.role}`}
          onValueChange={(value: UserRole) => setRole(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Role</SelectLabel>
              <SelectItem value="USER">USER</SelectItem>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="MODERATOR">MODERATOR</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            disabled={loading}
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

export default UpdateUserModal;
