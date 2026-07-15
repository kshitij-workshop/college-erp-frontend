import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  FileText,
  MessageSquare,
  Star,
  CheckCircle2,
} from "lucide-react";

import { getMySubmission } from "@/api/assignmentApi";

export default function StudentSubmissionDialog({
  open,
  onOpenChange,
  assignmentId,
}) {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadSubmission() {
    try {
      setLoading(true);
      const response = await getMySubmission(assignmentId);
      setSubmission(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to load submission");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open && assignmentId) {
      loadSubmission();
    }
  }, [open, assignmentId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Container: p-0 to allow full-bleed header, overflow-hidden to keep rounded corners */}
      <DialogContent className="w-[95vw] sm:max-w-3xl p-0 overflow-hidden rounded-2xl gap-0">
        
        {/* Fixed Header */}
        <DialogHeader className="px-5 sm:px-8 py-5 sm:py-6 border-b bg-white flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-left">
          <div>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
              {submission?.assignmentTitle || "Assignment Details"}
            </DialogTitle>
            <DialogDescription className="mt-1.5 font-medium">
              View your submitted assignment and faculty feedback.
            </DialogDescription>
          </div>

          {/* Moved badges to header for immediate visibility */}
          {!loading && submission && (
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="px-3 py-1 text-xs bg-slate-900">
                {submission.status}
              </Badge>
              {submission.late && (
                <Badge variant="destructive" className="px-3 py-1 text-xs">
                  Late Submission
                </Badge>
              )}
            </div>
          )}
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="px-5 sm:px-8 py-5 sm:py-6 max-h-[65vh] overflow-y-auto bg-slate-50/30">
          {loading ? (
            // Better loading state
            <div className="flex flex-col items-center justify-center py-12 opacity-60">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary mb-4" />
              <p className="text-sm font-medium text-slate-500 animate-pulse">
                Fetching your submission...
              </p>
            </div>
          ) : submission ? (
            <div className="space-y-6">
              
              {/* Stats Grid */}
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col justify-center rounded-xl bg-white p-4 border shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    Submitted On
                  </div>
                  <p className="mt-1.5 text-sm sm:text-base font-medium">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col justify-center rounded-xl bg-white p-4 border shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <Star className="h-4 w-4" />
                    Marks Awarded
                  </div>
                  <p className="mt-1.5 text-lg sm:text-xl font-bold text-primary">
                    {submission.marksAwarded ?? "--"}
                  </p>
                </div>
              </div>

              {/* Submission Text */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Your Submission
                </div>
                <div className="rounded-xl border bg-white p-4 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap break-words shadow-sm">
                  {submission.submissionText}
                </div>
              </div>

              {/* Faculty Feedback */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  Faculty Feedback
                </div>
                <div className="rounded-xl border bg-blue-50/50 p-4 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap break-words shadow-sm">
                  {submission.feedback || (
                    <span className="italic text-slate-500">
                      Faculty has not provided feedback yet.
                    </span>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-slate-500">
                Submission not found.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}