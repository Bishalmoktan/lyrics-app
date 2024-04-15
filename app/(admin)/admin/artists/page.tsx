import { DataTable } from '@/components/data-table';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import { getAllArtist } from '@/lib/actions';

const AdminArtistPage = async () => {
  const data = await getAllArtist();
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Songs</h2>
        <p className="text-zinc-500">Here are the lists of songs!</p>
      </div>
      <Separator className="bg-zinc-300" />
      <DataTable columns={columns} data={data} placeholder="songs" />
    </div>
  );
};
export default AdminArtistPage;
