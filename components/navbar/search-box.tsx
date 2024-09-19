'use client';
import { Search } from 'lucide-react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components//ui/command';
import { useEffect, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import {
  searchArtistByName,
  searchSongsByName,
} from '@/lib/public-actions/actions';
import { Artist, Genre } from '@prisma/client';
import SongTile, { songTileProps } from '../song-tile';
import Link from 'next/link';
import Image from 'next/image';
import ArtistTile from '../artist-tile';

const SearchBox = ({ genres }: { genres: Genre[] }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState<songTileProps[] | []>([]);
  const [artists, setArtists] = useState<Artist[] | []>([]);
  const path = usePathname();
  const params = useSearchParams();
  const type = params.get('type');
  const artistId = params.get('artistId');
  useEffect(() => {
    setOpen(false);
  }, [path, type, artistId]);
  useEffect(() => {
    setLoading(true);
    const debounceTimer = setTimeout(async () => {
      try {
        if (searchTerm.trim() === '') {
          setSongs([]);
          setArtists([]);
          return;
        }

        const resultSongs = await searchSongsByName(searchTerm);
        const resultArtists = await searchArtistByName(searchTerm);
        setSongs(resultSongs);
        setArtists(resultArtists);
      } catch (error) {
        console.error('Error searching songs:', error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center justify-between w-full dark:bg-transparent dark:hover:bg-brand-light dark:hover:border-transparent transition border border-zinc-300 border-solid border-1"
      >
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-200 dark:group-hover:text-zinc-200 transition">
          Search
        </p>
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-200" />
      </button>
      <Command shouldFilter={false} >
        <CommandDialog open={open} onOpenChange={setOpen} >
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder="Search a song or artist or genre..."
          />
          <ScrollArea className="border-1 border-black rounded-md">
            <CommandList>
              {songs.length > 0 && (
                <>
                  <CommandGroup heading="Song">
                    {songs.map((song) => {
                      return (
                        <CommandItem key={song.id} value={song.title}>
                          <SongTile song={song} />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>

                  <CommandSeparator className=" bg-zinc-200 mb-1" />
                </>
              )}

              {artists.length > 0 && (
                <>
                  <CommandGroup heading="Artist">
                    {artists.map((artist) => {
                      return (
                        <CommandItem key={artist.id} value={artist.name}>
                          <ArtistTile artist={artist} />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  <CommandSeparator className=" bg-zinc-200 mb-1" />
                </>
              )}

              {/* genre or category  */}
              <CommandGroup heading="Category">
                {genres.map((genre) => (
                  <CommandItem key={genre.id}>
                    <Link
                      href={`/search?type=${genre.name}`}
                      className={`p-4 ${genre.backgroundColor} bg-opacity-20 rounded-md flex gap-4 justify-center items-center`}
                    >
                      <Image
                        src={genre.image}
                        alt={genre.name}
                        width={100}
                        height={100}
                        className="size-10 object-contain"
                      />

                      <p className="text-lg"> {genre.name} </p>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>

              {!loading ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <CommandEmpty>Searching...</CommandEmpty>
              )}
            </CommandList>
          </ScrollArea>
        </CommandDialog>
      </Command>
    </>
  );
};
export default SearchBox;
