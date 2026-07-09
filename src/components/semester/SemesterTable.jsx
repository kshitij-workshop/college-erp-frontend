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

export default function SemesterTable({
  semesters = [],
  loading,

  onView,
  onEdit,
  onDelete,
}) {
  if (!loading && semesters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No Semesters Found
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
            <TableHead className="font-semibold">Semester</TableHead>

            <TableHead className="font-semibold">Batch</TableHead>

            <TableHead className="font-semibold">Program</TableHead>

            <TableHead className="font-semibold">Department</TableHead>

            <TableHead className="font-semibold">Current</TableHead>

            <TableHead className="font-semibold">Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {semesters.map((semester) => (
            <TableRow key={semester.id} className="hover:bg-slate-50">
              {/* Semester */}

              <TableCell>
                <p className="font-semibold text-slate-900">
                  Semester {semester.semesterNumber}
                </p>
              </TableCell>

              {/* Batch */}

              <TableCell>{semester.batchName}</TableCell>

              {/* Program */}

              <TableCell>{semester.programName}</TableCell>

              {/* Department */}

              <TableCell>{semester.departmentName}</TableCell>

              {/* Current */}

              <TableCell>
                <Badge variant={semester.current ? "default" : "secondary"}>
                  {semester.current ? "YES" : "NO"}
                </Badge>
              </TableCell>

              {/* Status */}

              <TableCell>
                <Badge
                  className={
                    semester.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {semester.active ? "ACTIVE" : "INACTIVE"}
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
                    <DropdownMenuItem onClick={() => onView(semester)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(semester)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(semester)}
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
