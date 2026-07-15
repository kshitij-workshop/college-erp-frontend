import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Send, Loader2, FileEdit } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { submitAssignment } from "@/api/assignmentApi";

export default function SubmitAssignmentDialog({
  open,
  onOpenChange,
  assignment,
  refresh,
}) {
  const [submissionText, setSubmissionText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmissionText("");
    }
  }, [open]);

  async function handleSubmit() {
    if (!submissionText.trim()) {
      toast.error("Submission cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await submitAssignment({
        assignmentId: assignment.assignmentId,
        submissionText,
      });

      toast.success("Assignment submitted successfully 🎉");
      onOpenChange(false);
      refresh?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to submit assignment",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!assignment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-xl p-5 sm:p-7 rounded-2xl">
        
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <FileEdit className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
              Submit Assignment
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm sm:text-base font-medium text-slate-600 ml-1">
            {assignment.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          <label className="text-sm font-semibold text-slate-900 ml-1">
            Your Work
          </label>
          <Textarea
            rows={8}
            className="resize-y rounded-xl border-slate-200 bg-slate-50/50 p-4 text-sm sm:text-base focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all shadow-inner"
            placeholder="Write your answer or drop links to your project/files here..."
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            disabled={loading}
          />
          {/* Character counter & Helper text */}
          <div className="flex items-center justify-between px-1 text-xs text-slate-500">
            <span>Make sure you've covered all requirements.</span>
            <span className={submissionText.length > 0 ? "text-primary font-medium" : "opacity-60"}>
              {submissionText.length} chars
            </span>
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          {/* Upgraded Button with disabled states and loading spinner */}
          <Button 
            disabled={loading || !submissionText.trim()} 
            onClick={handleSubmit}
            className="w-full sm:w-auto font-medium shadow-sm transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit
              </>
            )}
          </Button>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  );
}