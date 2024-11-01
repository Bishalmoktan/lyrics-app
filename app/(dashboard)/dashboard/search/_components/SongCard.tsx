"use client";

import { songTileProps } from "@/components/song-tile";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useGlobalApp } from "@/hooks/use-global-app";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import SongActionMenu from "@/app/(dashboard)/_components/SongActionMenu";

interface SongCardProps {
  song: songTileProps;
  showDetails?: boolean;
}

const SongCard = ({ song, showDetails = true }: SongCardProps) => {
  const { setCurrentSongId, isPlaying, currentSongId, handlePlayPause } =
    useGlobalApp();
  const [isThisSongPlaying, setIsThisSongPlaying] = useState(false);

  useEffect(() => {
    setIsThisSongPlaying(isPlaying && currentSongId === song.id);
  }, [isPlaying, currentSongId, song.id]);

  const handleTrackPlay = (songId: string) => {
    setCurrentSongId(songId);
    handlePlayPause();
  };

  return (
    <div className="flex items-center justify-between bg-[#1A2A44] p-4 rounded-lg hover:bg-[#243656] transition-colors">
      <div className="flex items-center">
        <div className="relative size-20 mr-4">
          <Image
            src={song.thumbnail}
            alt={song.title}
            width={100}
            height={100}
            className="rounded-md object-cover size-20"
          />
          {isThisSongPlaying && (
            <div className="absolute inset-0 flex items-end justify-evenly bg-black bg-opacity-30">
              <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-1"></div>
              <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-2"></div>
              <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-3"></div>
              <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-4"></div>
            </div>
          )}
          <div
            onClick={() => handleTrackPlay(song.id)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-50 rounded-md opacity-0 hover:opacity-100 transition-opacity"
          >
            {isThisSongPlaying ? (
              <Pause fill="white" strokeWidth={0} size={32} />
            ) : (
              <Play fill="white" strokeWidth={0} size={32} />
            )}
          </div>
        </div>
        <div>
          <h3
            className={cn(
              "font-semibold line-clamp-1 max-w-[90%]",
              isThisSongPlaying && "text-rose-500"
            )}
          >
            {song.title}
          </h3>
          {showDetails && (
            <p className="text-sm text-gray-400 line-clamp-1">
              {song?.Artist?.name} • {song?.Artist?.designation}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <span className="ml-auto text-sm text-gray-400">{song.duration}</span>
        <SongActionMenu songId={song.id} />
      </div>
    </div>
  );
};

export default SongCard;
