"use client";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { UserRole } from "@prisma/client";

const Avatar = ({ session }: { session: Session | null}) => {
  if (!session) return;
  const user = session.user;
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            {user?.image ? (
              <div className={"flex flex-col md:flex-row justify-center items-center gap-1 md:gap-4"}>
                <Image
                  src={user?.image}
                  alt={user.name!}
                  width={30}
                  height={30}
                  className="rounded-full shadow-inner w-8 md:w-12"
                />
              <span className="text-xs md:text-lg text-gray-400">{user.name}</span>
              </div>
            ) : (
              <div className="bg-white text-black size-10 flex justify-center items-center text-xl rounded-full">
                <p>{user.name?.charAt(0)}</p>
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuLabel className="text-primary">
            {user.name!}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>{user.email}</span>
            </DropdownMenuItem>
              <Link href={"/admin/songs"}>
         {user.role === UserRole.ADMIN &&   <DropdownMenuItem>
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>Admin</span>
            </DropdownMenuItem>}
              </Link>
            <DropdownMenuItem
              className="cursor-pointer text-red-500 focus:text-red-500"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default Avatar;
