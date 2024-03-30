import Songs from '@/components/songs';
import Artists from '@/components/artists';

const Suggestions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="col-span-3">
        <h3 className="text-xl">Popular Songs</h3>
        <Songs />
      </div>
      <div className="col-span-2">
        <p className="text-zinc-300 text-sm">Discover by creators</p>
        <h3 className="text-xl">Artists</h3>
        <Artists />
      </div>
    </div>
  );
};
export default Suggestions;
