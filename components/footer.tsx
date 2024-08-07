import Image from 'next/image';
import Link from 'next/link';

import Routes from '@/components/navbar/routes';
import Socials from '@/components/navbar/socials';
import envelope from '@/public/mail.png';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/auth';
import Logo from '@/components/logo';

const Footer = async () => {
  const session = await auth();
  return (
    <div className="mt-auto space-y-4 md:space-y-10">
      <Logo />
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Routes session={session} />
        {/* Removing Temporarily */}
        {/* <div className="space-y-4">
          <Socials />
          <div className="flex gap-2 items-center">
            <Image src={envelope} alt="Envelope" className="size-8" />
            <Link href={'mailto:bishalmoktan270@gmail.com'}>
              bisaric@gmail.com
            </Link>
          </div>
        </div> */}
      </div>
      <Separator className="bg-zinc-300" />
      <div className="pb-4 md:pb-8 text-center">
        Copyright ©, All right reserved
      </div>
    </div>
  );
};
export default Footer;
