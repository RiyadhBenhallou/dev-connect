import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationControl({ current, hasNextPage }: any) {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {parseInt(current) !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`/browse?${current ? `page=${parseInt(current) - 1}` : ""}`}
            />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#">{parseInt(current)}</PaginationLink>
        </PaginationItem>
        {hasNextPage && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={`/browse?${
                  current ? `page=${parseInt(current) + 1}` : ""
                }`}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
