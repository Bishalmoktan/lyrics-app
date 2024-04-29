import { DataTable } from '@/components/data-table';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import { getAllSongs } from '@/lib/admin/actions';

const AdminSongsPage = async () => {
  const data = await getAllSongs();
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Songs</h2>
        <p className="text-zinc-500">Here are the lists of songs!</p>
      </div>
      <Separator className="bg-zinc-300" />
      <DataTable
        filterBy="title"
        columns={columns}
        data={data}
        placeholder="songs"
      />
    </div>
  );
};
export default AdminSongsPage;
