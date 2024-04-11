import Image from 'next/image';
import unauthorized from '@/public/unauthorized.svg';
import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="h-[60vh] text-center ">
        <div>
          <h1 className="text-3xl">Unauthorized 🔒</h1>
          <p>{`You don't have access to this page.`}</p>
        </div>
        <div className="my-4">
          <Image
            src={unauthorized}
            alt="Unauthorized"
            className="h-[40vh] object-contain"
          />
        </div>
        <Link href={'/'} className="underline">
          Go back
        </Link>
      </div>
    </div>
  );
};
export default UnauthorizedPage;
