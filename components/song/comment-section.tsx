'use client';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { Session } from 'next-auth';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CommentTile from './comment-tile';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  IComment,
  getAllComments,
  postComment,
} from '@/lib/public-actions/actions';

const CommentSection = ({ session }: { session: Session | null }) => {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { songId }: { songId: string } = useParams();
  const userId = session?.user.id;
  const handleLogin = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: `/songs/${songId}`,
    });
  };
  const router = useRouter();

  const getComments = async () => {
    const res = await getAllComments(songId);
    setComments(res);
  };
  useEffect(() => {
    getComments();
  }, []);

  const handlePostComment = async () => {
    setLoading(true);
    try {
      if (content === '') {
        throw new Error('Please write something...');
      }
      if (!userId) {
        throw new Error('You must be logged in.');
      }
      if (!songId) {
        throw new Error('Song id missing');
      }
      const res = await postComment({ content, userId, songId });
      toast.success(res.msg);
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setContent('');
      getComments();
    }
  };
  return (
    <div>
      <div className="flex gap-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts"
          className="focus-visible:ring-transparent border-0 border-b-2 border-border text-lg rounded-none border-solid"
        />
        {!!session ? (
          <Button
            onClick={handlePostComment}
            disabled={loading}
            className="text-white bg-rose-500  hover:bg-rose-700"
          >
            Post
          </Button>
        ) : (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="text-white bg-rose-500  hover:bg-rose-700"
                  onClick={() => handleLogin('google')}
                >
                  Login
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[150px] text-center">
                <p>You must login to share your thoughts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="py-4 space-y-6">
        {comments?.map((comment) => {
          return (
            <CommentTile
              key={comment.id}
              person={{
                userId: comment.user.id,
                name: comment.user.name || '',
                pic: comment.user.image || '',
                date: comment.createdAt,
                thoughts: comment.content,
                id: comment.id,
              }}
              onDeleteSuccess={getComments}
            />
          );
        })}
      </div>
    </div>
  );
};
export default CommentSection;
