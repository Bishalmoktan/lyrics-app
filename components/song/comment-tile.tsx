'use client';
import Image from 'next/image';
import TimeAgo from '../time-ago';
import CommentAction from './comment-action';

interface CommentTileProps {
  id: string;
  userId: string;
  name: string;
  thoughts: string;
  date: Date;
  pic: string;
}

const CommentTile = ({
  person,
  onDeleteSuccess,
}: {
  person: CommentTileProps;
  onDeleteSuccess: () => void;
}) => {
  return (
    <div className="flex gap-8 cursor-pointer items-center w-full">
      <Image
        src={person.pic}
        alt={person.name}
        width={300}
        height={300}
        className="size-12 md:size-16 rounded-full"
      />
      <div className="flex-grow">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <h4 className="text-sm font-bold md:text-xl">{person.name}</h4>
            <div className="text-xs text-zinc-400">
              <TimeAgo date={person.date} />
            </div>
          </div>
          <CommentAction
            userId={person.userId}
            id={person.id}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
        <p className="text-sm text-zinc-300">{person.thoughts}</p>
      </div>
    </div>
  );
};
export default CommentTile;
