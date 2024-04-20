import { Artist } from '@prisma/client';
import Image, { StaticImageData } from 'next/image';

const ArtistTile = ({ artist }: { artist: Artist }) => {
  return (
    <div className="flex gap-8 cursor-pointer items-center">
      <Image
        src={artist.avatar_url}
        width={300}
        height={300}
        alt={artist.name}
        className="size-20 rounded-full"
      />
      <div>
        <h4 className="text-lg font-bold md:text-2xl">{artist.name}</h4>
        <p className="text-zinc-300">{artist.designation}</p>
      </div>
    </div>
  );
};
export default ArtistTile;
