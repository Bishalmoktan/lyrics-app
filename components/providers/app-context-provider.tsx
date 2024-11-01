"use client";
import {
  getSongDetail,
  getSongsByArtist,
  ISongDetail,
  paingatedSongs,
} from "@/lib/public-actions/actions";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { toast } from "sonner";

export type AppContextType = {
  timestamp: number;
  setTimestamp: React.Dispatch<React.SetStateAction<number>>;
  currentSong: ISongDetail | null;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISongDetail | null>>;
  currentSongId: string;
  setCurrentSongId: React.Dispatch<React.SetStateAction<string>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: React.RefObject<any>;
  handlePlayPause: () => void;
  handleSongEnd: () => void;
  previousSong: () => void;
  isQueueOpen: boolean;
  setIsQueueOpen: React.Dispatch<React.SetStateAction<boolean>>;
  queue: paingatedSongs | null;
  setQueue: React.Dispatch<React.SetStateAction<paingatedSongs | null>>;
  playFromPlaylist: boolean;
  setPlayFromPlaylist: React.Dispatch<React.SetStateAction<boolean>>;
};

const randomSongID = [
  "clyq9owas0001ms5z5eyh9ug7",
  "clybevl8n0001v2pcljtf2hsc",
  "clyrfabqn0001effa1hngecuq",
  "cm14xkgfh0001ez03t94bupqg",
  "clyv6exty0001sifo7mntcec2",
];

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [timestamp, setTimestamp] = useState<number>(0);
  const [currentSongId, setCurrentSongId] = useState<string>("");
  const [currentSong, setCurrentSong] = useState<ISongDetail | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);
  const [playFromPlaylist, setPlayFromPlaylist] = useState<boolean>(false);
  const [queue, setQueue] = useState<paingatedSongs | null>(null);
  const playerRef = useRef<any>(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.internalPlayer.pauseVideo();
    } else {
      playerRef.current.internalPlayer.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const getRandomSongId = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * randomSongID.length);
    return randomSongID[randomIndex];
  }, []);

  const handleSongEnd = () => {
    if (queue && queue.songs && queue.songs.length > 0) {
      const currentIndex = queue.songs.findIndex(
        (song) => song.id === currentSongId
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex < queue.songs.length) {
        setCurrentSongId(queue.songs[nextIndex].id);
      } else {
        const songId = getRandomSongId();
        setCurrentSongId(songId);
      }
    }
  };

  const previousSong = () => {
    if (queue) {
      const currentIndex = queue.songs.findIndex(
        (song) => song.id === currentSongId
      );
      const previousIndex = currentIndex - 1;
      if (previousIndex >= 0) {
        setCurrentSongId(queue.songs[previousIndex].id);
      } else {
        setCurrentSongId(queue.songs[0].id);
      }
    }
  };

  useEffect(() => {
    const getCurrentSong = async () => {
      try {
        const song = await getSongDetail(currentSongId);
        setCurrentSong(song);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    };

    if (currentSongId) {
      getCurrentSong();
    }
  }, [currentSongId]);

  useEffect(() => {
    const getQueueSong = async () => {
      try {
        if (currentSong?.Artist.id) {
          const songs = await getSongsByArtist(currentSong.Artist.id);
          setQueue(songs);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    };

    if (currentSong && !playFromPlaylist) {
      getQueueSong();
    }
  }, [currentSong]);

  return (
    <AppContext.Provider
      value={{
        timestamp,
        setTimestamp,
        setCurrentSong,
        currentSong,
        setCurrentSongId,
        currentSongId,
        setIsPlaying,
        isPlaying,
        playerRef,
        handlePlayPause,
        isQueueOpen,
        setIsQueueOpen,
        queue,
        setQueue,
        handleSongEnd,
        previousSong,
        setPlayFromPlaylist,
        playFromPlaylist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
