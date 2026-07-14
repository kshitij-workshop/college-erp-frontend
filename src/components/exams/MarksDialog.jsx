import { useEffect, useState } from "react";
import { toast } from "sonner";
import EntityDialog from "@/components/common/EntityDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { enterMarks, getExamResults } from "@/api/examApi";
import { getStudents } from "@/api/studentApi";

export default function MarksDialog({
  exam,
  open,
  onOpenChange,
  readOnly = false,
}) {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !exam) return;
    async function load() {
      try {
        setLoading(true);
        const [resultsResponse, studentsResponse] = await Promise.all([
          getExamResults(exam.id),
          getStudents({ sectionId: exam.sectionId, page: 0, size: 1000 }),
        ]);
        const results = resultsResponse.data.data ?? [];
        const existingMarks = Object.fromEntries(
          results.map((result) => [result.studentId, result.marksObtained]),
        );
        const studentData = studentsResponse.data.data;
        const sortedStudents = [
          ...(studentData.content ?? studentData ?? []),
        ].sort((first, second) =>
          String(first.registrationNumber ?? "").localeCompare(
            String(second.registrationNumber ?? ""),
            undefined,
            { numeric: true, sensitivity: "base" },
          ),
        );
        setStudents(sortedStudents);
        setMarks(existingMarks);
      } catch (error) {
        toast.error(
          error.response?.data?.message ?? "Failed to load marks sheet",
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [open, exam]);

  async function submit() {
    const entries = students.map((student) => ({
      studentId: student.id,
      marksObtained: Number(marks[student.id]),
    }));
    if (
      entries.some(
        (entry) =>
          Number.isNaN(entry.marksObtained) ||
          entry.marksObtained < 0 ||
          entry.marksObtained > exam.maxMarks,
      )
    ) {
      toast.error(
        `Enter marks between 0 and ${exam.maxMarks} for every student`,
      );
      return;
    }
    try {
      setSaving(true);
      await enterMarks({ examId: exam.id, entries });
      toast.success("Marks saved successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to save marks");
    } finally {
      setSaving(false);
    }
  }

  const title = readOnly ? "Exam Results" : `Enter Marks — ${exam?.name ?? ""}`;
  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={
        exam
          ? `${exam.subjectName} • Section ${exam.sectionName} • Maximum ${exam.maxMarks} marks`
          : ""
      }
      size="xl"
    >
      {loading ? (
        <p className="py-16 text-center text-muted-foreground">
          Loading marks sheet...
        </p>
      ) : (
        <div className="space-y-5">
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Registration no.</TableHead>
                  <TableHead className="w-44">Marks obtained</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.fullName}
                    </TableCell>
                    <TableCell>{student.registrationNumber ?? "—"}</TableCell>
                    <TableCell>
                      {readOnly ? (
                        <span>
                          {marks[student.id] ?? "—"} / {exam.maxMarks}
                        </span>
                      ) : (
                        <Input
                          aria-label={`Marks for ${student.fullName}`}
                          type="number"
                          min="0"
                          max={exam.maxMarks}
                          step="0.01"
                          value={marks[student.id] ?? ""}
                          onChange={(e) =>
                            setMarks((current) => ({
                              ...current,
                              [student.id]: e.target.value,
                            }))
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {!students.length && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="py-12 text-center text-muted-foreground"
                    >
                      No students found for this section.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {!readOnly && (
              <Button disabled={saving || !students.length} onClick={submit}>
                {saving ? "Saving..." : "Save marks"}
              </Button>
            )}
          </div>
        </div>
      )}
    </EntityDialog>
  );
}
