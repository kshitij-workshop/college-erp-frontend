import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SubjectOfferingPagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
      <Button
        variant="outline"
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <div className="text-sm text-slate-500">
        Page
        <span className="mx-2 font-semibold text-black">{page + 1}</span>
        of
        <span className="mx-2 font-semibold text-black">{totalPages}</span>
      </div>

      <Button
        variant="outline"
        disabled={page + 1 >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
