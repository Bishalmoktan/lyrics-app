import { auth } from '@/auth';
import Categories from '@/components/categories';
import HeroSection from '@/components/hero-section';
import Suggestions from '@/components/suggestions';

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <div className="space-y-16">
      <HeroSection />
      <Categories />
      <Suggestions />
    </div>
  );
}
