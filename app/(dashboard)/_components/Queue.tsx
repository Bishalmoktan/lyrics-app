"use client";

import { X } from "lucide-react";
import { useGlobalApp } from "@/hooks/use-global-app";
import QueueSong from "./QueueSong";

export default function Queue() {
  const { isQueueOpen, setIsQueueOpen, queue } = useGlobalApp();

  if (!isQueueOpen) return null;

  return (
    <div className="fixed lg:static inset-y-0 right-0 z-50 w-full h-custom-calc-screen sm:w-96 bg-[#0A1220] border-l border-gray-700 overflow-y-auto transform transition-transform duration-300 ease-in-out">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Queue</h2>
          <button
            onClick={() => setIsQueueOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          {queue &&
            queue.songs.map((song) => <QueueSong key={song.id} song={song} />)}
        </div>
      </div>
    </div>
  );
}
