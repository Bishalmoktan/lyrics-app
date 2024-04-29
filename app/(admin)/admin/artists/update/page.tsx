import { Separator } from '@/components/ui/separator';
import { AddArtistForm } from '../_components/form';

const ArtistUpdatePage = () => {
  return (
    <div className="space-y-4 pb-4">
      <div>
        <h2 className="text-2xl font-bold">Update Artist</h2>
        <p className="text-zinc-500">Update an existing artist!</p>
      </div>
      <Separator className="bg-zinc-300" />
      <AddArtistForm />
    </div>
  );
};
export default ArtistUpdatePage;
