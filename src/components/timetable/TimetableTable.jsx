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

const DAY_COLORS = {
  MONDAY: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  TUESDAY: "bg-green-100 text-green-700 hover:bg-green-100",
  WEDNESDAY: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  THURSDAY: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  FRIDAY: "bg-pink-100 text-pink-700 hover:bg-pink-100",
  SATURDAY: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
};

function formatDay(day) {
  return day.charAt(0) + day.slice(1).toLowerCase();
}

function formatTime(time) {
  if (!time) return "-";

  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TimetableTable({
  timetables,
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  if (!loading && timetables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20">
        <h3 className="text-lg font-semibold">No Timetable Entries Found</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first timetable entry.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>

            <TableHead>Time</TableHead>

            <TableHead>Subject</TableHead>

            <TableHead>Faculty</TableHead>

            <TableHead>Room</TableHead>

            <TableHead>Section</TableHead>

            <TableHead>Session</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {timetables.map((entry) => (
            <TableRow key={entry.id}>
              {/* Day */}

              <TableCell>
                <Badge className={DAY_COLORS[entry.dayOfWeek]}>
                  {formatDay(entry.dayOfWeek)}
                </Badge>
              </TableCell>

              {/* Time */}

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {formatTime(entry.startTime)}
                  </span>

                  <span className="text-xs text-muted-foreground">↓</span>

                  <span className="font-medium">
                    {formatTime(entry.endTime)}
                  </span>
                </div>
              </TableCell>

              {/* Subject */}

              <TableCell>
                <div className="space-y-1">
                  <p className="font-semibold">{entry.subjectCode}</p>

                  <p className="text-sm text-muted-foreground">
                    {entry.subjectName}
                  </p>
                </div>
              </TableCell>

              {/* Faculty */}

              <TableCell>
                <span className="font-medium">{entry.facultyName}</span>
              </TableCell>

              {/* Room */}

              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium">{entry.roomNumber}</p>

                  <Badge variant="outline" className="text-xs">
                    {entry.roomType}
                  </Badge>
                </div>
              </TableCell>

              {/* Section */}

              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium">{entry.programName}</p>

                  <p className="text-sm text-muted-foreground">
                    Semester {entry.semesterNumber} • {entry.sectionName}
                  </p>
                </div>
              </TableCell>

              {/* Academic Session */}

              <TableCell>
                <span className="font-medium">{entry.academicSession}</span>
              </TableCell>

              {/* Actions */}

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(entry)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(entry)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(entry)}
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
