"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Compass,
  LayoutDashboard,
  LogOut,
  SearchCode,
  UserRoundX,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DeletionDialog } from "./deletion-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccountAction } from "./actions";

function HeaderMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove the data associated with it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                setIsOpen(false);
                signOut({
                  callbackUrl: "/",
                });
              }}
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="">
            <Avatar className="mr-2 size-8">
              <AvatarImage src={session?.user?.image as string} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {session?.user?.name}
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
            <DropdownMenuItem onClick={() => router.push("/browse")}>
              <Compass size={20} className="mr-2" />
              Browse
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <UserRoundX size={20} className="mr-2 text-red-500" />
              <span className="text-red-500">Delete Account</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const Header = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;
  return (
    <header className="dark:bg-gray-900 bg-gray-100 py-4 relative z-50">
      <div className="flex justify-between items-center container mx-auto">
        <div>
          <Link href={"/"}>
            <SearchCode className="size-10 text-sky-500 hover:text-sky-700" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* {status === "loading" && isLoggedIn ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <HeaderMenu />
          )}
          {status === "unauthenticated" && (
            <Button onClick={() => signIn("google")}>Sign In</Button>
          )} */}

          {status === "loading" ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : status === "authenticated" ? (
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
