import SongSection from '@/components/song/song-section';
import { getSongDetail } from '@/lib/public-actions/actions';

const SongLyricsPage = async ({ params }: { params: { songId: string } }) => {
  const song = await getSongDetail(params.songId);
  return (
    <div className="space-y-8">
      <div className="w-max">
        <h1 className="text-3xl md:text-6xl font-bold">{song.title}</h1>
        <p className="text-right text-md text-zinc-300">{song.Artist.name}</p>
      </div>
      <SongSection {...song} />
    </div>
  );
};
export default SongLyricsPage;
