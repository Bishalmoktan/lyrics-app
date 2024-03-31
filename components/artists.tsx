import ArtistTile from '@/components/artist-tile';
import sajjan from '@/public/sajjan.jpg';
import sushant from '@/public/sushant.jpg';
import tribalRain from '@/public/tribalRain.jpg';

const Artists = () => {
  const artists = [
    {
      name: 'Sajjan Raj Vaidya',
      pic: sajjan,
      designation: 'Singer, Songwriter',
    },
    {
      name: 'Sushant KC',
      pic: sushant,
      designation: 'Singer, Songwriter',
    },
    {
      name: 'Tribal Rain',
      pic: tribalRain,
      designation: 'Band',
    },
  ];
  return (
    <div className="flex flex-col gap-4 mt-4">
      {artists.map((artist, index) => (
        <ArtistTile key={index} artist={artist} />
      ))}
    </div>
  );
};
export default Artists;
