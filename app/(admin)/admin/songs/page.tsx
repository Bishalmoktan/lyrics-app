import { DataTable } from '@/components/data-table';
import { Separator } from '@/components/ui/separator';
import { Song, columns } from './columns';
import axios from 'axios';

const getData = async () => {
  const res = await axios.get(
    'https://660d3a6a6ddfa2943b339fe1.mockapi.io/api/songs/songs'
  );
  return res.data as Song[];
};

const AdminSongsPage = async () => {
  const data = await getData();
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
export default AdminSongsPage;
