import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

export default function StudentTable({
  students,
  loading,

  onView,
  onEdit,
  onDelete,
}) {
  if (!loading && students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No Students Found
        </h3>

        <p className="text-muted-foreground mt-2">Try changing your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-slate-50">
          <TableRow className="h-16">
            <TableHead>Student</TableHead>

            <TableHead>Roll No</TableHead>

            <TableHead>Reg. No.</TableHead>

            <TableHead>Dept</TableHead>

            <TableHead>Sem</TableHead>

            <TableHead>Mobile</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              className="hover:bg-slate-50 transition-colors"
            >
              {/* Student */}

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 ring-2 ring-slate-100">
                    <AvatarImage src={student.photoUrl} />

                    <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
                      {student.fullName
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")
                        .substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">
                      {student.fullName}
                    </p>

                    <p className="text-sm text-slate-500">{student.email}</p>
                  </div>
                </div>
              </TableCell>

              {/* Roll Number */}

              <TableCell>
                <span className="font-mono font-medium">
                  {student.rollNumber}
                </span>
              </TableCell>

              {/* Registration Number */}

              <TableCell>
                <span className="font-mono font-medium">
                  {student.registrationNumber}
                </span>
              </TableCell>

              {/* Department */}

              <TableCell>{student.departmentCode}</TableCell>

              {/* Semester */}

              <TableCell>
                <Badge variant="outline">Sem {student.semesterNumber}</Badge>
              </TableCell>

              {/* Mobile */}

              <TableCell>
                <span className="font-mono font-medium">{student.phone}</span>
              </TableCell>

              {/* Status */}

              <TableCell className="align-middle">
                <span className="inline-flex items-center font-medium text-blue-600">
                  {student.status}
                </span>
              </TableCell>

              {/* Actions */}

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-slate-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-44 rounded-xl">
                    <DropdownMenuItem onClick={() => onView(student)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(student)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(student)}
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
