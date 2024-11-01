import { Playlist, Song } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import playlistImg from "@/public/playlist.jpeg";

interface PlaylistCardProps {
  playlist: Playlist;
  songs: Song[];
}

const PlaylistCard = async ({ playlist, songs }: PlaylistCardProps) => {
  return (
    <Link
      href={`/dashboard/playlist/${playlist.id}`}
      className="bg-[#1A2A44] rounded-xl flex flex-col p-4 gap-2 hover:bg-[#243656] transition-colors justify-center items-center"
    >
      {songs.length >= 1 && songs.length <= 3 ? (
        <Image
          src={songs[0].thumbnail || ""}
          alt="Playlist"
          width={200}
          height={200}
          className="rounded-xl border-4 border-white size-48 object-cover"
        />
      ) : songs.length >= 4 ? (
        <div className="w-full h-full grid grid-cols-2 gap-0 rounded-xl border-4 border-white overflow-hidden">
          <Image
            src={songs?.[0].thumbnail}
            alt="Playlist"
            width={200}
            height={200}
            className="w-24 h-24 object-cover"
          />
          <Image
            src={songs[1].thumbnail}
            alt="Playlist"
            width={200}
            height={200}
            className="w-24 h-24 object-cover"
          />
          <Image
            src={songs[2].thumbnail}
            alt="Playlist"
            width={200}
            height={200}
            className="w-24 h-24 object-cover"
          />
          <Image
            src={songs[3].thumbnail}
            alt="Playlist"
            width={200}
            height={200}
            className="w-24 h-24 object-cover"
          />
        </div>
      ) : (
        <Image
          src={playlistImg}
          alt="Playlist"
          width={200}
          height={200}
          className="rounded-xl border-4 border-white size-48 object-cover"
        />
      )}

      <strong className="text-sm font-semibold text-white">
        {playlist.title}
      </strong>
    </Link>
  );
};
export default PlaylistCard;
