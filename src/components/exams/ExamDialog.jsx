import { useState } from "react";
import { toast } from "sonner";
import EntityDialog from "@/components/common/EntityDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createExam } from "@/api/examApi";

const emptyExam = {
  name: "",
  examType: "CLASS_TEST",
  maxMarks: "",
  subjectOfferingId: "",
  examDate: "",
};

export default function ExamDialog({ open, onOpenChange, offerings, refresh }) {
  const [values, setValues] = useState(emptyExam);
  const [saving, setSaving] = useState(false);

  const set = (key, value) =>
    setValues((current) => ({ ...current, [key]: value }));

  async function submit(event) {
    event.preventDefault();
    if (!values.name.trim() || !values.subjectOfferingId || !values.maxMarks) {
      toast.error("Name, subject offering, and maximum marks are required");
      return;
    }
    try {
      setSaving(true);
      await createExam({
        ...values,
        name: values.name.trim(),
        maxMarks: Number(values.maxMarks),
        subjectOfferingId: Number(values.subjectOfferingId),
        examDate: values.examDate || null,
      });
      toast.success("Exam created successfully");
      await refresh();
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to create exam");
    } finally {
      setSaving(false);
    }
  }

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Exam"
      description="Create an exam for a subject offering."
      size="md"
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium">Exam name</span>
            <Input
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Class Test 1"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Exam type</span>
            <Select
              value={values.examType}
              onValueChange={(value) => set("examType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLASS_TEST">Class Test</SelectItem>
                <SelectItem value="INTERNAL">Internal</SelectItem>
                <SelectItem value="EXTERNAL">External</SelectItem>
              </SelectContent>
            </Select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Maximum marks</span>
            <Input
              min="1"
              type="number"
              value={values.maxMarks}
              onChange={(e) => set("maxMarks", e.target.value)}
            />
          </label>
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium">Subject offering</span>
            <Select
              value={values.subjectOfferingId}
              onValueChange={(value) => set("subjectOfferingId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subject offering" />
              </SelectTrigger>
              <SelectContent>
                {offerings.map((offering) => (
                  <SelectItem key={offering.id} value={String(offering.id)}>
                    {offering.subjectCode} • {offering.subjectName} —{" "}
                    {offering.sectionName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">
              Exam date{" "}
              <span className="text-muted-foreground">(optional)</span>
            </span>
            <Input
              type="date"
              value={values.examDate}
              onChange={(e) => set("examDate", e.target.value)}
            />
          </label>
        </div>
        <div className="flex justify-end gap-3 border-t pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button disabled={saving}>
            {saving ? "Creating..." : "Create Exam"}
          </Button>
        </div>
      </form>
    </EntityDialog>
  );
}
