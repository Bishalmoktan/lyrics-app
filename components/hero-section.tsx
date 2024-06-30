import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="space-y-6 my-8 animate-move-up">
      <h1 className="text-5xl md:max-w-[50vw] text-center md:text-left font-bold">
        Discover the Music Behind the Words
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:flex-1 h-[50vh]">
          <Image
            src={'/heroImg.png'}
            fill
            alt="Person playing guitar"
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-center gap-4">
          <div>
            <h3 className="text-2xl font-bold">
              Uncover the Stories Behind the Songs
            </h3>
            <p>
              Are you curious about the stories, emotions, and inspirations
              woven into the lyrics of your favorite songs? Welcome to
              BISARIC, your portal to the lyrical world of music!
            </p>
          </div>
          <Button className="w-max">
            <Link href={"/search?songs=featured"}>Explore</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
