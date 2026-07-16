import { ArrowRight, BookOpen, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function SubjectAttendanceCard({
  subject,
  onViewHistory,
}) {
  const percentage = Number(subject.percentage.toFixed(1));

  function getProgressColor(value) {
    if (value >= 90) return "bg-green-500";
    if (value >= 75) return "bg-blue-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  }

  function getTextColor(value) {
    if (value >= 90) return "text-green-600";
    if (value >= 75) return "text-blue-600";
    if (value >= 60) return "text-yellow-600";
    return "text-red-600";
  }

  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
            {subject.subjectCode}
          </span>

          <h2 className="mt-4 text-xl font-semibold">
            {subject.subjectName}
          </h2>

        </div>

        <h1 className={`text-4xl font-bold ${getTextColor(percentage)}`}>
          {percentage}%
        </h1>

      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">

        <User className="h-4 w-4" />

        {subject.facultyName}

      </div>

      <div className="mt-6">

        <Progress
          value={percentage}
          className="h-3"
        />

      </div>

      <div className="mt-3 flex items-center justify-between">

        <p className="text-sm text-slate-500">

          {subject.presentClasses} / {subject.totalClasses} Classes

        </p>

      </div>

      <Button
        variant="ghost"
        className="mt-6 w-full justify-between rounded-2xl"
        onClick={() => onViewHistory(subject)}
      >
        View History

        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>

    </div>
  );
}