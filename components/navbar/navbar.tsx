import SearchBox from "@/components/navbar/search-box";
import Routes from "@/components/navbar/routes";
import { MobileToggle } from "../mobile-toggle";
import { auth } from "@/auth";
import { getAllGenre } from "@/lib/admin/actions";
import Logo from "@/components/logo";
import Avatar from "./avatar";

const Navbar = async () => {
  const session = await auth();
  const genres = await getAllGenre();
  return (
    <>
      <div className="hidden px-20 md:flex items-center md:justify-between  fixed top-0 w-full z-50 backdrop-blur-md border-b border-slate-80">
        <div className="hidden md:flex gap-12 items-center">
          <Logo />
          <Routes session={session} />
        </div>
        <div className="flex gap-6 items-center">
          <div className="w-[300px] flex-shrink-0">
            <SearchBox genres={genres} />
          </div>
          <Avatar session={session} />
          {/* Removing Temporarily  */}
          {/* <div>
            <Socials />
          </div> */}
        </div>
      </div>
      {/* mobile view  */}
      <div className="flex justify-between py-4 md:hidden px-8  fixed top-0 w-full z-50 backdrop-blur-md border-b border-slate-80">
        <div className="md:hidden">
          <MobileToggle />
        </div>
        <div className="w-[200px] md:w-[300px] flex-shrink-0">
          <SearchBox genres={genres} />
        </div>
        <Avatar session={session} />

        {/* Removing Temporarily  */}
        {/* <div>
          <Socials />
        </div> */}
      </div>
    </>
  );
};
export default Navbar;
