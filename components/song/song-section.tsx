import Image from 'next/image';
import LyricsContainer from './lyrics-container';
import ArtistTile from '../artist-tile';
import { ReadMore } from './read-more';
import CommentSection from './comment-section';
import Songs from '../songs';
import CustomMusicPlayer from './audio-player';
import { ISongDetail } from '@/lib/public-actions/actions';
import { getCurrentUser } from '@/lib/admin/actions';


const SongSection = async ({
  Artist,
  lyrics,
  songId,
  story,
  thumbnail,
  nepaliLyrics,
}: ISongDetail) => {
  const session = await getCurrentUser();


  
  return (
    <>
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
          <LyricsContainer
          // TODO: FIX THIS TYPESCRIPT ERROR 
          // @ts-ignore 
          englishLyrics={lyrics}
          // @ts-ignore  
            nepaliLyrics={nepaliLyrics}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <div className="space-y-6">
            <ArtistTile
              artist={{
                id: Artist.id,
                designation: Artist.designation,
                name: Artist.name,
                avatar_url: Artist.avatar_url,
                isFeatured: Artist.isFeatured
              }}
            />
            <div>
              <h3 className="text-lg md:text-2xl font-bold">About the song</h3>
              <ReadMore id="12" text={story || ''} />
            </div>
            <div>
              <CommentSection session={session} />
            </div>
          </div>
        </div>
        <div className="flex md:justify-end">
          <div>
            <h3 className="text-xl">Popular Songs</h3>
            <Songs />
          </div>
        </div>
      </div>
    </>
  );
};
export default SongSection;
