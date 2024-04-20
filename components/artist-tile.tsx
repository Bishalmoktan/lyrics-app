import Image, { StaticImageData } from 'next/image';

interface ArtistTitleProps {
  name: string;
  designation: string;
  pic: string;
}

const ArtistTile = ({ artist }: { artist: ArtistTitleProps }) => {
  return (
    <div className="flex gap-8 cursor-pointer items-center">
      <Image
        src={artist.pic}
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
