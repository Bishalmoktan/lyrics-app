import SongTile, { songTileProps } from "@/components/song-tile";
import {
  getAllSongs,
  getSongsByArtist,
  getSongsByGenre,
} from "@/lib/public-actions/actions";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

const SearchResultPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = parseInt(searchParams?.page as string, 10) || 1;
  const pageSize = 5;

  let songs: songTileProps[] | null = null;
  let totalPages: number = 0;
  let totalSongs: number = 0;

  const genre = searchParams?.type as string;
  const artistId = searchParams?.artistId as string;
  const all = searchParams?.songs as string;
  let link = "";
  if (all) {
    const result = await getAllSongs(page, pageSize);
    songs = result.songs;
    totalPages = result.totalPages;
    totalSongs = result.totalSongs;
    link = `songs=${all}`;
  } else if (genre) {
    const result = await getSongsByGenre(genre, page, pageSize);
    songs = result.songs;
    totalPages = result.totalPages;
    totalSongs = result.totalSongs;
    link = `type=${genre}`;
  } else if (artistId) {
    const result = await getSongsByArtist(artistId, page, pageSize);
    songs = result.songs;
    totalPages = result.totalPages;
    totalSongs = result.totalSongs;
    link = `artistId/${artistId}`;
  }

  console.log(searchParams);

  const generatePaginationLinks = () => {
    let links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink href={`?page=${i}&${link}`} isActive={page == i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return links;
  };

  if (songs && songs.length > 0) {
    return (
      <div>
        {genre ? (
          <h1 className="text-xl font-bold mb-6">Songs under {genre} genre</h1>
        ) : all ? (
          <h1 className="text-xl font-bold mb-6">New Songs</h1>
        ) : (
          <h1 className="text-xl font-bold mb-6">
            Songs by {songs[0].Artist.name}
          </h1>
        )}
        <div className="space-y-4">
          {songs.map((song) => (
            <SongTile key={song.id} song={song} />
          ))}
        </div>
       {totalSongs > 5 && <Pagination>
          <PaginationContent>
            <PaginationItem>
              {page > 1 && (
                <PaginationPrevious href={`?page=${page - 1}&${link}`} />
              )}
            </PaginationItem>
            {generatePaginationLinks()}
            <PaginationItem>
              {page < totalPages && (
                <PaginationNext href={`?page=${page + 1}&${link}`} />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>No song found!</p>
        <p>Please try to find another!</p>
      </div>
    );
  }
};

export default SearchResultPage;
