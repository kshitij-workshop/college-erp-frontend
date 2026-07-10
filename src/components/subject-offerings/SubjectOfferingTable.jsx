import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

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

const STATUS_VARIANTS = {
  true: "bg-green-100 text-green-700 hover:bg-green-100",
  false: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

export default function SubjectOfferingTable({
  subjectOfferings,
  loading,

  onView,
  onEdit,
  onDelete,
}) {
  if (!loading && subjectOfferings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No Subject Offerings Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Create a new subject offering to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-slate-50">
          <TableRow className="h-16">
            <TableHead>Subject</TableHead>

            <TableHead>Faculty</TableHead>

            <TableHead>Section</TableHead>

            <TableHead>Session</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {subjectOfferings.map((offering) => (
            <TableRow
              key={offering.id}
              className="transition-colors hover:bg-slate-50"
            >
              {/* Subject */}

              <TableCell>
                <div>
                  <p className="font-semibold text-slate-900">
                    {offering.subjectName}
                  </p>

                  <p className="font-mono text-xs text-slate-500">
                    {offering.subjectCode}
                  </p>
                </div>
              </TableCell>

              {/* Faculty */}

              <TableCell>
                <p className="font-medium">{offering.facultyName}</p>
              </TableCell>

              {/* Section */}

              <TableCell>
                <div>
                  <p className="font-medium">{offering.programName}</p>

                  <p className="text-xs text-slate-500">
                    Sem {offering.semesterNumber} • {offering.sectionName}
                  </p>
                </div>
              </TableCell>

              {/* Academic Session */}

              <TableCell>
                <Badge variant="outline">{offering.academicSession}</Badge>
              </TableCell>

              {/* Status */}

              <TableCell>
                <Badge className={STATUS_VARIANTS[offering.active]}>
                  {offering.active ? "Active" : "Inactive"}
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
                    <DropdownMenuItem onClick={() => onView(offering)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(offering)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(offering)}
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
