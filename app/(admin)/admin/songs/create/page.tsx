import { Separator } from '@/components/ui/separator';
import { AddSongForm } from './_components/form';
import { getAllArtist, getAllGenre } from '@/lib/admin/actions';

const AdminAddSongPage = async () => {
  const artists = await getAllArtist();
  const genres = await getAllGenre();
  return (
    <div className="space-y-4 pb-4">
      <div>
        <h2 className="text-2xl font-bold">Add songs</h2>
        <p className="text-zinc-500">Add lyrics of a song!</p>
      </div>
      <Separator className="bg-zinc-300" />
      <AddSongForm artists={artists} genres={genres} />
    </div>
  );
};
export default AdminAddSongPage;
