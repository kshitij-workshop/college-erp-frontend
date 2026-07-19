import {
  CalendarDays,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AssignmentStatusBadge from "./AssignmentStatusBadge";

function getDueLabel(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);

  const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (diff < 0)
    return `Overdue by ${Math.abs(diff)} day${Math.abs(diff) > 1 ? "s" : ""}`;

  if (diff === 0) return "Due Today";

  if (diff === 1) return "Due Tomorrow";

  return `Due in ${diff} days`;
}

export default function StudentAssignmentCard({
  assignment,
  onView,
  onSubmit,
  onViewSubmission,
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      {/* Subject */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {assignment.subjectCode}
          </span>

          <span className="text-sm text-slate-500">
            {assignment.subjectName}
          </span>
        </div>

        <AssignmentStatusBadge status={assignment.submissionStatus} />
      </div>

      {/* Title */}

      <h2 className="mt-5 text-xl font-semibold text-slate-900">
        {assignment.title}
      </h2>

      {/* Faculty */}

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
        <User className="h-4 w-4" />
        {assignment.facultyName}
      </div>

      {/* Information */}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarDays className="h-4 w-4" />
            <span className="text-xs uppercase">Due</span>
          </div>

          <p className="mt-2 font-semibold text-slate-900">
            {new Date(assignment.dueDate).toLocaleDateString()}
          </p>

          <p className="mt-1 text-sm text-blue-600">
            {getDueLabel(assignment.dueDate)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <GraduationCap className="h-4 w-4" />
            <span className="text-xs uppercase">Max Marks</span>
          </div>

          <p className="mt-2 text-xl font-bold text-slate-900">
            {assignment.maxMarks}
          </p>
        </div>
      </div>

      {/* Attachment */}

      {assignment.attachment && (
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600" />

            <span className="text-sm font-medium">{assignment.attachment}</span>
          </div>

          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Marks */}

      {assignment.maxMarks !== undefined && (
        <div className="mt-6 rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-green-700">Marks Obtained</p>

          <p className="mt-1 text-2xl font-bold text-green-700">
            {assignment.marksAwarded} / {assignment.maxMarks}
          </p>
        </div>
      )}
      <br />
      {assignment.feedback && (
          <div className="rounded-2xl border bg-blue-50 p-4">
            <h3 className="font-medium">Faculty Feedback</h3>

            <p className="mt-2 text-sm text-slate-600">{assignment.feedback}</p>
          </div>
        )}

      {/* Buttons */}
      <br />

      <div className="flex gap-2">
  <Button
    variant="outline"
    className="flex-1"
    onClick={() => onView?.(assignment)}
  >
    View Details
  </Button>

  {/* First Submission */}
  {(!assignment.submissionStatus ||
    assignment.submissionStatus === "PENDING") && (
    <Button
      className="flex-1"
      onClick={() => onSubmit?.(assignment)}
    >
      Submit Assignment
    </Button>
  )}

  {/* Submitted / Resubmitted / Graded */}
  {(assignment.submissionStatus === "SUBMITTED" ||
    assignment.submissionStatus === "RESUBMITTED" ||
    assignment.submissionStatus === "GRADED") && (
    <>
      <Button
        variant="secondary"
        className="flex-1"
        onClick={() => onViewSubmission?.(assignment)}
      >
        View Submission
      </Button>

      {/* Allow resubmission only before due date */}
      {new Date() <= new Date(assignment.dueDate) && (
        <Button
          className="flex-1"
          onClick={() => onSubmit?.(assignment)}
        >
          Resubmit
        </Button>
      )}
    </>
  )}
</div>
    </div>
  );
}
