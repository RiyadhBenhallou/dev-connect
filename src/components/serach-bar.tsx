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
import { Delete, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  query: z.string().min(1).max(50),
});

export default function SearchBar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: query ?? "",
    },
  });

  useEffect(() => {
    form.setValue("query", query as string);
  }, [query, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.query) {
      router.push(`/browse?query=${values.query}`);
    } else {
      router.push("/browse");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center pb-4"
      >
        <div className="flex w-full">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Search for a room..."
                    // className="rounded-r-none w-full focus:outline-none focus:ring-0 focus:border-transparent"
                    className={cn(
                      "focus:outline-none focus:ring-0 focus:ring-offset-0",
                      "border-gray-300 focus:border-gray-300"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="icon" className="rounded-l-none">
            <Search />
          </Button>
          {query && (
            <Button
              onClick={() => {
                form.setValue("query", "");
                router.push("/browse");
              }}
              variant="destructive"
              size="icon"
            >
              <Delete />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
