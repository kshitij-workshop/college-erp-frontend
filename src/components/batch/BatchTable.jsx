import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BatchTable({
  batches = [],
  loading,

  onView,
  onEdit,
  onDelete,
}) {
  if (!loading && batches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No Batches Found
        </h3>

        <p className="mt-2 text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="sticky top-0 bg-slate-50">
          <TableRow className="h-16">
            <TableHead className="font-semibold">Batch</TableHead>

            <TableHead className="font-semibold">Program</TableHead>

            <TableHead className="font-semibold">Academic Years</TableHead>

            <TableHead className="font-semibold">Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {batches.map((batch) => (
            <TableRow key={batch.id} className="hover:bg-slate-50">
              {/* Batch */}

              <TableCell>
                <p className="font-semibold text-slate-900">{batch.name}</p>
              </TableCell>

              {/* Program */}

              <TableCell>{batch.programName}</TableCell>

              {/* Academic Years */}

              <TableCell>
                <Badge variant="outline">
                  {batch.startYear} - {batch.endYear}
                </Badge>
              </TableCell>

              {/* Status */}

              <TableCell>
                <Badge
                  className={
                    batch.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {batch.active ? "ACTIVE" : "INACTIVE"}
                </Badge>
              </TableCell>

              {/* Actions */}

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-44 rounded-xl">
                    <DropdownMenuItem onClick={() => onView(batch)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(batch)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(batch)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
