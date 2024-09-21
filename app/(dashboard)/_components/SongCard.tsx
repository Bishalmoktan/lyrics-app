"use client";
import { songTileProps } from "@/components/song-tile";
import { useGlobalApp } from "@/hooks/use-global-app";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SongCardProps {
  song: songTileProps;
}

const SongCard = ({ song }: SongCardProps) => {
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
    <div className="flex items-center gap-4 bg-[#1A2A44] rounded-xl overflow-hidden hover:bg-[#243656] transition-colors group">
      <div className="relative size-20 mr-4 overflow-hidden">
        <Image
          src={song.thumbnail}
          alt="Playlist cover"
          width={80}
          height={80}
          className="size-20 object-cover"
        />

        {isThisSongPlaying && (
          <div className="absolute inset-0 flex items-end justify-evenly bg-black bg-opacity-30">
            <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-1"></div>
            <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-2"></div>
            <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-3"></div>
            <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-4"></div>
          </div>
        )}
      </div>
      <div>
        <h3
          className={cn(
            "text-sm font-semibold text-white line-clamp-1",
            isThisSongPlaying && "text-rose-500"
          )}
        >
          {song.title}
        </h3>
        <p className="text-sm text-white line-clamp-1">{song.Artist.name}</p>
      </div>
      <div
        onClick={() => handleTrackPlay(song.id)}
        className="w-10 h-10 cursor-pointer flex-shrink-0 flex items-center justify-center rounded-full bg-rose-500 text-black ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isPlaying && currentSongId === song.id ? (
          <Pause fill="white" strokeWidth={0} size={20} />
        ) : (
          <Play fill="white" strokeWidth={0} size={20} />
        )}
      </div>
    </div>
  );
};
export default SongCard;
