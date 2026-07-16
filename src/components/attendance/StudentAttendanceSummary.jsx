import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  AlertCircle,
  TrendingUp,
  Info,
} from "lucide-react";

export default function StudentAttendanceSummary({ dashboard }) {
  const percentage = Number(dashboard.overallPercentage.toFixed(1));
  const absent = dashboard.totalClasses - dashboard.presentClasses;

  // Dynamic styling variables based on percentage
  let message = "Excellent! You are highly consistent.";
  let statusColor = "text-green-00";
  let statusBg = "bg-green-50";
  let StatusIcon = TrendingUp;
  let progressIndicatorColor = "[&>div]:bg-green-500"; // Targets shadcn's internal indicator

  if (percentage < 75) {
    message = "Warning! Attendance is below 75%. Cover up soon.";
    statusColor = "text-red-600";
    statusBg = "bg-red-50";
    StatusIcon = AlertCircle;
    progressIndicatorColor = "[&>div]:bg-red-600";
  } else if (percentage < 90) {
    message = "Good job! You're in the safe zone.";
    statusColor = "text-black-500";
    statusBg = "bg-blue-50";
    StatusIcon = Info;
    progressIndicatorColor = "[&>div]:bg-blue-500";
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg">
      {/* Header Section */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
              Overall Attendance
            </p>
            <h1
              className={`text-5xl sm:text-6xl font-extrabold tracking-tight ${statusColor}`}
            >
              {percentage}%
            </h1>
          </div>

          <div className="w-full sm:w-1/3 min-w-[200px]">
            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 px-1">
              <span>0%</span>
              <span>75% Min</span>
              <span>100%</span>
            </div>
            <Progress
              value={percentage}
              className={`h-2.5 sm:h-3 w-full bg-slate-200 ${progressIndicatorColor}`}
            />
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-slate-100" />

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-5 p-5 sm:p-8 grid-cols-2 sm:grid-cols-3 bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm hover:bg-green-50/50 hover:border-green-100 transition-colors">
          <div className="rounded-xl bg-green-100 p-2.5 sm:p-3 shrink-0">
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Present
            </p>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
              {dashboard.presentClasses}
            </h3>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm hover:bg-red-50/50 hover:border-red-100 transition-colors">
          <div className="rounded-xl bg-red-100 p-2.5 sm:p-3 shrink-0">
            <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Absent
            </p>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
              {absent}
            </h3>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm hover:bg-blue-50/50 hover:border-blue-100 transition-colors col-span-2 sm:col-span-1">
          <div className="rounded-xl bg-blue-100 p-2.5 sm:p-3 shrink-0">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Total Classes
            </p>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
              {dashboard.totalClasses}
            </h3>
          </div>
        </div>
      </div>

      {/* Dynamic Footer Message */}
      <div
        className={`flex items-center gap-2.5 px-5 sm:px-8 py-4 ${statusBg} border-t border-black/5`}
      >
        <StatusIcon className={`h-5 w-5 ${statusColor}`} />
        <p className={`text-sm sm:text-base font-medium ${statusColor}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
