import { useEffect, useState } from "react";
import {
  User,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock3,
  TrendingUp,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { getStudentAttendanceDetails } from "@/api/attendanceApi";

export default function StudentSubjectAttendanceDialog({
  open,
  onOpenChange,
  studentId,
  subjectOfferingId,
}) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);

  async function loadAttendance() {
    if (!studentId || !subjectOfferingId) return;

    try {
      setLoading(true);
      const response = await getStudentAttendanceDetails(
        studentId,
        subjectOfferingId
      );
      setDetails(response.data.data);
    } catch (error) {
      console.error("Failed to fetch attendance details:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      loadAttendance();
    }
  }, [open, studentId, subjectOfferingId]);

  // Unified theme helper for consistency
  function getStatusTheme(status) {
    switch (status) {
      case "PRESENT":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
          bg: "bg-green-100",
          badge: "bg-green-100 text-green-700 border-green-200",
        };
      case "ABSENT":
        return {
          icon: <XCircle className="h-5 w-5 text-red-600" />,
          bg: "bg-red-100",
          badge: "bg-red-100 text-red-700 border-red-200",
        };
      case "LATE":
        return {
          icon: <Clock3 className="h-5 w-5 text-yellow-600" />,
          bg: "bg-yellow-100",
          badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
        };
      default:
        return {
          icon: <CalendarDays className="h-5 w-5 text-slate-600" />,
          bg: "bg-slate-100",
          badge: "bg-slate-100 text-slate-700 border-slate-200",
        };
    }
  }

  // Dynamic progress color based on percentage
  const percentage = details ? Number(details.percentage.toFixed(1)) : 0;
  let progressColor = "[&>div]:bg-green-500";
  if (percentage < 75) progressColor = "[&>div]:bg-red-500";
  else if (percentage < 90) progressColor = "[&>div]:bg-blue-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Full-bleed header trick with p-0 and overflow-hidden */}
      <DialogContent className="w-[95vw] sm:max-w-3xl p-0 overflow-hidden rounded-2xl gap-0">
        
        <DialogHeader className="px-5 sm:px-8 py-5 border-b bg-white text-left">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
            Attendance History
          </DialogTitle>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Detailed subject records for the student.
          </p>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="px-5 sm:px-8 py-5 sm:py-6 max-h-[75vh] overflow-y-auto bg-slate-50/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 opacity-60">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm font-medium text-slate-500 animate-pulse">
                Fetching detailed records...
              </p>
            </div>
          ) : details ? (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Info Grid: 3 columns on desktop, 1 on mobile */}
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                
                <Card className="rounded-xl border-slate-200 shadow-sm border-0 bg-white">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <User className="h-4 w-4 text-blue-500" />
                      Student
                    </div>
                    <h2 className="mt-2 text-base font-bold text-slate-900 truncate">
                      {details.studentName}
                    </h2>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {details.registrationNumber}
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm border-0 bg-white">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      Subject
                    </div>
                    <h2 className="mt-2 text-base font-bold text-slate-900 truncate">
                      {details.subjectName}
                    </h2>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {details.subjectCode}
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm border-0 bg-white">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <GraduationCap className="h-4 w-4 text-orange-500" />
                      Faculty
                    </div>
                    <h2 className="mt-2 text-base font-bold text-slate-900 truncate">
                      {details.facultyName}
                    </h2>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Bar Section */}
              <div className="rounded-2xl border bg-white p-5 sm:p-6 shadow-sm">
                <div className="mb-3 flex items-end justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                    <TrendingUp className="h-4 w-4" />
                    Overall Subject Attendance
                  </div>
                  <span className={`text-2xl sm:text-3xl font-extrabold ${
                    percentage >= 90 ? "text-green-600" : percentage >= 75 ? "text-blue-600" : "text-red-600"
                  }`}>
                    {percentage}%
                  </span>
                </div>
                
                <Progress value={details.percentage} className={`h-2.5 sm:h-3 bg-slate-100 ${progressColor}`} />
                
                <p className="mt-3 text-xs sm:text-sm font-medium text-slate-500 text-right">
                  {details.presentClasses} / {details.totalClasses} Classes Attended
                </p>
              </div>

              {/* Timeline Section */}
              <div>
                <h3 className="mb-3 text-sm sm:text-base font-semibold text-slate-900 ml-1">
                  Timeline History
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
                            <span className="text-sm sm:text-base font-bold text-slate-700">
                              {formattedDate}
                            </span>
                          </div>
                          
                          <Badge variant="outline" className={`px-3 py-1 text-xs sm:text-sm font-semibold border ${theme.badge}`}>
                            {record.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                    No history records found.
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 font-medium">
              No attendance data found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}