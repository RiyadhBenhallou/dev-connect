import { splitTags } from "@/utils/tags";
import { Badge } from "./ui/badge";

export default function TagsList({ tagsString }: { tagsString: string }) {
  const tags = splitTags(tagsString);
  return (
    <div className="flex flex-wrap gap-1 justify-start">
      {tags.map((tag, i) => {
        return (
          <Badge key={i} variant={"secondary"}>
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}
