import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TimetableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-12 w-20" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-10 w-40" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-5 w-32" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-8 w-24" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-10 w-36" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-5 w-20" />
              </TableCell>

              <TableCell>
                <Skeleton className="ml-auto h-9 w-9 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
