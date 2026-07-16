import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

export default function AttendanceAnalyticsRow({
  student,
  onView,
}) {

    const absentClasses =
  student.totalClasses - student.presentClasses;

function getPercentageColor(value) {
  if (value >= 90) return "text-green-600";
  if (value >= 75) return "text-blue-600";
  if (value >= 60) return "text-yellow-600";
  return "text-red-600";
}

  function getColor(value) {

    if (value >= 90) return "text-green-600";

    if (value >= 75) return "text-blue-600";

    if (value >= 60) return "text-yellow-600";

    return "text-red-600";

  }

  return (

    <TableRow>

  <TableCell>

    <div>

      <p className="font-medium">
        {student.studentName}
      </p>

      <p className="text-xs text-muted-foreground">
        {student.registrationNumber}
      </p>

    </div>

  </TableCell>

  <TableCell className="text-center">
    {student.presentClasses}
  </TableCell>

  <TableCell className="text-center">
    {absentClasses}
  </TableCell>

  <TableCell className="text-center">
    {student.totalClasses}
  </TableCell>

  <TableCell className="text-center">

    <span className={`font-semibold ${getPercentageColor(student.percentage)}`}>
      {student.percentage.toFixed(1)}%
    </span>

  </TableCell>

  <TableCell className="text-right">

    <Button
      size="sm"
      variant="outline"
      onClick={() => onView(student)}
    >
      <Eye className="mr-2 h-4 w-4" />
      View Details
    </Button>

  </TableCell>

</TableRow>

  );

}