import { Separator } from '@/components/ui/separator';
import { AddGenreForm } from '../_components/form';

const CreateGenre = () => {
  return (
    <div className="space-y-4 pb-4">
      <div>
        <h2 className="text-2xl font-bold">Create Genre</h2>
        <p className="text-zinc-500">Create a new genre!</p>
      </div>
      <Separator className="bg-zinc-300" />
      <AddGenreForm />
    </div>
  );
};
export default CreateGenre;
