import { useState } from "react";
import { toast } from "sonner";
import EntityDialog from "@/components/common/EntityDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAssignment, updateAssignment } from "@/api/assignmentApi";

const newAssignment = {
  title: "",
  description: "",
  subjectOfferingId: "",
  dueDate: "",
  maxMarks: "",
};

export default function AssignmentDialog({
  open,
  onOpenChange,
  assignment,
  offerings,
  refresh,
}) {
  const [values, setValues] = useState(
    assignment
      ? {
          ...assignment,
          subjectOfferingId: String(assignment.subjectOfferingId),
          dueDate: assignment.dueDate?.slice(0, 16) ?? "",
        }
      : newAssignment,
  );
  const [saving, setSaving] = useState(false);
  const set = (key, value) =>
    setValues((current) => ({ ...current, [key]: value }));
  const editing = Boolean(assignment);

  async function submit(event) {
    event.preventDefault();
    if (
      !values.title.trim() ||
      !values.description.trim() ||
      !values.subjectOfferingId ||
      !values.dueDate ||
      !values.maxMarks
    )
      return toast.error("Complete all assignment fields");
    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      subjectOfferingId: Number(values.subjectOfferingId),
      dueDate: values.dueDate,
      maxMarks: Number(values.maxMarks),
    };
    try {
      setSaving(true);
      if (editing) await updateAssignment(assignment.id, payload);
      else await createAssignment(payload);
      toast.success(
        editing
          ? "Assignment updated successfully"
          : "Assignment created successfully",
      );
      await refresh();
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to save assignment");
    } finally {
      setSaving(false);
    }
  }

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title={editing ? "Edit Assignment" : "Create Assignment"}
      description="Set the task, due date, and maximum marks."
      size="md"
    >
      <form onSubmit={submit} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium">Title</span>
          <Input
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Assignment 1"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Description</span>
          <Textarea
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe the work students need to submit"
            rows={5}
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium">Subject offering</span>
            <Select
              disabled={editing}
              value={values.subjectOfferingId}
              onValueChange={(value) => set("subjectOfferingId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select assigned subject" />
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
            <span className="text-sm font-medium">Due date and time</span>
            <Input
              type="datetime-local"
              value={values.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Maximum marks</span>
            <Input
              type="number"
              min="1"
              value={values.maxMarks}
              onChange={(e) => set("maxMarks", e.target.value)}
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
            {saving
              ? "Saving..."
              : editing
                ? "Save Changes"
                : "Create Assignment"}
          </Button>
        </div>
      </form>
    </EntityDialog>
  );
}
