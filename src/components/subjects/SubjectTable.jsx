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

const TYPE_VARIANTS = {
  THEORY: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  LAB: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  ELECTIVE: "bg-orange-100 text-orange-700 hover:bg-orange-100",
};

const STATUS_VARIANTS = {
  true: "bg-green-100 text-green-700 hover:bg-green-100",
  false: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

export default function SubjectTable({
  subjects,
  loading,

  onView,
  onEdit,
  onDelete,
}) {
  if (!loading && subjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No Subjects Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or create a new subject.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        {/* Header */}

        <TableHeader className="sticky top-0 z-10 bg-slate-50">
          <TableRow className="h-16">
            <TableHead>Code</TableHead>

            <TableHead>Subject</TableHead>

            <TableHead className="text-center">Credits</TableHead>

            <TableHead>Type</TableHead>

            <TableHead>Semester</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}

        <TableBody>
          {subjects.map((subject) => (
            <TableRow
              key={subject.id}
              className="transition-colors hover:bg-slate-50"
            >
              {/* Subject Code */}

              <TableCell>
                <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-sm font-semibold">
                  {subject.code}
                </span>
              </TableCell>

              {/* Subject Name */}

              <TableCell>
                <div>
                  <p className="font-semibold text-slate-900">{subject.name}</p>
                </div>
              </TableCell>

              {/* Credits */}

              <TableCell className="text-center font-semibold">
                {subject.credits}
              </TableCell>

              {/* Type */}

              <TableCell>
                <Badge className={TYPE_VARIANTS[subject.type]}>
                  {subject.type}
                </Badge>
              </TableCell>

              {/* Semester */}

              <TableCell>
                <Badge variant="outline">Sem {subject.semesterNumber}</Badge>
              </TableCell>

              {/* Status */}

              <TableCell>
                <Badge className={STATUS_VARIANTS[subject.active]}>
                  {subject.active ? "Active" : "Inactive"}
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
                    <DropdownMenuItem onClick={() => onView(subject)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(subject)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(subject)}
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
