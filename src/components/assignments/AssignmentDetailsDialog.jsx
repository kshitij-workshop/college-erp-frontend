import {
  CalendarDays,
  GraduationCap,
  User,
  FileText,
  Download,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import AssignmentStatusBadge from "./AssignmentStatusBadge";

export default function AssignmentDetailsDialog({
  open,
  onOpenChange,
  assignment,
  onSubmit,
}) {
  if (!assignment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[85vh] overflow-y-auto p-5 sm:p-7 rounded-2xl">
        
        {/* Header Section */}
        <DialogHeader className="text-left space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
                {assignment.title}
              </DialogTitle>
              <DialogDescription className="mt-1.5 font-medium text-primary">
                {assignment.subject}
              </DialogDescription>
            </div>
            {/* Moved badge to top for better visibility */}
            <div className="w-fit">
              <AssignmentStatusBadge status={assignment.submissionStatus} />
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          
          {/* Info Grid - Changed to 3 columns on desktop for better space utilization */}
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3">
            
            <div className="flex flex-col justify-center rounded-xl bg-slate-50/80 p-3 sm:p-4 border shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <User className="h-4 w-4" />
                Faculty
              </div>
              <p className="mt-1.5 text-sm sm:text-base font-medium truncate">
                {assignment.facultyName}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-xl bg-slate-50/80 p-3 sm:p-4 border shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <CalendarDays className="h-4 w-4" />
                Due Date
              </div>
              <p className="mt-1.5 text-sm sm:text-base font-medium">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-xl bg-slate-50/80 p-3 sm:p-4 border shadow-sm col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <GraduationCap className="h-4 w-4" />
                Max Marks
              </div>
              <p className="mt-1.5 text-sm sm:text-base font-medium text-primary">
                {assignment.maxMarks} Points
              </p>
            </div>

          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">
              Description
            </h3>
            <div className="rounded-xl border bg-slate-50/50 p-4 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap break-words shadow-sm">
              {assignment.description}
            </div>
          </div>

          {/* Attachment Section */}
          {assignment.attachment && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Attachment
              </h3>
              <div className="group flex items-center justify-between rounded-xl border p-3 sm:p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base font-medium truncate">
                    {assignment.attachmentName}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 sm:hidden">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          )}

        </div>

        <DialogFooter className="mt-6 gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          {assignment.status === "PENDING" && (
            <Button
              onClick={() => onSubmit(assignment)}
              className="w-full sm:w-auto font-medium shadow-sm hover:shadow-md transition-shadow"
            >
              Submit Assignment
            </Button>
          )}
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}