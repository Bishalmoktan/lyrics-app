import { useGlobalApp } from "@/hooks/use-global-app";
import { cn } from "@/lib/utils";
import { Song } from "@prisma/client";
import { MoreHorizontal, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const SongCard = ({ track, index }: { track: Song; index: number }) => {
  const [isThisSongPlaying, setIsThisSongPlaying] = useState(false);
  const { setCurrentSongId, currentSongId, handlePlayPause, isPlaying } =
    useGlobalApp();

  useEffect(() => {
    setIsThisSongPlaying(isPlaying && currentSongId === track.id);
  }, [isPlaying, currentSongId, track.id]);

  const handleTrackPlay = (trackId: string) => {
    setCurrentSongId(trackId);
    handlePlayPause();
  };

  return (
    <li
      key={track.id}
      className="flex cursor-pointer items-center py-2 hover:bg-[#1A2A44] rounded transition-colors px-3 group"
    >
      { !isThisSongPlaying ?
        <span className="w-8 text-center text-gray-400 group-hover:hidden">
          {index + 1}
        </span> :
         <div className="flex items-end justify-evenly group-hover:hidden h-5 w-8">
         <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-1"></div>
         <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-2"></div>
         <div className="w-1 bg-rose-500 rounded-t-full animate-equalizer-3"></div>
       </div>
      }
      <div
        className="text-gray-400 hover:text-white group-hover:block hidden mr-2"
        onClick={() => handleTrackPlay(track.id)}
      >
        {isPlaying && currentSongId === track.id ? (
          <Pause fill="white" strokeWidth={0} size={20} />
        ) : (
          <Play fill="white" strokeWidth={0} size={20} />
        )}
      </div>
      <div
        onClick={() => handleTrackPlay(track.id)}
        className="flex items-center flex-grow"
      >
        <Image
          src={track.thumbnail}
          alt={track.title}
          width={40}
          height={40}
          className="rounded mr-4 size-16 object-cover"
        />
        <div className="flex-grow">
          <p className={cn("font-medium line-clamp-1", isThisSongPlaying && "text-rose-500")}>{track.title}</p>
          <p className="text-sm text-gray-400">{track.duration}</p>
        </div>
      </div>
      <span className="text-gray-400 mr-4">{track.duration}</span>

      <div className="text-gray-400 hover:text-white">
        <MoreHorizontal size={20} />
      </div>
    </li>
  );
};
export default SongCard;
