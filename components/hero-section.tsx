import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Discover the Music Behind the Words
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Are you curious about the stories, emotions, and inspirations
              woven into the lyrics of your favorite songs? Welcome to BISARIO,
              your portal to the lyrical world of music!
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r text-white from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Explore Now
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl" />
            <Image
              src={"/heroImg.png"}
              alt="Musician performing"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl relative rotate-6 hover:rotate-0 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
