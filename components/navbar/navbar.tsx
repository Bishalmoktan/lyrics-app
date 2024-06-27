import SearchBox from '@/components/navbar/search-box';
import Socials from '@/components/navbar/socials';
import Routes from '@/components/navbar/routes';
import { MobileToggle } from '../mobile-toggle';
import { auth } from '@/auth';
import { getAllGenre } from '@/lib/admin/actions';
import Logo from '@/components/logo';

const Navbar = async () => {
  const session = await auth();
  const genres = await getAllGenre();
  return (
    <>
      <div className="hidden md:flex items-center md:justify-between py-4">
        <div className="hidden md:flex gap-12 items-center">
          <Logo />
          <Routes session={session} />
        </div>
        <div className="flex gap-6 items-center">
          <div className="w-[300px] flex-shrink-0">
            <SearchBox genres={genres} />
          </div>
          <div>
            <Socials />
          </div>
        </div>
      </div>
      {/* mobile view  */}
      <div className="flex justify-between py-4 md:hidden">
        <div className="md:hidden">
          <MobileToggle />
        </div>
        <div className="w-[150px] md:w-[300px] flex-shrink-0">
          <SearchBox genres={genres} />
        </div>
        <div>
          <Socials />
        </div>
      </div>
    </>
  );
};
export default Navbar;
