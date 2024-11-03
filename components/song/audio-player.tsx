"use client";
import { useGlobalApp } from "@/hooks/use-global-app";
import { IterationCcw, IterationCw, Pause, Play } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

const CustomMusicPlayer: React.FC<{ songId: string }> = ({ songId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const { setTimestamp } = useGlobalApp();

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.internalPlayer.pauseVideo();
    } else {
      playerRef.current.internalPlayer.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setTimestamp(currentTime * 1000);
  }, [currentTime]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    playerRef.current.internalPlayer.seekTo(newTime);
  };

  const handleReady = (event: { target: any }) => {
    setDuration(event.target.getDuration());
  };

  const handleStateChange = async (event: { target: any; data: number }) => {
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

  const handleSkip = (amount: number) => {
    const newTime = currentTime + amount;
    const clampedTime = Math.max(0, Math.min(newTime, duration));
    setCurrentTime(clampedTime);
    playerRef.current.internalPlayer.seekTo(clampedTime);
  };

  return (
    <div>
      <div className="backdrop-blur-md rounded-md p-2">
        <input
          type="range"
          className="w-[280px] md:w-[400px] accent-rose-500"
          value={currentTime}
          min={0}
          max={duration}
          step={1}
          onChange={handleProgressChange}
        />
        <div className="relative flex justify-center gap-2 items-center ">
          <p className="absolute  left-2 text-xs md:text-sm">
            {" "}
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
          <div className="flex gap-2  items-center">
            <div className="flex flex-col gap-1 items-center">
              <IterationCcw
                className="-rotate-180 size-4 cursor-pointer"
                onClick={() => handleSkip(-10)}
              />
              <p className="text-xs">10s</p>
            </div>
            {isPlaying ? (
              <Pause
                fill="#fff"
                className="size-8 md:size-10 cursor-pointer "
                onClick={handlePlayPause}
              />
            ) : (
              <Play
                fill="#fff"
                className="size-8 md:size-10 cursor-pointer "
                onClick={handlePlayPause}
              />
            )}
            <div className="flex flex-col gap-1 items-center">
              <IterationCw
                className="rotate-180 size-4 cursor-pointer"
                onClick={() => handleSkip(10)}
              />
              <p className="text-xs">10s</p>
            </div>
          </div>

          <div className="hidden">
            <YouTube
              videoId={songId}
              opts={{ playerVars: { controls: 1 } }}
              onReady={handleReady}
              onStateChange={handleStateChange}
              ref={playerRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMusicPlayer;
