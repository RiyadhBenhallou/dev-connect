"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { createRoomAction } from "./actions";
import { Delete, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  query: z.string().min(1).max(50),
});

export default function SearchBar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      query: query ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.query) {
      router.push(`/?query=${values.query}`);
    } else {
      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex justify-center pb-4 gap-2"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Search for a room..."
                  className="w-[400px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size={"icon"}>
          <Search />
        </Button>
        {query && (
          <Button
            onClick={() => {
              form.setValue("query", "");
              router.push("/");
            }}
            variant={"destructive"}
            size={"icon"}
          >
            <Delete />
          </Button>
        )}
      </form>
    </Form>
  );
}
