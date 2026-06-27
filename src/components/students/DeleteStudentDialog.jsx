import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteStudent } from "@/api/studentApi";

export default function DeleteStudentDialog({
  open,
  onOpenChange,
  student,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!student) return;

    try {
      setLoading(true);

      await deleteStudent(student.id);

      toast.success("Student deleted successfully");

      onOpenChange(false);

      refresh();

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to delete student"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Student"
      description={`Are you sure you want to delete "${student?.fullName}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
    />
  );
}