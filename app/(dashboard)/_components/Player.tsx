"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  LayoutList,
  Mic2,
} from "lucide-react";
import Image from "next/image";
import YouTube from "react-youtube";
import { useGlobalApp } from "@/hooks/use-global-app";
import bisaric from "@/public/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SongActionMenu from "./SongActionMenu";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function Player() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [songId, setSongId] = useState<string | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const isMobile = useIsMobile();

  const pathname = usePathname();

  const {
    setTimestamp,
    currentSong,
    setIsPlaying,
    handlePlayPause,
    playerRef,
    isPlaying,
    isQueueOpen,
    setIsQueueOpen,
    handleSongEnd,
    previousSong,
  } = useGlobalApp();

  useEffect(() => {
    if (currentSong?.songId) {
      setSongId(currentSong?.songId);
    }
  }, [currentSong]);

  useEffect(() => {
    setTimestamp(currentTime * 1000);
  }, [currentTime, setTimestamp]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    playerRef.current.internalPlayer.seekTo(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    playerRef.current.internalPlayer.setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      playerRef.current.internalPlayer.unMute();
      playerRef.current.internalPlayer.setVolume(volume);
    } else {
      playerRef.current.internalPlayer.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleReady = (event: { target: any }) => {
    setDuration(event.target.getDuration());
    if (isMobile) {
      setIsMuted(true);
    }
  };

  const handleStateChange = (event: { target: any; data: number }) => {
    if (event.data === 1) {
      setIsPlaying(true);
      if (!progressIntervalRef.current) {
        progressIntervalRef.current = setInterval(async () => {
          const time = await playerRef.current.internalPlayer.getCurrentTime();
          setCurrentTime(time);
        }, 1000);
      }
    } else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false);
      clearInterval(progressIntervalRef.current!);
      progressIntervalRef.current = undefined;
    }
  };

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleInitialInteraction = () => {
        if (playerRef.current) {
          playerRef.current.internalPlayer.unMute();
          setIsMuted(false);
          document.removeEventListener("touchstart", handleInitialInteraction);
          document.removeEventListener("click", handleInitialInteraction);
        }
      };

      document.addEventListener("touchstart", handleInitialInteraction, {
        once: true,
      });
      document.addEventListener("click", handleInitialInteraction, {
        once: true,
      });

      return () => {
        document.removeEventListener("touchstart", handleInitialInteraction);
        document.removeEventListener("click", handleInitialInteraction);
      };
    }
  }, []);
  // const handleSkip = (amount: number) => {
  //   const newTime = currentTime + amount
  //   const clampedTime = Math.max(0, Math.min(newTime, duration))
  //   setCurrentTime(clampedTime)
  //   playerRef.current.internalPlayer.seekTo(clampedTime)
  // }

  return (
    <footer className="bg-[#0A1220] border-t border-gray-700 px-4 py-2 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <Link
          href="/dashboard/now-playing"
          className="hidden md:flex items-center gap-3 justify-start"
        >
          <Image
            src={currentSong?.thumbnail || bisaric}
            alt="Album cover"
            width={100}
            height={100}
            className="size-16 md:size-20 object-cover rounded-lg"
          />
          <div className="flex flex-col gap-1 overflow-hidden">
            <strong className="text-lg md:text-sm font-semibold text-white truncate">
              {currentSong?.title || "Song"}
            </strong>
            <span className="text-sm md:text-xs text-gray-400 truncate">
              {currentSong?.Artist.name || "Artist"}
            </span>
          </div>
        </Link>
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-between w-full md:hidden">
            <Link
              href="/dashboard/now-playing"
              className="flex items-center gap-3 justify-start md:hidden"
            >
              <Image
                src={currentSong?.thumbnail || bisaric}
                alt="Album cover"
                width={100}
                height={100}
                className="size-10 object-cover rounded-lg"
              />
              <div className="flex flex-col gap-1 overflow-hidden">
                <strong className="text-sm w-20 font-semibold text-white truncate">
                  {currentSong?.title || "Song"}
                </strong>
                <span className="text-xs text-gray-400 truncate">
                  {currentSong?.Artist.name || "Artist"}
                </span>
              </div>
            </Link>
            <div className="flex gap-4 items-center">
              {currentSong && <SongActionMenu songId={currentSong.id} />}

              <Link
                href={"/dashboard/now-playing"}
                className={`text-gray-400 hover:text-white ${pathname === "/dashboard/now-playing" ? "text-rose-500" : ""}`}
              >
                <Mic2 size={20} />
              </Link>
              <div
                onClick={() => setIsQueueOpen(!isQueueOpen)}
                className={`text-gray-400 cursor-pointer hover:text-white ${isQueueOpen ? "text-rose-500" : ""}`}
              >
                <LayoutList size={20} />
              </div>
              <div className="flex items-center gap-2 md:gap-6">
                <SkipBack
                  size={20}
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={previousSong}
                />
                <div
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer rounded-full bg-rose-500 text-black hover:bg-rose-600 transition-colors"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause fill="white" strokeWidth={0} size={16} />
                  ) : (
                    <Play fill="white" strokeWidth={0} size={16} />
                  )}
                </div>
                <SkipForward
                  size={20}
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={handleSongEnd}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="hidden md:flex items-center gap-4 md:gap-6">
              <SkipBack
                size={20}
                className="text-gray-400 hover:text-white cursor-pointer"
                onClick={previousSong}
              />
              <div
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer rounded-full bg-rose-500 text-black hover:bg-rose-600 transition-colors"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause fill="white" strokeWidth={0} size={16} />
                ) : (
                  <Play fill="white" strokeWidth={0} size={16} />
                )}
              </div>
              <SkipForward
                size={20}
                className="text-gray-400 hover:text-white cursor-pointer"
                onClick={handleSongEnd}
              />
            </div>
            <div className="flex items-center gap-2 mt-2 w-screen md:max-w-md md:px-2">
              <span className="hidden md:block text-xs text-gray-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                className="w-full md:w-80 accent-rose-500 h-1"
                value={currentTime}
                min={0}
                max={duration}
                step={1}
                onChange={handleProgressChange}
              />
              <span className="hidden md:block text-xs text-gray-400 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 justify-end">
          {currentSong && <SongActionMenu songId={currentSong.id} />}
          <Link
            href={"/dashboard/now-playing"}
            className={`text-gray-400 hover:text-white ${pathname === "/dashboard/now-playing" ? "text-rose-500" : ""}`}
          >
            <Mic2 size={20} />
          </Link>
          <div
            onClick={() => setIsQueueOpen(!isQueueOpen)}
            className={`text-gray-400 cursor-pointer hover:text-white ${isQueueOpen ? "text-rose-500" : ""}`}
          >
            <LayoutList size={20} />
          </div>
          <div
            onClick={handleMuteToggle}
            className="text-gray-400 cursor-pointer hover:text-white"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 accent-rose-500"
          />
        </div>
      </div>
      <div className="hidden">
        <YouTube
          videoId={songId || ""}
          opts={{
            playerVars: {
              controls: 0,
              autoplay: 1,
              playsinline: 1,
              mute: isMobile,
            },
          }}
          onReady={handleReady}
          onStateChange={handleStateChange}
          onEnd={handleSongEnd}
          ref={playerRef}
        />
      </div>
    </footer>
  );
}
