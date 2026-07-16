import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  User,
  BookOpen,
  Hash,
  Loader2,
  TrendingUp,
  UserMinus
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { getStudentAttendanceDetails } from "@/api/attendanceApi";

export default function StudentAttendanceDetailsDialog({
  open,
  onOpenChange,
  student,
  subjectOfferingId,
}) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!open || !student || !subjectOfferingId) return;
      try {
        setLoading(true);
        const response = await getStudentAttendanceDetails(
          student.studentId,
          subjectOfferingId
        );
        setDetails(response.data.data);
      } catch (error) {
        console.error("Failed to load attendance", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [open, student, subjectOfferingId]);

  if (!student) return null;

  // Unified theme helper for history items
  function getStatusTheme(status) {
    switch (status) {
      case "PRESENT":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
          bg: "bg-green-100",
          badge: "bg-green-100 text-green-700 border-green-200",
          label: "Present",
        };
      case "ABSENT":
        return {
          icon: <XCircle className="h-5 w-5 text-red-600" />,
          bg: "bg-red-100",
          badge: "bg-red-100 text-red-700 border-red-200",
          label: "Absent",
        };
      case "LATE":
        return {
          icon: <Clock3 className="h-5 w-5 text-yellow-600" />,
          bg: "bg-yellow-100",
          badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
          label: "Late",
        };
      case "LEAVE":
        return {
          icon: <UserMinus className="h-5 w-5 text-blue-600" />,
          bg: "bg-blue-100",
          badge: "bg-blue-100 text-blue-700 border-blue-200",
          label: "On Leave",
        };
      default:
        return {
          icon: <CalendarDays className="h-5 w-5 text-slate-600" />,
          bg: "bg-slate-100",
          badge: "bg-slate-100 text-slate-700 border-slate-200",
          label: status,
        };
    }
  }

  // Calculate dynamic progress color
  const percentage = details ? Number(details.percentage.toFixed(1)) : 0;
  let progressColor = "[&>div]:bg-green-500";
  if (percentage < 75) progressColor = "[&>div]:bg-red-500";
  else if (percentage < 90) progressColor = "[&>div]:bg-blue-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-3xl p-0 overflow-hidden rounded-2xl gap-0">
        
        {/* Fixed Header */}
        <DialogHeader className="px-5 sm:px-8 py-5 border-b bg-white text-left flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
              Attendance Details
            </DialogTitle>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Detailed view for {student.studentName}
            </p>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="px-5 sm:px-8 py-5 sm:py-6 max-h-[75vh] overflow-y-auto bg-slate-50/50">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 opacity-60">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm font-medium text-slate-500 animate-pulse">
                Fetching student records...
              </p>
            </div>
          ) : details ? (
            <div className="space-y-6">

              {/* Student & Subject Top Cards */}
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                
                <div className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
                  <div className="rounded-lg bg-blue-50 p-3 shrink-0">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Student
                    </p>
                    <p className="truncate text-base font-bold text-slate-900">
                      {details.studentName}
                    </p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {details.registrationNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
                  <div className="rounded-lg bg-purple-50 p-3 shrink-0">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Subject
                    </p>
                    <p className="truncate text-base font-bold text-slate-900">
                      {details.subjectName}
                    </p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {details.subjectCode}
                    </p>
                  </div>
                </div>

              </div>

              {/* Progress Summary Card */}
              <div className="rounded-2xl border bg-white p-5 sm:p-6 shadow-sm">
                <div className="mb-3 flex items-end justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                    <TrendingUp className="h-4 w-4" />
                    Total Attendance
                  </div>
                  <span className={`text-2xl sm:text-3xl font-extrabold ${
                    percentage >= 90 ? "text-green-600" : percentage >= 75 ? "text-blue-600" : "text-red-600"
                  }`}>
                    {percentage}%
                  </span>
                </div>
                
                <Progress value={details.percentage} className={`h-2.5 sm:h-3 bg-slate-100 ${progressColor}`} />
                
                <div className="mt-3 flex justify-between text-xs sm:text-sm font-medium text-slate-500">
                  <span>{details.presentClasses} Attended</span>
                  <span>{details.totalClasses} Total Classes</span>
                </div>
              </div>

              {/* History Timeline */}
              <div>
                <h3 className="mb-3 text-sm sm:text-base font-semibold text-slate-900 ml-1">
                  Attendance History
                </h3>
                
                {details.attendanceHistory?.length > 0 ? (
                  <div className="space-y-3">
                    {details.attendanceHistory.map((record) => {
                      const theme = getStatusTheme(record.status);
                      const formattedDate = new Date(record.attendanceDate).toLocaleDateString("en-US", {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      });

                      return (
                        <div
                          key={record.attendanceRecordId}
                          className="flex items-center justify-between rounded-xl border bg-white p-3 sm:p-4 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className={`rounded-xl p-2.5 ${theme.bg} transition-colors`}>
                              {theme.icon}
                            </div>
                            <p className="text-sm sm:text-base font-bold text-slate-700">
                              {formattedDate}
                            </p>
                          </div>

                          <Badge variant="outline" className={`px-3 py-1 text-xs sm:text-sm font-semibold border ${theme.badge}`}>
                            {theme.label}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                    No records available.
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="py-12 text-center font-medium text-slate-500">
              No data found for this student.
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}