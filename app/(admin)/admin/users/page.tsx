import { DataTable } from '@/components/data-table';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import { getAllUsers } from '@/lib/admin/actions';

const getData = async () => {
  const res = await getAllUsers();
  return res;
};

const AdminUsersPage = async () => {
  const data = await getData();
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Users</h2>
        <p className="text-zinc-500">Here are the lists of users!</p>
      </div>
      <Separator className="bg-zinc-300" />
      <DataTable filterBy='email' columns={columns} data={data} placeholder="users" />
    </div>
  );
};
export default AdminUsersPage;
