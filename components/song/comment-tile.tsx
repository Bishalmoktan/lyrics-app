import Image, { StaticImageData } from 'next/image';

interface CommentTileProps {
  name: string;
  thoughts: string;
  date: string;
  pic: StaticImageData;
}

const CommentTile = ({ person }: { person: CommentTileProps }) => {
  return (
    <div className="flex gap-8 cursor-pointer items-center">
      <Image
        src={person.pic}
        alt={person.name}
        className="size-16 rounded-full"
      />
      <div>
        <div className="flex gap-3 items-end">
          <h4 className="text-lg font-bold md:text-xl">{person.name}</h4>
          <span className="text-sm text-zinc-400">• {person.date}</span>
        </div>
        <p className="text-zinc-300">{person.thoughts}</p>
      </div>
    </div>
  );
};
export default CommentTile;
