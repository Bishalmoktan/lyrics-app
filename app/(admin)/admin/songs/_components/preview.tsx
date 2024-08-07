import { z } from 'zod';
import Image from 'next/image';
import CustomMusicPlayer from '@/components/song/audio-player';
import LyricsContainer from '@/components/song/lyrics-container';
import ArtistTile from '@/components/artist-tile';
import { ReadMore } from '@/components/song/read-more';
import { ILyricsJson, formSchema } from '../create/_components/form';
import { Artist } from '@prisma/client';
import { cn } from '@/lib/utils';

type previewProps = z.infer<typeof formSchema>;

interface IPreviewType extends previewProps {
  thumbnail: string;
  artists: Artist[];
  jsonLyrics: ILyricsJson[]
  jsonNepaliLyrics: ILyricsJson[]
}

const Preview = ({
  songId,
  story,
  title,
  artist: artistId,
  jsonLyrics,
  thumbnail,
  artists,
  jsonNepaliLyrics
}: IPreviewType) => {
  let artist: Artist | null = null;
  for (let a of artists) {
    if (a.id === artistId) {
      artist = a;
      break;
    }
  }
  
  return (
    <>
      <div>
        <h1 className={cn('text-3xl font-bold', title.length < 30 ? 'md:text-6xl': 'text-2xl text:5xl')}>{title}</h1>
        <p className="text-md text-zinc-300">{artist?.name}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-full md:h-[50vh]">
          <Image
            src={thumbnail}
            width={'600'}
            height={'300'}
            className="w-full h-full object-cover rounded-md"
            alt="Song title.."
          />
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CustomMusicPlayer songId={songId} />
          </div>
        </div>
        <div>
          <LyricsContainer englishLyrics={jsonLyrics} nepaliLyrics={jsonNepaliLyrics} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <div className="space-y-6 pointer-events-none" >
            {artist && (
              <ArtistTile
                artist={{
                  id: artist?.id,
                  designation: artist?.designation,
                  name: artist?.name,
                  avatar_url: artist?.avatar_url,
                  isFeatured: artist?.isFeatured
                }}
              />
            )}
            <div>
              <h3 className="text-lg md:text-2xl font-bold">About the song</h3>
              <ReadMore id="12" text={story} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Preview;
