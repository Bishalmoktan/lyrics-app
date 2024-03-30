import SongTile from '@/components/song-tile';
import song2 from '@/public/song2.jpg';
import song1 from '@/public/song1.jpg';
import song3 from '@/public/song3.jpg';
import song4 from '@/public/song4.jpg';

const Songs = () => {
  const songs = [
    {
      title: 'Upahaar',
      artist: 'Swoopna Suman',
      duration: '4:18',
      thumbnail: song2,
    },
    {
      title: 'Thamana Haat yo',
      artist: 'Samir Shrestha',
      duration: '3:10',
      thumbnail: song1,
    },
    {
      title: 'Dhairya',
      artist: 'Sajjan Raj Vaidya',
      duration: '5:35',
      thumbnail: song3,
    },
    {
      title: 'Sparsha Sangeet',
      artist: 'Purna Rai',
      duration: '5:35',
      thumbnail: song4,
    },
  ];
  return (
    <div className="flex flex-col gap-4 mt-4">
      {songs.map((song, index) => (
        <SongTile song={song} key={index} />
      ))}
    </div>
  );
};
export default Songs;
