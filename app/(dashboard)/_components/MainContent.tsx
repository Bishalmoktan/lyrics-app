import { getFeaturedArtists, getFeaturedSongs } from '@/lib/public-actions/actions'
import SongCard from './SongCard'
import Categories from '@/components/categories';
import ArtistCard from './ArtistCard';

export default async function MainContent() {
    const songs = await getFeaturedSongs();
    const artists = await getFeaturedArtists();

  return (
    <div className="bg-[#0E1729] rounded-lg m-2 p-6 overflow-y-auto">
     
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Your Top Mixes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-6">Top Artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {artists.map((artist) => (
         <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
      <div className='mt-8'>
      <Categories link='/dashboard/genre/' />
      </div>
    </div>
  )
}