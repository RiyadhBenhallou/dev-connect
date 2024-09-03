"use client";
import { splitTags } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

export default function TagsList({ tagsString }: { tagsString: string }) {
  const router = useRouter();
  const tags = splitTags(tagsString);
  return (
    <div className="flex flex-wrap gap-1 justify-start">
      {tags.map((tag, i) => {
        return (
          <Badge
            key={i}
            onClick={() => {
              router.push(`/?query=${tag}`);
            }}
            variant={"secondary"}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
          >
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}
