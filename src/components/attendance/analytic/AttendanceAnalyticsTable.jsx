import {
  Eye,
  UserX,
  ArrowUpDown,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function getPercentageBadge(percentage) {
  if (percentage >= 90)
    return "bg-green-100 text-green-700 border-green-200";

  if (percentage >= 75)
    return "bg-blue-100 text-blue-700 border-blue-200";

  if (percentage >= 60)
    return "bg-yellow-100 text-yellow-700 border-yellow-200";

  return "bg-red-100 text-red-700 border-red-200";
}

export default function AttendanceAnalyticsTable({
  students = [],
  loading,
  onView,
}) {
  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center text-slate-500">
        Loading attendance analytics...
      </div>
    );
  }

  if (!students.length) {
    return (
      <div className="rounded-3xl border bg-white p-16 text-center">
        <UserX className="mx-auto mb-4 h-12 w-12 text-slate-300" />

        <h3 className="text-lg font-semibold">
          No Students Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Select a subject or batch to view attendance analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead className="w-20">
              #
            </TableHead>

            <TableHead>
              Registration No.
            </TableHead>

            <TableHead>
              Student
            </TableHead>

            <TableHead className="text-center">
              Present
            </TableHead>

            <TableHead className="text-center">
              Total
            </TableHead>

            <TableHead className="text-center">
              Attendance
            </TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {students.map((student, index) => (

            <TableRow
              key={student.studentId}
              className="hover:bg-slate-50"
            >

              <TableCell className="font-medium">
                {index + 1}
              </TableCell>

              <TableCell className="font-mono">
                {student.registrationNumber}
              </TableCell>

              <TableCell className="font-medium">
                {student.studentName}
              </TableCell>

              <TableCell className="text-center">
                {student.presentClasses}
              </TableCell>

              <TableCell className="text-center">
                {student.totalClasses}
              </TableCell>

              <TableCell className="text-center">

                <Badge
                  className={getPercentageBadge(
                    student.percentage
                  )}
                >
                  {student.percentage.toFixed(1)}%
                </Badge>

              </TableCell>

              <TableCell className="text-right">

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(student)}
                >

                  <Eye className="mr-2 h-4 w-4" />

                  View Details

                </Button>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  );
}