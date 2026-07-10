import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SubjectSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>

            <TableHead>Subject</TableHead>

            <TableHead>Credits</TableHead>

            <TableHead>Type</TableHead>

            <TableHead>Semester</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-7 w-20 rounded-md" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-5 w-48" />
              </TableCell>

              <TableCell>
                <Skeleton className="mx-auto h-5 w-10" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>

              <TableCell className="text-right">
                <Skeleton className="ml-auto h-9 w-9 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
