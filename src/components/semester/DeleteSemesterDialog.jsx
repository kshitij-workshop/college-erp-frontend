import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteSemester } from "@/api/semesterApi";

export default function DeleteSemesterDialog({
  open,
  onOpenChange,
  semester,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!semester) return;

    try {
      setLoading(true);

      await deleteSemester(semester.id);

      toast.success("Semester deleted successfully");

      refresh?.();

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to delete semester",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Semester"
      description={`Are you sure you want to delete "${semester?.name}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
      loading={loading}
    />
  );
}
