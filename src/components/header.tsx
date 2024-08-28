"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Header = () => {
  const session = useSession();
  return (
    <header>
      <div>
        {session?.data ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in</Button>
        )}
        {session?.data?.user?.name}
        <ModeToggle />
      </div>
    </header>
  );
};
export default Header;
