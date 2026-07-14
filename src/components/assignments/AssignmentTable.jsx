import { ClipboardCheck, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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

export default function AssignmentTable({
  assignments,
  onEdit,
  onDelete,
  onSubmissions,
}) {
  if (!assignments.length)
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <h3 className="text-lg font-semibold">No assignments found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create an assignment for one of your subject offerings.
        </p>
      </div>
    );
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="h-14">
            <TableHead>Assignment</TableHead>
            <TableHead>Subject / Section</TableHead>
            <TableHead>Due date</TableHead>
            <TableHead className="text-center">Max marks</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>
                <p className="font-semibold">{assignment.title}</p>
                <p className="max-w-xs truncate text-xs text-muted-foreground">
                  {assignment.description}
                </p>
              </TableCell>
              <TableCell>
                <p>{assignment.subjectName}</p>
                <p className="text-xs text-muted-foreground">
                  Section {assignment.sectionName}
                </p>
              </TableCell>
              <TableCell>
                {new Date(assignment.dueDate).toLocaleString()}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {assignment.maxMarks}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    assignment.active
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                  }
                >
                  {assignment.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onSubmissions(assignment)}>
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Submissions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(assignment)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(assignment)}
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
