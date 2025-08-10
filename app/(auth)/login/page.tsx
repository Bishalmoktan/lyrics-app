"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Music, FastForward, LayoutDashboard, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function LoginPage() {
  const handleLogin = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="min-h-screen bg-[#0E1729] flex flex-col md:flex-row items-center justify-center p-4 md:p-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl w-full flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Welcome to BISARIC
            </h1>
            <p className="text-xl text-white/80">
              Step into the rhythm of music with a single click.
            </p>
          </div>
          <div className="space-y-">
            <Button
              className="w-full bg-rose-500 text-white hover:bg-rose-600 transition-colors duration-300"
              onClick={() => handleLogin("google")}
            >
              <div className="bg-white rounded-full size-7 p-1 mr-2">
                <Image
                  src="/google.png"
                  alt="Google"
                  width={30}
                  height={30}
                  className=""
                />
              </div>
              Continue with Google
            </Button>
            <p className="text-sm text-white/60 text-center">
              {`Don't want to sign in?`}
              <Link
                href="/"
                className="text-rose-400 hover:text-rose-300 transition-colors duration-300"
              >
                Continue as guest
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why Sign In?
            </h2>
            <ul className="space-y-3">
              {[
                { icon: Music, text: "Access your personalized playlists" },
                {
                  icon: FastForward,
                  text: "Enjoy uninterrupted song navigation",
                },
                {
                  icon: LayoutDashboard,
                  text: "Experience our beautiful UI dashboard",
                },
                {
                  icon: UserPlus,
                  text: "Connect with friends and share music",
                },
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-white/90">
                  <feature.icon className="w-5 h-5 mr-2 text-rose-400" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              Premium Features
            </h3>
            <p className="text-white/80">
              Sign in now to unlock exclusive features and elevate your music
              experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
