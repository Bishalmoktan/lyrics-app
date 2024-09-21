import { Artist } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Link
      href={`/dashboard/artist/${artist.id}`}
      className="bg-[#1A2A44] p-4 rounded-xl flex flex-col gap-2 hover:bg-[#243656] transition-colors"
    >
      <Image
        src={artist.avatar_url}
        className="w-full h-full rounded-lg object-cover"
        alt={`${artist.name}'s avatar`}
        width={160}
        height={160}
      />
      <strong className="text-sm font-semibold text-white">
        {artist.name}
      </strong>
      <span className="text-xs text-gray-400">{artist.designation}</span>
    </Link>
  );
};
export default ArtistCard;
