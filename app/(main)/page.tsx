import Categories from '@/components/categories';
import HeroSection from '@/components/hero-section';
import Suggestions from '@/components/suggestions';

export default async function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <Categories />
      <Suggestions />
    </div>
  );
}
