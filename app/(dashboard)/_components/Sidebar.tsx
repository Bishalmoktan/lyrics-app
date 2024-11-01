"use client";

import { Home, Search, Music, ListMusic } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Avatar from "./Avatar";

const sidebarLinks = [
  {
    label: "Home",
    path: "/dashboard",
    icon: Home,
  },
  {
    label: "Search",
    path: "/dashboard/search",
    icon: Search,
  },
  {
    label: "Now playing",
    path: "/dashboard/now-playing",
    icon: Music,
  },
  {
    label: "Playlists",
    path: "/dashboard/playlist",
    icon: ListMusic,
  },
];

export default function Sidebar() {
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
    <aside
      className={cn(
        "bg-[#0A1220]  hidden md:flex flex-col justify-between h-custom-calc-screen transition-all duration-300 ease-in-out -translate-x-full w-0 md:translate-x-0 md:w-64"
      )}
    >
      <nav className="flex-1 p-6 space-y-6 mt-16 md:mt-0">
        <div className="space-y-3">
          {sidebarLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.path}
                className={cn(
                  "text-sm font-semibold text-gray-400 hover:text-white flex items-center gap-4",
                  pathname === item.path && "text-white"
                )}
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="p-6 border-t border-gray-700">
        <Avatar session={session} />
      </div>
    </aside>
  );
}
