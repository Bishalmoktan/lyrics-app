import Image from 'next/image';
import thumbnail from '@/public/song1.jpg';
import artist from '@/public/samir.jpg';
import LyricsContainer from './lyrics-container';
import ArtistTile from '../artist-tile';
import { ReadMore } from './read-more';
import CommentSection from './comment-section';
import Songs from '../songs';
import CustomMusicPlayer from './audio-player';

const SongSection = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-full md:h-[50vh]">
          <Image
            src={thumbnail}
            className="w-full h-full object-cover rounded-md"
            alt="Song title.."
          />
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CustomMusicPlayer />
          </div>
        </div>
        <div>
          <LyricsContainer />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <div className="space-y-6">
            <ArtistTile
              artist={{
                designation: 'Singer, Songwriter',
                name: 'Samir Shrestha',
                pic: artist,
              }}
            />
            <div>
              <h3 className="text-lg md:text-2xl font-bold">About the song</h3>
              <ReadMore
                id="12"
                text={`"Thamana Haat" is a poignant song that delves into the profound bond between two lovers facing the challenges of pursuing their dreams amidst the complexities of early adulthood. Set against the backdrop of the tumultuous twenties, where the pressures of career and academic pursuits loom large, the narrative unfolds as the female protagonist embarks on a journey to a foreign land for her studies.
              
              The song encapsulates the essence of unwavering love and unwavering support, as the male protagonist pledges to stand by her side through thick and thin, regardless of the hurdles that lie ahead. Despite grappling with the pangs of separation, fueled by the anguish of physical distance, their commitment remains steadfast.
              
              For both individuals, the transition is fraught with emotional turmoil, as they grapple with the inherent challenges of acclimating to new environments and balancing personal aspirations with the demands of reality. The lyrics poignantly capture the shared sense of longing and resilience that characterizes their relationship, offering solace to listeners navigating similar paths in pursuit of a brighter future.
              
              "Thamana Haat" serves as a poignant anthem for couples confronting the trials and tribulations of long-distance relationships, resonating with its universal themes of love, sacrifice, and the unwavering pursuit of dreams.`}
              />
            </div>
            <div>
              <CommentSection />
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
