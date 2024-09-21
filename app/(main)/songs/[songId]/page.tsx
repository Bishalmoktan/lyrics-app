import { cache } from 'react';
import { Metadata } from 'next';
import SongSection from '@/components/song/song-section';
import { getSongDetail } from '@/lib/public-actions/actions';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';

const getSong = cache(async(songId: string) => {
  const song = await getSongDetail(songId);
  return song;
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
      <div>
        <h1 className={cn('text-3xl font-bold', song.title.length < 30 ? 'md:text-6xl': 'text-2xl text:5xl')}>{song?.title}</h1>
        <p className="text-md text-zinc-300">{song?.Artist.name}</p>
      </div>
      <SongSection {...song} />
    </div>
  );
};
export default SongLyricsPage;
