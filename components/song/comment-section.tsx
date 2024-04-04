import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CommentTile from './comment-tile';
import img from '@/public/purna.jpg';

const CommentSection = () => {
  return (
    <div>
      <div className="flex gap-4">
        <Input
          placeholder="Share your thoughts"
          className="focus-visible:ring-transparent border-0 border-b-2 border-border text-lg rounded-none border-solid"
        />
        <Button className="text-white bg-rose-500  hover:bg-rose-700">
          Post
        </Button>
      </div>
      <div className="py-4">
        <CommentTile
          person={{
            name: 'Sajin Tamang',
            pic: img,
            date: '2 weeks ago',
            thoughts:
              'I think this is the song that everyone can relate. This song reminds me of her who has been always supportive',
          }}
        />
      </div>
    </div>
  );
};
export default CommentSection;
