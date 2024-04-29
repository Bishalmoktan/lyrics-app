import ArtistTile from '@/components/artist-tile';
import { getFeaturedArtists } from '@/lib/public-actions/actions';

const Artists = async () => {
  const artists = await getFeaturedArtists();

  return (
    <div className="flex flex-col gap-4 mt-4">
      {artists.map((artist, index) => (
        <ArtistTile key={index} artist={artist} />
      ))}
    </div>
  );
};
export default Artists;
