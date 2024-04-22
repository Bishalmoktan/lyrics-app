'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/admin/actions';
import { Session } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteComment } from '@/lib/public-actions/actions';
import { toast } from 'sonner';

interface CommnentActionProps {
  userId: string;
  id: string;
  onDeleteSuccess: () => void;
}

const CommentAction = ({
  userId,
  id,
  onDeleteSuccess,
}: CommnentActionProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  useEffect(() => {
    const getSession = async () => {
      const res = await getCurrentUser();
      setSession(res);
    };
    getSession();
  }, []);
  const handleDelete = async () => {
    try {
      const res = await deleteComment(id, userId);
      toast.success(res.msg);
      router.refresh();
      onDeleteSuccess();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  if (userId === session?.user.id) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={handleDelete}
            className="space-x-3 cursor-pointer"
          >
            <Trash2 /> <span> Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return null;
};
export default CommentAction;
