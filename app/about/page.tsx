import { Metadata } from 'next';
import Description from './_components/description';
import Header from './_components/header';

export const metadata: Metadata = {
  title: "About"
}

const AboutPage = () => {
  return (
    <div className="space-y-16">
      <Header />
      <Description />
    </div>
  );
};
export default AboutPage;
