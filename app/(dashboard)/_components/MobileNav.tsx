"use client";

import { Home, Search, ListMusic } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

const routes = [
  {
    icon: Home,
    label: "Home",
    href: "/dashboard",
  },
  {
    icon: Search,
    label: "Search",
    href: "/dashboard/search",
  },
  {
    label: "Playlists",
    href: "/dashboard/playlist",
    icon: ListMusic,
  },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await getSession();
      setSession(res);
    };
    getCurrentUser();
  }, []);

  return (
    <div className="md:hidden bg-[#0A1220] border-t border-gray-700">
      <div className="flex justify-center items-center h-16">
        {routes.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              pathname === item.href ? "text-white" : "text-neutral-400"
            )}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}

        <div className="w-full h-full mt-4">
          <Avatar session={session} />
        </div>
      </div>
    </div>
  );
}
