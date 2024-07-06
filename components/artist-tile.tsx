import { Artist } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const ArtistTile = ({ artist }: { artist: Artist }) => {
  return (
    <Link
      href={`/search?artistId=${artist.id}`}
      className="flex gap-8 cursor-pointer items-center hover:bg-brand-light w-full transition-all p-4 rounded-md"
    >
      <Image
        src={artist.avatar_url}
        width={300}
        height={300}
        alt={artist.name}
        className="size-20 rounded-full"
      />
      <div>
        <h4 className="text-lg font-bold md:text-2xl line-clamp-1">{artist.name}</h4>
        <p className="text-zinc-300">{artist.designation}</p>
      </div>
    </Link>
  );
};
export default ArtistTile;
