import { ArrowDown } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-[url('/about-us.jpg')] bg-center bg-no-repeat bg-cover animate-move-up">
      <div className="bg-brand-light/80 bg-opacity-80 pt-32 text-center">
        <h2 className="text-5xl font-bold">ABOUT US</h2>
        <p className="text-xl max-w-[70vw] mx-auto">
          Welcome to BISARIC, your ultimate destination for discovering,
          exploring, and sharing the world of music and lyrics.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center pb-4">
          <p className="text-xl">READ MORE</p>
          <ArrowDown className="size-6" />
        </div>
      </div>
    </div>
  );
};
export default Header;
