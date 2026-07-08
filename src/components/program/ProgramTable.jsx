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

export default function ProgramTable({
  programs = [],
  loading,

  onView,
  onEdit,
  onDelete,
}) {
  if (!loading && programs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No Programs Found
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
            <TableHead className="font-semibold">Program</TableHead>

            <TableHead className="font-semibold">Department</TableHead>

            <TableHead className="font-semibold">Duration</TableHead>

            <TableHead className="font-semibold">Semesters</TableHead>

            <TableHead className="font-semibold">Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {programs.map((program) => (
            <TableRow key={program.id} className="hover:bg-slate-50">
              {/* Program */}

              <TableCell>
                <div>
                  <p className="font-semibold text-slate-900">{program.name}</p>

                  <p className="text-sm text-slate-500">{program.code}</p>
                </div>
              </TableCell>

              {/* Department */}

              <TableCell>{program.departmentName}</TableCell>

              {/* Duration */}

              <TableCell>{program.durationYear} Years</TableCell>

              {/* Semesters */}

              <TableCell>
                <Badge variant="outline">
                  {program.totalSemester} Semesters
                </Badge>
              </TableCell>

              {/* Status */}

              <TableCell>
                <Badge
                  className={
                    program.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {program.active ? "ACTIVE" : "INACTIVE"}
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

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(program)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(program)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(program)}
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
