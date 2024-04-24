import SongTile, { songTileProps } from '@/components/song-tile';
import {
  getSongsByArtist,
  getSongsByGenre,
} from '@/lib/public-actions/actions';

const SearchResultPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let songs: songTileProps[] | null = null;
  const genre = searchParams?.type as string;
  const artistId = searchParams?.artistId as string;
  if (genre) {
    songs = await getSongsByGenre(genre);
  }
  if (artistId) {
    songs = await getSongsByArtist(artistId);
  }

  if (songs && songs.length > 0) {
    return (
      <div>
        {genre ? (
          <h1 className="text-xl font-bold mb-6">Songs under {genre} genre</h1>
        ) : (
          <h1 className="text-xl font-bold mb-6">
            Songs by {songs[0].Artist.name}
          </h1>
        )}
        <div className="space-y-4">
          {songs.map((song) => (
            <SongTile key={song.id} song={song} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>No song found!</p>
        <p>Please try to find another!</p>
      </div>
    );
  }
};
export default SearchResultPage;
