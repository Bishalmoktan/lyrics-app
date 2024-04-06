'use client';
import { IterationCcw, IterationCw, Pause, Play } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { Button } from '../ui/button';

const CustomMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.internalPlayer.pauseVideo();
    } else {
      playerRef.current.internalPlayer.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

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
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  const handleSkip = (amount: number) => {
    const newTime = currentTime + amount;
    const clampedTime = Math.max(0, Math.min(newTime, duration));
    setCurrentTime(clampedTime);
    playerRef.current.internalPlayer.seekTo(clampedTime);
  };

  return (
    <div>
      <input
        type="range"
        className="w-[300px] md:w-[400px] accent-rose-500"
        value={currentTime}
        min={0}
        max={duration}
        step={1}
        onChange={handleProgressChange}
      />
      <div>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      <div className="flex gap-2 justify-center items-center">
        <div className="flex flex-col gap-1 items-center">
          <Button className="rounded-full p-2">
            <IterationCcw
              className="-rotate-180 size-4 md:size-6 cursor-pointer"
              onClick={() => handleSkip(-10)}
            />
          </Button>
          <p className="text-xs">10s</p>
        </div>
        {isPlaying ? (
          <Button className="rounded-full p-4">
            <Pause
              onClick={handlePlayPause}
              className="size-6 md:size-8 cursor-pointer"
            />
          </Button>
        ) : (
          <Button className="rounded-full p-4">
            <Play
              onClick={handlePlayPause}
              className="size-6 md:size-8 cursor-pointer"
            />
          </Button>
        )}
        <div className="flex flex-col gap-1 items-center">
          <Button className="rounded-full p-2">
            <IterationCw
              className="rotate-180 size-4 md:size-6 cursor-pointer"
              onClick={() => handleSkip(10)}
            />
          </Button>
          <p className="text-xs">10s</p>
        </div>
      </div>

      <div className="hidden">
        <YouTube
          videoId="qyRrUEInzAs"
          opts={{ playerVars: { controls: 1 } }}
          onReady={handleReady}
          onStateChange={handleStateChange}
          ref={playerRef}
        />
      </div>
    </div>
  );
};

export default CustomMusicPlayer;
