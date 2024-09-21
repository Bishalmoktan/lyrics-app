"use client";

import { useState, useEffect } from "react";
import { Play, Pause, ChevronDown } from "lucide-react";
import { useGlobalApp } from "@/hooks/use-global-app";
import Loading from "@/components/loading";
import { getSongsByGenre, paingatedSongs } from "@/lib/public-actions/actions";
import { Song } from "@prisma/client";
import SongCard from "../../artist/[artistId]/_components/SongCard";
import { useRouter } from "next/navigation";

export default function GenrePage({ params }: { params: { type: string } }) {
  const [data, setData] = useState<paingatedSongs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    currentSongId,
    isPlaying,
    handlePlayPause,
    setCurrentSongId,
    setQueue,
  } = useGlobalApp();

  const router = useRouter();
 

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await getSongsByGenre(params.type);
      setData(data);
      setQueue(data);
      setIsLoading(false);
    };
    loadData();
  }, [params.type]);

  const handleTrackPlay = (trackId: string) => {
    setCurrentSongId(trackId);
    handlePlayPause();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#0E1729] min-h-screen text-white">
      <header className="relative cursor-pointer h-48 bg-gradient-to-b from-rose-500 to-[#0E1729] space-y-4 p-2">
        <div
         onClick={() => router.back()}
          className="inline-flex items-center text-gray-400 hover:text-white p-4"
        >
          <ChevronDown className="mr-2" size={20} />
          <span>Back to Browse</span>
        </div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end">
          <div>
            <h1 className="text-5xl font-bold mb-2">
              {params.type.toLocaleUpperCase()}
            </h1>
          </div>
        </div>
      </header>

      <main className="p-6">
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <button
              onClick={() =>
                handleTrackPlay(currentSongId || data?.songs[0].id!)
              }
              className="bg-rose-500 text-white rounded-full p-4 mr-4 hover:bg-rose-600 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="border border-white text-white rounded-full px-4 py-2 hover:bg-white hover:text-[#0E1729] transition-colors">
              Follow
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">Popular</h2>
          <ul>
            {data?.songs.map((track: Song, index: number) => (
              <SongCard key={track.id} track={track} index={index} />
            ))}
          </ul>
        </section>

        {/* <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artist.albums.map((album: any) => (
              <Link href={`/album/${album.id}`} key={album.id} className="group">
                <div className="relative">
                  <Image
                    src={album.image}
                    alt={album.title}
                    width={200}
                    height={200}
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={40} className="text-white" />
                  </div>
                </div>
                <h3 className="mt-2 font-medium">{album.title}</h3>
                <p className="text-sm text-gray-400">{album.year}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fans also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artist.relatedArtists.map((relatedArtist: any) => (
              <Link href={`/artist/${relatedArtist.id}`} key={relatedArtist.id} className="text-center group">
                <div className="relative">
                  <Image
                    src={relatedArtist.image}
                    alt={relatedArtist.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={40} className="text-white" />
                  </div>
                </div>
                <h3 className="mt-2 font-medium">{relatedArtist.name}</h3>
                <p className="text-sm text-gray-400">Artist</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-300 max-w-3xl">{artist.biography}</p>
        </section> */}
      </main>
    </div>
  );
}
