import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  TrendingUp,
} from "lucide-react";

export default function AttendanceHistoryDialog({
  open,
  onOpenChange,
  subject,
}) {
  if (!subject) return null;

  const percentage = Number(subject.percentage.toFixed(1));

  // Dynamic progress bar styling
  let progressColor = "[&>div]:bg-green-500";
  if (percentage < 75) {
    progressColor = "[&>div]:bg-red-500";
  } else if (percentage < 90) {
    progressColor = "[&>div]:bg-blue-500";
  }

  // Enhanced helper for status themes (Icon + Colors)
  function getStatusTheme(status) {
    switch (status) {
      case "PRESENT":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
          badgeClass: "bg-green-100 text-green-700 border-green-200",
          iconBg: "bg-green-100",
          label: "Present",
        };
      case "ABSENT":
        return {
          icon: <XCircle className="h-5 w-5 text-red-600" />,
          badgeClass: "bg-red-100 text-red-700 border-red-200",
          iconBg: "bg-red-100",
          label: "Absent",
        };
      case "LATE":
        return {
          icon: <Clock3 className="h-5 w-5 text-yellow-600" />,
          badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-200",
          iconBg: "bg-yellow-100",
          label: "Late",
        };
      default:
        return {
          icon: <CalendarDays className="h-5 w-5 text-slate-600" />,
          badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
          iconBg: "bg-slate-100",
          label: status,
        };
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Container: p-0 to allow full-bleed header */}
      <DialogContent className="w-[95vw] sm:max-w-2xl p-0 overflow-hidden rounded-2xl gap-0">
        
        {/* Fixed Header */}
        <DialogHeader className="px-5 sm:px-8 py-5 border-b bg-white text-left">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
            {subject.subjectName}
          </DialogTitle>
          <p className="mt-1 font-medium text-primary">
            {subject.facultyName}
          </p>
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="px-5 sm:px-8 py-5 sm:py-6 max-h-[65vh] overflow-y-auto bg-slate-50/50">
          <div className="space-y-6">

            {/* Summary Card */}
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
              
              <Progress value={percentage} className={`h-2.5 sm:h-3 bg-slate-100 ${progressColor}`} />
              
              <div className="mt-3 flex justify-between text-xs sm:text-sm font-medium text-slate-500">
                <span>{subject.presentClasses} Attended</span>
                <span>{subject.totalClasses} Total Classes</span>
              </div>
            </div>

            {/* History List */}
            <div>
              <h3 className="mb-3 text-sm sm:text-base font-semibold text-slate-900 ml-1">
                Recent History
              </h3>
              
              {subject.attendanceHistory?.length > 0 ? (
                <div className="space-y-3">
                  {subject.attendanceHistory.map((record) => {
                    const theme = getStatusTheme(record.status);
                    
                    // Better date formatting (e.g., "Mon, 12 Aug")
                    const formattedDate = new Date(record.attendanceDate).toLocaleDateString("en-US", {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    });

                    return (
                      <div
                        key={record.attendanceRecordId}
                        className="group flex items-center justify-between rounded-xl border bg-white p-3 sm:p-4 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`rounded-xl p-2.5 ${theme.iconBg} transition-colors`}>
                            {theme.icon}
                          </div>
                          <div>
                            <p className="text-sm sm:text-base font-bold text-slate-700">
                              {formattedDate}
                            </p>
                          </div>
                        </div>

                        <Badge 
                          variant="outline" 
                          className={`px-3 py-1 text-xs sm:text-sm font-semibold border ${theme.badgeClass}`}
                        >
                          {theme.label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                  No attendance records found for this subject yet.
                </div>
              )}
            </div>

          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}