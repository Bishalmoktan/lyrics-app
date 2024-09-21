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
      key={artist.id}
      className="bg-[#1A2A44] p-4 rounded-xl flex flex-col items-center text-center hover:bg-[#243656] transition-colors"
    >
      <Image
        src={artist.avatar_url}
        alt={artist.name}
        width={100}
        height={100}
        className="rounded-full mb-2 size-24"
      />
      <h3 className="font-semibold">{artist.name}</h3>
      <p className="text-sm text-gray-400">{artist.designation}</p>
    </Link>
  );
};
export default ArtistCard;
