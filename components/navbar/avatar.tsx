"use client"
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, Mail } from "lucide-react";

const Avatar =  ({ session }: { session: Session | null }) => {
  if(!session) return;
  const user = session.user;
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div>
   

<DropdownMenu>
      <DropdownMenuTrigger asChild>
      <div className="cursor-pointer">
      {user?.image ? <Image src={user?.image} alt={user.name!} width={40} height={40} className="rounded-full shadow-inner" />: 
    <div className="bg-white text-black size-10 flex justify-center items-center text-xl rounded-full">
      <p>{user.name?.charAt(0)}</p>
    </div>
    }
      </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-primary">{user.name!}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>{user.email}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
export default Avatar