import { cache } from 'react';
import { Metadata } from 'next';
import SongSection from '@/components/song/song-section';
import { getSongDetail } from '@/lib/public-actions/actions';
import { notFound } from 'next/navigation';

const getSong = cache(async(postId: string) => {
  const song = await getSongDetail(postId);
  return song
})


export async function generateMetadata({ 
  params }: { params: { songId: string }
 }) : Promise<Metadata> {
  const song = await getSong(params.songId);

  if(!song){
    return {
      title: {
        absolute: 'Bisaric'
      },
      description: 'Page not found'
    }
  }

  return {
    title: {
      absolute: `${song?.title} | ${song?.Artist.name}`
    },
    description: song?.story ? song?.story : `Get the english and nepali lyrics of the song ${song?.title} by ${song?.Artist.name}`,
    openGraph: {
      images: [
        {
          url: song?.thumbnail
        }
      ]
    }
  }
 }


const SongLyricsPage = async ({ params }: { params: { songId: string } }) => {
  const song = await getSong(params.songId);
  if(!song){
    notFound();
  }
  return (
    <div className="space-y-8">
      <div className="w-max">
        <h1 className="text-3xl md:text-6xl font-bold">{song?.title}</h1>
        <p className="text-right text-md text-zinc-300">{song?.Artist.name}</p>
      </div>
      <SongSection {...song} />
    </div>
  );
};
export default SongLyricsPage;
