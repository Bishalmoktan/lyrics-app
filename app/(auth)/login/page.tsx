import { Button } from '@/components/ui/button';
import googleIcon from '@/public/google.png';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="w-[90vw] md:w-[30vw] p-4 text-center space-y-4">
        <div>
          <p>Hey user,</p>
          <h2 className="text-2xl font-bold">Welcome to BoSS</h2>
        </div>
        <Button className="space-x-4">
          <Image src={googleIcon} alt="Google" className="size-6" />
          <span>Continue with Google</span>
        </Button>
        <p>Step into the rhythm of music with a single click.</p>
      </div>
    </div>
  );
};
export default LoginPage;
