import { 
  Eye, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Clock, 
  CalendarX2, 
  BookOpen 
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

// Premium badge styling with borders
const DAY_COLORS = {
  MONDAY: "bg-blue-50 text-blue-700 border-blue-200",
  TUESDAY: "bg-green-50 text-green-700 border-green-200",
  WEDNESDAY: "bg-purple-50 text-purple-700 border-purple-200",
  THURSDAY: "bg-orange-50 text-orange-700 border-orange-200",
  FRIDAY: "bg-pink-50 text-pink-700 border-pink-200",
  SATURDAY: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

function formatDay(day) {
  if (!day) return "-";
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
  
  // 1. Premium Loading State
  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-4 border-b">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="space-y-3 p-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  // 2. Enhanced Empty State
  if (timetables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-24 transition-all hover:bg-slate-50">
        <div className="mb-4 rounded-full bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <CalendarX2 className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No Timetable Entries</h3>
        <p className="mt-2 text-sm font-medium text-slate-500 max-w-sm text-center">
          Your schedule looks empty. Create your first timetable entry to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/80 border-b border-slate-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Day</TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Time Slot</TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Subject</TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Faculty</TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Location</TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Batch Details</TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Session</TableHead>
              <TableHead className="text-right font-semibold text-slate-600">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {timetables.map((entry) => (
              <TableRow 
                key={entry.id} 
                className="group transition-colors hover:bg-slate-50/80 data-[state=selected]:bg-slate-50"
              >
                {/* Day */}
                <TableCell>
                  <Badge variant="outline" className={`font-bold border ${DAY_COLORS[entry.dayOfWeek] || "bg-slate-100"}`}>
                    {formatDay(entry.dayOfWeek)}
                  </Badge>
                </TableCell>

                {/* Time - Changed to a sleek horizontal pill */}
                <TableCell>
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {formatTime(entry.startTime)} - {formatTime(entry.endTime)}
                  </div>
                </TableCell>

                {/* Subject - Swapped order to make Name prominent */}
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-md bg-blue-50 p-1.5 ring-1 ring-blue-100 shrink-0 hidden sm:block">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-900 line-clamp-1">{entry.subjectName}</p>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{entry.subjectCode}</p>
                    </div>
                  </div>
                </TableCell>

                {/* Faculty */}
                <TableCell>
                  <span className="text-sm font-semibold text-slate-700">{entry.facultyName}</span>
                </TableCell>

                {/* Room */}
                <TableCell>
                  <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                    Room {entry.roomNumber}
                  </span>
                </TableCell>

                {/* Section / Program */}
                <TableCell>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900 line-clamp-1">{entry.departmentCode}</p>
                    <p className="text-xs font-medium text-slate-500">
                      Sem {entry.semesterNumber} <span className="mx-1 text-slate-300">•</span> Sec {entry.sectionName}
                    </p>
                  </div>
                </TableCell>

                {/* Academic Session */}
                <TableCell>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200">
                    {entry.academicSession}
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 focus-visible:ring-1 focus-visible:ring-slate-300">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-md border-slate-200">
                      <DropdownMenuItem onClick={() => onView(entry)} className="font-medium cursor-pointer">
                        <Eye className="mr-2 h-4 w-4 text-slate-500" />
                        View Details
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => onEdit(entry)} className="font-medium cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4 text-slate-500" />
                        Edit Entry
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-600 focus:bg-red-50 focus:text-red-700 font-medium cursor-pointer"
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
    </div>
  );
}