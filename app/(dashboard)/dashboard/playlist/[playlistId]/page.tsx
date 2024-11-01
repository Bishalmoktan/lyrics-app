"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, ChevronDown } from "lucide-react";
import { useGlobalApp } from "@/hooks/use-global-app";
import {
  getArtistDetails,
  getPlaylistDetails,
  getSongsByPlaylistId,
  IArtistDetails,
} from "@/lib/public-actions/actions";
import { Playlist, Song } from "@prisma/client";
import { useRouter } from "next/navigation";
import Skeleton from "../../artist/[artistId]/_components/Skeleton";
import SongCard from "../../artist/[artistId]/_components/SongCard";
import playlistImg from "@/public/playlist.jpeg";
import PlaylistActionMenu from "@/app/(dashboard)/_components/PlaylistActionMenu";

interface PlaylistPageProps extends Playlist {
  songs: Song[];
}

export default function PlaylistPage({
  params,
}: {
  params: { playlistId: string };
}) {
  const [playlist, setPlaylist] = useState<PlaylistPageProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    currentSongId,
    isPlaying,
    handlePlayPause,
    setCurrentSongId,
    setQueue,
    setPlayFromPlaylist,
  } = useGlobalApp();

  const router = useRouter();

  useEffect(() => {
    const loadPlaylist = async () => {
      setIsLoading(true);
      const { playlist } = await getPlaylistDetails(params.playlistId);
      setPlaylist(playlist);
      const res = await getSongsByPlaylistId(params.playlistId);
      setQueue(res);
      setIsLoading(false);
    };
    loadPlaylist();
    setPlayFromPlaylist(true);

    return () => setPlayFromPlaylist(false);
  }, [params.playlistId]);

  const handleTrackPlay = (trackId: string) => {
    setCurrentSongId(trackId);
    handlePlayPause();
  };

  if (isLoading) {
    return (
      <div className="bg-[#0E1729] min-h-screen text-white">
        <header className="relative h-96 bg-gradient-to-b from-rose-500 to-[#0E1729] space-y-4 p-2">
          <div className="inline-flex cursor-pointer items-center text-gray-400 p-4">
            <ChevronDown className="mr-2" size={20} />
            <span>Back to Browse</span>
          </div>
          <div className="absolute bottom-0 left-0 p-6 flex items-end">
            <Skeleton
              width="200px"
              height="200px"
              className="rounded-full mr-6"
            />
            <div>
              <Skeleton width="300px" height="40px" className="mb-2" />
              <Skeleton width="200px" height="20px" />
            </div>
          </div>
        </header>
        <main className="p-6">
          <Skeleton width="150px" height="30px" className="mb-4" />
          <Skeleton width="100%" height="20px" className="mb-4" />
          <Skeleton width="100%" height="20px" className="mb-4" />
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#0E1729] min-h-screen text-white">
      <header className="relative h-96 bg-gradient-to-b from-rose-500 to-[#0E1729] space-y-4 p-2">
        <div
          onClick={() => router.back()}
          className="inline-flex cursor-pointer items-center text-gray-400 hover:text-white p-4"
        >
          <ChevronDown className="mr-2" size={20} />
          <span>Back to Browse</span>
        </div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end">
          {playlist &&
          playlist.songs.length >= 1 &&
          playlist.songs.length <= 3 ? (
            <Image
              src={playlist.songs[0].thumbnail || ""}
              alt="Playlist"
              width={200}
              height={200}
              className="rounded-xl border-4 border-white mr-6 size-48 object-cover"
            />
          ) : playlist && playlist.songs.length >= 4 ? (
            <div className="w-48 h-48 grid grid-cols-2 gap-0 rounded-xl border-4 border-white mr-6 overflow-hidden">
              <Image
                src={playlist.songs[0].thumbnail}
                alt="Playlist"
                width={200}
                height={200}
                className="w-24 h-24 object-cover"
              />
              <Image
                src={playlist.songs[1].thumbnail}
                alt="Playlist"
                width={200}
                height={200}
                className="w-24 h-24 object-cover"
              />
              <Image
                src={playlist.songs[2].thumbnail}
                alt="Playlist"
                width={200}
                height={200}
                className="w-24 h-24 object-cover"
              />
              <Image
                src={playlist.songs[3].thumbnail}
                alt="Playlist"
                width={200}
                height={200}
                className="w-24 h-24 object-cover"
              />
            </div>
          ) : (
            <Image
              src={playlistImg}
              alt="Playlist"
              width={200}
              height={200}
              className="rounded-xl border-4 border-white mr-6 size-48 object-cover"
            />
          )}

          <div>
            <h1 className="text-5xl font-bold mb-2">{playlist?.title}</h1>
            <p className="text-lg">{playlist?.songs.length} songs</p>
          </div>
        </div>
      </header>

      <main className="p-6">
        <section>
          <div className="flex gap-4 items-center mb-6">
            <div className="flex items-center">
              <button
                onClick={() =>
                  handleTrackPlay(currentSongId || playlist?.songs[0].id!)
                }
                className="bg-rose-500 text-white rounded-full p-4 mr-4 hover:bg-rose-600 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
            <PlaylistActionMenu playlist={playlist!} />
          </div>

          <ul>
            {playlist?.songs.map((track: Song, index: number) => (
              <SongCard key={track.id} track={track} index={index} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
