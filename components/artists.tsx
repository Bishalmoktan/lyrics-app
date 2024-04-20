import ArtistTile from '@/components/artist-tile';
import { getAllArtist } from '@/lib/admin/actions';

const Artists = async () => {
  const artists = await getAllArtist();

  return (
    <div className="flex flex-col gap-4 mt-4">
      {artists.map((artist, index) => (
        <ArtistTile key={index} artist={artist} />
      ))}
    </div>
  );
};
export default Artists;
