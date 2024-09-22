"use client";

import { useState, useEffect } from "react";
import { Play, Pause, ChevronDown } from "lucide-react";
import { useGlobalApp } from "@/hooks/use-global-app";
import Skeleton from "../../artist/[artistId]/_components/Skeleton"; 
import { getSongsByGenre, paingatedSongs } from "@/lib/public-actions/actions";
import { Song } from "@prisma/client";
import SongCard from "../../artist/[artistId]/_components/SongCard";
import { useRouter } from "next/navigation";

export default function GenrePage({ params }: { params: { type: string } }) {
  const [data, setData] = useState<paingatedSongs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    currentSongId,
    isPlaying,
    handlePlayPause,
    setCurrentSongId,
    setQueue,
  } = useGlobalApp();

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await getSongsByGenre(params.type);
      setData(data);
      setQueue(data);
      setIsLoading(false);
    };
    loadData();
  }, [params.type]);

  const handleTrackPlay = (trackId: string) => {
    setCurrentSongId(trackId);
    handlePlayPause();
  };

  if (isLoading) {
    return (
      <div className="bg-[#0E1729] min-h-screen text-white">
        <header className="relative cursor-pointer h-48 bg-gradient-to-b from-rose-500 to-[#0E1729] space-y-4 p-2">
          <div
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-400 hover:text-white p-4"
          >
            <ChevronDown className="mr-2" size={20} />
            <span>Back to Browse</span>
          </div>
          <div className="absolute bottom-0 left-0 p-6 flex items-end">
            <Skeleton width="300px" height="40px" />
          </div>
        </header>

        <main className="p-6">
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Skeleton width="50px" height="50px" className="mr-4 rounded-full" />
              <Skeleton width="100px" height="30px" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              <Skeleton width="150px" height="30px" />
            </h2>
            <div className="space-y-3">
            {Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton width=""  height="" className="w-16 h-16 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width=""  height="" className="w-3/4 h-5 rounded" />
                    <Skeleton width="" height="" className="w-1/2 h-4 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#0E1729] min-h-screen text-white">
      <header className="relative cursor-pointer h-48 bg-gradient-to-b from-rose-500 to-[#0E1729] space-y-4 p-2">
        <div
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-400 hover:text-white p-4"
        >
          <ChevronDown className="mr-2" size={20} />
          <span>Back to Browse</span>
        </div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end">
          <h1 className="text-5xl font-bold mb-2">
            {params.type.toLocaleUpperCase()}
          </h1>
        </div>
      </header>

      <main className="p-6">
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <button
              onClick={() =>
                handleTrackPlay(currentSongId || data?.songs[0].id!)
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
            {data?.songs.map((track: Song, index: number) => (
              <SongCard key={track.id} track={track} index={index} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
