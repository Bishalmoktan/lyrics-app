import { getPlaylists } from "@/lib/public-actions/actions";
import CreatePlaylistButton from "./_components/create-playlist-button";
import Image from "next/image";
import noData from "@/public/no-data.svg";
import PlaylistCard from "./_components/PlaylistCard";

async function PlaylistPage() {
  const { playlists } = await getPlaylists();
  return (
    <>
      <div className="bg-[#0E1729] rounded-lg p-6 overflow-y-auto space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-6">
          Your Playlists
        </h2>
        {playlists.length === 0 && (
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              songs={playlist.songs}
            />
          ))}
        </div>
        <CreatePlaylistButton />
      </div>
    </>
  );
}
export default PlaylistPage;
