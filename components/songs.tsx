import SongTile from '@/components/song-tile';
import { getAllSongs } from '@/lib/public-actions/actions';

const Songs = async () => {
  const songs = await getAllSongs();

  return (
    <div className="flex flex-col gap-4 mt-4">
      {songs.map((song, index) => (
        <SongTile song={song} key={index} />
      ))}
    </div>
  );
};
export default Songs;
