import { Artist, Song } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export interface songTileProps extends Song {
  Artist: Artist;
}

const SongTile = ({ song }: { song: songTileProps }) => {
  return (
    <Link
      href={`/songs/${song.id}`}
      className="flex gap-8 cursor-pointer items-center hover:bg-brand-light transition-all w-[85%] p-4 rounded-md"
    >
      <Image
        src={song.thumbnail}
        alt={song.title}
        width={'600'}
        height={'300'}
        className="w-24 h-20 object-cover rounded-md"
      />
      <div className="w-56">
        <h4 className="text-lg md:text-2xl">{song.title}</h4>
        <p className="text-zinc-300">{song.Artist.name}</p>
      </div>
      <div className="text-zinc-300">{song.duration}</div>
    </Link>
  );
};
export default SongTile;
