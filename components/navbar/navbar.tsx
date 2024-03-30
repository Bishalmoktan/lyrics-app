import SearchBox from '@/components/navbar/search-box';
import Socials from '@/components/navbar/socials';
import Routes from '@/components/navbar/routes';
import { MobileToggle } from '../mobile-toggle';

const Navbar = () => {
  return (
    <>
      <div className="hidden md:flex items-center md:justify-between py-4">
        <div className="hidden md:flex gap-12 items-center">
          <h1 className="text-2xl font-bold">BoSS</h1>
          <Routes />
        </div>
        <div className="flex gap-6 items-center">
          <div className="w-[300px] flex-shrink-0">
            <SearchBox />
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
          <SearchBox />
        </div>
        <div>
          <Socials />
        </div>
      </div>
    </>
  );
};
export default Navbar;
