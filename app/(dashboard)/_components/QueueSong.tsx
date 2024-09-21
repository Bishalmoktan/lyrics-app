import { songTileProps } from "@/components/song-tile";
import { useGlobalApp } from "@/hooks/use-global-app";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const QueueSong = ({ song }: { song: songTileProps }) => {
  const [isThisSongPlaying, setIsThisSongPlaying] = useState(false);
  const { isPlaying, currentSongId, setCurrentSongId, handlePlayPause } =
    useGlobalApp();

  useEffect(() => {
    setIsThisSongPlaying(isPlaying && currentSongId === song.id);
  }, [isPlaying, currentSongId, song.id]);

  const handleTrackPlay = (songId: string) => {
    setCurrentSongId(songId);
    handlePlayPause();
  };
  return (
    <div
      key={song.id}
      className="flex items-center hover:bg-[#1A2A44] rounded-md overflow-hidden"
    >
      <div className="relative size-16 mr-4">
        <Image
          src={song.thumbnail}
          alt={song.title}
          width={64}
          height={64}
          className="rounded-md object-cover size-16"
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
            <Pause fill="white" strokeWidth={0} size={20} />
          ) : (
            <Play fill="white" strokeWidth={0} size={20} />
          )}
        </div>
      </div>
      <div className="flex-grow">
        <p
          className={cn(
            "font-medium text-white line-clamp-1",
            isThisSongPlaying && "text-rose-500"
          )}
        >
          {song.title}
        </p>
        <p className="text-sm text-gray-400 line-clamp-1">{song.Artist.name}</p>
      </div>
      <span className="text-sm text-gray-400 pr-4">{song.duration}</span>
    </div>
  );
};
export default QueueSong;
