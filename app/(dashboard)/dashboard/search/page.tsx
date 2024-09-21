'use client'

import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import { searchSongsAndArtistsByName } from '@/lib/public-actions/actions';
import { songTileProps } from '@/components/song-tile';
import { Artist } from '@prisma/client';
import ArtistCard from './_components/ArtistCard';
import SongCard from './_components/SongCard';
import Skeleton from './_components/Skeleton';  

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery) {
        setIsLoading(true);
        const results = await searchSongsAndArtistsByName(debouncedQuery);
        setSearchResults(results);
        setIsLoading(false);
      } else {
        setSearchResults(null);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="bg-[#0E1729] min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for songs, artists, or playlists"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#1A2A44] text-white placeholder-gray-400 rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {isLoading && (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Songs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="w-16 h-16 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="w-3/4 h-5 rounded" />
                    <Skeleton className="w-1/2 h-4 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Artists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="w-full h-24 rounded-md" />
                  <Skeleton className="w-3/4 h-5 rounded" />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {searchResults && !isLoading && (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Songs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.songs.map((song: songTileProps) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Artists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchResults.artists.map((artist: Artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </section>

          {searchResults.playlists && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchResults.playlists.map((playlist: any) => (
                  <Link
                    href={`/playlist/${playlist.id}`}
                    key={playlist.id}
                    className="bg-[#1A2A44] p-4 rounded-xl flex flex-col hover:bg-[#243656] transition-colors"
                  >
                    <Image src={playlist.cover} alt={playlist.name} width={160} height={160} className="rounded-md mb-2" />
                    <h3 className="font-semibold truncate">{playlist.name}</h3>
                    <p className="text-sm text-gray-400">By {playlist.creator}</p>
                    <p className="text-xs text-gray-400">{playlist.songCount} songs</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {searchResults && !isLoading && Object.values(searchResults).every((category: any) => category.length === 0) && (
        <p className="text-center text-gray-400">{`No results found for "${debouncedQuery}"`}</p>
      )}
    </div>
  );
}
