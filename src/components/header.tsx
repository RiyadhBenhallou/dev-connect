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

function HeaderMenu() {
  const session = useSession();
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
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogIn size={20} className="mr-2" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  const session = useSession();
  return (
    <header className="dark:bg-gray-900 bg-gray-100 py-2 container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <SearchCode className="size-10 text-sky-500 hover:text-sky-700" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {session?.data?.user ? (
            <HeaderMenu />
          ) : (
            <Button onClick={() => signIn("google")}>Sign In</Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;
