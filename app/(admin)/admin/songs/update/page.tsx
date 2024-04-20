import { Separator } from '@/components/ui/separator';
import { UpdateSongForm } from './_components/form';
import { getAllArtist, getAllGenre } from '@/lib/admin/actions';

const AdminUpdateSongPage = async () => {
  const artists = await getAllArtist();
  const genres = await getAllGenre();
  return (
    <div className="space-y-4 pb-4">
      <div>
        <h2 className="text-2xl font-bold">Update song</h2>
        <p className="text-zinc-500">Update the data of a song!</p>
      </div>
      <Separator className="bg-zinc-300" />
      <UpdateSongForm artists={artists} genres={genres} />
    </div>
  );
};
export default AdminUpdateSongPage;
