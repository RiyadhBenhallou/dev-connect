"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, SearchCode } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";

export function HeaderMenu() {
  const session = useSession();
  // console.log(session);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="">
          <Avatar className="mr-2 size-8">
            <AvatarImage
              src={session?.data?.user?.image as string}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session?.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {session?.data ? (
            <DropdownMenuItem onClick={() => signOut()}>
              <LogIn size={20} className="mr-2" />
              Sign out
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => signIn("google")}>
              <LogOut size={20} className="mr-2" />
              Sign in
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  return (
    <header className="dark:bg-gray-900 bg-gray-100 py-2 container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <SearchCode className="size-10 text-sky-500 hover:text-sky-700" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <HeaderMenu />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;
