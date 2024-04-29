import SongTile from '@/components/song-tile';
import { getFeaturedSongs } from '@/lib/public-actions/actions';

const Songs = async () => {
  const songs = await getFeaturedSongs();

  return (
    <div className="flex flex-col gap-4 mt-4">
      {songs.map((song, index) => (
        <SongTile song={song} key={index} />
      ))}
    </div>
  );
};
export default Songs;
