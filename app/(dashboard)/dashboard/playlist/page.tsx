"use client";

import { useEffect, useState } from "react";
import { getPlaylists } from "@/lib/public-actions/actions";
import CreatePlaylistButton from "./_components/create-playlist-button";
import Image from "next/image";
import noData from "@/public/no-data.svg";
import PlaylistCard from "./_components/playlist-card";
import { PlaylistPageProps } from "./[playlistId]/page";
import Skeleton from "../artist/[artistId]/_components/Skeleton";

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<PlaylistPageProps[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { playlists } = await getPlaylists();
      setPlaylists(playlists);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#0E1729] rounded-lg p-6 overflow-y-auto space-y-4">
      <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-6">
        Your Playlists
      </h2>

      {playlists?.length === 0 && (
        <div className="space-y-4">
          <div>
            <Image
              src={noData}
              alt="Not found"
              className="size-32 object-cover"
            />
          </div>
          <div>
            <p className="text-gray-400 text-xs">No playlist found.</p>
            <p>Create your first playlist.</p>
          </div>
        </div>
      )}
      {playlists === null && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Artists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="w-full h-24 rounded-md" />
                  <Skeleton className="w-3/4 h-5 rounded" />
                </div>
              ))}
          </div>
        </section>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {playlists?.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            songs={playlist.songs}
          />
        ))}
      </div>
      <CreatePlaylistButton />
    </div>
  );
}
