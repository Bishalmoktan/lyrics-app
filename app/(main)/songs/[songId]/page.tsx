import SongSection from '@/components/song/song-section';

const SongLyricsPage = () => {
  return (
    <div className="space-y-8">
      <div className="w-max">
        <h1 className="text-3xl md:text-6xl font-bold">Thamana Haat Yo</h1>
        <p className="text-right text-md text-zinc-300">Samir Shrestha</p>
      </div>
      <SongSection />
    </div>
  );
};
export default SongLyricsPage;
