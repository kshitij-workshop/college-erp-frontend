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

export default function FacultyTable({
  faculty = [],
  loading,

  onView,
  onEdit,
  onDelete,
}) {
  if (!loading && faculty.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No Faculty Found
        </h3>

        <p className="text-muted-foreground mt-2">Try changing your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-slate-50">
          <TableRow className="h-20 transition-colors hover:bg-slate-50">
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Faculty
            </TableHead>

            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Employee Code
            </TableHead>

            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Department
            </TableHead>

            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Designation
            </TableHead>

            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Joining Date
            </TableHead>

            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {faculty.map((faculty) => (
            <TableRow
              key={faculty.id}
              className="hover:bg-slate-50 transition-colors"
            >
              {/* Faculty */}

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 ring-2 ring-slate-100">
                    <AvatarImage src={faculty.photoUrl} />

                    <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
                      {faculty.fullName
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")
                        .substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">
                      {faculty.fullName}
                    </p>

                    <p className="text-sm text-slate-500">{faculty.email}</p>
                  </div>
                </div>
              </TableCell>

              {/* Employee Code */}

              <TableCell>
                <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs">
                  {faculty.employeeCode}
                </span>
              </TableCell>

              {/* Department */}

              <TableCell>{faculty.departmentName}</TableCell>

              {/* Designation */}

              <TableCell>{faculty.designation?.replaceAll("_", " ")}</TableCell>

              {/* Joining Date */}

              <TableCell>
               <span className="text-sm text-slate-600">
  {new Date(faculty.joiningDate).toLocaleDateString("en-IN")}
</span>
              </TableCell>

              {/* Status */}

              <TableCell className="align-middle">
                <Badge
  className={
    faculty.status === "ACTIVE"
      ? "bg-green-100 text-green-700 hover:bg-green-100"
      : faculty.status === "ON_LEAVE"
      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
      : faculty.status === "RESIGNED"
      ? "bg-red-100 text-red-700 hover:bg-red-100"
      : "bg-slate-100 text-slate-700 hover:bg-slate-100"
  }
>
  {faculty.status.replaceAll("_", " ")}
</Badge>
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
                    <DropdownMenuItem onClick={() => onView(faculty)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(faculty)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(faculty)}
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
