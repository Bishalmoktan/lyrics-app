import Categories from '@/components/categories';
import HeroSection from '@/components/hero-section';
import Suggestions from '@/components/suggestions';

export default function Home() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <Categories />
      <Suggestions />
    </div>
  );
}
