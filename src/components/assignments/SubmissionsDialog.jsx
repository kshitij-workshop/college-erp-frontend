import { useEffect, useState } from "react";
import { toast } from "sonner";
import EntityDialog from "@/components/common/EntityDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAssignmentSubmissions, gradeSubmission } from "@/api/assignmentApi";

export default function SubmissionsDialog({ assignment, open, onOpenChange }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gradingId, setGradingId] = useState(null);
  const [grade, setGrade] = useState({ marksAwarded: "", feedback: "" });

  async function load() {
    if (!assignment) return;
    try {
      setLoading(true);
      const response = await getAssignmentSubmissions(assignment.id);
      setSubmissions(
        (response.data.data ?? []).sort((a, b) =>
          String(a.enrollmentNumber ?? a.studentName).localeCompare(
            String(b.enrollmentNumber ?? b.studentName),
            undefined,
            { numeric: true },
          ),
        ),
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to load submissions",
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (open) load();
  }, [open, assignment]);
  async function saveGrade(submission) {
    const marksAwarded = Number(grade.marksAwarded);
    if (
      Number.isNaN(marksAwarded) ||
      marksAwarded < 0 ||
      marksAwarded > assignment.maxMarks
    )
      return toast.error(`Enter marks from 0 to ${assignment.maxMarks}`);
    try {
      await gradeSubmission(submission.id, {
        marksAwarded,
        feedback: grade.feedback,
      });
      toast.success("Submission graded successfully");
      setGradingId(null);
      await load();
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to grade submission",
      );
    }
  }
  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Assignment Submissions"
      description={
        assignment
          ? `${assignment.title} • Maximum ${assignment.maxMarks} marks`
          : ""
      }
      size="xl"
    >
      {loading ? (
        <p className="py-16 text-center text-muted-foreground">
          Loading submissions...
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Submission</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <p className="font-medium">{submission.studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {submission.registrationNumber ?? "—"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p>{new Date(submission.submittedAt).toLocaleString()}</p>
                    {submission.late && (
                      <Badge variant="destructive">Late</Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs whitespace-normal">
                    {submission.submissionText || "—"}
                  </TableCell>
                  <TableCell>
                    {gradingId === submission.id ? (
                      <div className="space-y-2">
                        <Input
                          type="number"
                          min="0"
                          max={assignment?.maxMarks}
                          value={grade.marksAwarded}
                          onChange={(e) =>
                            setGrade((value) => ({
                              ...value,
                              marksAwarded: e.target.value,
                            }))
                          }
                          placeholder="Marks"
                        />
                        <Textarea
                          value={grade.feedback}
                          onChange={(e) =>
                            setGrade((value) => ({
                              ...value,
                              feedback: e.target.value,
                            }))
                          }
                          placeholder="Feedback (optional)"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => saveGrade(submission)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setGradingId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setGradingId(submission.id);
                          setGrade({
                            marksAwarded: submission.marksAwarded ?? "",
                            feedback: submission.feedback ?? "",
                          });
                        }}
                      >
                        {submission.status === "GRADED"
                          ? `${submission.marksAwarded} / ${assignment?.maxMarks}`
                          : "Grade"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {!submissions.length && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No submissions yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </EntityDialog>
  );
}
