"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Router,
  SearchCode,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function HeaderMenu() {
  const session = useSession();
  const router = useRouter();
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
            <LogOut size={20} className="mr-2" />
            Sign out
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/your-rooms")}>
            <LayoutDashboard size={20} className="mr-2" />
            Your Rooms
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
