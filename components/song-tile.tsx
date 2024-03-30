import Image, { StaticImageData } from 'next/image';

interface SongTileProps {
  title: string;
  artist: string;
  duration: string;
  thumbnail: StaticImageData;
}

const SongTile = ({ song }: { song: SongTileProps }) => {
  return (
    <div className="flex gap-8 cursor-pointer items-center">
      <Image
        src={song.thumbnail}
        alt={song.title}
        className="w-24 h-20 object-cover rounded-md"
      />
      <div className="w-56">
        <h4 className="text-lg md:text-2xl">{song.title}</h4>
        <p className="text-zinc-300">{song.artist}</p>
      </div>
      <div className="text-zinc-300">{song.duration}</div>
    </div>
  );
};
export default SongTile;
