"use client";

import Image from "next/image";
import {
  ChevronDown,
  MoreHorizontal,
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
} from "lucide-react";
import { useGlobalApp } from "@/hooks/use-global-app";
import LyricsContainer from "@/components/song/lyrics-container";
import bisaric from "@/public/logo.svg";
import { useRouter } from "next/navigation";

export default function NowPlayingView() {
  const { currentSong, isPlaying, handlePlayPause } = useGlobalApp();
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-[#1A2A44] to-[#0A1220] min-h-screen text-white p-4 md:p-8">
      <div
        onClick={() => router.back()}
        className="inline-flex cursor-pointer items-center text-gray-400 hover:text-white mb-6"
      >
        <ChevronDown className="mr-2" size={20} />
        <span>Back to Browse</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <Image
            src={currentSong?.thumbnail || bisaric}
            alt={currentSong?.title || "Album cover"}
            width={400}
            height={400}
            className="rounded-lg shadow-lg mb-6 size-[300px] object-cover"
          />
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h1 className="text-2xl font-bold">
                  {currentSong?.title || "Song Title"}
                </h1>
                <p className="text-gray-400">
                  {currentSong?.Artist.name || "Artist Name"}
                </p>
              </div>
              <button className="text-gray-400 hover:text-white">
                <MoreHorizontal size={24} />
              </button>
            </div>
            <div className="flex items-center justify-between mb-6">
              <button className="text-rose-500 hover:text-rose-600">
                <Heart size={24} />
              </button>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white">
                  <Shuffle size={20} />
                </button>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => handlePlayPause()}
                >
                  <SkipBack size={24} />
                </button>
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause size={24} fill="white" strokeWidth={0} />
                  ) : (
                    <Play size={24} fill="white" strokeWidth={0} />
                  )}
                </button>
                <button className="text-gray-400 hover:text-white">
                  <SkipForward size={24} />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Repeat size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0A1220] rounded-lg p-4">
          {currentSong ? (
            <LyricsContainer
              // @ts-ignore
              englishLyrics={currentSong?.lyrics}
              // @ts-ignore
              nepaliLyrics={currentSong?.nepaliLyrics}
            />
          ) : (
            <p>No song is playing</p>
          )}
        </div>
      </div>
    </div>
  );
}
