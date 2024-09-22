"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, ChevronDown } from "lucide-react";
import { useGlobalApp } from "@/hooks/use-global-app";
import Skeleton from "./_components/Skeleton"; 
import { getArtistDetails, IArtistDetails } from "@/lib/public-actions/actions";
import { Song } from "@prisma/client";
import SongCard from "./_components/SongCard";
import { useRouter } from "next/navigation";

export default function ArtistPage({
  params,
}: {
  params: { artistId: string };
}) {
  const [artist, setArtist] = useState<IArtistDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentSongId, isPlaying, handlePlayPause, setCurrentSongId } =
    useGlobalApp();

  const router = useRouter();

  useEffect(() => {
    const loadArtist = async () => {
      setIsLoading(true);
      const data = await getArtistDetails(params.artistId);
      setArtist(data);
      setIsLoading(false);
    };
    loadArtist();
  }, [params.artistId]);

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
            <Skeleton width="200px" height="200px" className="rounded-full mr-6" />
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
          <Image
            src={artist?.avatar_url || ""}
            alt={artist?.name || "Artist"}
            width={200}
            height={200}
            className="rounded-full border-4 border-white mr-6 size-64 object-cover"
          />
          <div>
            <h1 className="text-5xl font-bold mb-2">{artist?.name}</h1>
            <p className="text-lg">{artist?.designation}</p>
          </div>
        </div>
      </header>

      <main className="p-6">
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <button
              onClick={() =>
                handleTrackPlay(currentSongId || artist?.songs[0].id!)
              }
              className="bg-rose-500 text-white rounded-full p-4 mr-4 hover:bg-rose-600 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="border border-white text-white rounded-full px-4 py-2 hover:bg-white hover:text-[#0E1729] transition-colors">
              Follow
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">Popular</h2>
          <ul>
            {artist?.songs.map((track: Song, index: number) => (
              <SongCard key={track.id} track={track} index={index} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
