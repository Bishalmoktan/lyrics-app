'use client';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import googleIcon from '@/public/google.png';
import Image from 'next/image';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import Link from 'next/link';

const LoginCard = () => {
  const handleLogin = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="w-[90vw] md:w-[30vw] p-4 text-center space-y-4">
      <div>
        <p>Hey user,</p>
        <h2 className="text-2xl font-bold">Welcome to BoSS</h2>
      </div>
      <Button className="space-x-4" onClick={() => handleLogin('google')}>
        <Image src={googleIcon} alt="Google" className="size-6" />
        <span>Continue with Google</span>
      </Button>
      <div>
        <p className="text-lg">
          Step into the rhythm of music with a single click.
        </p>
        <p className="text-zinc-400">OR</p>
        <p className="text-zinc-400">
          Continue without signing in.{' '}
          <Link href={'/'} className="underline">
            Go Back
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginCard;
