"use client";
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
import { Loader2 } from "lucide-react";
import { ReactNode, useState, useTransition } from "react";

export function DeletionDialog({
  children,
  deletionAction,
}: {
  children: ReactNode;
  deletionAction: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, startTransition] = useTransition();
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your room
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              startTransition(async () => {
                await deletionAction();
              });
            }}
            className={isLoading ? "opacity-70" : ""}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Yes, Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
